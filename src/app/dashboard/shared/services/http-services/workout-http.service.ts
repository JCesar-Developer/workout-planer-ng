import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environments } from 'src/environments/environments';
import { IHttpService } from '@dashboard/shared/interfaces/http.interface';
import { Workout } from '@dashboard/shared/interfaces/workout-interface';

@Injectable({providedIn: 'root'})
export class WorkoutHttpService implements IHttpService<Workout> {

  public baseUrl: string = environments.baseUrl;

  constructor( private http: HttpClient ) { }

  //GET ALL
  public getAll(): Observable<Workout[]> {
    console.log('Entramos');

    return this.http.get<Workout[]>(`${ this.baseUrl }/workouts`);
  }

  //SAVE
  public save( workout: Workout ): Observable<Workout> {
    return this.http.post<Workout>(`${ this.baseUrl }/workouts`, workout);
  }

  //UPDATE
  public update( workout: Workout ): Observable<Workout> {
    return this.http.put<Workout>(`${ this.baseUrl }/workouts/${ workout.id }`, workout);
  }

  //DELETE
  public delete( workoutId: string ): Observable<Workout> {
    return this.http.delete<Workout>(`${ this.baseUrl }/workouts/${ workoutId }`);
  }

}
