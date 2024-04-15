import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Category } from '@dashboard/shared/interfaces/exercise.interface';
import { Workout } from '@dashboard/shared/interfaces/workout-interface';

@Component({
  selector: 'workout-form',
  templateUrl: './workout-form.component.html',
})
export class WorkoutFormComponent {

  public form: FormGroup = this.fb.group({});
  public filteredWorkouts: Workout = {
    "id": "1",
    "name": "Pecho",
    "duration": 120,
    "exercises": [
      {
        "id": "1",
        "name": "Exercise1",
        "category": Category.CHEST,
        "image": "./assets/images/exercises/exercise-1.gif",
        "alternativeImage": null
      },
      {
        "id": "2",
        "name": "Exercise2",
        "category": Category.LEGS,
        "image": "./assets/images/exercises/exercise-2.gif",
        "alternativeImage": null
      },
      {
        "id": "3",
        "name": "Exercise3",
        "category": Category.CORE,
        "image": "./assets/images/exercises/exercise-3.gif",
        "alternativeImage": null
      },
      {
        "id": "1",
        "name": "Exercise1",
        "category": Category.CHEST,
        "image": "./assets/images/exercises/exercise-1.gif",
        "alternativeImage": null
      },
      {
        "id": "2",
        "name": "Exercise2",
        "category": Category.LEGS,
        "image": "./assets/images/exercises/exercise-2.gif",
        "alternativeImage": null
      },
      {
        "id": "3",
        "name": "Exercise3",
        "category": Category.CORE,
        "image": "./assets/images/exercises/exercise-3.gif",
        "alternativeImage": null
      }
    ]
  };

  constructor(
    private fb: FormBuilder
  ) { }

  public onSubmit(): void {
    console.log('Submit');
  }

  public save(model: Workout): void {
    throw new Error('Method not implemented.');
  }

  public update(model: Workout): void {
    throw new Error('Method not implemented.');
  }

  public delete(modelId: string | number): void {
    throw new Error('Method not implemented.');
  }

}
