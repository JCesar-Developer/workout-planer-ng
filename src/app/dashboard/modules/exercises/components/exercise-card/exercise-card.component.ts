import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exercise } from '@dashboard/shared/models/exercise.interface';

@Component({
  selector: 'exercise-card',
  templateUrl: './exercise-card.component.html',
})
export class ExerciseCardComponent {

  @Input() public exercise!: Exercise;
  @Input() public sets?: number;
  @Input() public reps?: number;
  @Input() public editable: boolean = false;
  @Input() public clickable: boolean = false;
  @Output() public emitExercise: EventEmitter<Exercise> = new EventEmitter();

  onEmitExercise() {
    if( !this.clickable ) return;
    this.emitExercise.emit(this.exercise);
  }

}
