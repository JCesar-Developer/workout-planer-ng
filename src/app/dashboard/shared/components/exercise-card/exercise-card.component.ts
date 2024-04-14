import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ExerciseFormComponent  } from '@exercises/components/exercise-form/exercise-form.component';
import { FormHandler } from '@dashboard/helpers/exercise-form-handler.helper';
import { Exercise } from '@dashboard/shared/interfaces/exercise.interface';

import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'exercise-card',
  templateUrl: './exercise-card.component.html',
})
export class ExerciseCardComponent {

  @Input() public exercise!: Exercise;
  @Input() public showCategory: boolean = false;

  private formHandler: FormHandler<Exercise>;

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
  ){
    this.formHandler = new FormHandler(dialogService, messageService, ExerciseFormComponent);
  }

  public onOpenExerciseForm() {
    this.formHandler.openForm( this.exercise, 'Editar Ejercicio' );
  }

}
