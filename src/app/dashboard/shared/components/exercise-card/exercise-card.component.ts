import { Component, Input, OnInit } from '@angular/core';

import { ExerciseFormComponent  } from '@exercises/components/exercise-form/exercise-form.component';
import { FormHandlerService } from '@shared/services/form-handler.service';
import { Exercise } from '@dashboard/shared/interfaces/exercise.interface';

import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ExerciseFormConfig } from '@dashboard/modules/exercises/helpers/exercise-form-config.helper';

@Component({
  selector: 'exercise-card',
  templateUrl: './exercise-card.component.html',
})
export class ExerciseCardComponent implements OnInit {

  @Input() public exercise!: Exercise;
  @Input() public editable?: boolean = false;
  // @Input() public showCategory: boolean = false;

  private formHandler: FormHandlerService;
  private exerciseFormConfig?: ExerciseFormConfig;

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
  ){
    this.formHandler = new FormHandlerService(dialogService, messageService, ExerciseFormComponent);
  }

  ngOnInit(): void {
    this.exerciseFormConfig = new ExerciseFormConfig(this.exercise);
  }

  public onOpenExerciseForm() {
    if (!this.exerciseFormConfig) return;
    this.formHandler.openForm( this.exerciseFormConfig.formConfig );
  }

}
