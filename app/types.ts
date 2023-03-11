export type ExerciseId = string;
export type Exercise = {
  date: string;
  weight: Weight;
};
export type ExerciseORM = Record<ExerciseId, Exercise>;
export type Person = {
  id: string;
  exerciseORMs: ExerciseORM;
};
export type WorkoutSetId = string;
type WorkoutSetExercise = {
  id: WorkoutSetId;
  exercises: ExerciseId[];
};
type WeightUnit = "kg" | "lb";
export type Weight = {
  amount: number;
  unit: WeightUnit;
};
export type ExerciseSetTemplateId = string;
export type ExerciseSetTemplate = {
  id: ExerciseSetTemplateId;
  sets: ExerciseSet[];
};
export type ExerciseSet = {
  repetitions: number;
  ormDecimal: number;
};
export type WorkoutRegiment = {
  id: string;
  setExercises: Record<WorkoutSetId, WorkoutSetExercise>;
  exerciseSetTemplate: Record<ExerciseSetTemplateId, ExerciseSetTemplate>;
};

export type OrmMap = Record<number, Weight>;
