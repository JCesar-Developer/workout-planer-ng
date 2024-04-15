import { Workout } from "@dashboard/shared/interfaces/workout-interface";
import { FormConfig } from "@dashboard/shared/interfaces/form-config.interface";
import { DynamicDialogConfig } from "primeng/dynamicdialog";

export class WorkoutFormConfig implements FormConfig<Workout> {

  constructor(
    public model?: Workout,
  ) {}

  get formConfig(): DynamicDialogConfig {
    return {
      data: { model: this.model },
      header: ( this.model ) ? 'Editar Rutina' : 'Crear Rutina',
      width: '70vw',
      height: '75vh',
      dismissableMask: true,
      maximizable: true,
    }
  }

}
