import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';

import { IdGenerator } from '@shared/plugins/uuid.plugin';
import { WorkoutHttpService } from '../http-services/workout-http.service';
import { Workout } from '../../interfaces/workout-interface';


@Injectable({providedIn: 'root'})
export class workoutStoreService {

  private workouts: Workout[] = [];
  // private currentCategory: string;
  private $workout: BehaviorSubject<Workout[]>;

  constructor(
    private workoutHttpService: WorkoutHttpService,
  ) {
    // this.currentCategory = Category.ALL;
    this.$workout = new BehaviorSubject<Workout[]>(this.workouts);
  }

  // SEARCH -------------------------------------------------------------------------------------
  // public getExercisesSuggestions(term: string): Exercise[] {
  //   if(!term) {
  //     this.$exercises.next(this.exercises);
  //     return [];
  //   }

  //   const suggestions: Exercise[] = this.exercises.filter( e => e.name.toLowerCase().includes(term.toLowerCase()) );
  //   this.$exercises.next(suggestions);
  //   return suggestions;
  // }

  // public getExerciseCategories(): Category[] {
  //   return Object.values(Category);
  // }

  // public filterExercisesByCategory(category: string): void {
  //   if(this.currentCategory === category) return;

  //   if(category === Category.ALL) {
  //     this.currentCategory = Category.ALL;
  //     this.$exercises.next(this.exercises);
  //     return;
  //   }

  //   const filteredExercises = this.exercises.filter( e => e.category === category );
  //   this.currentCategory = category;
  //   this.$exercises.next(filteredExercises);
  // }

  // CRUD -------------------------------------------------------------------------------------
  public getAll(): Observable<Workout[]> {
    if( this.workouts.length === 0 ) {
      this.getHttpWorkouts();
    }

    return this.$workout.asObservable();
  }

  private getHttpWorkouts(): void {
    this.workoutHttpService.getAll()
      .subscribe( workouts => {
        this.workouts = workouts;
        this.$workout.next(workouts)
      });
  }

  public save(exercise: Workout): Observable<boolean> {
    exercise.id = IdGenerator.generateId();
    return this.workoutHttpService.save(exercise).pipe(
      map(() => {
        this.workouts.push(exercise);
        this.$workout.next(this.workouts);
        return true;
      }),
      catchError(() => of(false))
    );
  }

  public update(exercise: Workout): Observable<boolean> {
    return this.workoutHttpService.update(exercise).pipe(
      map(() => {
        const index = this.workouts.findIndex( e => e.id === exercise.id );
        this.workouts[index] = exercise;
        this.$workout.next(this.workouts);
        return true;
      }),
      catchError(() => of(false))
    );
  }

  public delete(exerciseId: string): Observable<boolean> {
    return this.workoutHttpService.delete(exerciseId).pipe(
      map(() => {
        this.workouts = this.workouts.filter( e => e.id !== exerciseId );
        this.$workout.next(this.workouts);
        return true;
      }),
      catchError(() => of(false))
    );
  }

}
