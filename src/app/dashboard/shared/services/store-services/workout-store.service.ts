import { Injectable } from '@angular/core';

import { Workout } from '@dashboard/shared/models/workout-interface';
import { Store } from '@/dashboard/store/dashboard.store';
import { Observable, map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class WorkoutStoreService {

  private allWorkouts: Workout[] = [];

  constructor( private store: Store ) {}

  public initializeWorkoutStore( workouts: Workout[] ): void {
    this.setAllWorkouts( workouts );
    this.setCurrentWorkouts$( workouts );
  }

  // GETTERS ---
  public get workouts$(): Observable<Workout[]> {
    return this.store.state$.pipe(
      map( state => state.workouts )
    );
  }

  // STORE ACTIONS ---
  public setAllWorkouts( workouts: Workout[] ): void {
    this.allWorkouts = workouts;
  }

  public setStoreWorkouts( workouts: Workout[] ): void {
    const currentState = this.store.getState();
    this.store.setState({ ...currentState, workouts });
  }

  public setCurrentWorkouts$( workouts: Workout[] ): void {
    const currentState = this.store.getState();
    this.store.setState({ ...currentState, workouts });
  }

  public setCurrentWorkoutAllWorkouts( workout: Workout ): void {
    const currentState = this.store.getState();
    this.store.setState({ ...currentState, workouts: this.allWorkouts });
  };

  // CRUD ACTIONS ---
  public addNewWorkout( workout: Workout ): void {
    const currentState = this.store.getState();

    this.allWorkouts.push(workout);
    this.store.setState({ ...currentState, workouts: this.allWorkouts });
  }

  public updateWorkout( workout: Workout ): void {
    const index = this.allWorkouts.findIndex( w => w.id === workout.id );
    const currentState = this.store.getState();

    this.allWorkouts[index] = workout;
    this.store.setState({ ...currentState, workouts: this.allWorkouts });
  }

  public deleteWorkout( workoutId: string ): void {
    const currentState = this.store.getState();

    this.allWorkouts = this.allWorkouts.filter( w => w.id !== workoutId );
    this.store.setState({ ...currentState, workouts: this.allWorkouts });
  }

}
