import { ExerciseStoreActionsService } from '@/dashboard/shared/services/store-services/exercise-store-actions.service';
import { Component } from '@angular/core';

@Component({
  selector: 'exercise-page-header',
  templateUrl: './exercise-page-header.component.html',
})
export class ExercisePageHeaderComponent {

  constructor(
    public exerciseStoreActions: ExerciseStoreActionsService
  ) {}

}
