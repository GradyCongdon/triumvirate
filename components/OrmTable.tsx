import styles from "@/styles/page.module.css";
import { Exercise } from "@/types/Exercise";
import { OrmDecimalWeights } from "@/types/Weight";
import {
  formatWeight, getClosestDumbell, getOrmDecimalWeight, getWeightDiff
} from "@/utils";

type OrmTableProps = {
  exercise: Exercise;
  stepSize: number;
};

function getOrmDecimalWeights(exercise: Exercise, stepSize: number) {
  const decimalWeights: OrmDecimalWeights = {};
  for (let i = 100; i > 0; ) {
    const ormDecimal = i / 100;
    const weight = getOrmDecimalWeight(exercise.weight, ormDecimal);
    decimalWeights[i] = weight;
    i -= stepSize;
  }
  return decimalWeights;
}

export const OrmTable = ({ exercise, stepSize }: OrmTableProps) => {
  const ormMap = getOrmDecimalWeights(exercise, stepSize);
  return (
    <div>
      <table>
        <thead>
          <th>ORM</th>
          <th>Actual</th>
          <th>Diff %</th>
          <th>Dumbell</th>
        </thead>
        <tbody>
          {Object.keys(ormMap)
            .reverse()
            .map((ormDecimal) => {
              const orm = ormMap[Number(ormDecimal)];
              const closestDumbell = getClosestDumbell(orm);
              const closest = formatWeight(closestDumbell);
              const actual = formatWeight(orm);
              const diff = getWeightDiff(closestDumbell, orm);
              const diffColor = diff.sign === "+" ? "green" : "red";

              return (
                <>
                  <tr key={ormDecimal}>
                    <td>{ormDecimal}%</td>
                    <td>{actual.withUnit}</td>
                    <td
                      style={{
                        color: diffColor,
                      }}
                    >
                      {diff.percent}%
                    </td>
                    <td>{closest.withUnit}</td>
                  </tr>
                  <tr key={ormDecimal + "graph"} className={styles.graphRow}>
                    <td colSpan={2}>
                      <div
                        style={{
                          width: `${Math.abs(diff.percent)}%`,
                          backgroundColor: diffColor,
                          height: "8px",
                          display: diff.sign === "+" ? "none" : "block",
                          marginLeft: "auto",
                        }}
                      ></div>
                    </td>
                    <td colSpan={2}>
                      <div
                        style={{
                          width: `${Math.abs(diff.percent)}%`,
                          backgroundColor: diffColor,
                          height: "8px",
                          display: diff.sign === "+" ? "block" : "none",
                        }}
                      ></div>
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
