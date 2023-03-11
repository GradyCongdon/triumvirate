"use client";
import { WorkoutRegiment, ExerciseSetTemplateId } from "./types";

type WorkoutTemplateProps = {
  workoutRegiment: WorkoutRegiment;
  workoutId: ExerciseSetTemplateId;
  onChange: (workoutId: ExerciseSetTemplateId) => void;
};
export const WorkoutTemplate = ({
  workoutRegiment,
  workoutId,
  onChange,
}: WorkoutTemplateProps) => {
  return (
    <div>
      <span>Workout Template: &nbsp;</span>
      <select value={workoutId} onChange={(e) => onChange(e.target.value)}>
        {Object.keys(workoutRegiment.exerciseSetTemplate).map((workoutId) => (
          <option key={workoutId} value={workoutId}>
            {workoutId}
          </option>
        ))}
      </select>
    </div>
  );
};
