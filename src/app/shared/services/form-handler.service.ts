import { Injectable, Type } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService, Message } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class FormHandlerService {

  ref?: DynamicDialogRef;

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private formComponent: Type<any>,
  ) {}

  public openForm( config: DynamicDialogConfig ) {
    this.ref = this.dialogService.open( this.formComponent, config);

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
