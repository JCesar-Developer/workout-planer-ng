import { CrudActionsHelper } from "@/dashboard/shared/helpers/crud-actions.helper";
import { Exercise } from "@/dashboard/shared/models/exercise.interface";
import { DialogHandlerService } from "@/dashboard/shared/services/dashboard-services/dialog-handler.service";
import { ExerciseHttpService } from "@/dashboard/shared/services/http-services/exercise-http.service";
import { ExerciseStoreActionsService } from "@/dashboard/shared/services/store-services/exercise-store-actions.service";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { exerciseToastMessages } from "../helpers/exercise-toast-messsages.helper";

@Injectable()
export class ExerciseCrudActionsService extends CrudActionsHelper<Exercise> {

  constructor(
    private exerciseHttp: ExerciseHttpService,
    private exerciseStore: ExerciseStoreActionsService,
    private messageService: MessageService,
    private dialogHandler: DialogHandlerService<Exercise>,
  ){
    super({
      httpService: exerciseHttp,
      storeActions: exerciseStore,
      messageService: messageService,
      messages: exerciseToastMessages,
      ref: dialogHandler.dialogRef,
    });
  }

}
