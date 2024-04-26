import { Workout } from '@dashboard/shared/models/workout-interface';
import { StoreHandler } from './store-handler.helper';

export class WorkoutsToRenderStoreHandler extends StoreHandler<Workout>  {
  constructor() {
    super('workoutsToRender');
  }
}
