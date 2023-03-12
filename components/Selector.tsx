import styles from "./Selector.module.scss";

type SelectorProps = {
  label: string;
  children: React.ReactNode;
};
export const Selector = ({ label, children }: SelectorProps) => {
  return (
    <div className={styles.selector}>
      <label className={styles.selectorLabel}>{label}</label>
      {children}
    </div>
  );
};
