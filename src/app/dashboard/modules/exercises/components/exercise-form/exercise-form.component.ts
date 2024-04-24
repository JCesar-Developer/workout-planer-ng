import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Category, Exercise } from '@dashboard/shared/models/exercise.interface';
import { CustomValidatorsService } from '@shared/services/custom-validators.service';
import { InputErrorMessageService, ErrorMessageMap } from '@shared/services/input-error-message.service'

import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ExerciseHttpService } from '@dashboard/shared/services/http-services/exercise-http.service';
import { MessageService } from 'primeng/api';
import { ExerciseStoreActionsService } from '@/dashboard/shared/services/store-services/exercise-store-actions.service';

import { FormActions } from '@dashboard/shared/helpers/form-actions.helper';
import { exerciseToastMessages } from '@exercises/helpers/exercise-toast-messsages.helper';

type FormControls = 'id' | 'name' | 'image' | 'category' | 'alternativeImage';

interface ExerciseForm {
  id: FormControl<string|null>;
  name: FormControl<string|null>;
  image?: FormControl<string|null>;
  category: FormControl<Category>;
  alternativeImage?: FormControl<string|null>;
}

@Component({
  selector: 'exercise-form',
  templateUrl: './exercise-form.component.html',
})
export class ExerciseFormComponent implements OnInit, OnDestroy {

  public form!: FormGroup<ExerciseForm>;
  public formActions?: FormActions<Exercise>;

  public categories!: Category[];
  public currentExercise: Exercise = {} as Exercise;

  private $altImg?: Subscription;

  constructor(
    private config: DynamicDialogConfig,
    private customValidators: CustomValidatorsService,
    private exerciseHttp: ExerciseHttpService,
    private exerciseStoreActions: ExerciseStoreActionsService,
    private fb: FormBuilder,
    private inputErrorMessages: InputErrorMessageService,
    private ref: DynamicDialogRef,
    private messageService: MessageService,
  ) {}

  //LIFECYCLE HOOKS ---
  ngOnInit(): void {
    this.setForm();
    this.setCategories();
    this.fillFormIfDataExists();
    this.setCurrentExercise();
    this.createFormActions();
    this.subscribeToAltImgChanges();
  }

  ngOnDestroy(): void {
    this.$altImg?.unsubscribe();
  }

  //GETTERS & SETTERS ---
  private setForm(): void {
    this.form = this.fb.group<ExerciseForm>({
      id: this.fb.control(null),
      name: this.fb.control(null, [Validators.required, Validators.minLength(3), this.customValidators.noWhitespace ]),
      image: this.fb.control(null),
      category: this.fb.control(Category.CORE, { nonNullable: true }),
      alternativeImage: this.fb.control(null),
    })
  }

  private setCategories(): void {
    this.categories = Object.values(Category);
  }

  private fillFormIfDataExists(): void {
    if (!this.config.data || !this.config.data.model) return;

    const exercise = this.config.data.model;
    this.form.patchValue( exercise );
  }

  private setCurrentExercise(): void {
    this.currentExercise = this.form.value as Exercise;
  }

  private createFormActions(): void {
    this.formActions = new FormActions<Exercise>(
      this.exerciseHttp,
      this.exerciseStoreActions,
      this.messageService,
      exerciseToastMessages,
      this.ref
    );
  }

  private subscribeToAltImgChanges(): void {
    this.$altImg = this.form.get('alternativeImage')?.valueChanges
      .subscribe(() => {
        Promise.resolve().then(() => this.setCurrentExercise());
      });
  }

  //VALIDATIONS ---
  private errorMessagesMap: ErrorMessageMap = {
    'required': () => 'Este campo es requerido',
    'minlength': (errors?: ValidationErrors) => `Este campo debe tener al menos ${errors ? errors['minlength'].requiredLength : 0} caracteres`,
    'whitespace': () => 'Este campo no puede contener solo espacios en blanco',
  };

  public isInvalidInput( field: FormControls ): boolean | null {
    return this.inputErrorMessages.isInvalidField( this.form, field );
  }

  public getErrorMessages( field: FormControls ): string | null {
    return this.inputErrorMessages.getErrorMessage({
      form: this.form,
      field,
      errorMessageMap: this.errorMessagesMap,
    });
  }

  //SUBMIT ---
  public onSubmit() {
    this.setCurrentExercise();

    if( this.form.invalid ) {
      this.form.markAllAsTouched();
      return;
    }

    if( this.currentExercise.id ) {
      this.formActions!.update( this.currentExercise );
      return;
    }

    this.formActions!.save( this.currentExercise );
  }

  public onDelete() {
    if( !this.currentExercise.id ) return;
    this.formActions!.delete( this.currentExercise );
  }

  public closeDialog() {
    this.ref.close();
  }

}
