import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Type } from "@angular/core";

export interface DialogHandlerConfig<T> {
  dialogService: DialogService;
  component: Type<Object>,
  customDialogConfig?: DynamicDialogConfig;
  modelName?: string;
  model?: T;
}

export class DialogHandler<T> {
  private dialogConfig!: DynamicDialogConfig;
  private defaultDialogConfig: DynamicDialogConfig = {
    width: '90vw',
    height: '80vh',
    dismissableMask: true,
    maximizable: false,
  };

  constructor( private config: DialogHandlerConfig<T> ) {
    this.setConfig();
  }

  private setConfig(): void {
    this.dialogConfig = {
      ...this.defaultDialogConfig,
      ...this.config.customDialogConfig,
      data: this.config.model ? { model: this.config.model } : null,
      header: ( this.config.model )
              ? `Editar ${this.config.modelName}`
              : `Crear ${this.config.modelName}`,
    }
  }

  public openForm(): DynamicDialogRef {
    return this.config.dialogService.open( this.config.component, this.dialogConfig );
  }
}
