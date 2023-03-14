"use client";
import styles from "@/styles/page.module.scss";

import { Actions } from "@/components/Actions";
import { ExerciseORM } from "@/components/ExerciseORM";
import { FAB } from "@/components/FAB";
import { OrmInput } from "@/components/OrmInput";
import { Select } from "@/components/Select";
import { Selector } from "@/components/Selector";
import { WorkoutSets } from "@/components/WorkoutSets";
import { useHasRendered } from "@/hooks/useHasRendered";
import { useStoredState } from "@/hooks/useStoredState";
import { Person } from "@/types/Person";
import { top } from "@/utils";

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
    showSection,
    setShowSection,
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
  const next = () => {
    const current = selectedWorkoutExercises.indexOf(exerciseId);
    setExerciseId(
      selectedWorkoutExercises[(current + 1) % selectedWorkoutExercises.length]
    );
    top();
  };

  const clearORM = () => {
    const _person = {
      ...person,
      last: person.exerciseORMs[exerciseId].weight,
      exerciseORMs: {
        ...person.exerciseORMs,
        [exerciseId]: null,
      },
    };
    setPerson(_person as Person);
    top();
  };
  const Exercise = () => (
    <>
      <WorkoutSets sets={selectedSets} exercise={selectedExerciseORM} />
      <ExerciseORM ormWeight={selectedExerciseORM.weight} onClick={clearORM} />
      {/* <StepRange stepSize={stepSize} onChange={setStepSize} /> */}
      {/* <OrmTable exercise={selectedExerciseORM} stepSize={stepSize} /> */}
    </>
  );

  const toggleHeader = () => {
    setShowSection(!showSection);
    top();
  };

  const Header = (
    <header
      className={styles.header}
      style={{
        maxHeight: showSection ? "100vh" : "var(--header-size)",
        minHeight: showSection ? "100vh" : "unset",
      }}
    >
      <Actions open={showSection} title={exerciseId} onClick={toggleHeader} />
      <div
        className={styles.selectors}
        style={{
          transform: showSection ? "translateY(0)" : "translateY(-200%)",
          opacity: showSection ? 1 : 0,
        }}
      >
        <Selector label="Person">
          <Select options={allPeople} value={person.id} onChange={setPerson} />
        </Selector>
        <Selector label="Regiment">
          <Select
            options={allWorkoutRegiments}
            value={workoutRegiment.id}
            onChange={setWorkoutRegiment}
          />
        </Selector>
        <Selector label="Template">
          <Select
            options={allWorkoutTemplates}
            value={workoutTemplateId}
            onChange={setWorkoutTemplateId}
          />
        </Selector>
        <Selector label="Workout">
          <Select
            options={allWorkouts}
            value={workoutId}
            onChange={setWorkoutId}
          />
        </Selector>
        <Selector label="Exercise">
          <Select
            options={selectedWorkoutExercises}
            value={exerciseId}
            onChange={setExerciseId}
          />
        </Selector>
      </div>
    </header>
  );
  return (
    <>
      <main className={styles.main}>
        {!selectedExerciseORM ? (
          <OrmInput
            exerciseId={exerciseId}
            person={person}
            setPerson={setPerson}
          />
        ) : (
          Exercise()
        )}
      </main>
      {Header}
      {!selectedExerciseORM ? null : <FAB onClick={next} />}
    </>
  );
}
