"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

type ExerciseId = string;
type Exercise = {
  date: string;
  weight: Weight;
};

type ExerciseORM = Record<ExerciseId, Exercise>;

type Person = {
  id: string;
  exerciseORMs: ExerciseORM;
};

type WorkoutSetId = string;
type WorkoutSetExercise = {
  id: WorkoutSetId;
  exercises: ExerciseId[];
};

type WeightUnit = "kg" | "lb";
type Weight = {
  amount: number;
  unit: WeightUnit;
};

type ExerciseSetTemplateId = string;

type ExerciseSetTemplate = {
  id: ExerciseSetTemplateId;
  sets: ExerciseSet[];
};

type ExerciseSet = {
  repetitions: number;
  ormDecimal: number;
};

type WorkoutRegiment = {
  id: string;
  setExercises: Record<WorkoutSetId, WorkoutSetExercise>;
  exerciseSetTemplate: Record<ExerciseSetTemplateId, ExerciseSetTemplate>;
};

const triumv: WorkoutRegiment = {
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

const benchPress: ExerciseId = "benchPress";
const grady: Person = {
  id: "Grady",
  exerciseORMs: {
    [benchPress]: {
      date: "2023-03-09T22:28:21.072Z",
      weight: { amount: 32.5, unit: "kg" },
    },
  },
};

type WorkoutExercise = ExerciseSetTemplate & {
  exerciseId: ExerciseId;
};

const calcDecimalOrmWeight = (
  personWeight: Weight,
  ormDecimal: number
): Weight => ({
  amount: personWeight.amount * ormDecimal,
  unit: personWeight.unit,
});

const roundDecimal = (num: number) => (Math.round(num * 10) / 10).toFixed(1);
type OrmMap = Record<number, Weight>;

// a function that finds the closest number in an array
const findClosest = (num: number, arr: number[]) => {
  let curr = arr[0];
  let diff = Math.abs(num - curr);
  for (let val = 0; val < arr.length; val++) {
    const newdiff = Math.abs(num - arr[val]);
    if (newdiff < diff) {
      diff = newdiff;
      curr = arr[val];
    }
  }
  return curr;
};
//  an array of numbers from 5 to 32.5
const dumbellWeights = [
  5, 7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25, 27.5, 30, 32.5,
];

const getLocalStorage = (key: string) => {
  const ls = window.localStorage.getItem(key);
  if (!ls) return null;
  return JSON.parse(ls);
};
const setLocalStorage = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const exampleState = {
  workoutRegiment: triumv,
  person: grady,
  exerciseSetTemplateId: "Week 1",
  workoutSetId: "Day 1",
  exerciseId: benchPress,
  stepSize: 5,
  showSection: false,
};

export default function Home() {
  const localState = getLocalStorage("state") || exampleState;
  const [state, setState] = useState(localState);

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
  // return <div className="container">hi</div>;

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
    const orm = calcDecimalOrmWeight(personExerciseWeight, decimal);
    allOrmWeights[i] = orm;
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
type WorkoutTemplateProps = {
  workoutRegiment: WorkoutRegiment;
  workoutId: ExerciseSetTemplateId;
  onChange: (workoutId: ExerciseSetTemplateId) => void;
};
const WorkoutTemplate = ({
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

type WorkoutSetTemplateProps = {
  workoutRegiment: WorkoutRegiment;
  workoutSetId: WorkoutSetId;
  onChange: (workoutSetId: WorkoutSetId) => void;
};
const WorkoutSetTemplate = ({
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
type OrmTableProps = {
  ormMap: OrmMap;
};
const OrmTable = ({ ormMap }: OrmTableProps) => (
  <div>
    <table>
      <thead>
        <th>ORM</th>
        <th>Dumbell</th>
        <th>Diff %</th>
        <th>Actual</th>
      </thead>
      <tbody>
        {Object.keys(ormMap)
          .reverse()
          .map((k) => {
            const orm = ormMap[Number(k)];
            const weightAmount = roundDecimal(orm.amount);
            const weightUnit = orm.unit;
            const ormPercentLabel = `${k}%`;
            const dumbellDiff = calcDumbellDiff(orm);

            return (
              <tr key={k}>
                <td>{ormPercentLabel}</td>
                <td>
                  {dumbellDiff.closestAmountLabel} {weightUnit}
                </td>
                <td
                  style={{
                    color: dumbellDiff.diffAmount > 0 ? "green" : "red",
                  }}
                >
                  {dumbellDiff.diffPercent}%
                </td>
                <td>
                  {weightAmount} {weightUnit}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  </div>
);

type DumbellOrm = {
  closestAmountLabel: string;
  closestWeight: Weight;
  diffAmount: number;
  diffPercent: string;
  ormPercentLabel: string;
  weightAmountLabel: string;
  weightUnit: WeightUnit;
};

const calcDumbellDiff = (weight: Weight) => {
  const weightAmountLabel = roundDecimal(weight.amount);
  const closestAmount = findClosest(weight.amount, dumbellWeights);
  const closestAmountLabel = roundDecimal(closestAmount);
  const diff = weight.amount - closestAmount;
  const diffPercent = roundDecimal((diff / weight.amount) * 100);
  return {
    weight: weight,
    weightAmountLabel,
    closestWeight: {
      amount: closestAmount,
      unit: weight.unit,
    },
    closestAmountLabel: closestAmountLabel,
    diffAmount: diff,
    diffPercent: diffPercent,
  };
};

const calcDumbellORM = (exercise: Exercise, s: ExerciseSet): DumbellOrm => {
  const _setWeight = calcDecimalOrmWeight(exercise.weight, s.ormDecimal);
  const {
    weight,
    weightAmountLabel,
    closestWeight,
    closestAmountLabel,
    diffAmount,
    diffPercent,
  } = calcDumbellDiff(_setWeight);

  const weightUnit = exercise.weight.unit;
  const ormPercentLabel = `${s.ormDecimal * 100}% ORM`;

  return {
    weightAmountLabel,
    closestWeight,
    closestAmountLabel,
    diffAmount,
    diffPercent,
    weightUnit,
    ormPercentLabel,
  };
};

type WorkoutSetsProps = {
  sets: ExerciseSet[];
  exercise: Exercise;
};
const WorkoutSets = ({ sets, exercise }: WorkoutSetsProps) => (
  <div>
    <p>Sets: </p>
    <ul>
      {sets.map((s) => {
        const reps = s.repetitions;
        const key = `${s.reps}x${s.ormDecimal}`;
        const {
          weightUnit,
          diffAmount,
          diffPercent,
          ormPercentLabel,
          weightAmountLabel,
          closestAmountLabel,
        } = calcDumbellORM(exercise, s);

        return (
          <div key={key}>
            <h5>
              <span className={styles.reps}>{reps}</span>
              <span className={styles.repsX}>&times;</span>
              <span className={styles.setWeightAmount}>
                {closestAmountLabel}
              </span>
              <span className={styles.setWeightUnit}>{weightUnit}</span>
              &nbsp;
              <span style={{ color: diffAmount > 0 ? "green" : "red" }}>
                ({diffPercent}%)
              </span>
            </h5>
            <h5> ({ormPercentLabel})</h5>
            <h6>
              actual: {weightAmountLabel}
              {weightUnit}
            </h6>
            <br />
          </div>
        );
      })}
    </ul>
  </div>
);

type StepRangeProps = {
  stepSize: number;
  onChange: (stepSize: number) => void;
};
const StepRange = ({ stepSize, onChange }: StepRangeProps) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <span>Step: {stepSize}%</span>
    <input
      type="range"
      min="1"
      max="20"
      value={stepSize}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  </div>
);

type ExerciseSelectProps = {
  workoutRegiment: WorkoutRegiment;
  workoutSetId: WorkoutSetId;
  exerciseId: ExerciseId;
  onChange: (exerciseId: ExerciseId) => void;
};
const ExerciseSelect = ({
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

type ExerciseOrmProps = {
  personExerciseWeight: Weight;
  exercise: Exercise;
  exerciseId: ExerciseId;
};
const ExerciseORM = ({
  exercise,
  exerciseId,
  personExerciseWeight,
}: ExerciseOrmProps) => {
  return (
    <div className={styles.orm}>
      {exerciseId} ORM: &nbsp;
      <b>
        {personExerciseWeight.amount}
        {personExerciseWeight.unit}
      </b>
      <span className={styles.ormDate}>
        ({new Date(exercise.date).toDateString()})
      </span>
    </div>
  );
};
