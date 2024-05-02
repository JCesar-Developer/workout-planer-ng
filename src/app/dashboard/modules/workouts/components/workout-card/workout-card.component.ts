import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import { Exercise } from '@dashboard/shared/models/exercise.interface';
import { Workout } from '@dashboard/shared/models/workout-interface';
import { ExerciseStoreActionsService } from '@/dashboard/shared/services/store-services/exercise-store-actions.service';

import { DialogSetup } from '@/dashboard/shared/services/dashboard-services/dialog-handler.service';
import { WorkoutDialogConfig } from '@workouts/helpers/workout-dialog-config.helper';
import { WorkoutCrudActionsService } from '../../services/workout-crud-actions.service';

@Component({
  selector: 'workout-card',
  templateUrl: './workout-card.component.html',
  providers: [ WorkoutCrudActionsService ],
})
export class WorkoutCardComponent implements OnInit {

  @Input() workout!: Workout;
  public exercises?: Exercise[];
  public exerciseSets?: number[];
  public exerciseReps?: number[];
  public dialogConfig!: DialogSetup<Workout>;

  constructor(
    private exerciseStoreActions: ExerciseStoreActionsService,
    private confirmationService: ConfirmationService,
    private workoutCrudActions: WorkoutCrudActionsService,
  ) {}

  ngOnInit(): void {
    this.setExercises();
    this.dialogConfig = new WorkoutDialogConfig(this.workout).config;
  }

  //TODO: Esto ocurre por como el backend devuelve los datos, deberia ser corregido en el backend
  private setExercises(): void {
    const exercisesIds: string[] = this.workout.categorizedExercises.map( catEx => catEx.exerciseId );
    this.exercises = this.exerciseStoreActions.getItemsById( exercisesIds );
    this.exerciseSets = this.workout.categorizedExercises.map( catEx => catEx.sets );
    this.exerciseReps = this.workout.categorizedExercises.map( catEx => catEx.reps );
  }

  onConfirmDelete(event: Event) {
    this.confirmationService.confirm({
        target: event.target!,
        message: 'Estas seguro de que quieres eliminar este entrenamiento?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => this.deleteWorkout(),
    });
  }

  private deleteWorkout(): void {
    this.workoutCrudActions.delete( this.workout );
  }

}
