import { Injectable } from '@angular/core';
import { IExerciseService } from '../interfaces/exercise-service.interface';

import { Exercise, Category } from '../interfaces/exercise.interface';
import { ExerciseHttpService } from './exercise-http.service';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { IdGenerator } from '@shared/plugins/uuid.plugin';


@Injectable({providedIn: 'root'})
export class ExerciseStoreService implements IExerciseService {

  private exercises: Exercise[] = [];
  private currentCategory: string;
  private $exercises: BehaviorSubject<Exercise[]>;

  constructor(
    private exercisesHttpService: ExerciseHttpService,
  ) {
    this.currentCategory = Category.ALL;
    this.$exercises = new BehaviorSubject<Exercise[]>(this.exercises);
  }

  // SEARCH -------------------------------------------------------------------------------------
  public getExercisesSuggestions(term: string): Exercise[] {
    if(!term) {
      this.$exercises.next(this.exercises);
      return [];
    }

    const suggestions: Exercise[] = this.exercises.filter( e => e.name.toLowerCase().includes(term.toLowerCase()) );
    this.$exercises.next(suggestions);
    return suggestions;
  }

  public getExerciseCategories(): Category[] {
    return Object.values(Category);
  }

  public filterExercisesByCategory(category: string): void {
    if(this.currentCategory === category) return;

    if(category === Category.ALL) {
      this.currentCategory = Category.ALL;
      this.$exercises.next(this.exercises);
      return;
    }

    const filteredExercises = this.exercises.filter( e => e.category === category );
    this.currentCategory = category;
    this.$exercises.next(filteredExercises);
  }

  // CRUD -------------------------------------------------------------------------------------
  public getAll(): Observable<Exercise[]> {
    if( this.exercises.length === 0 ) {
      this.getHttpExercises();
    }

    return this.$exercises.asObservable();
  }

  private getHttpExercises(): void {
    this.exercisesHttpService.getAll()
      .subscribe( exercises => {
        this.exercises = exercises;
        this.$exercises.next(exercises)
      });
  }

  public save(exercise: Exercise): Observable<boolean> {
    exercise.id = IdGenerator.generateId();
    return this.exercisesHttpService.save(exercise).pipe(
      map(() => {
        this.exercises.push(exercise);
        this.$exercises.next(this.exercises);
        return true;
      }),
      catchError(() => of(false))
    );
  }

  public update(exercise: Exercise): Observable<boolean> {
    return this.exercisesHttpService.update(exercise).pipe(
      map(() => {
        const index = this.exercises.findIndex( e => e.id === exercise.id );
        this.exercises[index] = exercise;
        this.$exercises.next(this.exercises);
        return true;
      }),
      catchError(() => of(false))
    );
  }

  public delete(exerciseId: string): Observable<boolean> {
    return this.exercisesHttpService.delete(exerciseId).pipe(
      map(() => {
        this.exercises = this.exercises.filter( e => e.id !== exerciseId );
        this.$exercises.next(this.exercises);
        return true;
      }),
      catchError(() => of(false))
    );
  }

}
