import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { Exercise } from '@dashboard/shared/models/exercise.interface';
import { Workout } from '@dashboard/shared/models/workout-interface';
import { WorkoutHttpService } from '@dashboard/shared/services/http-services/workout-http.service';

import { ExerciseStoreActionsService } from '@/dashboard/shared/services/store-services/exercise-store-actions.service';
import { WorkoutStoreActionsService } from '@/dashboard/shared/services/store-services/workout-store-actions.service';

import { FormActions } from '@dashboard/shared/helpers/form-actions.helper';
import { workoutToastMessages } from '@workouts/helpers/workout-toast-messages.helper';

@Component({
  selector: 'workout-card',
  templateUrl: './workout-card.component.html',
})
export class WorkoutCardComponent {

  @Input() workout!: Workout;
  public exercises?: Exercise[];

  private exercisesSubs$?: Subscription;
  private formActions: FormActions<Workout>;

  constructor(
    private exerciseStoreActions: ExerciseStoreActionsService,
    private workoutHttp: WorkoutHttpService,
    private workoutStoreActions: WorkoutStoreActionsService,
    private messageService: MessageService,
  ) {
    this.formActions = new FormActions(this.workoutHttp, this.workoutStoreActions, this.messageService, workoutToastMessages);
  }

  ngOnInit(): void {
    this.setExercises();
  }

  ngOnDestroy(): void {
    if( this.exercisesSubs$ ) this.exercisesSubs$?.unsubscribe();
  }

  private setExercises(): void {
    const exercisesIds: string[] = this.workout.categorizedExercises.map( catEx => catEx.exerciseId );
    this.exercises = this.exerciseStoreActions.getExercisesById( exercisesIds );
  }

  public onDeleteWorkout(): void {
    this.formActions.delete( this.workout );
  }

}
