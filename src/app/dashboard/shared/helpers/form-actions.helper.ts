import { Observable, tap } from "rxjs";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { MessageService } from "primeng/api";

import { ToastMessage } from "@dashboard/shared/interfaces/form-messages.interface";
import { HttpServiceInterface } from "@/dashboard/shared/interfaces/http-service.interface";
import { StoreActions } from "@/dashboard/shared/interfaces/store-action.interface";

interface Model {
  id: string;
  name: string;
}

export class FormActions<T extends Model> {
  private messages: ToastMessage;

  constructor(
    private httpService: HttpServiceInterface<T>,
    private storeActions: StoreActions<T>,
    private messageService: MessageService,
    messages: ToastMessage,
    private ref?: DynamicDialogRef,
  ) {
    this.messages = messages;
  }

  private showMessage(status: boolean, detail: string): void {
    this.messageService.add({
      severity: status ? 'success' : 'error',
      summary: status ? 'Success' : 'Error',
      detail: detail
    });
  }

  private sendHttpRequest(
    httpRequest: Observable<boolean>,
    model: T,
    successMessageFunc: (name: string) => string,
    errorMessage: string,
    onSuccess: () => void
  ): void {
    httpRequest.pipe(
      tap((status) => {
        const message = status ? successMessageFunc(model.name) : errorMessage;
        this.showMessage(status, message);
        if (status && onSuccess) onSuccess();
      })
    ).subscribe();
  }

  public save(model: T): void {
    this.sendHttpRequest(
      this.httpService.save(model),
      model,
      (name) => this.messages.success.create(name),
      this.messages.error.create,
      () => {
        this.storeActions.save(model);
        if (this.ref) this.ref.close();
      }
    );
  }

  public update(model: T): void {
    this.sendHttpRequest(
      this.httpService.update(model),
      model,
      (name) => this.messages.success.update(name),
      this.messages.error.update,
      () => {
        this.storeActions.update(model);
        if (this.ref) this.ref.close();
      }
    );
  }

  public delete(model: T): void {
    this.sendHttpRequest(
      this.httpService.delete(model.id),
      model,
      (name) => this.messages.success.delete(name),
      this.messages.error.delete,
      () => {
        this.storeActions.delete(model.id);
        if (this.ref) this.ref.close();
      }
    );
  }
}
