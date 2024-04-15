import { Component, OnInit } from '@angular/core';

import { FormHandler } from '@dashboard/helpers/exercise-form-handler.helper';
import { WorkoutFormComponent } from '../workout-form/workout-form.component';

import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { WorkoutFormConfig } from '../../helpers/workout-form.config';

@Component({
  selector: 'workout-open-form-btn',
  templateUrl: './workout-open-form-btn.component.html',
})
export class WorkoutOpenFormBtnComponent implements OnInit {

  private formHandler: FormHandler;
  private workoutFormConfig?: WorkoutFormConfig;

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
  ) {
    this.formHandler = new FormHandler( dialogService, messageService, WorkoutFormComponent );
  }

  ngOnInit(): void {
    this.workoutFormConfig = new WorkoutFormConfig();
  }

  public onOpenForm(): void {
    if( !this.workoutFormConfig ) return;
    this.formHandler.openForm( this.workoutFormConfig.formConfig );
  }

}
