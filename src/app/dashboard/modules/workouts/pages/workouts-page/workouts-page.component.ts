import { Component } from '@angular/core';

import { WorkoutStoreService } from '@/dashboard/shared/services/store-services/workout-store.service';
import { DialogSetup } from '@/dashboard/shared/services/dashboard-services/dialog-handler.service';
import { Workout } from '@/dashboard/shared/models/workout-interface';
import { WorkoutDialogConfig } from '@workouts/helpers/workout-dialog-config.helper';

@Component({
  selector: 'workouts-page',
  templateUrl: './workouts-page.component.html',
})
export class WorkoutsPageComponent {

  public dialogConfig!: DialogSetup<Workout>;

  constructor(
    public workoutStoreActions: WorkoutStoreService,
  ) {}

  ngOnInit(): void {
    this.dialogConfig = new WorkoutDialogConfig().config;
  }

}
