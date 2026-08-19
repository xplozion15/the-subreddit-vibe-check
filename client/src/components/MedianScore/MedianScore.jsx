import styles from "./MedianScore.module.css";

function MedianScore({ score }) {
  return (
    <div>
      <p className={styles.label}>Median sentiment score</p>

      <p className={styles.score}>
        {score.toFixed(2)}
      </p>

      <p className={styles.scale}>
        (scale of -5 to 5)
      </p>
    </div>
  );
}

export { MedianScore };