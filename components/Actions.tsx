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
        <span
          className={styles.logo}
          onClick={() => window.scrollTo({ top: 0 })}
        >
          3
        </span>
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
