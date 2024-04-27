import { Component, Input, OnInit } from '@angular/core';

import { exerciseDialogConfig } from '@exercises/helpers/exercise-dialog-config.helper'
import { ExerciseFormComponent } from "@exercises/components/exercise-form/exercise-form.component";

import { DialogService } from 'primeng/dynamicdialog';
import { DialogHandlerConfig } from '@dashboard/shared/helpers/dialog-handler.helper';
import { Exercise } from '@/dashboard/shared/models/exercise.interface';



@Component({
  selector: 'exercise-open-form-btn',
  templateUrl: './exercise-open-form-btn.component.html',
})
export class ExerciseOpenFormBtnComponent implements OnInit {

  @Input() exercise?: Exercise;
  @Input() slotForm: boolean = false;
  @Input() editable: boolean = false;

  public dialogConfig!: DialogHandlerConfig<Exercise>;

  constructor( private dialogService: DialogService ) {}

  private customDialogConfig = {
    dialogService: this.dialogService,
    component: ExerciseFormComponent,
    customDialogConfig: exerciseDialogConfig,
    modelName: 'Ejercicio',
  }

  ngOnInit(): void {
    if( !this.exercise ) this.dialogConfig = this.customDialogConfig;
    else this.dialogConfig = { ...this.customDialogConfig, model: this.exercise }
  }

}
