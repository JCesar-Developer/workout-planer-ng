import { Component, Input } from '@angular/core';
import { Exercise } from '@dashboard/shared/interfaces/exercise.interface';

@Component({
  selector: 'exercise-card',
  templateUrl: './exercise-card.component.html',
  styles: [
  ]
})
export class ExerciseCardComponent {

  @Input()
  public exercise!: Exercise;

}
