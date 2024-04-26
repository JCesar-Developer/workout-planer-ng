import { Observable, map } from 'rxjs';

import { Exercise } from '@dashboard/shared/models/exercise.interface';
import { Store } from '@/dashboard/store/dashboard.store';

export class ExercisesToRenderStoreService {

  constructor( private store: Store ) {}

  public get exercises$(): Observable<Exercise[]> {
    return this.store.state$.pipe(
      map( state => state.exercisesToRender )
    );
  }

  public setState(exercises: Exercise[]): void {
    const currentState = this.store.state;
    this.store.setState({ ...currentState, exercisesToRender: exercises });
  }

}
