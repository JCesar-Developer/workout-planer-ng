import { Component } from '@angular/core';
import { ExerciseStoreService } from '@dashboard/shared/services/store-services/exercise-store.service';

@Component({
  selector: 'app-exercises-page',
  templateUrl: './exercises-page.component.html',
})
export class ExercisesPageComponent {

  public title: string = 'Lista de ejercicios';

  constructor(
    private exerciseStore: ExerciseStoreService,
  ) {
    this.exerciseStore.setCurrentExercisesAllExercises();
  }

}
