export interface Workout {
  id: string;
  name: string;
  duration: number;
  categorizedExercises: CategorizedExercise[];
}

export interface CategorizedExercise {
  exerciseId: string;
  sets: number;
  reps: number;
  rest: number;
}
