import { Exercise } from "@/types/Exercise";
import { ExerciseSet } from "@/types/Workout";
import {
  formatDecimalPercentage,
  formatWeight,
  getClosestDumbell,
  getOrmDecimalWeight,
  getWeightDiff,
} from "@/utils";
import { useState } from "react";
import styles from "./WorkoutSets.module.scss";

type Checked = Record<number, boolean>;
type WorkoutSetsProps = {
  sets: ExerciseSet[];
  exercise: Exercise;
};
export const WorkoutSets = ({ sets, exercise }: WorkoutSetsProps) => {
  const [showTags, setShowTags] = useState(false);
  const [showActualWeight, setShowActualWeight] = useState(false);
  const [showDumbellOrm, setShowDumbellOrm] = useState(false);
  const [showPercentage, setShowPercentage] = useState(true);
  const defaultChecked = sets.reduce((acc, s) => {
    acc[s.ormDecimal] = false;
    return acc;
  }, {} as Checked);

  const [checked, setChecked] = useState<Checked>(defaultChecked);
  const set = (checked: Checked, s: number) => {
    setChecked({ ...checked, [s]: !checked[s] });
  };

  return (
    <div className={styles.sets}>
      <h1>Sets</h1>
      <div className={styles.sets}>
        {sets.map((s) => {
          const reps = s.repetitions;
          const key = `${s.repetitions}x${s.ormDecimal}`;
          let weight = getOrmDecimalWeight(exercise.weight, s.ormDecimal);
          const closestDumbell = getClosestDumbell(weight);
          const diff = getWeightDiff(closestDumbell, weight);
          const diffColor = diff.sign === "+" ? "var(--green)" : "var(--red)";
          const ormPercentage = formatDecimalPercentage(s.ormDecimal);
          const trueOrmAmount = closestDumbell.amount / exercise.weight.amount;
          const trueOrmPercentage = formatDecimalPercentage(trueOrmAmount);
          const lift = showActualWeight ? weight : closestDumbell;
          const liftFormat = formatWeight(lift);

          return (
            <div key={key} className={styles.set}>
              <div className={styles.ll}>
                <div className={styles.lift}>
                  <span className={styles.reps}>{reps}</span>
                  <span className={styles.repsX}>&times;</span>
                  <span className={styles.liftAmount}>
                    {liftFormat.rounded}
                  </span>
                  <span className={styles.liftUnit}> {weight.unit}</span>
                </div>
                <input
                  type="checkbox"
                  checked={checked[s.ormDecimal]}
                  onChange={() => set(checked, s.ormDecimal)}
                  className={styles.mark}
                ></input>
              </div>
              <div
                className={styles.tags}
                style={{ display: showTags ? "flex" : "none" }}
              >
                <div className={styles.orm}>
                  {showDumbellOrm ? trueOrmPercentage : ormPercentage}% ORM
                </div>
                <div
                  className={styles.diff}
                  style={{
                    backgroundColor: diffColor,
                    display: !showPercentage ? "none" : "initial",
                  }}
                >
                  {diff.sign === "+" ? "+" : ""}
                  {diff.percent}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.settings}>
        <div>
          Show True ORM Weight:
          <input
            type="checkbox"
            id="showActualWeight"
            name="showActualWeight"
            checked={showActualWeight}
            onChange={() => setShowActualWeight(!showActualWeight)}
          />
        </div>
        <div>
          Show Tags:
          <input
            type="checkbox"
            id="showTags"
            name="showTags"
            checked={showTags}
            onChange={() => setShowTags(!showTags)}
          />
        </div>
        <div>
          Show True Dumbell ORM:
          <input
            type="checkbox"
            id="showActualORM"
            name="showActualORM"
            checked={showDumbellOrm}
            onChange={() => setShowDumbellOrm(!showDumbellOrm)}
          />
        </div>
        <div>
          Show Dumbell Weight Difference:
          <input
            type="checkbox"
            id="showPercentage"
            name="showPercentage"
            checked={showPercentage}
            onChange={() => setShowPercentage(!showPercentage)}
          />
        </div>
      </div>
    </div>
  );
};

// const Actual = () => (

//     <div>
//                 <span className={styles.setWeightUnit}>
//                   Actual:
//                   {weightFormat.withUnit}
//                 </span>
//               </div>
//               <div>
//                 Dumbell ORM:
//                 <span className={styles.dumbellOrmPercent}>
//                   dumbellOrmPercent
//                 </span>
//               </div>
// )