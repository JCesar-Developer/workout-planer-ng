import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Category, Exercise } from '@dashboard/shared/interfaces/exercise.interface';
import { ExerciseStoreService } from '@dashboard/shared/services/store-services/exercise-store.service';
import { CustomValidatorsService } from '@shared/services/custom-validators.service';
import { InputErrorMessageService, ErrorMessageMap } from '@shared/services/input-error-message.service'
import { ExerciseFormActions } from '@exercises/helpers/exercise-form-actions.helper';

import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

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

  public currentExercise: Exercise = {} as Exercise;
  public categories: Category[];
  public exerciseId?: string;

  public form!: FormGroup<ExerciseForm>;
  public formActions: ExerciseFormActions;

  private $altImg?: Subscription;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private fb: FormBuilder,
    private customValidators: CustomValidatorsService,
    private exerciseStoreService: ExerciseStoreService,
    private errorMessageService: InputErrorMessageService,
  ) {
    this.categories = exerciseStoreService.exerciseCategories;
    this.formActions = new ExerciseFormActions( ref, exerciseStoreService );
  }

  ngOnInit(): void {
    this.setForm();
    this.fillFormIfDataExists();
    this.setCurrentExercise();

    this.$altImg = this.form.get('alternativeImage')?.valueChanges
      .subscribe( altImg => {
        this.currentExercise.alternativeImage = altImg;
        this.setCurrentExercise();
      });
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

  private fillFormIfDataExists(): void {
    if (!this.config.data || !this.config.data.model) return;

    const exercise = this.config.data.model;
    this.form.patchValue( exercise );
    this.exerciseId = exercise.id;
  }

  private setCurrentExercise(): void {
    this.currentExercise = this.form.value as Exercise;
  }

  //VALIDATIONS ---
  private errorMessagesMap: ErrorMessageMap = {
    'required': () => 'Este campo es requerido',
    'minlength': (errors?: ValidationErrors) => `Este campo debe tener al menos ${errors ? errors['minlength'].requiredLength : 0} caracteres`,
    'whitespace': () => 'Este campo no puede contener solo espacios en blanco',
  };

  public isInvalidInput( field: FormControls ): boolean | null {
    return this.errorMessageService.isValidField( this.form, field );
  }

  public getErrorMessages( field: FormControls ): string | null {
    return this.errorMessageService.getErrorMessage({
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

    if( this.exerciseId ) {
      this.formActions.update( this.currentExercise );
      return;
    }

    this.formActions.save( this.currentExercise );
  }

  public onDelete() {
    if( !this.exerciseId ) return;
    this.formActions.delete( this.exerciseId, this.currentExercise.name );
  }

  public closeDialog() {
    this.ref.close();
  }

}
