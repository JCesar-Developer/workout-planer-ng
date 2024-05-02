import { Component, OnInit } from '@angular/core';

import { Exercise } from '@/dashboard/shared/models/exercise.interface';
import { ExerciseStoreActionsService } from '@/dashboard/shared/services/store-services/exercise-store-actions.service';

import { ExerciseDialogConfig } from '@exercises/helpers/exercise-dialog-config.helper'
import { DialogSetup } from '@/dashboard/shared/services/dashboard-services/dialog-handler.service';
import type { StoreActions } from '@/dashboard/shared/components/dashboard-searchbar/dashboard-searchbar.component';

@Component({
  selector: 'exercise-page-header',
  templateUrl: './exercise-page-header.component.html',
})
export class ExercisePageHeaderComponent implements OnInit {

  public dialogConfig!: DialogSetup<Exercise>;

  constructor(
    private exerciseStoreActions: ExerciseStoreActionsService,
  ) {}

  ngOnInit(): void {
    this.dialogConfig = new ExerciseDialogConfig().config;
  }

  public get storeActions(): StoreActions<Exercise> {
    return {
      getItemsByName: this.exerciseStoreActions.getItemsByName,
      setItemsToRender: this.exerciseStoreActions.setItemsToRender,
      setItemsToRenderAllItems: this.exerciseStoreActions.setItemsToRenderAllItems,
    };
  }

}
