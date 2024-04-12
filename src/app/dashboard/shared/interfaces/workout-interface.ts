import { Exercise } from "./exercise.interface";

export interface Workout {
  id: string;
  name: string;
  duration: number;
  exercises: Exercise[];
}
