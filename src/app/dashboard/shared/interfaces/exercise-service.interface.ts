import { Observable } from 'rxjs';
import type { Exercise } from '../interfaces/exercise.interface';

export interface IExerciseService {
  getExercises(): Exercise[] | Observable<Exercise[]>;
  // getExercisesSuggestions(term: string): Observable<Exercise[]>;
  save(exercise: Exercise): Observable<boolean> | Observable<Exercise>;
  update(exercise: Exercise): Observable<boolean> | Observable<Exercise>;
  delete(exerciseId: string): Observable<boolean> | Observable<Exercise>;
}
