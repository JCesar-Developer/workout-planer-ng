import { Component, Input } from '@angular/core';
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

}
