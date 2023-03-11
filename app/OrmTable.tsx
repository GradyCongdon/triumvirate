"use client";
import { OrmMap } from "./types";
import { getClosestDumbell, formatWeight, getWeightDiff } from "./utils";
import styles from "./page.module.css";

type OrmTableProps = {
  ormMap: OrmMap;
};
export const OrmTable = ({ ormMap }: OrmTableProps) => (
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
