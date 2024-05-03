import { Observable, tap } from "rxjs";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { MessageService } from "primeng/api";

import { ToastMessage } from "@dashboard/shared/interfaces/form-messages.interface";
import { HttpServiceInterface } from "@/dashboard/shared/interfaces/http-service.interface";
import { StoreActionsInterface } from "@/dashboard/shared/interfaces/store-action.interface";

export interface CrudActionsHelperInterface<T> {
  httpService: HttpServiceInterface<T>;
  storeActions: StoreActionsInterface<T>;
  messageService: MessageService;
  messages: ToastMessage;
  ref?: DynamicDialogRef;
}

interface Model {
  id: string;
  name: string;
}

export class CrudActionsHelper<T extends Model> {

  constructor(
    public config: CrudActionsHelperInterface<T>
  ) {}

  private showMessage(status: boolean, detail: string): void {
    this.config.messageService.add({
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
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      httpRequest.pipe(
        tap((status) => {
          const message = status ? successMessageFunc(model.name) : errorMessage;
          this.showMessage(status, message);
          if (status && onSuccess) onSuccess();
        })
      ).subscribe( status => resolve(status) );
    });
  }

  public save(model: T): Promise<boolean> {
    return this.sendHttpRequest(
      this.config.httpService.save(model),
      model,
      (name) => this.config.messages.success.create(name),
      this.config.messages.error.create,
      () => {
        this.config.storeActions.save(model);
        if (this.config.ref) this.config.ref.close();
      }
    );
  }

  public update(model: T): Promise<boolean> {
    return this.sendHttpRequest(
      this.config.httpService.update(model),
      model,
      (name) => this.config.messages.success.update(name),
      this.config.messages.error.update,
      () => {
        this.config.storeActions.update(model);
        if (this.config.ref) this.config.ref.close();
      }
    );
  }

  public delete(model: T): Promise<boolean> {
    return this.sendHttpRequest(
      this.config.httpService.delete(model.id),
      model,
      (name) => this.config.messages.success.delete(name),
      this.config.messages.error.delete,
      () => {
        this.config.storeActions.delete(model.id);
        if (this.config.ref) this.config.ref.close();
      }
    );
  }
}
