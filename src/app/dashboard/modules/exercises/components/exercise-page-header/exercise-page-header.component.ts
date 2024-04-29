import { Component, OnInit } from '@angular/core';

import { Exercise } from '@/dashboard/shared/models/exercise.interface';
import { DialogConfig } from '@/dashboard/shared/helpers/dialog-handler.helper';
import { ExerciseStoreActionsService } from '@/dashboard/shared/services/store-services/exercise-store-actions.service';

import { DialogService } from 'primeng/dynamicdialog';
import { ExerciseDialogConfig } from '@exercises/helpers/exercise-dialog-config.helper'

@Component({
  selector: 'exercise-page-header',
  templateUrl: './exercise-page-header.component.html',
})
export class ExercisePageHeaderComponent implements OnInit {

  public dialogConfig!: DialogConfig<Exercise>;

  constructor(
    public exerciseStoreActions: ExerciseStoreActionsService,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.dialogConfig = new ExerciseDialogConfig(this.dialogService).config;
  }

}
