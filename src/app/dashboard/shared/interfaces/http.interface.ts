import { Observable } from 'rxjs';

export interface IHttpService<T> {
  getAll(): Observable<T[]>;
  save(model: T): Observable<boolean>;
  update(model: T): Observable<boolean>;
  delete(id: string): Observable<boolean>;
}
