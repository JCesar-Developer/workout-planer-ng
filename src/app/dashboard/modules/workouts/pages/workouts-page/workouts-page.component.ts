import { Component } from '@angular/core';
import { Workout } from '@dashboard/shared/interfaces/workout-interface';

@Component({
  selector: 'workouts-page',
  templateUrl: './workouts-page.component.html',
})
export class WorkoutsPageComponent {

  public workouts: Workout[] = []

  public onOpenForm(): void {
    console.log('Open form');
  }



}
