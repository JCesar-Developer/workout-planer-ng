import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Exercise } from '@dashboard/shared/models/exercise.interface';

import { CustomValidatorsService } from '@shared/services/custom-validators.service';
import { FormValidator } from '@shared/helpers/form-validator.helper';
import { MessageService } from 'primeng/api';

import { DialogHandlerService } from '@/dashboard/shared/services/dashboard-services/dialog-handler.service';

import { Workout } from '@dashboard/shared/models/workout-interface';

import { workoutErrorMessages } from '../../helpers/workout-form-error-messages.helper';
import { WorkoutCrudActionsService } from '../../services/workout-crud-actions.service';
import { FillFormService } from './fillForm.helper';

const toastMessages = {
  atLeast2Exercises: 'Una rutina debe tener al menos 2 ejercicios',
  invalidFields: 'Uno o más campos son inválidos, por favor vuelva a revisar el formulario',
}

@Component({
  selector: 'workout-form',
  templateUrl: './workout-form.component.html',
  providers: [
    WorkoutCrudActionsService,
    FillFormService,
  ],
})
export class WorkoutFormComponent implements OnInit {

  public formValidator?: FormValidator;

  public workoutId?: string;
  public form!: FormGroup;
  public exercises: Exercise[] = [];
  public categorizedExercises?: FormArray;

  constructor(
    private dialogHandler: DialogHandlerService<Workout>,
    private fb: FormBuilder,
    private fillFormService: FillFormService,
    private customValidator: CustomValidatorsService,
    private workoutCrudActions: WorkoutCrudActionsService,
    private messageService: MessageService,
  ) {}

  //LIFECYCLE HOOKS ---
  ngOnInit(): void {
    this.setForm();
    this.setFormValidator();

    this.setCategorizedExercises();
    this.fillFormIfDataExists();
  }

  //GETTERS & SETTERS ---
  private get workout(): Workout | null {
    return this.dialogHandler.model ? this.dialogHandler.model : null;
  }

  private setForm(): void {
    this.form = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(8), this.customValidator.noWhitespace]],
      duration: [0, [Validators.required, Validators.min(20)]],
      categorizedExercises: this.fb.array([]),
    }, {
      validators: [ this.customValidator.atLeastTwoExercises() ]
    });
  }

  private setFormValidator(): void {
    this.formValidator = new FormValidator( this.form, workoutErrorMessages );
  }

  private setCategorizedExercises(): void {
    this.categorizedExercises = this.form.get('categorizedExercises') as FormArray;
  }

  private fillFormIfDataExists(): void {
    const workout = this.workout;
    if (!workout) return;

    const fillFormHelper = this.fillFormService.getHelper( workout );

    this.workoutId = fillFormHelper.getWorkoutId();
    this.exercises = fillFormHelper.getExercises();
    fillFormHelper.setFormValues( this.form );
    fillFormHelper.setCategorizedExercises( this.categorizedExercises! )
  }

  //SELECTOR EMIT METHODS ---
  public onAddExerciseToForm( exercise: Exercise ): void {
    this.exercises.push( exercise );
    this.categorizedExercises!.push(
      this.fb.group({
        exerciseId: [exercise.id],
        sets: [0, [Validators.required, Validators.min(1)]],
        reps: [0, [Validators.required, Validators.min(1)]],
        rest: [0, [Validators.required, Validators.min(10)]],
      })
    );
  }

  public onDeleteExercise( index: number ): void {
    this.exercises.splice( index, 1 );
    this.categorizedExercises!.removeAt( index );
  }

  //FORM ACTIONS ---
  public onSubmit(): void {
    if (this.form.errors && this.form.errors['atLeastTwoExercises']) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: toastMessages.atLeast2Exercises,
      });
    }

    if ( !this.form.valid ) {
      this.form.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: toastMessages.invalidFields,
      });
      return;
    }

    //UPDATE
    if( this.form.get('id')?.value ) {
      this.workoutCrudActions!.update( this.form.value );
      return;
    }

    //SAVE
    this.workoutCrudActions!.save( this.form.value );
  }

  public onClose(): void {
    this.dialogHandler.closeDialog();
  }

}
