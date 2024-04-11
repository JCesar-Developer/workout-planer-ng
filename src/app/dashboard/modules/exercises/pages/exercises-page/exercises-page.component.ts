import { Component } from '@angular/core';
import { type Exercise } from '@dashboard/shared/interfaces/exercise.interface';
import { ExerciseFormHandler } from '@exercises/helpers/exercise-form-handler.helper';

import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-exercises-page',
  templateUrl: './exercises-page.component.html',
  providers: [MessageService]
})
export class ExercisesPageComponent {

  private formHandler: ExerciseFormHandler;
  public title: string = 'Lista de ejercicios';

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
  ){
    this.formHandler = new ExerciseFormHandler(dialogService, messageService);
  }

  public onOpenExerciseForm(exercise?: Exercise) {
    this.formHandler.openForm(exercise);
  }

}
