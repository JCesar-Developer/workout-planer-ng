import { Component, Input } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { Exercise } from '@dashboard/shared/models/exercise.interface';
import { Workout } from '@dashboard/shared/models/workout-interface';
import { WorkoutHttpService } from '@dashboard/shared/services/http-services/workout-http.service';

import { ExerciseStoreService } from '@/dashboard/shared/services/store-services/exercise-store.service';
import { WorkoutStoreService } from '@/dashboard/shared/services/store-services/workout-store.service';

import { CrudActionsHelper } from '@dashboard/shared/helpers/crud-actions.helper';
import { workoutToastMessages } from '@workouts/helpers/workout-toast-messages.helper';

import { DialogSetup, DialogHandlerService } from '@/dashboard/shared/services/dashboard-services/dialog-handler.service';
import { WorkoutDialogConfig } from '@workouts/helpers/workout-dialog-config.helper';

@Component({
  selector: 'workout-card',
  templateUrl: './workout-card.component.html',
})
export class WorkoutCardComponent {

  @Input() workout!: Workout;
  public exercises?: Exercise[];
  public exerciseSets?: number[];
  public exerciseReps?: number[];

  private exercisesSubs$?: Subscription;
  private formActions: CrudActionsHelper<Workout>;

  private dialogConfig!: DialogSetup<Workout>;

  constructor(
    private dialogHandler: DialogHandlerService<Workout>,
    private exerciseStoreActions: ExerciseStoreService,
    private workoutHttp: WorkoutHttpService,
    private workoutStoreActions: WorkoutStoreService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    this.formActions = new CrudActionsHelper({
      httpService: this.workoutHttp,
      storeActions: this.workoutStoreActions,
      messageService: this.messageService,
      messages: workoutToastMessages,
    });
  }

  ngOnInit(): void {
    this.setExercises();
    this.dialogConfig = new WorkoutDialogConfig(this.workout).config;
  }

  ngOnDestroy(): void {
    if( this.exercisesSubs$ ) this.exercisesSubs$?.unsubscribe();
  }

  private setExercises(): void {
    const exercisesIds: string[] = this.workout.categorizedExercises.map( catEx => catEx.exerciseId );
    this.exercises = this.exerciseStoreActions.getExercisesById( exercisesIds );
    this.exerciseSets = this.workout.categorizedExercises.map( catEx => catEx.sets );
    this.exerciseReps = this.workout.categorizedExercises.map( catEx => catEx.reps );
  }

  public onOpenForm() {
    this.dialogHandler.openForm( this.dialogConfig );
  }

  onConfirmDelete(event: Event) {
    this.confirmationService.confirm({
        target: event.target!,
        message: 'Estas seguro de que quieres eliminar este entrenamiento?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => this.onDeleteWorkout(),
    });
  }

  private onDeleteWorkout(): void {
    this.formActions.delete( this.workout );
  }

}
