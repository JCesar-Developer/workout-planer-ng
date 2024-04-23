import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Exercise } from '@dashboard/shared/models/exercise.interface';

import { CustomValidatorsService } from '@shared/services/custom-validators.service';
import { InputErrorMessageService } from '@shared/services/input-error-message.service';
import { MessageService } from 'primeng/api';
import { WorkoutFormActions } from '../../helpers/workout-form-actions.helper';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { WorkoutHttpService } from '@dashboard/shared/services/http-services/workout-http.service';
import { CategorizedExercise, Workout } from '@dashboard/shared/models/workout-interface';
import { ExerciseStoreActionsService } from '@/dashboard/shared/services/store-services/exercise-store-actions.service';
import { WorkoutStoreActionsService } from '@/dashboard/shared/services/store-services/workout-store-actions.service';

@Component({
  selector: 'workout-form',
  templateUrl: './workout-form.component.html',
})
export class WorkoutFormComponent implements OnInit {

  public form!: FormGroup;
  public formActions?: WorkoutFormActions;

  public workoutId?: string;

  public exercises: Exercise[] = [];
  public categorizedExercises?: FormArray;

  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    private customValidator: CustomValidatorsService,
    private inputErrorMessages: InputErrorMessageService,
    private messageService: MessageService,
    private workoutHttp: WorkoutHttpService,
    private workoutStoreActions: WorkoutStoreActionsService,
    private exerciseStoreActions: ExerciseStoreActionsService,
  ) {}

  //LIFECYCLE HOOKS ---
  ngOnInit(): void {
    this.setForm();
    this.isolateCategorizedExercises();
    this.fillformIfDataExists();
    this.createFormActions();
  }

  //GETTERS & SETTERS ---
  private setForm(): void {
    this.form = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.min(8), this.customValidator.noWhitespace]],
      duration: [0, [Validators.required, Validators.min(20)]],
      categorizedExercises: this.fb.array([]),
    }, {
      validators: [ this.customValidator.atLeastTwoExercises() ]
    });
  }

  private isolateCategorizedExercises(): void {
    this.categorizedExercises = this.form.get('categorizedExercises') as FormArray;
  }

  //FILL FORM IF DATA EXISTS ---
  private fillformIfDataExists(): void {
    const workout = this.getWorkoutFromConfig();
    if (!workout) return;

    this.setWorkoutId(workout.id);
    this.setExercises(workout.categorizedExercises);
    this.setFormValues(workout);
    this.setCategorizedExercises(workout.categorizedExercises);
  }

  private getWorkoutFromConfig(): Workout | null {
    const { data } = this.config;
    return data && data.model ? data.model : null;
  }

  private setWorkoutId(id: string): void {
    this.workoutId = id;
  }

  private setExercises(categorizedExercises: CategorizedExercise[]): void {
    const exercisesIds: string[] = categorizedExercises.map(catEx => catEx.exerciseId);
    this.exercises = this.exerciseStoreActions.getExercisesById(exercisesIds);
  }

  private setFormValues(workout: Workout): void {
    this.form.patchValue({
      id: workout.id,
      name: workout.name,
      duration: workout.duration,
    });
  }

  private setCategorizedExercises(categorizedExercises: CategorizedExercise[]): void {
    categorizedExercises.forEach(catEx => {
      const { exerciseId, sets, reps, rest } = catEx;
      this.categorizedExercises!.push(
        this.fb.group({
          exerciseId: [exerciseId],
          sets: [sets],
          reps: [reps],
          rest: [rest]
        })
      );
    });
  }

  //FORM METHODS ---
  private createFormActions(): void {
    this.formActions = new WorkoutFormActions( this.workoutHttp, this.workoutStoreActions, this.messageService, this.ref );
  }

  //FORM ARRAY METHODS ---
  public onAddExerciseToForm( exercise: Exercise ): void {
    this.exercises.push( exercise );
    this.categorizedExercises!.push(
      this.fb.group({
        exerciseId: [exercise.id],
        sets: [0],
        reps: [0],
        rest: [0]
      })
    );
  }

  public onDeleteExercise( index: number ): void {
    this.exercises.splice( index, 1 );
    this.categorizedExercises!.removeAt( index );
  }

  //VALIDATIONS ---
  //TODO: Faltan los mensajes personalizados
  public isInvalidField(field: string): boolean | null {
    return this.inputErrorMessages.isInvalidField(this.form, field);
  }

  // CRUD ---
  public onSubmit(): void {
    if (this.form.errors && this.form.errors['atLeastTwoExercises']) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Una rutina debe tener al menos 2 ejercicios'
      });
    }

    if ( !this.form.valid ) {
      this.form.markAllAsTouched();
      return;
    }

    //UPDATE
    if( this.form.get('id')?.value ) {
      this.formActions!.update( this.form.value );
      return;
    }

    //SAVE
    this.formActions!.save( this.form.value );
  }

}
