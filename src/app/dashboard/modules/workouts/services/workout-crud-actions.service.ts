import { CrudActionsHelper } from '@/dashboard/shared/helpers/crud-actions.helper';
import { Workout } from '@/dashboard/shared/models/workout-interface';
import { Injectable } from '@angular/core';
import { workoutToastMessages } from '../helpers/workout-toast-messages.helper';
import { WorkoutHttpService } from '@/dashboard/shared/services/http-services/workout-http.service';
import { WorkoutStoreActionsService } from '@/dashboard/shared/services/store-services/workout-store-actions.service';
import { MessageService } from 'primeng/api';
import { DialogHandlerService } from '@/dashboard/shared/services/dashboard-services/dialog-handler.service';

@Injectable()
export class WorkoutCrudActionsService extends CrudActionsHelper<Workout> {

  constructor(
    private workoutHttp: WorkoutHttpService,
    private workoutStore: WorkoutStoreActionsService,
    private messageService: MessageService,
    private dialogHandler: DialogHandlerService<Workout>,
  ){
    super({
      httpService: workoutHttp,
      storeActions: workoutStore,
      messageService: messageService,
      messages: workoutToastMessages,
      ref: dialogHandler.dialogRef,
    });
  }

}
