import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exercise } from '@dashboard/shared/interfaces/exercise.interface';

@Component({
  selector: 'exercise-card',
  templateUrl: './exercise-card.component.html',
})
export class ExerciseCardComponent {

  @Input() public exercise!: Exercise;
  @Output() public onEditExercise: EventEmitter<Exercise> = new EventEmitter();

  public editExercise(): void {
    this.onEditExercise.emit( this.exercise );
  }

}
