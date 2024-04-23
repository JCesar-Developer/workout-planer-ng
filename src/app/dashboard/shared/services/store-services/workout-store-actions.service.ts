import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AllWorkoutsStoreService } from '@dashboard/store/handlers/all-workouts-store.handler';
import { WorkoutsToRenderStoreService } from '@dashboard/store/handlers/workouts-to-render-store.handler';
import type { Workout } from '@dashboard/shared/models/workout-interface';
import { Store } from '@/dashboard/store/dashboard.store';

@Injectable({providedIn: 'root'})
export class WorkoutStoreActionsService {

  private allWorkoutsStore: AllWorkoutsStoreService;
  private workoutsToRenderStore: WorkoutsToRenderStoreService;

  constructor( private readonly store: Store ) {
    this.allWorkoutsStore = new AllWorkoutsStoreService( this.store );
    this.workoutsToRenderStore = new WorkoutsToRenderStoreService( this.store );
  }

  public initializeStore( workouts: Workout[] ): void {
    this.allWorkoutsStore.setState( workouts );
    this.workoutsToRenderStore.setState( workouts );
  }

  // GETTERS ---
  public get allWorkouts(): Workout[] {
    return this.allWorkoutsStore.allWorkouts;
  }

  public get workouts$(): Observable<Workout[]> {
    return this.workoutsToRenderStore.workouts$;
  }

  public setWorkoutsToRenderAllWorkouts( workout: Workout ): void {
    this.workoutsToRenderStore.setState( this.allWorkouts );
  };

  // CRUD ACTIONS ---
  public addNewWorkout( workout: Workout ): void {
    this.allWorkouts.push(workout);

    this.allWorkoutsStore.setState( this.allWorkouts );
    this.workoutsToRenderStore.setState( this.allWorkouts );
  }

  public updateWorkout( workout: Workout ): void {
    const index = this.allWorkouts.findIndex( w => w.id === workout.id );
    this.allWorkouts[index] = workout;

    this.allWorkoutsStore.setState( this.allWorkouts );
    this.workoutsToRenderStore.setState( this.allWorkouts );
  }

  public deleteWorkout( workoutId: string ): void {
    this.allWorkouts.filter( w => w.id !== workoutId );

    this.allWorkoutsStore.setState( this.allWorkouts );
    this.workoutsToRenderStore.setState( this.allWorkouts );
  }

}
