import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExerciseFormComponent  } from '@exercises/components/exercise-form/exercise-form.component';
import { Exercise } from '@dashboard/shared/interfaces/exercise.interface';

import { MessageService, Message } from 'primeng/api';

//TODO: Abstrear más este helper para que sea más genérico y pueda ser reutilizado en otros componentes.
export class ExerciseFormHandler {

  ref?: DynamicDialogRef;

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
  ) {}

  public openForm(exercise?: Exercise) {
    this.ref = this.dialogService.open(ExerciseFormComponent, {
      data: { exercise },
      header: (exercise) ? 'Editar Ejercicio' : 'Crear Ejercicio',
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
