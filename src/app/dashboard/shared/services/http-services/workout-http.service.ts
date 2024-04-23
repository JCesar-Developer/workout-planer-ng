import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

import { environments } from 'src/environments/environments';
import { HttpServiceInterface } from '@dashboard/shared/interfaces/http-service.interface';
import { Workout } from '@dashboard/shared/models/workout-interface';
import { IdGenerator } from '@shared/plugins/uuid.plugin';

@Injectable({providedIn: 'root'})
export class WorkoutHttpService implements HttpServiceInterface<Workout> {

  public baseUrl: string = environments.baseUrl;

  constructor( private http: HttpClient ) { }

  //GET ALL
  public getAll(): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${ this.baseUrl }/workouts`);
  }

  //SAVE
  public save( workout: Workout ): Observable<boolean> {
    workout.id = IdGenerator.generateId();
    return this.http.post<Workout>(`${ this.baseUrl }/workouts`, workout)
      .pipe(
        map(() => true ),
        catchError(() => of(false))
      );
  }

  //UPDATE
  public update( workout: Workout ): Observable<boolean> {
    return this.http.put<Workout>(`${ this.baseUrl }/workouts/${ workout.id }`, workout)
      .pipe(
        map(() => true ),
        catchError(() => of(false))
      );
  }

  //DELETE
  public delete( workoutId: string ): Observable<boolean> {
    return this.http.delete<Workout>(`${ this.baseUrl }/workouts/${ workoutId }`)
      .pipe(
        map(() => true ),
        catchError(() => of(false))
      );
  }

}
