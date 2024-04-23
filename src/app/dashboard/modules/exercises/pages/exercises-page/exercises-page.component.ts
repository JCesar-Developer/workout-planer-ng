import { ExerciseStoreActionsService } from '@/dashboard/shared/services/store-services/exercise-store-actions.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-exercises-page',
  templateUrl: './exercises-page.component.html',
})
export class ExercisesPageComponent {

  public title: string = 'Lista de ejercicios';

  constructor(
    private exerciseStoreActions: ExerciseStoreActionsService,
  ) {
    this.exerciseStoreActions.setExercisesToRenderAllExercises();
  }

}
