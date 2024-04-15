import { Component } from '@angular/core';
import { Category } from '@dashboard/shared/interfaces/exercise.interface';
import { ExerciseStoreService } from '@dashboard/shared/services/store-services/exercise-store.service';

@Component({
  selector: 'exercise-filter-tabs',
  templateUrl: './exercise-filter-tabs.component.html',
})
export class ExerciseFilterTabsComponent {
  public categories: Category[] = []

  constructor(
    private exerciseStoreService: ExerciseStoreService,
  ) {
    this.categories = this.exerciseStoreService.getExerciseCategories();
  }

  public onFilterByCategory( category: Category ) {
    this.exerciseStoreService.filterExercisesByCategory(category);
  }
}
