import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Category, Exercise } from '@dashboard/shared/interfaces/exercise.interface';

import { ExerciseStoreService } from '@dashboard/shared/services/store-services/exercise-store.service';
import { Subscription, debounceTime } from 'rxjs';

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
    this.categories = Object.values(Category);
    this.exerciseSubs$ = exerciseStore.getCurrentExercises$().subscribe((exercises) => {
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
      this.exerciseStore.setCurrentExercisesAllExercises();
      return;
    }

    if(name && category) {
      switch(category) {
        case Category.ALL:
          filteredExercises = this.exerciseStore.getExercisesByName(name);
          break;
        default:
          filteredExercises = this.exerciseStore.getExercisesByNameAndCategory(name, category);
          break;
      }

      this.exerciseStore.setCurrentExercises(filteredExercises);
      return;
    }

    if(name) {
      filteredExercises = this.exerciseStore.getExercisesByName(name);
      this.exerciseStore.setCurrentExercises(filteredExercises);
      return;
    }

    if(category) {
      filteredExercises = this.exerciseStore.getExercisesByCategory(category);
      this.exerciseStore.setCurrentExercises(filteredExercises);
      return;
    }
  }

}
