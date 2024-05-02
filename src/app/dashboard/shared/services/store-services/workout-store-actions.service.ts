import { Injectable } from '@angular/core';

import type { Workout } from '@dashboard/shared/models/workout-interface';
import { StoreHandlerService } from '@/dashboard/store/handlers/store-handler.service';
import { StoreActionsHelper } from '../../helpers/store-actions.helper';

@Injectable({providedIn: 'any'})
export class WorkoutStoreActionsService extends StoreActionsHelper<Workout> {

  constructor( private storeHandlerService: StoreHandlerService ) {
    super(storeHandlerService.allWorkoutsStore, storeHandlerService.workoutsToRenderStore);
  }

}
