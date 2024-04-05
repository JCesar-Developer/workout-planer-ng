import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exercise } from '@dashboard/shared/interfaces/exercise.interface';

@Component({
  selector: 'exercise-card',
  templateUrl: './exercise-card.component.html',
  styles: [
  ]
})
export class ExerciseCardComponent {

  @Input() public exercise!: Exercise;
  @Output() public onEditExercise: EventEmitter<Exercise> = new EventEmitter();

  public editExercise() {
    this.onEditExercise.emit( this.exercise );
  }

}
