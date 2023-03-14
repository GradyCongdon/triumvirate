import { top } from "@/utils";
import styles from "./Actions.module.scss";

type Props = {
  open: boolean;
  title?: string;
  onClick: () => void;
};

export const Actions = ({ title, open, onClick }: Props) => {
  return (
    <div className={styles.actions}>
      <div>
        <button className={styles.logo} onClick={top}>
          3
        </button>
      </div>
      <button className={styles.title} onClick={onClick}>
        {title}
      </button>
      <button className={styles.close} onClick={onClick}>
        <span className={open ? styles.times : styles.plus}>&times;</span>
      </button>
    </div>
  );
};
