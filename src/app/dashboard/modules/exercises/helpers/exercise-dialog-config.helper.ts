import { Exercise } from "@/dashboard/shared/models/exercise.interface";
import { DynamicDialogConfig } from "primeng/dynamicdialog";
import { ExerciseFormComponent } from "@exercises/components/exercise-form/exercise-form.component";
import { DialogSetup } from "@/dashboard/shared/services/dashboard-services/dialog-handler.service";

const customDialogConfig = (exercise?: Exercise): DynamicDialogConfig => ({
  header: (exercise) ? 'Editar Ejercicio' : 'Crear Ejercicio',
  width: '50vw',
  height: '50vh',
  dismissableMask: true,
})

export class ExerciseDialogConfig {

  constructor( private exercise?: Exercise ) {}

  get config(): DialogSetup<Exercise> {
    return {
      component: ExerciseFormComponent,
      customDialogConfig: customDialogConfig(this.exercise),
      model: this.exercise,
    }
  }

}
