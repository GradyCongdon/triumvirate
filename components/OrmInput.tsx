import styles from "@/styles/page.module.scss";
import { Person } from "@/types/Person";
import { Weight } from "@/types/Weight";

type Props = {
  person: Person & { last?: Weight };
  setPerson: (person: Person) => void;
  exerciseId: string;
};

export const OrmInput = ({ person, setPerson, exerciseId }: Props) => {
  return (
    <>
      <h1 style={{ fontSize: "3rem" }}>ORM:</h1>
      <div className={styles.ormInput}>
        <input
          id="orm"
          type="number"
          pattern="\d*"
          placeholder={person.last?.amount?.toString() || "25"}
        />
        <select id="unit">
          <option value="kg">kg</option>
          <option value="lb">lb</option>
        </select>
      </div>
      <button
        className={`tag--action blue ${styles.setORM}`}
        onClick={() => {
          const input = document.getElementById("orm");
          if (!input) return;
          const inputValue = (input as HTMLInputElement).value;
          if (!inputValue) return;
          const value = parseFloat(inputValue);
          const unitInput = document.getElementById(
            "unit"
          ) as HTMLSelectElement;
          if (!unitInput) return;
          const unit = unitInput.value;
          if (!unit) return;
          const _person = {
            ...person,
            exerciseORMs: {
              ...person.exerciseORMs,
              [exerciseId]: {
                date: new Date().toISOString(),
                weight: {
                  amount: value,
                  unit,
                },
              },
            },
          };
          setPerson(_person as Person);
        }}
      >
        SET
      </button>
    </>
  );
};
