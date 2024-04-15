import { Component } from '@angular/core';

import { Workout } from '@dashboard/shared/interfaces/workout-interface';
import { FormHandler } from '@dashboard/helpers/exercise-form-handler.helper';
import { WorkoutFormComponent } from '../workout-form/workout-form.component';

import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'workout-open-form-btn',
  templateUrl: './workout-open-form-btn.component.html',
})
export class WorkoutOpenFormBtnComponent {

  private formHandler: FormHandler<Workout>;

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
  ) {
    this.formHandler = new FormHandler( dialogService, messageService, WorkoutFormComponent );
  }

  public onOpenForm(): void {
    this.formHandler.openForm({
      data: { model: undefined },
      header: 'Editar ejercicio',
      width: '50vw',
      height: '50vh',
      dismissableMask: true,
    });
  }

}
