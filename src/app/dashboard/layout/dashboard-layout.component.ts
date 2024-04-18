import { Component, OnInit } from '@angular/core';
import { ExerciseHttpService } from '@dashboard/shared/services/http-services/exercise-http.service';
import { WorkoutHttpService } from '@dashboard/shared/services/http-services/workout-http.service';
import { ExerciseStoreService } from '@dashboard/shared/services/store-services/exercise-store.service';
import { WorkoutStoreService } from '@dashboard/shared/services/store-services/workout-store.service';

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
  ) { }

  ngOnInit(): void {
    this.initializeExerciseStore();
    this.initializeWorkoutStore();
  }

  private initializeExerciseStore(): void {
    if( this.exerciseStore.allExercises.length === 0 ) {
      this.exerciseHttp.getAll()
        .subscribe( exercises => {
          this.exerciseStore.initializeStore( exercises );
        });
    }
  }

  private initializeWorkoutStore(): void {
    if( this.workoutStore.allWorkouts.length === 0 ) {
      this.workoutHttp.getAll()
        .subscribe( workouts => {
          this.workoutStore.initializeWorkoutStore( workouts );
        });
    }
  }

}
