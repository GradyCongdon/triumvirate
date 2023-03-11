import { Exercise, ExerciseId } from "./Exercise";

export type ExerciseORM = Record<ExerciseId, Exercise>;
export type Person = {
  id: string;
  exerciseORMs: ExerciseORM;
};
