import { Injectable } from '@angular/core';

import { Store } from '@/dashboard/store/dashboard.store';
import { Exercise, Category } from '../../models/exercise.interface';
import { Observable, map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ExerciseStoreService {

  private allExercises: Exercise[] = [];

  constructor( private store: Store ) {}

  public initializeStore( exercises: Exercise[] ): void {
    this.setAllExercises( exercises );
    this.setStoreExercises( exercises );
  }

  // GETTERS ---
  public get exercises$(): Observable<Exercise[]> {
    return this.store.state$.pipe(
      map( state => state.exercises )
    );
  }

  public getExerciseById(exerciseId: string): Exercise {
    return this.allExercises.find( e => e.id === exerciseId )!;
  }

  public getExercisesById(exerciseIds: string[]): Exercise[] {
    return this.allExercises.filter(e => exerciseIds.includes(e.id));
  }

  public getExercisesByName(name: string): Exercise[] {
    return this.allExercises.filter( e => e.name.toLowerCase().includes(name.toLowerCase()) );
  }

  public getExercisesByCategory(category: Category): Exercise[] {
    return this.allExercises.filter( e => e.category === category );
  }

  public getExercisesByNameAndCategory(name: string, category: Category): Exercise[] {
    return this.getExercisesByName(name).filter( e => e.category === category );
  }

  // STORE ACTIONS ---
  private setAllExercises(exercises: Exercise[]): void {
    this.allExercises = exercises;
  }

  public setStoreExercises(exercises: Exercise[]): void {
    const currentState = this.store.getState();
    this.store.setState({ ...currentState, exercises });
  }

  public setCurrentExercisesAllExercises(): void {
    const currentState = this.store.getState();
    this.store.setState({ ...currentState, exercises: this.allExercises });
  }

  // CRUD ACTIONS ---
  public addNewExercise(exercise: Exercise): void {
    const currentState = this.store.getState();

    this.allExercises.push(exercise);
    this.store.setState({ ...currentState, exercises: this.allExercises });
  }

  public updateExercise(exercise: Exercise): void {
    const index = this.allExercises.findIndex( e => e.id === exercise.id );
    const currentState = this.store.getState();

    this.allExercises[index] = exercise;
    this.store.setState({ ...currentState, exercises: this.allExercises});
  }

  public deleteExercise(exerciseId: string): void {
    const currentState = this.store.getState();

    this.allExercises = this.allExercises.filter( e => e.id !== exerciseId );
    this.store.setState({ ...currentState, exercises: this.allExercises});
  }

}
