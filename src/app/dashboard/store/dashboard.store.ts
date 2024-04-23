import { BehaviorSubject, Observable } from "rxjs";
import { Exercise } from "@dashboard/shared/models/exercise.interface";
import { Injectable } from "@angular/core";
import { Workout } from "../shared/models/workout-interface";

interface AppState {
  exercises: Exercise[];
  workouts: Workout[];
}

@Injectable({ providedIn: 'root' })
export class Store {
  private stateSubject = new BehaviorSubject<AppState>({
    exercises: [],
    workouts: [],
  });

  public get state$(): Observable<AppState> {
    return this.stateSubject.asObservable();
  }

  public getState(): AppState {
    return this.stateSubject.getValue();
  }

  public setState(newState: AppState): void {
    this.stateSubject.next(newState);
  }
}
