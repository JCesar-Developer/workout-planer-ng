import { tap } from "rxjs"
import { DynamicDialogRef } from "primeng/dynamicdialog"

import { Workout } from "@dashboard/shared/interfaces/workout-interface"
import { WorkoutHttpService } from "@dashboard/shared/services/http-services/workout-http.service"
import { WorkoutStoreService } from "@dashboard/shared/services/store-services/workout-store.service"
import { MessageService } from "primeng/api"

export class WorkoutFormActions {
  constructor(
    private workoutHttp: WorkoutHttpService,
    private workoutStore: WorkoutStoreService,
    private messageService: MessageService,
    private ref?: DynamicDialogRef,
  ) {}

  public save( workout: Workout ): void {
    this.workoutHttp.save( workout ).pipe(
      tap(success => {
        if( success ){
          this.workoutStore.addNewWorkout(workout);
          if( this.ref ) this.ref.close()
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `Rutina "${ workout.name }" creada con éxito` });
        }
        else this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear la rutina, porfavor, revise su conexión a internet y vuelva a intentarlo' });
      })
    ).subscribe()
  }

  public update( workout: Workout ): void {
    this.workoutHttp.update( workout ).pipe(
      tap(success => {
        if( success ) {
          this.workoutStore.updateWorkout(workout);
          if( this.ref ) this.ref.close();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `Rutina "${ workout.name }" actualizada con éxito` });
        }
        else this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar la rutina, porfavor, revise su conexión a internet y vuelva a intentarlo' });
      })
    ).subscribe()

  };

  public delete( workoutId: string, workoutName: string ) {
    this.workoutStore.deleteWorkout( workoutId );
    this.workoutHttp.delete(workoutId).pipe(
      tap(success => {
        if( success ){
          this.workoutStore.deleteWorkout(workoutId);
          if( this.ref ) this.ref.close();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `Rutina "${ workoutName }" eliminada con éxito` });
        }
        else this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar la rutina, porfavor, revise su conexión a internet y vuelva a intentarlo' });
      })
    ).subscribe();
  }

}
