import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AllWorkoutsStoreService } from '@dashboard/store/handlers/all-workouts-store.handler';
import { WorkoutsToRenderStoreService } from '@dashboard/store/handlers/workouts-to-render-store.handler';
import type { Workout } from '@dashboard/shared/models/workout-interface';
import { StoreActions } from '../../interfaces/store-action.interface';

@Injectable({providedIn: 'root'})
export class WorkoutStoreActionsService implements StoreActions<Workout> {

  private allWorkoutsStore: AllWorkoutsStoreService;
  private workoutsToRenderStore: WorkoutsToRenderStoreService;

  constructor() {
    this.allWorkoutsStore = new AllWorkoutsStoreService();
    this.workoutsToRenderStore = new WorkoutsToRenderStoreService();
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

  public getWorkoutsByName = this.getItemsByName;
  public getItemsByName(term: string): Workout[] {
    return this.allWorkouts.filter( w => w.name.toLowerCase().includes(term.toLowerCase()) );
  }

  // SETTERS ---
  public setWorkoutsToRender = this.setItemsToRender;
  public setItemsToRender(workouts: Workout[]): void {
    this.workoutsToRenderStore.setState( workouts );
  }

  public setWorkoutsToRenderAllWorkouts = this.setItemsToRenderAllItems;
  public setItemsToRenderAllItems(): void {
    this.workoutsToRenderStore.setState( this.allWorkouts );
  };

  // CRUD ACTIONS ---
  public save( workout: Workout ): void {
    const newWorkoutArray = [...this.allWorkouts, workout];

    this.allWorkoutsStore.setState( newWorkoutArray );
    this.workoutsToRenderStore.setState( newWorkoutArray );
  }

  public update( workout: Workout ): void {
    const newWorkoutArray = [...this.allWorkouts];
    const index = this.allWorkouts.findIndex( w => w.id === workout.id );

    newWorkoutArray[index] = workout;

    this.allWorkoutsStore.setState( newWorkoutArray );
    this.workoutsToRenderStore.setState( newWorkoutArray );
  }

  public delete( workoutId: string ): void {
    const newWorkoutArray = this.allWorkouts.filter( w => w.id !== workoutId );

    this.allWorkoutsStore.setState( newWorkoutArray );
    this.workoutsToRenderStore.setState( newWorkoutArray );
  }

}
