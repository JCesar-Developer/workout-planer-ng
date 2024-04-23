import { Injectable } from '@angular/core';

import { ExerciseStore } from '@/dashboard/store/exercise.store';
import { Exercise, Category } from '../../models/exercise.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ExerciseStoreService {

  private exercisesStore: Exercise[] = [];
  // private currentExercises$: BehaviorSubject<Exercise[]> = new BehaviorSubject<Exercise[]>(this.exercisesStore);

  constructor(
    private exerciseStore: ExerciseStore,
  ) {}

  public initializeStore( exercises: Exercise[] ): void {
    this.setExercisesStore( exercises );
    this.setCurrentExercises( exercises );
  }

  // SETTERS ---
  private setExercisesStore(exercises: Exercise[]): void {
    this.exercisesStore = exercises;
  }

  public setCurrentExercises(exercises: Exercise[]): void {
    this.exerciseStore.currentExercises$.next(exercises);
  }

  public setCurrentExercisesAllExercises(): void {
    this.exerciseStore.currentExercises$.next(this.exercisesStore);
  }

  // GETTERS ---
  public getCurrentExercises$(): Observable<Exercise[]> {
    return this.exerciseStore.currentExercises$.asObservable();
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
  public addNewExercise(exercise: Exercise): void {
    this.exercisesStore.push(exercise);
    this.exerciseStore.currentExercises$.next(this.exercisesStore);
  }

  public updateExercise(exercise: Exercise): void {
    const index = this.exercisesStore.findIndex( e => e.id === exercise.id );
    this.exercisesStore[index] = exercise;
    this.exerciseStore.currentExercises$.next(this.exercisesStore);
  }

  public deleteExercise(exerciseId: string): void {
    this.exercisesStore = this.exercisesStore.filter( e => e.id !== exerciseId );
    this.exerciseStore.currentExercises$.next(this.exercisesStore);
  }

}
