import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Category, Exercise } from '@dashboard/shared/interfaces/exercise.interface';

import { ExerciseStoreService } from '@dashboard/shared/services/store-services/exercise-store.service';
import { Subscription, debounceTime } from 'rxjs';

//TODO: Refactorizar todo esto
@Component({
  selector: 'workout-form-selector',
  templateUrl: './workout-form-selector.component.html',
})
export class WorkoutFormSelectorComponent implements OnInit, OnDestroy {

  public categories: Category[];
  public filteredExercises?: Exercise[];
  public filterTextControl = new FormControl('');

  private nameToFilter?: string;
  private categoryToFilter?: Category;

  private exerciseSubs$: Subscription;
  private filterControlSubs$?: Subscription;

  constructor(
    private exerciseStore: ExerciseStoreService,
  ) {
    this.categories = exerciseStore.exerciseCategories;
    this.exerciseSubs$ = exerciseStore.currentExercises.subscribe((exercises) => {
      this.filteredExercises = exercises;
    });
  }

  ngOnInit(): void {
    this.filterControlSubs$ = this.filterTextControl.valueChanges
    .pipe(
      debounceTime(300),
    )
    .subscribe(value => {
      this.onFilterByName(value!);
    });
  }

  ngOnDestroy(): void {
    if( this.exerciseSubs$ ) this.exerciseSubs$.unsubscribe();
    if( this.filterControlSubs$ ) this.filterControlSubs$.unsubscribe();
  }

  public onFilterByName( value: string ) {
    this.nameToFilter = value;
    this.filterByNameOrCategory({
      name: this.nameToFilter,
      category: this.categoryToFilter,
    })
  }

  public onFilterByCategory({ value }: { value: Category }): void {
    this.categoryToFilter = value;
    this.filterByNameOrCategory({
      name: this.nameToFilter,
      category: this.categoryToFilter,
    })
  }

  private filterByNameOrCategory( filters: { name?: string, category?: Category}): void {
    this.exerciseStore.getExercisesByNameAndCategory( filters );
  }


}
