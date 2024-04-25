import { CategorizedExercise } from '@/dashboard/shared/models/workout-interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-workout-card-list',
  templateUrl: './workout-card-list.component.html',
})
export class WorkoutCardListComponent {

  @Input() catExercises: CategorizedExercise[] = [];

}
