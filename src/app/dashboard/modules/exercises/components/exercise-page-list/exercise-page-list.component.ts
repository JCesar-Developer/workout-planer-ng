import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Exercise } from '@dashboard/shared/interfaces/exercise.interface';
import { ExerciseStoreService } from '@dashboard/shared/services/store-services/exercise-store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'exercise-page-list',
  templateUrl: './exercise-page-list.component.html',
})
export class ExercisePageListComponent implements OnDestroy {

  public exercises: Exercise[] = [];
  public $exercises: Subscription;

  constructor(
    private exercisesStore: ExerciseStoreService,
  ) {
    this.$exercises = this.exercisesStore.getAll()
    .subscribe( exercises => this.exercises = exercises );
  }

  ngOnDestroy(): void {
    if (this.$exercises) this.$exercises.unsubscribe();
  }

}
