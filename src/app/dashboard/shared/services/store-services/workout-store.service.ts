import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import type { Workout } from '@dashboard/shared/models/workout-interface';
import { StoreActionsInterface } from '../../interfaces/store-action.interface';
import { StoreHandlerHelper } from '@/dashboard/store/handlers/store-handler.helper';

@Injectable({providedIn: 'root'})
export class WorkoutStoreService implements StoreActionsInterface<Workout> {

  private allWorkoutsStore: StoreHandlerHelper<Workout>;
  private workoutsToRenderStore: StoreHandlerHelper<Workout>;

  constructor() {
    this.allWorkoutsStore = new StoreHandlerHelper('allWorkouts');
    this.workoutsToRenderStore = new StoreHandlerHelper('workoutsToRender');
  }

  public initializeStore( workouts: Workout[] ): void {
    this.allWorkoutsStore.setState( workouts );
    this.workoutsToRenderStore.setState( this.allWorkouts );
  }

  // GETTERS ---
  public get allWorkouts(): Workout[] {
    return this.allWorkoutsStore.data;
  }

  public get workouts$(): Observable<Workout[]> {
    return this.workoutsToRenderStore.data$;
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
