import { ExerciseHttpService } from '@/dashboard/shared/services/http-services/exercise-http.service';
import { WorkoutHttpService } from '@/dashboard/shared/services/http-services/workout-http.service';
import { Injectable } from '@angular/core';
import { StoreHandlerHelper } from './store-handler.helper';
import { Exercise } from '@/dashboard/shared/models/exercise.interface';
import { Workout } from '@/dashboard/shared/models/workout-interface';
import { firstValueFrom, forkJoin } from 'rxjs';

@Injectable({providedIn: 'any'})
export class StoreHandlerService {

  private allExercises: StoreHandlerHelper<Exercise>  = new StoreHandlerHelper('allExercises');
  private exerciseToRender: StoreHandlerHelper<Exercise> = new StoreHandlerHelper('exercisesToRender');
  private allWorkouts: StoreHandlerHelper<Workout> = new StoreHandlerHelper('allWorkouts');
  private workoutsToRender: StoreHandlerHelper<Workout> = new StoreHandlerHelper('workoutsToRender');


  constructor(
    private exerciseHttp: ExerciseHttpService,
    private workoutHttp: WorkoutHttpService,
  ) {
    this.initializeStore();
  }

  private initializeStore(): void {
    forkJoin({
      exercises: firstValueFrom(this.exerciseHttp.getAll()),
      workouts: firstValueFrom(this.workoutHttp.getAll()),
    }).subscribe(({ exercises, workouts }) => {
      this.allExercises.setState(exercises);
      this.exerciseToRender.setState(exercises);
      this.allWorkouts.setState(workouts);
      this.workoutsToRender.setState(workouts);
    });
  }

  public get allExercisesStore() {
    return this.allExercises;
  }

  public get exercisesToRenderStore() {
    return this.exerciseToRender;
  }

  public get allWorkoutsStore() {
    return this.allWorkouts;
  }

  public get workoutsToRenderStore() {
    return this.workoutsToRender;
  }

}
