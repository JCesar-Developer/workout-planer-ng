import { ExerciseStoreActionsService } from '@/dashboard/shared/services/store-services/exercise-store-actions.service';
import { Component } from '@angular/core';
import { Exercise } from '@dashboard/shared/models/exercise.interface';

@Component({
  selector: 'exercise-searchbar',
  templateUrl: './exercise-searchbar.component.html',
})
export class ExerciseSearchbarComponent {
  public suggestedExercises: Exercise[] = [];

  constructor(
    private exerciseStoreActions: ExerciseStoreActionsService,
  ) {}

  public onRequireSuggestions({ query } : { query: string }): void {
    if( !query ) {
      this.suggestedExercises = [];
      this.exerciseStoreActions.setExercisesToRenderAllExercises();
      return;
    }

    this.suggestedExercises = this.getExerciseSuggestions(query);

    if( this.suggestedExercises.length === 0 ) this.exerciseStoreActions.setExercisesToRender([]);
    else this.exerciseStoreActions.setExercisesToRender( this.suggestedExercises );
  }

  public onSelectSuggestion({ name } : { name: string }): void {
    this.suggestedExercises = this.getExerciseSuggestions(name);
    this.exerciseStoreActions.setExercisesToRender( this.suggestedExercises );
  }

  private getExerciseSuggestions(term: string): Exercise[] {
    let suggestions: Exercise[] = []

    if(!term) return suggestions;

    suggestions = this.exerciseStoreActions.getExercisesByName(term);
    return suggestions;
  }

}
