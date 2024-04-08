import { Injectable } from '@angular/core';
import { IExerciseService } from '../interfaces/exercise-service.interface';

import { Exercise } from '../interfaces/exercise.interface';
import { ExerciseHttpService } from './exercises-http.service';
import { Observable, catchError, map, of, tap } from 'rxjs';


@Injectable({providedIn: 'root'})
export class ExerciseStoreService implements IExerciseService {

  public exercises: Exercise[] = [];

  constructor(
    private exercisesHttpService: ExerciseHttpService,
  ) {}

  getHttpExercises(): Observable<Exercise[]> {
    return this.exercisesHttpService.getExercises().pipe(
      tap( exercises => this.exercises = exercises )
    )
  }

  getExercises(): Exercise[] {
    return this.exercises;
  }

  // getExercisesSuggestions(term: string): Observable<Exercise[]> {
  //   throw new Error('Method not implemented.');
  // }

  save(exercise: Exercise): Observable<boolean> {
    return this.exercisesHttpService.save(exercise).pipe(
      map(() => {
        this.exercises.push(exercise);
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
        return true;
      }),
      catchError(() => of(false))
    );
  }

  delete(exerciseId: number): Observable<boolean> {
    return this.exercisesHttpService.delete(exerciseId).pipe(
      map(() => {
        this.exercises = this.exercises.filter( e => e.id !== exerciseId );
        return true;
      }),
      catchError(() => of(false))
    );
  }

}
