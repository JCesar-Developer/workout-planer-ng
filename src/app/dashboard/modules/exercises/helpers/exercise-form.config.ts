import { Exercise } from "@dashboard/shared/interfaces/exercise.interface";
import { FormConfig } from "@dashboard/shared/interfaces/form-config.interface";
import { DynamicDialogConfig } from "primeng/dynamicdialog";

export class ExerciseFormConfig implements FormConfig<Exercise> {

  constructor(
    public model?: Exercise,
  ) {}

  get formConfig(): DynamicDialogConfig {
    return {
      data: { model: this.model },
      header: ( this.model ) ? 'Editar Ejercicio' : 'Crear Ejercicio',
      width: '50vw',
      height: '50vh',
      dismissableMask: true,
    }
  }

}
