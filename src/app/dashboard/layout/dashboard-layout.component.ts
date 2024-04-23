import { Component, OnInit } from '@angular/core';
import { ExerciseHttpService } from '@dashboard/shared/services/http-services/exercise-http.service';
import { WorkoutHttpService } from '@dashboard/shared/services/http-services/workout-http.service';
import { ExerciseStoreService } from '@dashboard/shared/services/store-services/exercise-store.service';
import { WorkoutStoreService } from '@dashboard/shared/services/store-services/workout-store.service';
import { firstValueFrom, forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent implements OnInit {

  constructor(
    private exerciseStore: ExerciseStoreService,
    private exerciseHttp: ExerciseHttpService,
    private workoutStore: WorkoutStoreService,
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
      this.exerciseStore.initializeStore(exercises);
      this.workoutStore.initializeWorkoutStore(workouts);
    });
  }

}
