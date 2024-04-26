import { Observable, map } from 'rxjs';

import { Workout } from '@dashboard/shared/models/workout-interface';
import { dashboardStore, Store } from '@/dashboard/store/dashboard.store';

export class WorkoutsToRenderStoreService {

  private store: Store = dashboardStore;

  public get workouts$(): Observable<Workout[]> {
    return this.store.state$.pipe(
      map( state => state.workoutsToRender )
    );
  }

  public setState( workouts: Workout[] ): void {
    const currentState = this.store.state;
    this.store.setState({ ...currentState, workoutsToRender: workouts });
  }

}
