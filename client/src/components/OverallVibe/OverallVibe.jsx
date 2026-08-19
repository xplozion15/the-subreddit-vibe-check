import styles from "./OverallVibe.module.css";

const OverallVibe = ({ sentiment }) => {
  return <h2 className={styles.vibe}>{sentiment}</h2>;
};

export { OverallVibe };