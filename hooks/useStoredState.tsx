import { exampleState, isValid, State } from "@/data";
import { getLocalStorage, setLocalStorage } from "@/localStorage";
import { ExerciseId } from "@/types/Exercise";
import { Person } from "@/types/Person";
import { WorkoutId, WorkoutRegiment, WorkoutTemplateId } from "@/types/Workout";
import { useEffect, useState } from "react";

export const useStoredState = () => {
  const localState = getLocalStorage("state");
  const _state = isValid(localState) ? localState : exampleState;
  const [state, setState] = useState(_state);

  const [workoutRegiment, setWorkoutRegiment] = useState<WorkoutRegiment>(
    state.workoutRegiment
  );
  const [person, setPerson] = useState<Person>(state.person);
  const [workoutTemplateId, setWorkoutTemplateId] = useState<WorkoutTemplateId>(
    state.workoutTemplateId
  );
  const [workoutId, setWorkoutId] = useState<WorkoutId>(state.workoutId);
  const [exerciseId, setExerciseId] = useState<ExerciseId>(state.exerciseId);
  const [stepSize, setStepSize] = useState<number>(state.stepSize);
  const [showSection, setShowSection] = useState<boolean>(state.showSection);
  useEffect(() => {
    const state: State = {
      id: _state.id,
      workoutRegiment,
      person,
      workoutTemplateId,
      workoutId,
      exerciseId,
      stepSize,
      showSection,
    };
    setLocalStorage("state", state);
    setState(state);
  }, [
    workoutRegiment,
    person,
    workoutTemplateId,
    workoutId,
    exerciseId,
    stepSize,
    showSection,
    _state.id,
  ]);
  return {
    id: state.id,
    workoutRegiment,
    setWorkoutRegiment,
    person,
    setPerson,
    workoutTemplateId,
    setWorkoutTemplateId,
    workoutId,
    setWorkoutId,
    exerciseId,
    setExerciseId,
    stepSize,
    setStepSize,
    showSection,
    setShowSection,
  };
};
