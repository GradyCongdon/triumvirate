import { Exercise } from "@/types/Exercise";
import { ExerciseSet } from "@/types/Workout";
import {
  formatDecimalPercentage,
  formatWeight,
  getClosestDumbell,
  getDiffColor,
  getOrmDecimalWeight,
  getWeightDiff,
} from "@/utils";
import { IBM_Plex_Mono as Mono } from "next/font/google";
import { useState } from "react";
import styles from "./WorkoutSets.module.scss";

const mono = Mono({ subsets: ["latin"], weight: "300" });

type Checked = Record<number, boolean>;
type WorkoutSetsProps = {
  sets: ExerciseSet[];
  exercise: Exercise;
};
export const WorkoutSets = ({ sets, exercise }: WorkoutSetsProps) => {
  const [showTags, setShowTags] = useState(true);
  const [showActualWeight, setShowActualWeight] = useState(false);
  const [showDumbellOrm, setShowDumbellOrm] = useState(false);
  const [showPercentage, setShowPercentage] = useState(true);
  const max = {
    reps: 0,
    weight: 0,
  };
  const defaultChecked = sets.reduce((acc, s) => {
    acc[s.ormDecimal] = false;
    if (s.repetitions > max.reps) max.reps = s.repetitions;
    const weight = getOrmDecimalWeight(exercise.weight, s.ormDecimal);
    if (weight.amount > max.weight) max.weight = weight.amount;
    return acc;
  }, {} as Checked);
  const size = max.reps >= 10 || max.weight >= 100 ? "large" : "small";

  const [checked, setChecked] = useState<Checked>(defaultChecked);
  const set = (checked: Checked, s: number) => {
    setChecked({ ...checked, [s]: !checked[s] });
  };

  return (
    <div className={styles.sets}>
      <h1 className={styles.title}>
        Sets
        <div className={styles.liftType}>
          <label htmlFor="showActualWeight">
            {showActualWeight ? "Weight" : "Dumbells"}
          </label>
          <input
            type="checkbox"
            id="showActualWeight"
            name="showActualWeight"
            checked={showActualWeight}
            onChange={() => setShowActualWeight(!showActualWeight)}
          />
        </div>
      </h1>
      <div className={styles.sets}>
        {sets.map((s) => {
          const reps = s.repetitions;
          const key = `${s.repetitions}x${s.ormDecimal}`;
          let weight = getOrmDecimalWeight(exercise.weight, s.ormDecimal);
          const closestDumbell = getClosestDumbell(weight);
          const diff = getWeightDiff(closestDumbell, weight);
          const diffColor = getDiffColor(diff);
          const ormPercentage = formatDecimalPercentage(s.ormDecimal);
          const trueOrmAmount = closestDumbell.amount / exercise.weight.amount;
          const trueOrmPercentage = formatDecimalPercentage(trueOrmAmount);
          const lift = showActualWeight ? weight : closestDumbell;
          const liftFormat = formatWeight(lift);
          const input = `input--${s.ormDecimal}`;

          return (
            <div key={key} className={styles.set}>
              <label
                htmlFor={input}
                className={`${styles.ll} ${styles[size]} ${mono.className}`}
              >
                <span className={styles.reps}>{reps}</span>
                <span className={styles.repsX}>&times;</span>
                <span className={styles.liftAmount}>
                  {liftFormat.ones}
                  <span
                    style={
                      {
                        // display: lift.amount >= 100 ? "none" : "inline",
                      }
                    }
                    className={styles.decimal}
                  >
                    .{liftFormat.decimal}
                  </span>
                </span>
                <span className={styles.liftUnit}> {weight.unit}</span>
                <input
                  type="checkbox"
                  name={input}
                  id={input}
                  checked={checked[s.ormDecimal]}
                  onChange={() => set(checked, s.ormDecimal)}
                  className={styles.mark}
                ></input>
              </label>
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
                    backgroundColor: "var(--background)",
                    border: `1px solid ${diffColor}`,
                    color: diffColor,
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
      {/* <div className={styles.settings}>
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
      </div> */}
    </div>
  );
};
