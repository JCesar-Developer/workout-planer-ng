import { Component } from '@angular/core';
import { Exercise } from '@dashboard/shared/interfaces/exercise.interface';
import { ExerciseStoreService } from '@dashboard/shared/services/exercise-store.service';

@Component({
  selector: 'exercise-searchbar',
  templateUrl: './exercise-searchbar.component.html',
})
export class ExerciseSearchbarComponent {
  public filteredExercises: Exercise[] = [];

  constructor(
    private exerciseStoreService: ExerciseStoreService,
  ) {}

  public filterExercise({ query } : { query: string }): void {
    this.filteredExercises = this.exerciseStoreService.getExercisesSuggestions(query);
  }

  public onSelectExercise({ name } : { name: string }): void {
    this.exerciseStoreService.getExercisesSuggestions(name);
  }
}
