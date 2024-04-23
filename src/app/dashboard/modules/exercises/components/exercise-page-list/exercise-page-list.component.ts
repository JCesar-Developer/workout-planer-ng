import { Component, OnDestroy } from '@angular/core';

import { ExerciseStoreService } from '@/dashboard/shared/services/store-services/exercise-store.service';
import { Exercise } from '@dashboard/shared/models/exercise.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'exercise-page-list',
  templateUrl: './exercise-page-list.component.html',
})
export class ExercisePageListComponent implements OnDestroy {

  public exercises: Exercise[] = [];
  public $exercises: Subscription;

  constructor(
    private exerciseStore: ExerciseStoreService,
  ) {
    this.$exercises = this.exerciseStore.exercises$
      .subscribe( exercises => {
        this.exercises = exercises
      });
  }

  ngOnDestroy(): void {
    if (this.$exercises) this.$exercises.unsubscribe();
  }

}
