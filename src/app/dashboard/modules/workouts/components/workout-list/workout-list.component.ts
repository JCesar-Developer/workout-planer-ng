import { Component, OnDestroy } from '@angular/core';

import { Workout } from '@dashboard/shared/models/workout-interface';
import { Subscription } from 'rxjs';
import { WorkoutStoreActionsService } from '@/dashboard/shared/services/store-services/workout-store-actions.service';

@Component({
  selector: 'workout-list',
  templateUrl: './workout-list.component.html',
})
export class WorkoutListComponent implements OnDestroy {

  public workouts!: Workout[];
  public workoutsSubs$: Subscription;

  constructor(
    // private store: Store,
    private workoutStoreActions: WorkoutStoreActionsService,
  ) {
    this.workoutsSubs$ = this.workoutStoreActions.workouts$
      .subscribe( workouts => {
        this.workouts = workouts;
      });
  }

  ngOnDestroy(): void {
    if( this.workoutsSubs$ ) this.workoutsSubs$.unsubscribe();
  }

}
