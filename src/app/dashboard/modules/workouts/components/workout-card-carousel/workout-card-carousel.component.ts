import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from '@dashboard/shared/interfaces/exercise.interface';

@Component({
  selector: 'workout-card-carousel',
  templateUrl: './workout-card-carousel.component.html',
})
export class WorkoutCardCarouselComponent implements OnInit {

  @Input() exercises!: Exercise[];
  public responsiveOptions: any[] = [];

  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: '2400px',
        numVisible: 8,
        numScroll: 1
      },
      {
        breakpoint: '1920px',
        numVisible: 7,
        numScroll: 1
      },
      {
        breakpoint: '1440px',
        numVisible: 6,
        numScroll: 1
      }
    ];
  }


}
