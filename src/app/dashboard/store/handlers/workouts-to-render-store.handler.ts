import { Observable, map } from 'rxjs';

import { Workout } from '@dashboard/shared/models/workout-interface';
import { Store } from '@/dashboard/store/dashboard.store';

export class WorkoutsToRenderStoreService {

  constructor( private store: Store ) {}

  public get workouts$(): Observable<Workout[]> {
    return this.store.state$.pipe(
      map( state => state.workoutsToRender )
    );
  }

  public setState( workouts: Workout[] ): void {
    const currentState = this.store.getState();
    this.store.setState({ ...currentState, workoutsToRender: workouts });
  }

}
