import { Injectable } from "@angular/core";

import { Category, Exercise } from "@/dashboard/shared/models/exercise.interface";
import { ExerciseStoreActionsService } from "@/dashboard/shared/services/store-services/exercise-store-actions.service";
import { Observable } from "rxjs";

@Injectable()
export class FilterSelectorHelper {

  private nameToFilter?: string;
  private categoryToFilter?: Category;

  constructor(
    private exerciseStore: ExerciseStoreActionsService,
  ) {
    this.exerciseStore.setItemsToRenderAllItems();
  }

  public get exercises$(): Observable<Exercise[]> {
    return this.exerciseStore.items$;
  }

  public onFilterByName( value: string ): void {
    this.nameToFilter = value;
    this.filterByNameAndCategory({
      name: this.nameToFilter,
      category: this.categoryToFilter,
    })
  }

  public onFilterByCategory({ value }: { value: Category }): void {
    this.categoryToFilter = value;
    this.filterByNameAndCategory({
      name: this.nameToFilter,
      category: this.categoryToFilter,
    })
  }

  private filterByNameAndCategory({ name, category }: {  name?: string, category?: Category }): void {
    let filteredExercises: Exercise[] = [];

    if(!name && !category) {
      this.exerciseStore.setItemsToRenderAllItems();
      return;
    }

    if(name && category) {
      switch(category) {
        case Category.ALL:
          filteredExercises = this.exerciseStore.getItemsByName(name);
          break;
        default:
          filteredExercises = this.exerciseStore.getExercisesByNameAndCategory(name, category);
          break;
      }

      this.exerciseStore.setItemsToRender(filteredExercises);
      return;
    }

    if(name) {
      filteredExercises = this.exerciseStore.getItemsByName(name);
      this.exerciseStore.setItemsToRender(filteredExercises);
      return;
    }

    if(category) {
      if( category === Category.ALL ) {
        this.exerciseStore.setItemsToRenderAllItems();
        return;
      }
      else {
        filteredExercises = this.exerciseStore.getExercisesByCategory(category);
        this.exerciseStore.setItemsToRender(filteredExercises);
        return;
      }
    }
  }

}

