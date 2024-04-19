import { Component, OnInit } from '@angular/core';

import { FormCreator } from '@shared/helpers/form-creator.helper';
import { WorkoutFormComponent } from '../workout-form/workout-form.component';

import { DialogService } from 'primeng/dynamicdialog';
import { WorkoutFormConfigurator } from '../../helpers/workout-form-config.helper';

@Component({
  selector: 'workout-open-form-btn',
  templateUrl: './workout-open-form-btn.component.html',
})
export class WorkoutOpenFormBtnComponent implements OnInit {

  private formCreator?: FormCreator;
  private formConfigurator?: WorkoutFormConfigurator;

  constructor( private dialogService: DialogService ) {}

  ngOnInit(): void {
    this.formCreator = new FormCreator( this.dialogService, WorkoutFormComponent );
    this.formConfigurator = new WorkoutFormConfigurator();
  }

  public onOpenForm(): void {
    if (this.formCreator && this.formConfigurator) {
      this.formCreator.openForm(this.formConfigurator.config);
    }
  }

}
