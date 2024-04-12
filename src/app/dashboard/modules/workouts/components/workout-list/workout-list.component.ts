import { Component } from '@angular/core';

import { Workout } from '@dashboard/shared/interfaces/workout-interface';
import { workoutStoreService } from '@dashboard/shared/services/store-services/workout-store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'workout-list',
  templateUrl: './workout-list.component.html',
})
export class WorkoutListComponent {

  public workouts: Workout[] = [];
  public $workouts: Subscription;

  constructor(
    private workoutStoreService: workoutStoreService,
  ) {
    this.$workouts = this.workoutStoreService.getAll()
      .subscribe( workouts => {
        this.workouts = workouts;
      } );
  }


}
