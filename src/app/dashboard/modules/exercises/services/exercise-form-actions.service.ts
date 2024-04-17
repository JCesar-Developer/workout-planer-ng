import { Injectable } from '@angular/core';
import { Exercise } from "@dashboard/shared/interfaces/exercise.interface"
import { ExerciseHttpService } from "@dashboard/shared/services/http-services/exercise-http.service"
import { ExerciseStoreService } from "@dashboard/shared/services/store-services/exercise-store.service"
import { DynamicDialogRef } from "primeng/dynamicdialog"

import { tap } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class ExerciseFormActionsService {
  constructor(
    private ref: DynamicDialogRef,
    private exerciseHttp: ExerciseHttpService,
    private exerciseStore: ExerciseStoreService,
  ) {}

  public save( exercise: Exercise ): void {
    this.exerciseHttp.save( exercise ).pipe(
      tap(success => {
        if( success ){
          this.exerciseStore.addNewExercise(exercise);
          this.ref.close({
            status: 'success',
            message: { severity: 'success', summary: 'Success', detail: `Ejercicio "${ exercise.name }" creado con éxito` },
          })
        }
        else this.ref.close({
          status: 'error',
          message: { severity: 'error', summary: 'Error', detail: 'Error al crear el ejercicio, porfavor, revise su conexión a internet y vuelva a intentarlo' },
        })
      })
    ).subscribe()
  }

  public update( exercise: Exercise ): void {
    this.exerciseHttp.update( exercise ).pipe(
      tap(success => {
        if( success ) {
          this.exerciseStore.updateExercise(exercise);
          this.ref.close({
            status: 'success',
            message: { severity: 'success', summary: 'Success', detail: `Ejercicio "${ exercise.name }" actualizado con éxito` },
          })
        }
        else this.ref.close({
          status: 'error',
          message: { severity: 'error', summary: 'Error', detail: 'Error al actualizar el ejercicio, porfavor, revise su conexión a internet y vuelva a intentarlo' },
        })
      })
    ).subscribe()

  };

  public delete( exerciseId: string, exerciseName: string ) {
    this.exerciseHttp.delete(exerciseId).pipe(
      tap(success => {
        if( success ){
          this.exerciseStore.deleteExercise(exerciseId);
          this.ref.close({
            status: 'success',
            message: { severity: 'success', summary: 'Success', detail: `Ejercicio "${ exerciseName }" eliminado con éxito` },
          })
        }
        else this.ref.close({
          status: 'error',
          message: { severity: 'error', summary: 'Error', detail: 'Error al eliminar el ejercicio, porfavor, revise su conexión a internet y vuelva a intentarlo' },
        })
      })
    ).subscribe();
  }
}
