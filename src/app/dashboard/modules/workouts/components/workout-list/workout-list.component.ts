import { Component, OnDestroy } from '@angular/core';

import { Workout } from '@dashboard/shared/interfaces/workout-interface';
import { workoutStoreService } from '@dashboard/shared/services/store-services/workout-store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'workout-list',
  templateUrl: './workout-list.component.html',
})
export class WorkoutListComponent implements OnDestroy {

  public workouts!: Workout[];
  public workoutsSubs$: Subscription;

  constructor(
    private workoutStoreService: workoutStoreService,
  ) {
    this.workoutsSubs$ = this.workoutStoreService.getAll()
      .subscribe( workouts => {
        this.workouts = workouts;
      });
  }

  ngOnDestroy(): void {
    if( this.workoutsSubs$ ) this.workoutsSubs$.unsubscribe();
  }

}
