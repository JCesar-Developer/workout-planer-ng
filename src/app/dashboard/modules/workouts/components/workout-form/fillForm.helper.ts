import { Injectable } from "@angular/core";

import { Exercise } from "@/dashboard/shared/models/exercise.interface";
import { Workout } from "@/dashboard/shared/models/workout-interface";
import { ExerciseStoreActionsService } from "@/dashboard/shared/services/store-services/exercise-store-actions.service";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable()
export class FillFormService {
  constructor(
    private fb: FormBuilder,
    private exerciseStoreActions: ExerciseStoreActionsService,
  ) {}

  getHelper(workout: Workout): FillFormHelper {
    const helper = new FillFormHelper(this.fb, this.exerciseStoreActions);
    helper.setWorkout(workout);

    return helper;
  }
}

class FillFormHelper {
  private workout!: Workout;

  constructor(
    private fb: FormBuilder,
    private exerciseStoreActions: ExerciseStoreActionsService,
  ) {}

  public setWorkout = (workout: Workout): void => {
    if (!workout) throw new Error('Workout is not defined');
    this.workout = workout;
  }

  public getWorkoutId(): string {
    return this.workout.id;
  }

  public getExercises(): Exercise[] {
    const exercisesIds: string[] = this.workout.categorizedExercises.map(catEx => catEx.exerciseId);
    return this.exerciseStoreActions.getItemsById(exercisesIds);
  }

  public setFormValues( form: FormGroup ): void {
    form.patchValue({
      id: this.workout.id,
      name: this.workout.name,
      duration: this.workout.duration,
    });
  }

  public setCategorizedExercises(categorizedExercises: FormArray ): void {
    this.workout.categorizedExercises.forEach(({ exerciseId, sets, reps, rest }) => {
      categorizedExercises.push(
        this.fb.group({
          exerciseId: [exerciseId],
          sets: [sets, [Validators.required, Validators.min(1)]],
          reps: [reps, [Validators.required, Validators.min(1)]],
          rest: [rest, [Validators.required, Validators.min(10)]],
        })
      );
    });
  }

}


