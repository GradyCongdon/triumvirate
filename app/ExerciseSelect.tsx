"use client";
import { WorkoutRegiment, ExerciseId, WorkoutSetId } from "./types";

type ExerciseSelectProps = {
  workoutRegiment: WorkoutRegiment;
  workoutSetId: WorkoutSetId;
  exerciseId: ExerciseId;
  onChange: (exerciseId: ExerciseId) => void;
};
export const ExerciseSelect = ({
  workoutRegiment,
  workoutSetId,
  exerciseId,
  onChange,
}: ExerciseSelectProps) => {
  return (
    <div>
      <span>Exercise: </span>
      <select value={exerciseId} onChange={(e) => onChange(e.target.value)}>
        {workoutRegiment.setExercises[workoutSetId].exercises.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
    </div>
  );
};
