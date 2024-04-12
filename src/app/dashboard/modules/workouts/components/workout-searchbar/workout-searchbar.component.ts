import { Component } from '@angular/core';

@Component({
  selector: 'workout-searchbar',
  templateUrl: './workout-searchbar.component.html',
})
export class WorkoutSearchbarComponent {
  // public suggestedWorkouts: Exercise[] = [];

  constructor(
    // private exerciseStoreService: ExerciseStoreService,
  ) {}

  public filterWorkout({ query } : { query: string }): void {
    // this.suggestedExercises = this.exerciseStoreService.getExercisesSuggestions(query);
  }

  public onSelectWorkout({ name } : { name: string }): void {
    // this.exerciseStoreService.getExercisesSuggestions(name);
  }

}
