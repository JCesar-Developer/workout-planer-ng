import { Workout } from '@dashboard/shared/models/workout-interface';
import { Store } from '@/dashboard/store/dashboard.store';

export class AllWorkoutsStoreService {

  constructor( private store: Store ) {}

  public get allWorkouts(): Workout[] {
    return [...this.store.getState().allWorkouts];
  }

  public setState( workouts: Workout[] ): void {
    const currentState = this.store.getState();
    this.store.setState({ ...currentState, allWorkouts: workouts });
  }

}
