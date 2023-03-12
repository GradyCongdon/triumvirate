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
        <span className={styles.logo}>3</span>
      </div>
      <div className={styles.title}>{title}</div>
      <button className={styles.close} onClick={onClick}>
        <span className={open ? styles.times : styles.plus}>&times;</span>
      </button>
    </div>
  );
};
