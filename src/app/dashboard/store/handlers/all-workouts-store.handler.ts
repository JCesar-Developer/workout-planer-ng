import { StoreHandler } from './store-handler.helper';
import { Workout } from '@dashboard/shared/models/workout-interface';

export class AllWorkoutsStoreHandler extends StoreHandler<Workout> {
  constructor() {
    super('allWorkouts');
  }
}
