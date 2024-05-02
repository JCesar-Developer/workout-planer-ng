import { Component, OnDestroy } from '@angular/core';

import { Workout } from '@dashboard/shared/models/workout-interface';
import { Subscription } from 'rxjs';
import { WorkoutStoreActionsService } from '@/dashboard/shared/services/store-services/workout-store-actions.service';

@Component({
  selector: 'workout-page-list',
  templateUrl: './workout-page-list.component.html',
})
export class WorkoutListComponent implements OnDestroy {

  public workouts!: Workout[];
  public workouts$: Subscription;

  constructor(
    private workoutStoreActions: WorkoutStoreActionsService,
  ) {
    this.workouts$ = this.workoutStoreActions.items$
      .subscribe( workouts => {
        this.workouts = workouts.slice().reverse();
      });
  }

  ngOnDestroy(): void {
    if( this.workouts$ ) this.workouts$.unsubscribe();
  }

}
