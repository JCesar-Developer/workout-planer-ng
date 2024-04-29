import { Injectable, Type } from "@angular/core";

import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

export interface DialogConfig<T> {
  component: Type<Object>,
  customDialogConfig?: DynamicDialogConfig;
  model?: T;
  modelName?: string;
}

@Injectable({
  providedIn: 'any',
})
export class DialogHandlerService<T> {
  private customDialogConfig!: DialogConfig<T>;
  private dialogConfig!: DynamicDialogConfig;
  // private defaultDialogConfig: DynamicDialogConfig = {
  //   width: '90vw',
  //   height: '80vh',
  //   dismissableMask: true,
  //   maximizable: false,
  // };

  constructor(
    private dialogService: DialogService,
  ) {}

  public setCustomConfig( customConfig: DialogConfig<T>  ): void {
    this.customDialogConfig = customConfig;
    this.dialogConfig = {
      // ...this.defaultDialogConfig,
      ...customConfig.customDialogConfig,
      data: customConfig.model ? { model: customConfig.model } : null,
      header: ( customConfig.model )
              ? `Editar ${customConfig.modelName}`
              : `Crear ${customConfig.modelName}`,
    }
  }

  public openForm(): DynamicDialogRef {
    return this.dialogService.open( this.customDialogConfig.component, this.dialogConfig );
  }
}
