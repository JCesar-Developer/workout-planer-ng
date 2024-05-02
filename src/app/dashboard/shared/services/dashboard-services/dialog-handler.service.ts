import { Injectable, Type } from "@angular/core";
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

export interface DialogSetup<T> {
  component: Type<Object>,
  customDialogConfig?: DynamicDialogConfig;
  model?: T;
}

@Injectable({
  providedIn: 'any',
})
export class DialogHandlerService<T> {
  private dialogConfig!: DynamicDialogConfig;

  constructor(
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
  ) {}

  // GETTERS & SETTERS ---
  public get dialogRef(): DynamicDialogRef {
    return this.ref;
  }

  public get model(): T | undefined {
    if (!this.dialogConfig.data) return undefined;
    return this.dialogConfig.data.model;
  }

  //TODO: Crear un Factory para esta función.
  private setConfig( customConfig: DialogSetup<T>  ): void {
    this.dialogConfig = {
      ...customConfig.customDialogConfig,
      data: customConfig.model ? { model: customConfig.model } : null,
    }
  }

  // PUBLIC METHODS ---
  public openDialog( customConfigDialog: DialogSetup<T> ): void {
    this.setConfig( customConfigDialog );
    this.ref = this.dialogService.open( customConfigDialog.component, this.dialogConfig );
  }

  public closeDialog(): void {
    this.ref.close();
  }

}
