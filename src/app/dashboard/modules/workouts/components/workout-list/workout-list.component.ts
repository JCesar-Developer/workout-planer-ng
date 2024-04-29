import { Component, OnDestroy } from '@angular/core';

import { Workout } from '@dashboard/shared/models/workout-interface';
import { Subscription } from 'rxjs';
import { WorkoutStoreService } from '@/dashboard/shared/services/store-services/workout-store.service';

@Component({
  selector: 'workout-list',
  templateUrl: './workout-list.component.html',
})
export class WorkoutListComponent implements OnDestroy {

  public workouts!: Workout[];
  public workoutsSubs$: Subscription;

  constructor(
    private workoutStoreActions: WorkoutStoreService,
  ) {
    this.workoutsSubs$ = this.workoutStoreActions.workouts$
      .subscribe( workouts => {
        this.workouts = workouts.slice().reverse();
      });
  }

  ngOnDestroy(): void {
    if( this.workoutsSubs$ ) this.workoutsSubs$.unsubscribe();
  }

}
