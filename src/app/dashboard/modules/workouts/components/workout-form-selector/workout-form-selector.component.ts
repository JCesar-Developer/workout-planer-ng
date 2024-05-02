import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';

import { Category, Exercise } from '@dashboard/shared/models/exercise.interface';

import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ResponsiveOptions } from '@/dashboard/modules/exercises/components/exercise-carousel/exercise-carousel.component';
import { FilterSelectorHelper } from './filterSelector.helper';

const minimizeResponsiveOptions: ResponsiveOptions[] = [
  { breakpoint: '2400px', numVisible: 7, numScroll: 1 },
  { breakpoint: '1920px', numVisible: 6, numScroll: 1 },
];

const maximizeResponsiveOptions: ResponsiveOptions[] = [
  { breakpoint: '2400px', numVisible: 10, numScroll: 1 },
  { breakpoint: '1920px', numVisible: 9, numScroll: 1 },
];

@Component({
  selector: 'workout-form-selector',
  templateUrl: './workout-form-selector.component.html',
  providers: [ FilterSelectorHelper ],
})
export class WorkoutFormSelectorComponent implements OnInit, OnDestroy {

  @Output()
  private selectedExercise: EventEmitter<Exercise> = new EventEmitter<Exercise>();

  public categories: Category[] = Object.values(Category);
  public filterTextControl = new FormControl('');
  public filteredExercises?: Exercise[];

  private exerciseSubscription$!: Subscription;
  private inputNameSubscription$!: Subscription;
  private maximizationSubscription$!: Subscription;

  public minimized: boolean = true;
  public minResponsiveOptions: ResponsiveOptions[] = minimizeResponsiveOptions;
  public maxResponsiveOptions: ResponsiveOptions[] = maximizeResponsiveOptions;

  constructor(
    private ref: DynamicDialogRef,
    private _filterHelper: FilterSelectorHelper,
  ) {}

  ngOnInit(): void {
    this.setExerciseSubscription();
    this.setInputNameSubscription();
    this.setMaximizationSubscription();
  }

  ngOnDestroy(): void {
    this.exerciseSubscription$.unsubscribe();
    this.inputNameSubscription$.unsubscribe();
    this.maximizationSubscription$.unsubscribe();
  }

  //GETTERS & SETTERS
  public get filterHelper(): FilterSelectorHelper {
    return this._filterHelper;
  }

  public setExerciseSubscription(): void {
    this.exerciseSubscription$ = this._filterHelper.exercises$
      .subscribe( exercises => {
        this.filteredExercises = exercises;
      });
  }

  public setInputNameSubscription(): void {
    this.inputNameSubscription$ = this.filterTextControl.valueChanges
      .pipe( debounceTime(200) )
      .subscribe( name => {
        this._filterHelper.onFilterByName(name!);
      });
  }

  public setMaximizationSubscription(): void {
    this.maximizationSubscription$ = this.ref.onMaximize.subscribe(() => {
      this.minimized = !this.minimized;
    });
  }

  public onEmitSelectExercise(exercise: Exercise): void {
    this.selectedExercise.emit(exercise);
  }
}
