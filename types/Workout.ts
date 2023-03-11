import { ExerciseId } from "./Exercise";

export type WorkoutId = string;
// @description: A workout is a collection of exercises.
export type Workout = {
  id: WorkoutId;
  exercises: ExerciseId[];
};
// @description: An exercise set is a collection of repetitions and an ormDecimal.
export type ExerciseSet = {
  repetitions: number;
  ormDecimal: number;
};
export type WorkoutTemplateId = string;
// @description: A workout template is a collection of exercise sets.
export type WorkoutTemplate = {
  id: WorkoutTemplateId;
  sets: ExerciseSet[];
};

export type WorkoutRegiment = {
  id: string;
  workouts: Record<WorkoutId, Workout>;
  workoutTemplates: Record<WorkoutTemplateId, WorkoutTemplate>;
};

// Set should probably be reps x weight
// Exerercise set should be a ExerciseTemplate?
// Workout - ExerciseTemplates
// WorkoutTemplate - SetTemplates
// ExerciseSet - SetTemplate
// Workout = ExerciseTemplate x SetTemplate
