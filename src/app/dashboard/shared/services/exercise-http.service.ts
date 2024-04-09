import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IExerciseService } from '../interfaces/exercise-service.interface';

import type { Exercise } from '../interfaces/exercise.interface';
import { environments } from 'src/environments/environments';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ExerciseHttpService implements IExerciseService {

  private baseUrl: string = environments.baseUrl;

  constructor( private http: HttpClient ) { }

  //GET ALL
  public getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${ this.baseUrl }/exercises`);
  }

  //SAVE
  public save( exercise: Exercise ): Observable<Exercise> {
    return this.http.post<Exercise>(`${ this.baseUrl }/exercises`, exercise);
  }

  //UPDATE
  public update( exercise: Exercise ): Observable<Exercise> {
    return this.http.put<Exercise>(`${ this.baseUrl }/exercises/${ exercise.id }`, exercise);
  }

  //DELETE
  public delete( exerciseId: string ): Observable<Exercise> {
    return this.http.delete<Exercise>(`${ this.baseUrl }/exercises/${ exerciseId }`);
  }

}
