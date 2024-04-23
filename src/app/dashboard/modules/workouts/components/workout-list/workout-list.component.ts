import { Component, OnDestroy } from '@angular/core';

import { Workout } from '@dashboard/shared/models/workout-interface';
import { WorkoutStoreService } from '@dashboard/shared/services/store-services/workout-store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'workout-list',
  templateUrl: './workout-list.component.html',
})
export class WorkoutListComponent implements OnDestroy {

  public workouts!: Workout[];
  public workoutsSubs$: Subscription;

  constructor(
    private workoutStoreService: WorkoutStoreService,
  ) {
    this.workoutsSubs$ = this.workoutStoreService.getCurrentWorkouts$()
      .subscribe( workouts => {
        this.workouts = workouts;
      });
  }

  ngOnDestroy(): void {
    if( this.workoutsSubs$ ) this.workoutsSubs$.unsubscribe();
  }

}
