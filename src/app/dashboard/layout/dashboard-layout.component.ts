import { Component, OnInit } from '@angular/core';
import { ExerciseHttpService } from '@dashboard/shared/services/http-services/exercise-http.service';
import { WorkoutHttpService } from '@dashboard/shared/services/http-services/workout-http.service';

import { ExerciseStoreActionsService } from '@dashboard/shared/services/store-services/exercise-store-actions.service';
import { firstValueFrom, forkJoin } from 'rxjs';
import { WorkoutStoreActionsService } from '../shared/services/store-services/workout-store-actions.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent implements OnInit {

  constructor(
    private exerciseStoreActions: ExerciseStoreActionsService,
    private exerciseHttp: ExerciseHttpService,
    private workoutStoreActions: WorkoutStoreActionsService,
    private workoutHttp: WorkoutHttpService,
  ) {}

  ngOnInit(): void {
    this.initializeStore();
  }

  private initializeStore(): void {
    forkJoin({
      exercises: firstValueFrom(this.exerciseHttp.getAll()),
      workouts: firstValueFrom(this.workoutHttp.getAll()),
    }).subscribe(({ exercises, workouts }) => {
      this.exerciseStoreActions.initializeStore(exercises);
      this.workoutStoreActions.initializeStore(workouts);
    });
  }

}
