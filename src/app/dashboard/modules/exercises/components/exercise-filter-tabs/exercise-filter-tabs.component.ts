import { Component } from '@angular/core';
import { Category } from '@dashboard/shared/models/exercise.interface';
import { ExerciseStoreService } from '@dashboard/shared/services/store-services/exercise-store.service';

@Component({
  selector: 'exercise-filter-tabs',
  templateUrl: './exercise-filter-tabs.component.html',
})
export class ExerciseFilterTabsComponent {
  public categories: Category[] = []
  private currentCategory: Category = Category.ALL;

  constructor(
    private exerciseStore: ExerciseStoreService,
  ) {
    this.categories = Object.values(Category);
  }

  public onFilterByCategory( category: Category ) {
    if( this.currentCategory === category ) return;

    this.currentCategory = category;

    if( category === Category.ALL )
      this.exerciseStore.setCurrentExercisesAllExercises();
    else {
      const filteredExercises = this.exerciseStore.getExercisesByCategory( category );
      this.exerciseStore.setStoreExercises( filteredExercises );
    }
  }
}
