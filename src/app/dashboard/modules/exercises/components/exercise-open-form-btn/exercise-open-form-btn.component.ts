import { Component } from '@angular/core';
import { FormHandler } from '@dashboard/helpers/exercise-form-handler.helper';
import { ExerciseFormConfig } from '../../helpers/exercise-form.config';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ExerciseFormComponent } from '../exercise-form/exercise-form.component';

@Component({
  selector: 'exercise-open-form-btn',
  templateUrl: './exercise-open-form-btn.component.html',
})
export class ExerciseOpenFormBtnComponent {

  private formHandler: FormHandler;
  private exerciseFormConfig?: ExerciseFormConfig;

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
  ) {
    this.formHandler = new FormHandler( dialogService, messageService, ExerciseFormComponent);
  }

  ngOnInit(): void {
    this.exerciseFormConfig = new ExerciseFormConfig();
  }

  public onOpenExerciseForm(): void {
    if (!this.exerciseFormConfig) return;
    this.formHandler.openForm( this.exerciseFormConfig.formConfig );
  }

}
