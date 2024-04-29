import { Workout } from "@/dashboard/shared/models/workout-interface";
import { DynamicDialogConfig } from "primeng/dynamicdialog";

import { DialogSetup } from "@/dashboard/shared/services/dashboard-services/dialog-handler.service";
import { WorkoutFormComponent } from '@workouts/components/workout-form/workout-form.component';


const workoutDialogConfig = (workout?: Workout): DynamicDialogConfig => ({
  header: (workout) ? 'Editar Rutina' : 'Crear Rutina',
  width: '70vw',
  height: '75vh',
  dismissableMask: true,
  maximizable: true,
});

export class WorkoutDialogConfig {

  constructor( private workout?: Workout ) {}

  get config(): DialogSetup<Workout> {
    return {
      component: WorkoutFormComponent,
      customDialogConfig: workoutDialogConfig(this.workout),
      model: this.workout,
    }
  }
}
