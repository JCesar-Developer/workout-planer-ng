import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';

import { Category, Exercise } from '@dashboard/shared/models/exercise.interface';
import { ExerciseStoreActionsService } from '@/dashboard/shared/services/store-services/exercise-store-actions.service';

@Component({
  selector: 'workout-form-selector',
  templateUrl: './workout-form-selector.component.html',
})
export class WorkoutFormSelectorComponent implements OnInit, OnDestroy {

  @Output()
  private selectedExercise: EventEmitter<Exercise> = new EventEmitter<Exercise>();

  public categories: Category[];
  public filteredExercises?: Exercise[];
  public filterTextControl = new FormControl('');

  private nameToFilter?: string;
  private categoryToFilter?: Category;

  private exerciseSubs$: Subscription;
  private filterControlSubs$?: Subscription;

  constructor(
    // private store: Store,
    private exerciseStore: ExerciseStoreActionsService,
  ) {
    this.categories = Object.values(Category);
    this.exerciseStore.setExercisesToRenderAllExercises();
    this.exerciseSubs$ = this.exerciseStore.exercises$
      .subscribe( exercises => {
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

  //Filter
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

  public onEmitSelectExercise(exercise: Exercise): void {
    this.selectedExercise.emit(exercise);
  }

  private filterByNameAndCategory({ name, category }: {  name?: string, category?: Category }): void {
    let filteredExercises: Exercise[] = [];

    if(!name && !category) {
      this.exerciseStore.setExercisesToRenderAllExercises();
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

      this.exerciseStore.setExercisesToRender(filteredExercises);
      return;
    }

    if(name) {
      filteredExercises = this.exerciseStore.getExercisesByName(name);
      this.exerciseStore.setExercisesToRender(filteredExercises);
      return;
    }

    if(category) {
      if( category === Category.ALL ) {
        this.exerciseStore.setExercisesToRenderAllExercises();
        return;
      }
      else {
        filteredExercises = this.exerciseStore.getExercisesByCategory(category);
        this.exerciseStore.setExercisesToRender(filteredExercises);
        return;
      }
    }
  }

}
