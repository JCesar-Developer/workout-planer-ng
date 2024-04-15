import { Component } from '@angular/core';

import { FormHandlerService } from '@shared/services/form-handler.service';
import { ExerciseFormComponent } from '../exercise-form/exercise-form.component';
import { ExerciseFormConfig } from '../../helpers/exercise-form-config.helper';

import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'exercise-open-form-btn',
  templateUrl: './exercise-open-form-btn.component.html',
})
export class ExerciseOpenFormBtnComponent {

  private formHandler: FormHandlerService;
  private exerciseFormConfig?: ExerciseFormConfig;

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
  ) {
    this.formHandler = new FormHandlerService( dialogService, messageService, ExerciseFormComponent);
  }

  ngOnInit(): void {
    this.exerciseFormConfig = new ExerciseFormConfig();
  }

  public onOpenExerciseForm(): void {
    if (!this.exerciseFormConfig) return;
    this.formHandler.openForm( this.exerciseFormConfig.formConfig );
  }

}
