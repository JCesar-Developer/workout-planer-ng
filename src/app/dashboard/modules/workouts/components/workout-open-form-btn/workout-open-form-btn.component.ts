import { Component, OnInit } from '@angular/core';

import { DialogService } from 'primeng/dynamicdialog';
import { DialogHandlerConfig } from '@/dashboard/shared/helpers/dialog-handler.helper';
import { WorkoutFormComponent } from '../workout-form/workout-form.component';
import { workoutDialogConfig } from '@workouts/helpers/workout-dialog-config.helper';
import { Workout } from '@dashboard/shared/models/workout-interface';

@Component({
  selector: 'workout-open-form-btn',
  templateUrl: './workout-open-form-btn.component.html',
})
export class WorkoutOpenFormBtnComponent implements OnInit {

  public dialogConfig!: DialogHandlerConfig<Workout>;

  constructor( private dialogService: DialogService ) {}

  ngOnInit(): void {
    this.dialogConfig = {
      dialogService: this.dialogService,
      component: WorkoutFormComponent,
      customDialogConfig: workoutDialogConfig,
      modelName: 'Rutina',
    }
  }

}
