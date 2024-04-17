import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHttpService } from '../../interfaces/http.interface';

import type { Exercise } from '../../interfaces/exercise.interface';
import { environments } from 'src/environments/environments';
import { Observable, catchError, map, of } from 'rxjs';
import { IdGenerator } from '@shared/plugins/uuid.plugin';

@Injectable({providedIn: 'root'})
export class ExerciseHttpService implements IHttpService<Exercise> {

  public baseUrl: string = environments.baseUrl;

  constructor(
    private http: HttpClient,
  ) { }

  //GET ALL
  public getAll(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${ this.baseUrl }/exercises`);
  }

  //SAVE
  public save( exercise: Exercise ): Observable<boolean> {
    exercise.id = IdGenerator.generateId();
    return this.http.post<Exercise>(`${ this.baseUrl }/exercises`, exercise)
    .pipe(
      map(() => true ),
      catchError(() => of(false))
    );
  }

  //UPDATE
  public update( exercise: Exercise ): Observable<boolean> {
    return this.http.put<Exercise>(`${ this.baseUrl }/exercises/${ exercise.id }`, exercise)
      .pipe(
        map(() => true ),
        catchError(() => of(false))
      );
  }

  //DELETE
  public delete( exerciseId: string ): Observable<boolean> {
    return this.http.delete<Exercise>(`${ this.baseUrl }/exercises/${ exerciseId }`)
      .pipe(
        map(() => true ),
        catchError(() => of(false))
      );
  }

}
