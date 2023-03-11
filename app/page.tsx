"use client";
import styles from "@/styles/page.module.css";

import { ExerciseORM } from "@/components/ExerciseORM";
import { OrmTable } from "@/components/OrmTable";
import { Select } from "@/components/Select";
import { StepRange } from "@/components/StepRange";
import { WorkoutSets } from "@/components/WorkoutSets";
import { useHasRendered } from "@/hooks/useHasRendered";
import { useStoredState } from "@/hooks/useStoredState";
import { Person } from "@/types/Person";

const BreadcrumbSeparator = () => <span> &gt; </span>;

export default function Home() {
  const {
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
  } = useStoredState();
  const hasRendered = useHasRendered();
  if (!hasRendered) return null;

  const allPeople = [person.id];
  const allWorkoutRegiments = [workoutRegiment.id];
  const allWorkoutTemplates = Object.keys(workoutRegiment.workoutTemplates);
  const allWorkouts = Object.keys(workoutRegiment.workouts);

  const selectedWorkoutTemplate =
    workoutRegiment.workoutTemplates[workoutTemplateId];
  const selectedSets = selectedWorkoutTemplate.sets;
  const selectedWorkout = workoutRegiment.workouts[workoutId];
  const selectedWorkoutExercises = selectedWorkout.exercises;

  const selectedExerciseORM = person.exerciseORMs[exerciseId];

  const Breadcrumbs = (
    <div className={styles.breadcrumbs}>
      <span className={styles.breadcrumb}>
        <Select options={allPeople} value={person.id} onChange={setPerson} />
      </span>
      <BreadcrumbSeparator />
      <span className={styles.breadcrumb}>
        <Select
          options={allWorkoutRegiments}
          value={workoutRegiment.id}
          onChange={setWorkoutRegiment}
        />
      </span>
      <BreadcrumbSeparator />
      <span className={styles.breadcrumb}>
        <Select
          options={allWorkoutTemplates}
          value={workoutTemplateId}
          onChange={setWorkoutTemplateId}
        />
      </span>
      <BreadcrumbSeparator />
      <span className={styles.breadcrumb}>
        <Select
          options={allWorkouts}
          value={workoutId}
          onChange={setWorkoutId}
        />
      </span>
      <BreadcrumbSeparator />
      <span className={styles.breadcrumb}>
        <Select
          options={selectedWorkoutExercises}
          value={exerciseId}
          onChange={setExerciseId}
        />
      </span>
    </div>
  );
  const BreadcrumbLabels = (
    <div className={styles.breadcrumbLabels}>
      <span className={styles.breadcrumb}>Person</span>
      <BreadcrumbSeparator />
      <span className={styles.breadcrumb}>Regiment</span>
      <BreadcrumbSeparator />
      Template
      <BreadcrumbSeparator />
      <span className={styles.breadcrumb}>Workout</span>
      <BreadcrumbSeparator />
      <span className={styles.breadcrumb}>Exercise</span>
    </div>
  );

  const MissingORM = (
    <>
      No ORM set
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
    </>
  );

  const Exercise = () => (
    <>
      <WorkoutSets sets={selectedSets} exercise={selectedExerciseORM} />
      <ExerciseORM
        exercise={selectedExerciseORM}
        exerciseId={exerciseId}
        personExerciseWeight={selectedExerciseORM.weight}
      />
      <br />
      <StepRange stepSize={stepSize} onChange={setStepSize} />
      <OrmTable exercise={selectedExerciseORM} stepSize={stepSize} />
    </>
  );
  return (
    <main>
      {BreadcrumbLabels}
      {Breadcrumbs}
      {!selectedExerciseORM ? MissingORM : Exercise()}
    </main>
  );
}
