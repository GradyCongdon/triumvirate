"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { Exercise, ExerciseSet } from "./types";
import {
  getClosestDumbell,
  formatWeight,
  getOrmDecimalWeight,
  getWeightDiff,
  formatDecimalPercentage,
} from "./utils";

type WorkoutSetsProps = {
  sets: ExerciseSet[];
  exercise: Exercise;
};
export const WorkoutSets = ({ sets, exercise }: WorkoutSetsProps) => {
  const [showActualWeight, setShowActualWeight] = useState(false);
  const [showDumbellOrm, setShowDumbellOrm] = useState(false);
  const [showPercentage, setShowPercentage] = useState(true);

  return (
    <div>
      <p>Sets: </p>
      <div className={styles.sets}>
        {sets.map((s) => {
          const reps = s.repetitions;
          const key = `${s.repetitions}x${s.ormDecimal}`;
          let weight = getOrmDecimalWeight(exercise.weight, s.ormDecimal);
          const closestDumbell = getClosestDumbell(weight);
          const diff = getWeightDiff(closestDumbell, weight);
          const diffColor = diff.sign === "+" ? "green" : "red";
          const ormPercentage = formatDecimalPercentage(s.ormDecimal);
          const trueOrmAmount = closestDumbell.amount / exercise.weight.amount;
          const trueOrmPercentage = formatDecimalPercentage(trueOrmAmount);
          const lift = showActualWeight ? weight : closestDumbell;
          const liftFormat = formatWeight(lift);

          return (
            <div key={key} className={styles.set}>
              <div className={styles.lift}>
                <span className={styles.reps}>{reps}</span>
                <span className={styles.repsX}>&times;</span>
                <span className={styles.liftAmount}>{liftFormat.rounded}</span>
                <span className={styles.liftUnit}> {weight.unit}</span>
              </div>
              <div>
                <span className={styles.ormPercentage}>
                  {showDumbellOrm ? trueOrmPercentage : ormPercentage}% ORM
                  <span
                    className={styles.diffPercentage}
                    style={{
                      color: diffColor,
                      display: !showPercentage ? "none" : "initial",
                    }}
                  >
                    {" "}
                    ({diff.percent}%)
                  </span>
                </span>
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
