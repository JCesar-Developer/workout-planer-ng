import { Component, OnDestroy, OnInit } from '@angular/core';

import { Category } from '@dashboard/shared/models/exercise.interface';
import { ExerciseStoreActionsService } from '@/dashboard/shared/services/store-services/exercise-store-actions.service';
import { ExerciseCategoriesService } from '../../services/exercise-categories.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'exercise-filter-tabs',
  templateUrl: './exercise-filter-tabs.component.html',
})
export class ExerciseFilterTabsComponent implements OnInit, OnDestroy {
  public categories!: Category[];
  public currentCategory!: Category;
  private crrCategorySubs!: Subscription;

  constructor(
    private exerciseStore: ExerciseStoreActionsService,
    private categoryService: ExerciseCategoriesService,
  ) {}

  ngOnInit(): void {
    this.categories = this.categoryService.categories;
    this.crrCategorySubs = this.categoryService.currentCategory.subscribe(
      category => this.currentCategory = category );
  }

  ngOnDestroy(): void {
    this.crrCategorySubs.unsubscribe();
  }

  public onFilterByCategory( category: Category ) {
    if( this.currentCategory === category ) return;

    this.categoryService.setCurrentCategory(category);

    if( category === Category.ALL ){
      this.exerciseStore.setItemsToRenderAllItems();
    } else {
      const filteredExercises = this.exerciseStore.getExercisesByCategory( category );
      this.exerciseStore.setItemsToRender( filteredExercises );
    }
  }
}
