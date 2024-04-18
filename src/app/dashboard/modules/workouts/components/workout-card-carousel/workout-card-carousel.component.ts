import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exercise } from '@dashboard/shared/interfaces/exercise.interface';

interface ResponsiveOptions {
  breakpoint: string;
  numVisible: number;
  numScroll: number;
}

@Component({
  selector: 'workout-card-carousel',
  templateUrl: './workout-card-carousel.component.html',
})
export class WorkoutCardCarouselComponent {

  @Input() exercises?: Exercise[];
  @Input() editableCards?: boolean = false;
  @Input() clickableCards?: boolean = false;
  @Output() emitExercise: EventEmitter<Exercise> = new EventEmitter();

  public responsiveOptions!: ResponsiveOptions[];

  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: '2400px',
        numVisible: 7,
        numScroll: 1
      },
      {
        breakpoint: '1920px',
        numVisible: 6,
        numScroll: 1
      }
    ];
  }

  public onEmitExercise(exercise: Exercise) {
    if( !this.clickableCards ) return;
    this.emitExercise.emit(exercise);
  }

}
