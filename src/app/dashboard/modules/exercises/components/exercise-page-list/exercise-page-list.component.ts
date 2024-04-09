import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Exercise } from '@dashboard/shared/interfaces/exercise.interface';
import { ExerciseStoreService } from '@dashboard/shared/services/exercise-store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'exercise-page-list',
  templateUrl: './exercise-page-list.component.html',
})
export class ExercisePageListComponent implements OnInit, OnDestroy {

  @Output() openEditForm: EventEmitter<Exercise> = new EventEmitter();
  public exercises: Exercise[] = [];
  private $exercises: Subscription;

  constructor(
    private exercisesStore: ExerciseStoreService,
  ) {
    this.$exercises = this.exercisesStore.getExercises()
    .subscribe( exercises => this.exercises = exercises );
  }

  ngOnInit(): void {
    this.setExercises();
  }

  ngOnDestroy(): void {
    if (this.$exercises) this.$exercises.unsubscribe();
  }

  private setExercises(): void {
    this.exercisesStore.getHttpExercises()
      .subscribe( exercises => this.exercises = exercises );
  }

  public openExerciseForm( exercise?: Exercise ) {
    this.openEditForm.emit( exercise );
  }
}
