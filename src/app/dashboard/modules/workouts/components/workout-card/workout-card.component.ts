import { Component, Input } from '@angular/core';
import { Workout } from '@dashboard/shared/interfaces/workout-interface';

@Component({
  selector: 'workout-card',
  templateUrl: './workout-card.component.html',
})
export class WorkoutCardComponent {

  @Input() workout!: Workout;

}
