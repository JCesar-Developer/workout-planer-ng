import { Component } from '@angular/core';
import { ExerciseStoreService } from '@dashboard/shared/services/exercise-store.service';

@Component({
  selector: 'exercise-filter-tabs',
  templateUrl: './exercise-filter-tabs.component.html',
  styles: [
  ]
})
export class ExerciseFilterTabsComponent {
  public categories: string[] = []

  constructor(
    private exerciseStoreService: ExerciseStoreService,
  ) {
    this.categories = this.exerciseStoreService.getExerciseCategories();
  }

  public onFilterByCategory( category: string ) {
    this.exerciseStoreService.getExercisesByCategory(category);
  }
}
