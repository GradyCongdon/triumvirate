"use client";
import { WorkoutRegiment, WorkoutSetId } from "./types";

type WorkoutSetTemplateProps = {
  workoutRegiment: WorkoutRegiment;
  workoutSetId: WorkoutSetId;
  onChange: (workoutSetId: WorkoutSetId) => void;
};
export const WorkoutSetTemplate = ({
  workoutSetId,
  workoutRegiment,
  onChange,
}: WorkoutSetTemplateProps) => {
  return (
    <div>
      <span>Workout Set: </span>
      <select value={workoutSetId} onChange={(e) => onChange(e.target.value)}>
        {Object.keys(workoutRegiment.setExercises).map((workoutSetId) => (
          <option key={workoutSetId} value={workoutSetId}>
            {workoutSetId}
          </option>
        ))}
      </select>
    </div>
  );
};
