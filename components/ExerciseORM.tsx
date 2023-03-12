import styles from "@/styles/page.module.scss";
import { Exercise, ExerciseId } from "@/types/Exercise";
import { Weight } from "@/types/Weight";

type ExerciseOrmProps = {
  personExerciseWeight: Weight;
  exercise: Exercise;
  exerciseId: ExerciseId;
};
export const ExerciseORM = ({
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
