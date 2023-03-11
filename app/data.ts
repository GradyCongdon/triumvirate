import { WorkoutRegiment, ExerciseId, Person } from "./types";

export const triumv: WorkoutRegiment = {
  id: "Triumv",
  setExercises: {
    "Day 1": {
      id: "Day 1",
      exercises: ["benchPress", "dumbbell curl", "dumbbell row"],
    },
    "Day 2": {
      id: "Day 2",
      exercises: ["deadlift", "good morning", "calf raise"],
    },
  },
  exerciseSetTemplate: {
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
        { repetitions: 3, ormDecimal: 0.8 },
        { repetitions: 3, ormDecimal: 0.9 },
      ],
    },
    "Week 3": {
      id: "Week 3",
      sets: [
        { repetitions: 5, ormDecimal: 0.75 },
        { repetitions: 3, ormDecimal: 0.85 },
        { repetitions: 1, ormDecimal: 0.95 },
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
export const benchPress: ExerciseId = "benchPress";
export const grady: Person = {
  id: "Grady",
  exerciseORMs: {
    [benchPress]: {
      date: "2023-03-09T22:28:21.072Z",
      weight: { amount: 32.5, unit: "kg" },
    },
  },
};

export const exampleState = {
  id: 1,
  workoutRegiment: triumv,
  person: grady,
  exerciseSetTemplateId: "Week 1",
  workoutSetId: "Day 1",
  exerciseId: benchPress,
  stepSize: 5,
  showSection: false,
};

export const isValid = (state: any): state is typeof exampleState => {
  return (
    state &&
    state.workoutRegiment &&
    state.person &&
    state.exerciseSetTemplateId &&
    state.workoutSetId &&
    state.exerciseId &&
    state.stepSize &&
    state.showSection
  );
};
