import { Component, OnDestroy } from '@angular/core';

import { WorkoutStoreService } from '@/dashboard/shared/services/store-services/workout-store.service';
import { Workout } from '@dashboard/shared/models/workout-interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'workout-list',
  templateUrl: './workout-list.component.html',
})
export class WorkoutListComponent implements OnDestroy {

  public workouts!: Workout[];
  public workoutsSubs$: Subscription;

  constructor(
    // private store: Store,
    private workoutStore: WorkoutStoreService,
  ) {
    this.workoutsSubs$ = this.workoutStore.workouts$
      .subscribe( workouts => {
        this.workouts = workouts;
      });
  }

  ngOnDestroy(): void {
    if( this.workoutsSubs$ ) this.workoutsSubs$.unsubscribe();
  }

}
