import { Workout } from '@dashboard/shared/models/workout-interface';
import { Store } from '@/dashboard/store/dashboard.store';

export class AllWorkoutsStoreService {

  constructor( private store: Store ) {}

  public get allWorkouts(): Workout[] {
    return [...this.store.state.allWorkouts];
  }

  public setState( workouts: Workout[] ): void {
    const currentState = this.store.state;
    this.store.setState({ ...currentState, allWorkouts: workouts });
  }

}
