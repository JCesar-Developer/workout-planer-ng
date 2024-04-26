import { WorkoutStoreActionsService } from '@/dashboard/shared/services/store-services/workout-store-actions.service';
import { Component } from '@angular/core';

@Component({
  selector: 'workouts-page',
  templateUrl: './workouts-page.component.html',
})
export class WorkoutsPageComponent {

  constructor(
    public workoutStoreActions: WorkoutStoreActionsService,
  ) {}

}
