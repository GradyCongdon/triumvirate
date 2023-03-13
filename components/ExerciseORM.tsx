import { Weight } from "@/types/Weight";
import { formatWeight } from "@/utils";
import styles from "./ExerciseORM.module.scss";

type ExerciseOrmProps = {
  onClick: () => void;
  ormWeight: Weight;
};
export const ExerciseORM = ({ onClick, ormWeight }: ExerciseOrmProps) => {
  const weight = formatWeight(ormWeight);
  return (
    <label htmlFor="orm" className={`${styles.ExerciseORM}`}>
      <h1>ORM:</h1>
      <button
        id="orm"
        name="orm"
        className={`tag--action blue ${styles.tagAction}`}
        onClick={onClick}
      >
        {weight.withUnit}
      </button>
    </label>
  );
};
