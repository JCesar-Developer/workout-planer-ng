import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Exercise } from '@dashboard/shared/models/exercise.interface';

import { CustomValidatorsService } from '@shared/services/custom-validators.service';
import { FormValidator } from '@shared/helpers/form-validator.helper';
import { MessageService } from 'primeng/api';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategorizedExercise, Workout } from '@dashboard/shared/models/workout-interface';
import { ExerciseStoreService } from '@/dashboard/shared/services/store-services/exercise-store.service';

import { workoutErrorMessages } from '../../helpers/workout-form-error-messages.helper';
import { WorkoutCrudActionsService } from '../../services/workout-crud-actions.service';

const toastMessages = {
  atLeast2Exercises: 'Una rutina debe tener al menos 2 ejercicios',
  invalidFields: 'Uno o más campos son inválidos, por favor vuelva a revisar el formulario',
}

@Component({
  selector: 'workout-form',
  templateUrl: './workout-form.component.html',
  providers: [ WorkoutCrudActionsService ],
})
export class WorkoutFormComponent implements OnInit {

  public form!: FormGroup;
  public formValidator?: FormValidator;

  public workoutId?: string;

  public exercises: Exercise[] = [];
  public categorizedExercises?: FormArray;

  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    private customValidator: CustomValidatorsService,
    private messageService: MessageService,
    private exerciseStoreActions: ExerciseStoreService,
    private workoutCrudActions: WorkoutCrudActionsService,
  ) {}

  //LIFECYCLE HOOKS ---
  ngOnInit(): void {
    this.setForm();
    this.setFormValidator();
    // this.setFormActions();

    this.setCategorizedExercises();
    this.fillFormIfDataExists();
  }

  //GETTERS & SETTERS ---
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

  //FILL FORM IF DATA EXISTS ---
  private fillFormIfDataExists(): void {
    const workout = this.getWorkoutFromConfig();
    if (!workout) return;

    this.getWorkoutId(workout.id);
    this.getExercises(workout.categorizedExercises);
    this.getFormValues(workout);
    this.getCategorizedExercises(workout.categorizedExercises);
  }

  private getWorkoutFromConfig(): Workout | null {
    const { data } = this.config;
    return data && data.model ? data.model : null;
  }

  private getWorkoutId(id: string): void {
    this.workoutId = id;
  }

  private getExercises(categorizedExercises: CategorizedExercise[]): void {
    const exercisesIds: string[] = categorizedExercises.map(catEx => catEx.exerciseId);
    this.exercises = this.exerciseStoreActions.getExercisesById(exercisesIds);
  }

  private getFormValues(workout: Workout): void {
    this.form.patchValue({
      id: workout.id,
      name: workout.name,
      duration: workout.duration,
    });
  }

  private getCategorizedExercises(categorizedExercises: CategorizedExercise[]): void {
    categorizedExercises.forEach(catEx => {
      const { exerciseId, sets, reps, rest } = catEx;
      this.categorizedExercises!.push(
        this.fb.group({
          exerciseId: [exerciseId],
          sets: [sets, [Validators.required, Validators.min(1)]],
          reps: [reps, [Validators.required, Validators.min(1)]],
          rest: [rest, [Validators.required, Validators.min(10)]],
        })
      );
    });
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
    this.ref.close();
  }

}
