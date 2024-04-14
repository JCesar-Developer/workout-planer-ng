import { Type } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService, Message } from 'primeng/api';

// import { Exercise as T } from '@dashboard/shared/interfaces/exercise.interface';


//TODO: Abstrear más este helper para que sea más genérico y pueda ser reutilizado en otros componentes.
export class ExerciseFormHandler<T = any> {

  ref?: DynamicDialogRef;

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private formComponent: Type<any>,
  ) {}

  public openForm( model?: T ) {
    this.ref = this.dialogService.open( this.formComponent, {
      data: { model },
      header: ( model ) ? 'Editar Ejercicio' : 'Crear Ejercicio',
      width: '50vw',
      height: '50vh',
      dismissableMask: true,
    });

    this.ref.onClose
    .subscribe({
      next: (resp) => {
        if (!resp) return;
        else if (resp.status === 'success') this.showAlert(resp.message);
        else if (resp.status === 'error') this.showAlert(resp.message);
      },
    });
  }

  private showAlert( message: Message ) {
    this.messageService.add( message );
  }

}
