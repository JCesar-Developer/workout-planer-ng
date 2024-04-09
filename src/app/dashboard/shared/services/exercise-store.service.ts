import { Injectable } from '@angular/core';
import { IExerciseService } from '../interfaces/exercise-service.interface';

import { Exercise } from '../interfaces/exercise.interface';
import { ExerciseHttpService } from './exercise-http.service';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { IdGenerator } from '@shared/plugins/uuid.plugin';


@Injectable({providedIn: 'root'})
export class ExerciseStoreService implements IExerciseService {

  private exercises: Exercise[] = [];
  private exercisesSubject: BehaviorSubject<Exercise[]>;

  // getExercises(): Observable<Exercise[]> {
  //   return this.exercisesSubject.asObservable();
  // }

  // updateExercises(newExercises: Exercise[]): void {
  //   this.exercises = newExercises;
  //   this.exercisesSubject.next(this.exercises);
  // }


  constructor(
    private exercisesHttpService: ExerciseHttpService,
  ) {
    this.exercisesSubject = new BehaviorSubject<Exercise[]>(this.exercises);
  }

  getHttpExercises(): Observable<Exercise[]> {
    return this.exercisesHttpService.getExercises().pipe(
      tap( exercises => this.exercises = exercises )
    )
  }

  // getExercises(): Exercise[] {
  //   return this.exercises;
  // }

  getExercises(): Observable<Exercise[]> {
    return this.exercisesSubject.asObservable();
  }


  // getExercisesSuggestions(term: string): Observable<Exercise[]> {
  //   throw new Error('Method not implemented.');
  // }

  save(exercise: Exercise): Observable<boolean> {
    // exercise.id = this.exercises.length + 1;
    exercise.id = IdGenerator.generateId();
    return this.exercisesHttpService.save(exercise).pipe(
      map(() => {
        this.exercises.push(exercise);
        this.exercisesSubject.next(this.exercises);
        return true;
      }),
      catchError(() => of(false))
    );
  }

  update(exercise: Exercise): Observable<boolean> {
    return this.exercisesHttpService.update(exercise).pipe(
      map(() => {
        const index = this.exercises.findIndex( e => e.id === exercise.id );
        this.exercises[index] = exercise;
        this.exercisesSubject.next(this.exercises);
        return true;
      }),
      catchError(() => of(false))
    );
  }

  delete(exerciseId: string): Observable<boolean> {
    return this.exercisesHttpService.delete(exerciseId).pipe(
      map(() => {
        this.exercises = this.exercises.filter( e => e.id !== exerciseId );
        this.exercisesSubject.next(this.exercises);
        return true;
      }),
      catchError(() => of(false))
    );
  }

}
