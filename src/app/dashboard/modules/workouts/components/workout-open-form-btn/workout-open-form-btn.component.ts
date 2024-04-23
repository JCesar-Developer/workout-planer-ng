import { Component, Input, OnInit } from '@angular/core';

import { FormCreator } from '@shared/helpers/form-creator.helper';
import { WorkoutFormComponent } from '../workout-form/workout-form.component';

import { DialogService } from 'primeng/dynamicdialog';
import { WorkoutFormConfigurator } from '../../helpers/workout-form-config.helper';
import { Workout } from '@dashboard/shared/models/workout-interface';

@Component({
  selector: 'workout-open-form-btn',
  templateUrl: './workout-open-form-btn.component.html',
})
export class WorkoutOpenFormBtnComponent implements OnInit {

  @Input() public workout?: Workout;
  private formCreator?: FormCreator;
  private formConfigurator?: WorkoutFormConfigurator;

  constructor( private dialogService: DialogService ) {}

  ngOnInit(): void {
    this.formCreator = new FormCreator( this.dialogService, WorkoutFormComponent );
  }

  public onOpenForm(): void {
    if( !this.formCreator ) return;

    switch (this.workout) {
      case undefined:
        this.formConfigurator = new WorkoutFormConfigurator();
        this.formCreator.openForm(this.formConfigurator.config);
        break;
      default:
        this.formConfigurator = new WorkoutFormConfigurator(this.workout);
        this.formCreator.openForm(this.formConfigurator.config);
        break;
    }
  }

}
