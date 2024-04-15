import { Component } from '@angular/core';
import { Exercise } from '@dashboard/shared/interfaces/exercise.interface';
import { ExerciseStoreService } from '@dashboard/shared/services/store-services/exercise-store.service';

@Component({
  selector: 'exercise-searchbar',
  templateUrl: './exercise-searchbar.component.html',
})
export class ExerciseSearchbarComponent {
  public suggestedExercises: Exercise[] = [];

  constructor(
    private exerciseStoreService: ExerciseStoreService,
  ) {}

  public onFilterExercise({ query } : { query: string }): void {
    this.suggestedExercises = this.exerciseStoreService.getExercisesSuggestions(query);
  }

  public onSelectExercise({ name } : { name: string }): void {
    this.exerciseStoreService.getExercisesSuggestions(name);
  }
}
