import { Observable } from 'rxjs';

export interface IHttpService<T> {
  getAll(): Observable<T[]>;
  save(model: T): Observable<T>;
  update(model: T): Observable<T>;
  delete(id: string): Observable<T>;
}
