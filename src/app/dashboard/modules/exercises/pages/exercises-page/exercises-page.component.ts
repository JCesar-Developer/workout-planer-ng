import { Component, OnInit } from '@angular/core';
import { type Exercise } from '@dashboard/shared/interfaces/exercise.interface';
import { ExerciseStoreService } from '@dashboard/shared/services/exercise-store.service';
import { ExerciseFormComponent  } from '@exercises/components/exercise-form/exercise-form.component';

import { MessageService, Message } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-exercises-page',
  templateUrl: './exercises-page.component.html',
  providers: [MessageService]
})
export class ExercisesPageComponent {

  ref?: DynamicDialogRef;

  public title: string = 'Lista de ejercicios';
  public exercises: Exercise[] = [];

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
  ){}

  public openExerciseForm( exercise?: Exercise ) {
    this.ref = this.dialogService.open(ExerciseFormComponent, {
      data: { exercise },
      header: ( exercise ) ? 'Editar Ejercicio' : 'Crear Ejercicio',
      width: '50vw',
      height: '50vh',
      dismissableMask: true,
    });

    this.ref.onClose.pipe(
      tap( resp => {
        if ( !resp ) return;
        else if (resp.status === 'success') this.showAlert( resp.message );
        else if (resp.status === 'error') this.showAlert( resp.message );
      }),
    ).subscribe();
  }

  private showAlert( message: Message ) {
    this.messageService.add( message );
  }

  ngOnDestroy() {
    if (this.ref) this.ref.close();
  }
}
