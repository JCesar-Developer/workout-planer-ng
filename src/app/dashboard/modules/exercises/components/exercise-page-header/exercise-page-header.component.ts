import { Component, OnInit } from '@angular/core';

import { Exercise } from '@/dashboard/shared/models/exercise.interface';
import { ExerciseStoreActionsService } from '@/dashboard/shared/services/store-services/exercise-store-actions.service';

import { ExerciseDialogConfig } from '@exercises/helpers/exercise-dialog-config.helper'
import { DialogSetup } from '@/dashboard/shared/services/dashboard-services/dialog-handler.service';

@Component({
  selector: 'exercise-page-header',
  templateUrl: './exercise-page-header.component.html',
})
export class ExercisePageHeaderComponent implements OnInit {

  public dialogConfig!: DialogSetup<Exercise>;

  constructor(
    public exerciseStoreActions: ExerciseStoreActionsService,
  ) {}

  ngOnInit(): void {
    this.dialogConfig = new ExerciseDialogConfig().config;
  }

}
