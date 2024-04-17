import { Component, Input } from '@angular/core';
import { Exercise } from '@dashboard/shared/interfaces/exercise.interface';
import { Workout } from '@dashboard/shared/interfaces/workout-interface';
import { ExerciseStoreService } from '@dashboard/shared/services/store-services/exercise-store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'workout-card',
  templateUrl: './workout-card.component.html',
})
export class WorkoutCardComponent {

  @Input() workout!: Workout;
  public exercises?: Exercise[];

  private exercisesSubs$?: Subscription;

  constructor(
    public exerciseStoreService: ExerciseStoreService,
  ) { }

  ngOnInit(): void {
    this.setExercises();
  }

  ngOnDestroy(): void {
    if( this.exercisesSubs$ ) this.exercisesSubs$?.unsubscribe();
  }

  private setExercises(): void {
    // this.exercisesSubs$ = this.exerciseStoreService.getExercisesById(this.workout.exercises)
    //   .subscribe( exercises => this.exercises = exercises );
    this.exercises = this.exerciseStoreService.getExercisesById(this.workout.exercises);
  }

}
