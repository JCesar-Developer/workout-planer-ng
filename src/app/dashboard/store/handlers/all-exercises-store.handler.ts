import { Exercise } from '@dashboard/shared/models/exercise.interface';
import { dashboardStore, Store } from '@/dashboard/store/dashboard.store';

export class AllExercisesStoreService {

  private store: Store = dashboardStore;

  public get allExercises(): Exercise[] {
    return [...this.store.state.allExercises];
  }

  public setState(exercises: Exercise[]): void {
    const currentState = this.store.state;
    this.store.setState({ ...currentState, allExercises: exercises });
  }

}
