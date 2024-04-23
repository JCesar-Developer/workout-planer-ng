import { Observable, tap } from "rxjs"
import { DynamicDialogRef } from "primeng/dynamicdialog"
import { MessageService } from "primeng/api"

import { Exercise } from "@dashboard/shared/models/exercise.interface"
import { ExerciseHttpService } from "@dashboard/shared/services/http-services/exercise-http.service"
import { ExerciseStoreService } from "@dashboard/shared/services/store-services/exercise-store.service"
import { FormMessages } from "@dashboard/shared/interfaces/form-messages.interface"
import { FormActions } from "@dashboard/shared/interfaces/form-action.interface"

export class ExerciseFormActions extends FormActions<Exercise>{

  private messages: FormMessages = {
    success: {
      create: (exerciseName: string) => `Ejercicio "${exerciseName}" creado con éxito`,
      update: (exerciseName: string) => `Ejercicio "${exerciseName}" actualizado con éxito`,
      delete: (exerciseName: string) => `Ejercicio "${exerciseName}" eliminado con éxito`
    },
    error: {
      create: 'Error al crear el ejercicio, por favor, revise su conexión a internet y vuelva a intentarlo',
      update: 'Error al actualizar el ejercicio, por favor, revise su conexión a internet y vuelva a intentarlo',
      delete: 'Error al eliminar el ejercicio, por favor, revise su conexión a internet y vuelva a intentarlo'
    }
  };

  constructor(
    private exerciseHttp: ExerciseHttpService,
    private exerciseStore: ExerciseStoreService,
    messageService: MessageService,
    ref?: DynamicDialogRef,
  ) {
    super(messageService, ref);
  }

  private showMessage(success: boolean, detail: string): void {
    this.messageService.add({
      severity: success ? 'success' : 'error',
      summary: success ? 'Success' : 'Error',
      detail: detail,
    })
  };

  private sendHttpRequest(
    httpRequest: Observable<boolean>,
    exerciseName: string,
    successMessageFunc: Function,
    errorMessage: string,
    onSuccess: Function
  ): void {
    httpRequest.pipe(
      tap((success) => {
        const message = success ? successMessageFunc(exerciseName) : errorMessage;
        this.showMessage(success, message);
        if (success && onSuccess) onSuccess();
      })
    ).subscribe();
  }

  public save(exercise: Exercise): void {
    this.sendHttpRequest(
      this.exerciseHttp.save(exercise),
      exercise.name,
      this.messages.success.create,
      this.messages.error.create,
      () => {
        this.exerciseStore.addNewExercise(exercise)
        if( this.ref ) this.ref.close()
      }
    );
  }

  public update(exercise: Exercise): void {
    this.sendHttpRequest(
      this.exerciseHttp.update(exercise),
      exercise.name,
      this.messages.success.update,
      this.messages.error.update,
      () => {
        this.exerciseStore.updateExercise(exercise)
        if( this.ref ) this.ref.close()
      }
    );
  }

  public delete(exercise: Exercise): void {
    const exerciseId = exercise.id;
    const exerciseName = exercise.name;
    this.sendHttpRequest(
      this.exerciseHttp.delete(exerciseId),
      exerciseName,
      this.messages.success.delete,
      this.messages.error.delete,
      () => {
        this.exerciseStore.deleteExercise(exerciseId)
        if( this.ref ) this.ref.close()
      }
    );
  }

}
