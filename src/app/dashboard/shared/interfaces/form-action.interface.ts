import { MessageService } from "primeng/api";
import { DynamicDialogRef } from "primeng/dynamicdialog";

export abstract class FormActions<T> {
  constructor(
    protected messageService: MessageService,
    protected ref?: DynamicDialogRef,
  ) {}

  abstract save(item: T): void;
  abstract update(item: T): void;
  abstract delete(item: T): void;
}
