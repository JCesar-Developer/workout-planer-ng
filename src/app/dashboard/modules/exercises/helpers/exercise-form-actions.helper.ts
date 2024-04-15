import { Exercise } from "@dashboard/shared/interfaces/exercise.interface"
import { ExerciseStoreService } from "@dashboard/shared/services/store-services/exercise-store.service"
import { DynamicDialogRef } from "primeng/dynamicdialog"

import { tap } from "rxjs"

export class ExerciseFormActions {
  constructor(
    private ref: DynamicDialogRef,
    private exerciseStoreService: ExerciseStoreService,
  ) {}

  public save( exercise: Exercise ): void {
    this.exerciseStoreService.save( exercise ).pipe(
      tap(success => {
        if( success ) this.ref.close({
          status: 'success',
          message: { severity: 'success', summary: 'Success', detail: `Ejercicio "${ exercise.name }" creado con éxito` },
        })
        else this.ref.close({
          status: 'error',
          message: { severity: 'error', summary: 'Error', detail: 'Error al crear el ejercicio, porfavor, revise su conexión a internet y vuelva a intentarlo' },
        })
      })
    ).subscribe()
  }

  public update( exercise: Exercise ): void {
    this.exerciseStoreService.update( exercise ).pipe(
      tap(success => {
        if( success ) this.ref.close({
          status: 'success',
          message: { severity: 'success', summary: 'Success', detail: `Ejercicio "${ exercise.name }" actualizado con éxito` },
        })
        else this.ref.close({
          status: 'error',
          message: { severity: 'error', summary: 'Error', detail: 'Error al actualizar el ejercicio, porfavor, revise su conexión a internet y vuelva a intentarlo' },
        })
      })
    ).subscribe()

  };

  public delete( exerciseId: string, exerciseName: string ) {
    this.exerciseStoreService.delete(exerciseId).pipe(
      tap(success => {
        if( success ) this.ref.close({
          status: 'success',
          message: { severity: 'success', summary: 'Success', detail: `Ejercicio "${ exerciseName }" eliminado con éxito` },
        })
        else this.ref.close({
          status: 'error',
          message: { severity: 'error', summary: 'Error', detail: 'Error al eliminar el ejercicio, porfavor, revise su conexión a internet y vuelva a intentarlo' },
        })
      })
    ).subscribe();
  }


}
