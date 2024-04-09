import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Exercise } from '@dashboard/shared/interfaces/exercise.interface';
import { ExerciseStoreService } from '@dashboard/shared/services/exercise-store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'exercise-page-list',
  templateUrl: './exercise-page-list.component.html',
})
export class ExercisePageListComponent implements OnDestroy {

  @Output() openEditForm: EventEmitter<Exercise> = new EventEmitter();
  public exercises: Exercise[] = [];
  private $exercises: Subscription;

  constructor(
    private exercisesStore: ExerciseStoreService,
  ) {
    this.$exercises = this.exercisesStore.getAll()
    .subscribe( exercises => this.exercises = exercises );
  }

  public openExerciseForm( exercise?: Exercise ) {
    this.openEditForm.emit( exercise );
  }

  ngOnDestroy(): void {
    if (this.$exercises) this.$exercises.unsubscribe();
  }

}
