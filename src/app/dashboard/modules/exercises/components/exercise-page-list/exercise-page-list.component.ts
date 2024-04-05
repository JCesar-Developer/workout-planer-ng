import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exercise } from '@dashboard/shared/interfaces/exercise.interface';

@Component({
  selector: 'exercise-page-list',
  templateUrl: './exercise-page-list.component.html',
})
export class ExercisePageListComponent {

  @Input() exercises: Exercise[] = [];
  @Output() onEditForm: EventEmitter<Exercise> = new EventEmitter();

  public openExerciseForm( exercise?: Exercise ) {
    this.onEditForm.emit( exercise );
  }
}
