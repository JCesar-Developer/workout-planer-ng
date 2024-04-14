import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Exercise } from '@dashboard/shared/interfaces/exercise.interface';
import { ExerciseFormComponent } from '../exercise-form/exercise-form.component';
import { FormHandler } from '../../../../helpers/exercise-form-handler.helper';

import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'exercise-page-header',
  templateUrl: './exercise-page-header.component.html',
})
export class ExercisePageHeaderComponent {

  private formHandler: FormHandler<Exercise>;

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
  ) {
    this.formHandler = new FormHandler( dialogService, messageService, ExerciseFormComponent);
  }

  public onOpenExerciseForm(): void {
    this.formHandler.openForm( undefined, 'Crear Ejercicio' );
  }
}
