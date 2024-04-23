import { Observable, tap } from "rxjs";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { MessageService } from "primeng/api";

import { Workout } from "@dashboard/shared/models/workout-interface";
import { WorkoutHttpService } from "@dashboard/shared/services/http-services/workout-http.service";
import { WorkoutStoreActionsService } from "@/dashboard/shared/services/store-services/workout-store-actions.service";

import { FormMessages } from "@dashboard/shared/interfaces/form-messages.interface";
import { FormActions } from "@dashboard/shared/interfaces/form-action.interface";

export class WorkoutFormActions extends FormActions<Workout> {

  private messages: FormMessages = {
    success: {
      create: (workoutName: string) => `Rutina "${workoutName}" creada con éxito`,
      update: (workoutName: string) => `Rutina "${workoutName}" actualizada con éxito`,
      delete: (workoutName: string) => `Rutina "${workoutName}" eliminada con éxito`
    },
    error: {
      create: 'Error al crear la rutina, por favor, revise su conexión a internet y vuelva a intentarlo',
      update: 'Error al actualizar la rutina, por favor, revise su conexión a internet y vuelva a intentarlo',
      delete: 'Error al eliminar la rutina, por favor, revise su conexión a internet y vuelva a intentarlo'
    }
  };

  constructor(
    private workoutHttp: WorkoutHttpService,
    private workoutStoreActions: WorkoutStoreActionsService,
    messageService: MessageService,
    ref?: DynamicDialogRef,
  ) {
    super(messageService, ref);
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
    workoutName: string,
    successMessageFunc: Function,
    errorMessage: string,
    onSuccess: Function
  ): void {
    httpRequest.pipe(
      tap((status) => {
        const message = status ? successMessageFunc(workoutName) : errorMessage;
        this.showMessage(status, message);
        if (status && onSuccess) onSuccess();
      })
    ).subscribe();
  }

  public save(workout: Workout): void {
    this.sendHttpRequest(
      this.workoutHttp.save(workout),
      workout.name,
      this.messages.success.create,
      this.messages.error.create,
      () => {
        this.workoutStoreActions.addNewWorkout(workout);
        if (this.ref) this.ref.close();
      }
    );
  }

  public update(workout: Workout): void {
    this.sendHttpRequest(
      this.workoutHttp.update(workout),
      workout.name,
      this.messages.success.update,
      this.messages.error.update,
      () => {
        this.workoutStoreActions.updateWorkout(workout);
        if (this.ref) this.ref.close();
      }
    );
  }

  public delete(workout: Workout): void {
    const workoutId = workout.id;
    const workoutName = workout.name;
    this.sendHttpRequest(
      this.workoutHttp.delete(workoutId),
      workoutName,
      this.messages.success.delete,
      this.messages.error.delete,
      () => {
        this.workoutStoreActions.deleteWorkout(workoutId);
        if (this.ref) this.ref.close();
      }
    );
  }
}
