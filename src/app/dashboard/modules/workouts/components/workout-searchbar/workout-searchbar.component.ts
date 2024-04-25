import { Workout } from '@/dashboard/shared/models/workout-interface';
import { WorkoutStoreActionsService } from '@/dashboard/shared/services/store-services/workout-store-actions.service';
import { Component } from '@angular/core';

@Component({
  selector: 'workout-searchbar',
  templateUrl: './workout-searchbar.component.html',
})
export class WorkoutSearchbarComponent {
  public suggestedWorkouts: Workout[] = [];

  constructor(
    private workoutStoreActions: WorkoutStoreActionsService,
  ) {}

  public onRequireSuggestions({ query } : { query: string }): void {
    if( !query ) {
      this.suggestedWorkouts = [];
      this.workoutStoreActions.setWorkoutsToRenderAllWorkouts();
      return;
    }

    this.suggestedWorkouts = this.getSuggestions(query);

    if( this.suggestedWorkouts.length === 0 ) this.workoutStoreActions.setWorkoutsToRenderAllWorkouts();
    else this.workoutStoreActions.setWorkoutsToRender( this.suggestedWorkouts );
  }

  public onSelectSuggestion({ name } : { name: string }): void {
    this.suggestedWorkouts = this.getSuggestions(name);
    this.workoutStoreActions.setWorkoutsToRender( this.suggestedWorkouts );
  }

  private getSuggestions(term: string): Workout[] {
    let suggestions: Workout[] = []

    if(!term) return suggestions;

    return this.workoutStoreActions.getWorkoutsByName(term);
  }

}
