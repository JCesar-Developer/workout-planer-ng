import { Type } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

export class FormCreator {

  ref?: DynamicDialogRef;

  constructor(
    private dialogService: DialogService,
    private formComponent: Type<Object>, // Component to open in the dialog
  ) {}

  public openForm( config: DynamicDialogConfig ) {
    this.ref = this.dialogService.open( this.formComponent, config );
  }

}
