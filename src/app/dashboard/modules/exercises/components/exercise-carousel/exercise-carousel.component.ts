import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exercise } from '@dashboard/shared/models/exercise.interface';

export interface ResponsiveOptions {
  breakpoint: string;
  numVisible: number;
  numScroll: number;
}

const customResponsiveOptions: ResponsiveOptions[] = [
  { breakpoint: '2400px', numVisible: 7, numScroll: 1 },
  { breakpoint: '1920px', numVisible: 6, numScroll: 1 },
];

@Component({
  selector: 'exercise-carousel',
  templateUrl: './exercise-carousel.component.html',
})
export class ExerciseCarouselComponent {

  @Input() exercises?: Exercise[];
  @Input() exerciseSets?: number[];
  @Input() exerciseReps?: number[];

  @Input() editableCards: boolean = false;

  @Input() canEmitExercise: boolean = false;
  @Input() responsiveOptions: ResponsiveOptions[] = customResponsiveOptions;
  @Output() emitExercise: EventEmitter<Exercise> = new EventEmitter();

  public onEmitExercise(exercise: Exercise) {
    if( !this.canEmitExercise ) return;
    this.emitExercise.emit(exercise);
  }

}
