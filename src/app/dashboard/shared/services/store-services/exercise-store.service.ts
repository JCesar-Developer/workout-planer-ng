import { Injectable } from '@angular/core';

import { Exercise, Category } from '../../interfaces/exercise.interface';
import { BehaviorSubject, Observable, filter, map, take } from 'rxjs';

//TODO: Refactorizar todo esto
@Injectable({providedIn: 'root'})
export class ExerciseStoreService {

  private exercisesStore: Exercise[] = [];
  private currentExercises$: BehaviorSubject<Exercise[]> = new BehaviorSubject<Exercise[]>(this.exercisesStore);

  public initializeStore( exercises: Exercise[] ) {
    this.setExercisesStore( exercises );
    this.setCurrentExercises( exercises );
  }

  // SETTERS ---
  public setExercisesStore(exercises: Exercise[]) {
    this.exercisesStore = exercises;
  }

  public setCurrentExercisesAllExercises() {
    this.currentExercises$.next(this.exercisesStore);
  }

  public setCurrentExercises(exercises: Exercise[]) {
    this.currentExercises$.next(exercises);
  }

  // GETTERS ---
  public getCurrentExercises$(): Observable<Exercise[]> {
    return this.currentExercises$.asObservable();
  }

  public get allExercises(): Exercise[] {
    return this.exercisesStore;
  }

  public getExerciseById(exerciseId: string): Exercise {
    return this.exercisesStore.find( e => e.id === exerciseId )!;
  }

  public getExercisesById(exerciseIds: string[]): Exercise[] {
    return this.exercisesStore.filter(e => exerciseIds.includes(e.id));
  }

  public getExercisesByName(name: string): Exercise[] {
    return this.exercisesStore.filter( e => e.name.toLowerCase().includes(name.toLowerCase()) );
  }

  public getExercisesByCategory(category: Category): Exercise[] {
    return this.exercisesStore.filter( e => e.category === category );
  }

  public getExercisesByNameAndCategory(name: string, category: Category): Exercise[] {
    return this.getExercisesByName(name).filter( e => e.category === category );
  }

  // CRUD ---
  public addNewExercise(exercise: Exercise) {
    this.exercisesStore.push(exercise);
    this.currentExercises$.next(this.exercisesStore);
  }

  public updateExercise(exercise: Exercise) {
    const index = this.exercisesStore.findIndex( e => e.id === exercise.id );
    this.exercisesStore[index] = exercise;
    this.currentExercises$.next(this.exercisesStore);
  }

  public deleteExercise(exerciseId: string) {
    this.exercisesStore = this.exercisesStore.filter( e => e.id !== exerciseId );
    this.currentExercises$.next(this.exercisesStore);
  }

}
