import { Injectable } from '@angular/core';

import type { Category, Exercise } from '@dashboard/shared/models/exercise.interface';
import { StoreHandlerService } from '@/dashboard/store/handlers/store-handler.service';
import { StoreActionsHelper } from '../../helpers/store-actions.helper';

@Injectable({providedIn: 'any'})
export class ExerciseStoreActionsService extends StoreActionsHelper<Exercise> {

  constructor( private storeHandlerService: StoreHandlerService ) {
    super( storeHandlerService.allExercisesStore, storeHandlerService.exercisesToRenderStore );
  }

  public getExercisesByCategory(category: Category): Exercise[] {
    return this.allItems.filter( e => e.category === category );
  }

  public getExercisesByNameAndCategory(name: string, category: Category): Exercise[] {
    return this.getItemsByName(name).filter( e => e.category === category );
  }
}
