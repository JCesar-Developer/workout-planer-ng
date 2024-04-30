import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Category, Exercise } from '@dashboard/shared/models/exercise.interface';
import { CustomValidatorsService } from '@shared/services/custom-validators.service';
import { FormValidator } from '@shared/helpers/form-validator.helper'

import { ConfirmationService } from 'primeng/api';

import { exerciseErrorMessages } from '@exercises/helpers/exercise-form-error-messages.helper';
import { DialogHandlerService } from '@/dashboard/shared/services/dashboard-services/dialog-handler.service';
import { ExerciseCrudActionsService } from '../../services/exercise-crud-actions.service';

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
  providers: [ ExerciseCrudActionsService ]
})
export class ExerciseFormComponent implements OnInit, OnDestroy {

  public form!: FormGroup<ExerciseForm>;
  public formValidator?: FormValidator;

  public categories: Category[] = Object.values(Category);
  public currentExercise: Exercise = {} as Exercise;

  private $altImg?: Subscription;

  constructor(
    private dialogHandler: DialogHandlerService<Exercise>,
    private customValidators: CustomValidatorsService,
    private exerciseCrudActions: ExerciseCrudActionsService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
  ) {}

  //LIFECYCLE HOOKS ---
  ngOnInit(): void {
    this.setForm();
    this.setFormValidator();

    this.fillFormIfDataExists();
    this.setCurrentExercise();
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
    this.formValidator = new FormValidator( this.form, exerciseErrorMessages );
  }

  private fillFormIfDataExists(): void {
    if (!this.dialogHandler.model) return;

    const exercise = this.dialogHandler.model;
    this.form.patchValue( exercise );
  }

  private setCurrentExercise(): void {
    this.currentExercise = this.form.value as Exercise;
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
      this.exerciseCrudActions.update( this.currentExercise );
      return;
    }

    this.exerciseCrudActions.save( this.currentExercise );
  }

  public onConfirmDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target!,
      message: 'Estas seguro de que quieres eliminar este ejercicio?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.onDelete()
    });
  }

  private onDelete() {
    if( !this.currentExercise.id ) return;
    this.exerciseCrudActions.delete( this.currentExercise );
  }

  public closeDialog() {
    this.dialogHandler.closeForm();
  }

}
