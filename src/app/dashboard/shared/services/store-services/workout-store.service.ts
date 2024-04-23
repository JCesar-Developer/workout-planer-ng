import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Workout } from '@dashboard/shared/models/workout-interface';

@Injectable({providedIn: 'root'})
export class WorkoutStoreService {

  private workoutsStore: Workout[] = [];
  private currentWorkouts$: BehaviorSubject<Workout[]> = new BehaviorSubject<Workout[]>(this.workoutsStore);

  public initializeWorkoutStore( workouts: Workout[] ): void {
    this.workoutsStore = workouts;
    this.currentWorkouts$.next(workouts);
  }

  //GETTERS ---
  public get allWorkouts(): Workout[] {
    return this.workoutsStore;
  }

  public getCurrentWorkouts$(): Observable<Workout[]> {
    return this.currentWorkouts$.asObservable();
  }

  // SETTERS ---
  public setCurrentWorkouts$( workouts: Workout[] ): void {
    this.currentWorkouts$.next(workouts);
  }

  public setCurrentWorkoutAllWorkouts( workout: Workout ): void {
    this.currentWorkouts$.next( this.workoutsStore );
  };

  // CRUD ---
  public addNewWorkout( workout: Workout ): void {
    this.workoutsStore.push(workout);
    this.currentWorkouts$.next(this.workoutsStore);
  }

  public updateWorkout( workout: Workout ): void {
    const index = this.workoutsStore.findIndex( w => w.id === workout.id );
    this.workoutsStore[index] = workout;
    this.currentWorkouts$.next(this.workoutsStore);
  }

  public deleteWorkout( workoutId: string ): void {
    this.workoutsStore = this.workoutsStore.filter( w => w.id !== workoutId );
    this.currentWorkouts$.next(this.workoutsStore);
  }

}
