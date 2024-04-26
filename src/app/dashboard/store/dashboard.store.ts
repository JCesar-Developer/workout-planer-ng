import { BehaviorSubject, Observable } from "rxjs";
import { Exercise } from "@dashboard/shared/models/exercise.interface";
import { Workout } from "../shared/models/workout-interface";

export interface AppState {
  allExercises: Exercise[];
  exercisesToRender: Exercise[];
  allWorkouts: Workout[];
  workoutsToRender: Workout[];
}

export class Store {
  private stateSubject = new BehaviorSubject<AppState>({
    allExercises: [],
    exercisesToRender: [],
    allWorkouts: [],
    workoutsToRender: [],
  });

  public get state(): AppState {
    return this.stateSubject.getValue();
  }

  public get state$(): Observable<AppState> {
    return this.stateSubject.asObservable();
  }

  public setState(newState: AppState): void {
    this.stateSubject.next(newState);
  }
}

export const dashboardStore = new Store();
