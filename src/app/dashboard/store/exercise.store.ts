import { BehaviorSubject } from "rxjs";
import { Exercise } from "@dashboard/shared/models/exercise.interface";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ExerciseStore {
  // public exercisesStore: Exercise[] = [];
  public currentExercises$ = new BehaviorSubject<Exercise[]>([]);
}

// export class ExerciseStore {
//   private stateSubject = new BehaviorSubject<ExerciseState>({ exercises: [] });
//   public state$: Observable<ExerciseState> = this.stateSubject.asObservable();

//   public getState(): ExerciseState {
//     return this.stateSubject.getValue();
//   }

//   public setState(newState: ExerciseState): void {
//     this.stateSubject.next(newState);
//   }
// }
