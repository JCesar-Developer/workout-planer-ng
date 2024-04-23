import { Component } from '@angular/core';
import { Exercise } from '@dashboard/shared/models/exercise.interface';
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
    if( !query ) {
      this.suggestedExercises = [];
      this.exerciseStore.setCurrentExercisesAllExercises();
      return;
    }

    this.suggestedExercises = this.getExerciseSuggestions(query);

    if( this.suggestedExercises.length === 0 ) this.exerciseStore.setCurrentExercises([]);
    else this.exerciseStore.setCurrentExercises( this.suggestedExercises );
  }

  public onSelectSuggestion({ name } : { name: string }): void {
    this.suggestedExercises = this.getExerciseSuggestions(name);
    this.exerciseStore.setCurrentExercises( this.suggestedExercises );
  }

  private getExerciseSuggestions(term: string): Exercise[] {
    let suggestions: Exercise[] = []

    if(!term) return suggestions;

    suggestions = this.exerciseStore.getExercisesByName(term);
    return suggestions;
  }

}
