import { Exercise } from "@/dashboard/shared/models/exercise.interface";
import { DialogService, DynamicDialogConfig } from "primeng/dynamicdialog";
import { ExerciseFormComponent } from "@exercises/components/exercise-form/exercise-form.component";

const customDialogConfig: DynamicDialogConfig = {
  width: '50vw',
  height: '50vh',
  dismissableMask: true,
}

export class ExerciseDialogConfig {

  constructor(
    private dialogService: DialogService,
    private exercise?: Exercise,
  ) {}

  get config() {
    return {
      dialogService: this.dialogService,
      component: ExerciseFormComponent,
      customDialogConfig: customDialogConfig,
      model: this.exercise,
      modelName: 'Ejercicio',
    }
  }

}
