import { Component, OnInit } from '@angular/core';

import type { Workout } from '@/dashboard/shared/models/workout-interface';
import { DialogSetup } from '@/dashboard/shared/services/dashboard-services/dialog-handler.service';
import { WorkoutStoreActionsService } from '@/dashboard/shared/services/store-services/workout-store-actions.service';
import { WorkoutDialogConfig } from '@workouts/helpers/workout-dialog-config.helper';

@Component({
  selector: 'workout-page-header',
  templateUrl: './workout-page-header.component.html'
})
export class WorkoutPageHeaderComponent implements OnInit {

  public dialogConfig!: DialogSetup<Workout>;

  constructor(
    private workoutStoreActions: WorkoutStoreActionsService,
  ) {}

  ngOnInit(): void {
    this.dialogConfig = new WorkoutDialogConfig().config;
  }

  public get storeActions() {
    return {
      getItemsByName: this.workoutStoreActions.getItemsByName,
      setItemsToRender: this.workoutStoreActions.setItemsToRender,
      setItemsToRenderAllItems: this.workoutStoreActions.setItemsToRenderAllItems,
    };
  }

}
