import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AllExercisesStoreService } from '@dashboard/store/handlers/all-exercises-store.handler';
import { ExercisesToRenderStoreService } from '@dashboard/store/handlers/exercises-to-render-store.handler';
import type { Category, Exercise } from '@dashboard/shared/models/exercise.interface';
import { Store } from '@/dashboard/store/dashboard.store';
import { StoreActions } from '../../interfaces/store-action.interface';

@Injectable({providedIn: 'root'})
export class ExerciseStoreActionsService implements StoreActions<Exercise> {

  private allExercisesStore: AllExercisesStoreService;
  private exerciseToRenderStore: ExercisesToRenderStoreService;

  constructor() {
    this.allExercisesStore = new AllExercisesStoreService();
    this.exerciseToRenderStore = new ExercisesToRenderStoreService();
  }

  public initializeStore( exercises: Exercise[] ): void {
    this.allExercisesStore.setState( exercises );
    this.exerciseToRenderStore.setState( exercises );
  }

  // GETTERS ---
  public get exercises$(): Observable<Exercise[]> {
    return this.exerciseToRenderStore.exercises$;
  }

  private get allExercises(): Exercise[] {
    return this.allExercisesStore.allExercises;
  }

  public getExerciseById(exerciseId: string): Exercise {
    return this.allExercises.find( e => e.id === exerciseId )!;
  }

  public getExercisesById(exerciseIds: string[]): Exercise[] {
    return this.allExercises.filter(e => exerciseIds.includes(e.id));
  }

  public getExercisesByName = this.getItemsByName;
  public getItemsByName(term: string): Exercise[] {
    return this.allExercises.filter( e => e.name.toLowerCase().includes(term.toLowerCase()) );
  }

  public getExercisesByCategory(category: Category): Exercise[] {
    return this.allExercises.filter( e => e.category === category );
  }

  public getExercisesByNameAndCategory(name: string, category: Category): Exercise[] {
    return this.getExercisesByName(name).filter( e => e.category === category );
  }

  // SETTERS ---
  public setExercisesToRender = this.setItemsToRender;
  public setItemsToRender(exercises: Exercise[]): void {
    this.exerciseToRenderStore.setState( exercises );
  }

  public setExercisesToRenderAllExercises = this.setItemsToRenderAllItems;
  public setItemsToRenderAllItems(): void {
    this.exerciseToRenderStore.setState( this.allExercises );
  }

  // CRUD ACTIONS ---
  public save(exercise: Exercise): void {
    const newExerciseArray = [...this.allExercises, exercise];

    this.exerciseToRenderStore.setState( newExerciseArray );
    this.allExercisesStore.setState( newExerciseArray );
  }

  public update(exercise: Exercise): void {
    const newExerciseArray = [...this.allExercises];
    const index = this.allExercises.findIndex( e => e.id === exercise.id );

    newExerciseArray[index] = exercise;

    this.exerciseToRenderStore.setState( newExerciseArray );
    this.allExercisesStore.setState( newExerciseArray );
  }

  public delete(exerciseId: string): void {
    const newExerciseArray = this.allExercises.filter( e => e.id !== exerciseId );

    this.exerciseToRenderStore.setState( newExerciseArray );
    this.allExercisesStore.setState( newExerciseArray );
  }

}
