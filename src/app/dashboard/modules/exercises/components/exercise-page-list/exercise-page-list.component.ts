import { ExerciseStoreActionsService } from '@/dashboard/shared/services/store-services/exercise-store-actions.service';
import { Component, OnDestroy } from '@angular/core';

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
    private exerciseStoreActions: ExerciseStoreActionsService,
  ) {
    this.$exercises = this.exerciseStoreActions.exercises$
      .subscribe( exercises => {
        this.exercises = exercises
      });
  }

  ngOnDestroy(): void {
    if (this.$exercises) this.$exercises.unsubscribe();
  }

}
