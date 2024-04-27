import { Component } from '@angular/core';

import { ExerciseStoreActionsService } from '@/dashboard/shared/services/store-services/exercise-store-actions.service';

@Component({
  selector: 'exercise-page-header',
  templateUrl: './exercise-page-header.component.html',
})
export class ExercisePageHeaderComponent {

  constructor(
    public exerciseStoreActions: ExerciseStoreActionsService
  ) {}

}
