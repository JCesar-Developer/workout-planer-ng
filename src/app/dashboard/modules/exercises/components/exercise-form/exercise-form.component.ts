import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Category, Exercise } from '@dashboard/shared/models/exercise.interface';
import { CustomValidatorsService } from '@shared/services/custom-validators.service';
import { InputErrorMessageService } from '@shared/services/input-error-message.service'

import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ExerciseHttpService } from '@dashboard/shared/services/http-services/exercise-http.service';
import { MessageService } from 'primeng/api';
import { ExerciseStoreActionsService } from '@/dashboard/shared/services/store-services/exercise-store-actions.service';

import { FormActions } from '@dashboard/shared/helpers/form-actions.helper';
import { exerciseErrorMessages } from '@exercises/helpers/exercise-form-error-messages.helper';
import { exerciseToastMessages } from '@exercises/helpers/exercise-toast-messsages.helper';

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
  public formValidator?: InputErrorMessageService;

  public categories: Category[] = Object.values(Category);
  public currentExercise: Exercise = {} as Exercise;

  private $altImg?: Subscription;

  constructor(
    private config: DynamicDialogConfig,
    private customValidators: CustomValidatorsService,
    private exerciseHttp: ExerciseHttpService,
    private exerciseStoreActions: ExerciseStoreActionsService,
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private messageService: MessageService,
  ) {}

  //LIFECYCLE HOOKS ---
  ngOnInit(): void {
    this.setForm();
    this.setFormValidator();
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

  private setFormValidator(): void {
    this.formValidator = new InputErrorMessageService( this.form, exerciseErrorMessages );
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
