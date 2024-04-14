import { Type } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService, Message } from 'primeng/api';

export class FormHandler<T = any> {

  ref?: DynamicDialogRef;

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private formComponent: Type<any>,
  ) {}

  public openForm( model?: T, title?: string ) {
    this.ref = this.dialogService.open( this.formComponent, {
      data: { model },
      header: ( title ) ? title : 'Formulario',
      width: '50vw',
      height: '50vh',
      dismissableMask: true,
      maximizable: true,
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
