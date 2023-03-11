import { Weight } from "./Weight";

export const benchPress: ExerciseId = "Bench Press";
export const dumbellCurl: ExerciseId = "Dumbbell Curl";
export const dumbellRow: ExerciseId = "Dumbbell Row";
export const deadlift: ExerciseId = "Deadlift";
export const goodMorning: ExerciseId = "Good Morning";
export const calfRaise: ExerciseId = "Calf Raise";

export type ExerciseId = string;
export type Exercise = {
  date: string;
  weight: Weight;
};
