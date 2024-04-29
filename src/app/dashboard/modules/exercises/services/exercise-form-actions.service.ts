import { CrudActionsHelper } from "@/dashboard/shared/helpers/crud-actions.helper";
import { Exercise } from "@/dashboard/shared/models/exercise.interface";
import { DialogHandlerService } from "@/dashboard/shared/services/dashboard-services/dialog-handler.service";
import { ExerciseHttpService } from "@/dashboard/shared/services/http-services/exercise-http.service";
import { ExerciseStoreService } from "@/dashboard/shared/services/store-services/exercise-store.service";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { exerciseToastMessages } from "../helpers/exercise-toast-messsages.helper";

@Injectable()
export class ExerciseFormActionsService {

  public formActions!: CrudActionsHelper<Exercise>;

  constructor(
    private exerciseHttp: ExerciseHttpService,
    private exerciseStore: ExerciseStoreService,
    private messageService: MessageService,
    private dialogHandler: DialogHandlerService<Exercise>,
  ){
    this.setFormActions();
  }

  private setFormActions(): void {
    this.formActions = new CrudActionsHelper<Exercise>({
      httpService: this.exerciseHttp,
      storeActions: this.exerciseStore,
      messageService: this.messageService,
      messages: exerciseToastMessages,
      ref: this.dialogHandler.dialogRef,
    });
  }

  public save(model: Exercise): void {
    this.formActions.save(model);
  }

  public update(model: Exercise): void {
    this.formActions.update(model);
  }

  public delete(model: Exercise): void {
    this.formActions.delete(model);
  }

}
