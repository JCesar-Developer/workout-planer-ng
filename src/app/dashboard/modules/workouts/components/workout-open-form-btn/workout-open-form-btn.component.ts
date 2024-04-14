import { Component } from '@angular/core';

import { ExerciseFormComponent } from '@dashboard/modules/exercises/components/exercise-form/exercise-form.component';
import { ExerciseFormHandler } from '@dashboard/helpers/exercise-form-handler.helper';
import { Exercise } from '@dashboard/shared/interfaces/exercise.interface';

import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'workout-open-form-btn',
  templateUrl: './workout-open-form-btn.component.html',
})
export class WorkoutOpenFormBtnComponent {

  private formHandler: ExerciseFormHandler<Exercise>;

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
  ) {
    this.formHandler = new ExerciseFormHandler( dialogService, messageService, ExerciseFormComponent );
  }

  public onOpenForm(): void {
    this.formHandler.openForm();
  }

}
