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

  constructor( private readonly store: Store ) {
    this.allExercisesStore = new AllExercisesStoreService( this.store );
    this.exerciseToRenderStore = new ExercisesToRenderStoreService( this.store );
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

  public getExercisesByName(name: string): Exercise[] {
    return this.allExercises.filter( e => e.name.toLowerCase().includes(name.toLowerCase()) );
  }

  public getExercisesByCategory(category: Category): Exercise[] {
    return this.allExercises.filter( e => e.category === category );
  }

  public getExercisesByNameAndCategory(name: string, category: Category): Exercise[] {
    return this.getExercisesByName(name).filter( e => e.category === category );
  }

  // SETTERS ---
  public setExercisesToRender(exercises: Exercise[]): void {
    this.exerciseToRenderStore.setState( exercises );
  }

  public setExercisesToRenderAllExercises(): void {
    this.exerciseToRenderStore.setState( this.allExercises );
  }

  // CRUD ACTIONS ---
  public save(exercise: Exercise): void {
    this.allExercises.push(exercise);

    this.exerciseToRenderStore.setState( this.allExercises );
    this.allExercisesStore.setState( this.allExercises );
  }

  public update(exercise: Exercise): void {
    const index = this.allExercises.findIndex( e => e.id === exercise.id );
    this.allExercises[index] = exercise;

    this.exerciseToRenderStore.setState( this.allExercises );
    this.allExercisesStore.setState( this.allExercises );
  }

  public delete(exerciseId: string): void {
    this.allExercises.filter( e => e.id !== exerciseId );

    this.exerciseToRenderStore.setState( this.allExercises );
    this.allExercisesStore.setState( this.allExercises );
  }

}
