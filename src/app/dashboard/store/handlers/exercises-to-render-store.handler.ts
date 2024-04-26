import { Exercise } from '@dashboard/shared/models/exercise.interface';
import { StoreHandler } from './store-handler.helper';

export class ExercisesToRenderStoreHandler extends StoreHandler<Exercise> {
  constructor() {
    super('exercisesToRender');
  }
}
