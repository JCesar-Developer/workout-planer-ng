import { Component, OnInit } from '@angular/core';

import { FormHandlerService } from '@shared/services/form-handler.service';
import { WorkoutFormComponent } from '../workout-form/workout-form.component';

import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { WorkoutFormConfig } from '../../helpers/workout-form.config';

@Component({
  selector: 'workout-open-form-btn',
  templateUrl: './workout-open-form-btn.component.html',
})
export class WorkoutOpenFormBtnComponent implements OnInit {

  private formHandler: FormHandlerService;
  private workoutFormConfig?: WorkoutFormConfig;

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
  ) {
    this.formHandler = new FormHandlerService( dialogService, messageService, WorkoutFormComponent );
  }

  ngOnInit(): void {
    this.workoutFormConfig = new WorkoutFormConfig();
  }

  public onOpenForm(): void {
    if( !this.workoutFormConfig ) return;
    this.formHandler.openForm( this.workoutFormConfig.formConfig );
  }

}
