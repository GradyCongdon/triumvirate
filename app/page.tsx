"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { exampleState, isValid } from "./data";
import {
  WorkoutRegiment,
  ExerciseId,
  Person,
  ExerciseSetTemplateId,
  OrmMap,
} from "./types";
import { WorkoutSetTemplate } from "./WorkoutSetTemplate";
import { OrmTable } from "./OrmTable";
import { WorkoutSets } from "./WorkoutSets";
import { ExerciseSelect } from "./ExerciseSelect";
import { StepRange } from "./StepRange";
import { ExerciseORM } from "./ExerciseORM";
import { WorkoutTemplate } from "./WorkoutTemplate";
import { getLocalStorage, setLocalStorage } from "./localStorage";
import { getOrmDecimalWeight } from "./utils";

export default function Home() {
  const localState = getLocalStorage("state");
  const _state = isValid(localState) ? localState : exampleState;
  const [state, setState] = useState(_state);

  const [workoutRegiment, setWorkoutRegiment] = useState<WorkoutRegiment>(
    state.workoutRegiment
  );
  const [person, setPerson] = useState<Person>(state.person);
  const [exerciseSetTemplateId, setWorkoutId] = useState<ExerciseSetTemplateId>(
    state.exerciseSetTemplateId
  );
  const [workoutSetId, setWorkoutSetId] = useState<ExerciseSetTemplateId>(
    state.workoutSetId
  );
  const [exerciseId, setExerciseId] = useState<ExerciseId>(state.exerciseId);
  const [stepSize, setStepSize] = useState<number>(state.stepSize);
  const [showSection, setShowSection] = useState<boolean>(state.showSection);

  const [hasRendered, setHasRendered] = useState<boolean>(false);

  useEffect(() => {
    setHasRendered(true);
  }, []);
  useEffect(() => {
    const state = {
      id: 1,
      workoutRegiment,
      person,
      exerciseSetTemplateId,
      workoutSetId,
      exerciseId,
      stepSize,
      showSection,
    };
    setLocalStorage("state", state);
    setState(state);
  }, [
    workoutRegiment,
    person,
    exerciseSetTemplateId,
    workoutSetId,
    exerciseId,
    stepSize,
    showSection,
  ]);
  if (!hasRendered) return null;

  const workoutExercise = {
    exerciseId,
    ...workoutRegiment.exerciseSetTemplate[exerciseSetTemplateId],
  };
  const sets = workoutExercise.sets;

  const exercise = person.exerciseORMs[exerciseId];
  if (!exercise) {
    return (
      <main>
        No ORM set
        <ExerciseSelect
          workoutRegiment={workoutRegiment}
          workoutSetId={workoutSetId}
          exerciseId={exerciseId}
          onChange={setExerciseId}
        />
        <input id="orm" type="number" />
        <button
          onClick={() => {
            const input = document.getElementById("orm");
            if (!input) return;
            const inputValue = (input as HTMLInputElement).value;
            if (!inputValue) return;
            const value = parseFloat(inputValue);
            const _person = {
              ...person,
              exerciseORMs: {
                ...person.exerciseORMs,
                [exerciseId]: {
                  date: new Date().toISOString(),
                  weight: {
                    amount: value,
                    unit: "kg",
                  },
                },
              },
            };
            setPerson(_person as Person);
          }}
        >
          Set ORM
        </button>
      </main>
    );
  }
  const personExerciseWeight = exercise.weight;
  const allOrmWeights: OrmMap = {};
  for (let i = 100; i > 0; ) {
    const decimal = i / 100;
    const weight = getOrmDecimalWeight(personExerciseWeight, decimal);
    allOrmWeights[i] = weight;
    i -= stepSize;
  }

  return (
    <main>
      <button onClick={() => setShowSection(!showSection)}>
        {showSection ? "Hide" : "Info"}
      </button>
      <section
        className={styles.details}
        style={{ display: showSection ? "block" : "none" }}
      >
        <p>Person: {person.id}</p>
        <p>Regiment: {workoutRegiment.id}</p>

        <WorkoutTemplate
          workoutRegiment={workoutRegiment}
          workoutId={exerciseSetTemplateId}
          onChange={setWorkoutId}
        />
        <WorkoutSetTemplate
          workoutRegiment={workoutRegiment}
          workoutSetId={workoutSetId}
          onChange={setWorkoutSetId}
        />
      </section>

      <ExerciseSelect
        workoutRegiment={workoutRegiment}
        workoutSetId={workoutSetId}
        exerciseId={exerciseId}
        onChange={setExerciseId}
      />

      <WorkoutSets sets={sets} exercise={exercise} />

      <ExerciseORM
        exercise={exercise}
        exerciseId={exerciseId}
        personExerciseWeight={personExerciseWeight}
      />
      <br />
      <StepRange stepSize={stepSize} onChange={setStepSize} />
      <OrmTable ormMap={allOrmWeights} />
    </main>
  );
}
