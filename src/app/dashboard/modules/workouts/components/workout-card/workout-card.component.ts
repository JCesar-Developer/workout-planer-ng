import { Component, Input } from '@angular/core';
import { Exercise } from '@dashboard/shared/interfaces/exercise.interface';
import { Workout } from '@dashboard/shared/interfaces/workout-interface';
import { ExerciseStoreService } from '@dashboard/shared/services/store-services/exercise-store.service';
import { Subscription } from 'rxjs';
import { WorkoutFormActions } from '../../helpers/workout-form-actions.helper';
import { WorkoutHttpService } from '@dashboard/shared/services/http-services/workout-http.service';
import { WorkoutStoreService } from '@dashboard/shared/services/store-services/workout-store.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'workout-card',
  templateUrl: './workout-card.component.html',
})
export class WorkoutCardComponent {

  @Input() workout!: Workout;
  public exercises?: Exercise[];

  private exercisesSubs$?: Subscription;
  private workoutActions: WorkoutFormActions;

  constructor(
    private exerciseStoreService: ExerciseStoreService,
    private workoutHttp: WorkoutHttpService,
    private workoutStore: WorkoutStoreService,
    private messageService: MessageService,
  ) {
    this.workoutActions = new WorkoutFormActions(this.workoutHttp, this.workoutStore, this.messageService);
  }

  ngOnInit(): void {
    this.setExercises();
  }

  ngOnDestroy(): void {
    if( this.exercisesSubs$ ) this.exercisesSubs$?.unsubscribe();
  }

  private setExercises(): void {
    const exercisesIds: string[] = this.workout.categorizedExercises.map( catEx => catEx.exerciseId );
    this.exercises = this.exerciseStoreService.getExercisesById( exercisesIds );
  }

  public onDeleteWorkout(): void {
    //TODO: Esto debería devolver un observable y emitir un mensaje de éxito o error. EL try catch implementado es falso.
    try {
      this.workoutActions.delete( this.workout.id, this.workout.name );
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `Rutina "${ this.workout.name }" eliminada con éxito` });
    } catch {
      console.error('Error al eliminar la rutina');
    }
  }

}
