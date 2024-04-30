import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Exercise } from '@dashboard/shared/models/exercise.interface';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

interface ResponsiveOptions {
  breakpoint: string;
  numVisible: number;
  numScroll: number;
}

const minimizeResponsiveOptions: ResponsiveOptions[] = [
  { breakpoint: '2400px', numVisible: 7, numScroll: 1 },
  { breakpoint: '1920px', numVisible: 6, numScroll: 1 },
];

const maximizeResponsiveOptions: ResponsiveOptions[] = [
  { breakpoint: '2400px', numVisible: 10, numScroll: 1 },
  { breakpoint: '1920px', numVisible: 9, numScroll: 1 },
];

@Component({
  selector: 'exercise-carousel',
  templateUrl: './exercise-carousel.component.html',
})
export class ExerciseCarouselComponent implements OnInit, OnDestroy {

  @Input() exercises?: Exercise[];
  @Input() exerciseSets?: number[];
  @Input() exerciseReps?: number[];
  @Input() editableCards: boolean = false;
  @Input() clickableCards: boolean = false;
  @Output() emitExercise: EventEmitter<Exercise> = new EventEmitter();

  public minimized: boolean;
  public minOptions: ResponsiveOptions[];
  public maxOptions: ResponsiveOptions[];
  private onMaximize$?: Subscription;


  constructor( private ref: DynamicDialogRef ) {
    this.minimized = true;
    this.minOptions = minimizeResponsiveOptions;
    this.maxOptions = maximizeResponsiveOptions;
  }

  ngOnInit(): void {
    this.onMaximize$ = this.ref.onMaximize.subscribe(() => {
      this.minimized = !this.minimized;
    });
  }

  ngOnDestroy(): void {
    this.onMaximize$?.unsubscribe();
  }

  public onEmitExercise(exercise: Exercise) {
    if( !this.clickableCards ) return;
    this.emitExercise.emit(exercise);
  }

}
