import { Component, Input, OnInit } from '@angular/core';
import { Workout } from '@dashboard/shared/interfaces/workout-interface';

@Component({
  selector: 'workout-card',
  templateUrl: './workout-card.component.html',
})
export class WorkoutCardComponent implements OnInit {

  @Input() workout!: Workout;
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
