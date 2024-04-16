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
    private exerciseStore: ExerciseStoreService,
  ) {}

  public onRequireSuggestions({ query } : { query: string }): void {
    this.suggestedExercises = this.exerciseStore.getExercisesSuggestions(query);

    if( this.suggestedExercises.length === 0 ) this.exerciseStore.setCurrentExercises([]);
    else this.exerciseStore.setCurrentExercises( this.suggestedExercises );
  }

  public onSelectSuggestion({ name } : { name: string }): void {
    this.suggestedExercises = this.exerciseStore.getExercisesSuggestions(name);
    this.exerciseStore.setCurrentExercises( this.suggestedExercises );
  }
}
