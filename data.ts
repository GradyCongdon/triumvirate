import {
  benchPress,
  calfRaise,
  deadlift,
  dumbellCurl,
  dumbellRow,
  ExerciseId,
  goodMorning,
} from "@/types/Exercise";
import { WorkoutId, WorkoutRegiment, WorkoutTemplateId } from "@/types/Workout";
import { Person } from "./types/Person";

export const triumv: WorkoutRegiment = {
  id: "Triumvirate",
  workouts: {
    "Day 1": {
      id: "Day 1",
      exercises: [benchPress, dumbellCurl, dumbellRow],
    },
    "Day 2": {
      id: "Day 2",
      exercises: [deadlift, goodMorning, calfRaise],
    },
  },
  workoutTemplates: {
    "Week 1": {
      id: "Week 1",
      sets: [
        { repetitions: 5, ormDecimal: 0.65 },
        { repetitions: 5, ormDecimal: 0.75 },
        { repetitions: 5, ormDecimal: 0.85 },
      ],
    },
    "Week 2": {
      id: "Week 2",
      sets: [
        { repetitions: 3, ormDecimal: 0.7 },
        { repetitions: 15, ormDecimal: 0.08 },
        { repetitions: 1, ormDecimal: 4.9 },
      ],
    },
    "Week 3": {
      id: "Week 3",
      sets: [
        { repetitions: 15, ormDecimal: 0.75 },
        { repetitions: 13, ormDecimal: 0.85 },
        { repetitions: 21, ormDecimal: 0.95 },
      ],
    },
    "Week 4": {
      id: "Week 4",
      sets: [
        { repetitions: 5, ormDecimal: 0.4 },
        { repetitions: 5, ormDecimal: 0.5 },
        { repetitions: 5, ormDecimal: 0.6 },
      ],
    },
  },
};

export const grady: Person = {
  id: "Grady",
  exerciseORMs: {
    [benchPress]: {
      date: "2023-03-09T22:28:21.072Z",
      weight: { amount: 32.5, unit: "kg" },
    },
    [dumbellCurl]: {
      date: "2023-03-12T22:28:21.072Z",
      weight: { amount: 20, unit: "kg" },
    },
    [dumbellRow]: {
      date: "2023-03-09T22:28:21.072Z",
      weight: { amount: 25, unit: "kg" },
    },
  },
};

type StepSize = number;
type ShowSection = boolean;

export type State = {
  id: number;
  workoutRegiment: WorkoutRegiment;
  person: Person;
  workoutTemplateId: WorkoutTemplateId;
  workoutId: WorkoutId;
  exerciseId: ExerciseId;
  stepSize: StepSize;
  showSection: ShowSection;
};

export const exampleState: State = {
  id: 1,
  workoutRegiment: triumv,
  person: grady,
  workoutTemplateId: "Week 1",
  workoutId: "Day 1",
  exerciseId: benchPress,
  stepSize: 5,
  showSection: false,
};

export const isValid = (state: any): boolean => {
  return (
    state &&
    state.workoutRegiment &&
    state.person &&
    state.workoutTemplateId &&
    state.workoutId &&
    state.exerciseId &&
    state.stepSize &&
    state.showSection
  );
};
