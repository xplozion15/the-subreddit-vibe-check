import styles from "./SentimentCard.module.css";

function SentimentCard({ label, count, percentage }) {
  return (
    <article className={styles.card}>
      <p className={styles.label}>{label}</p>

      <p className={styles.count}>{count}</p>

      <p className={styles.percentage}>
        {percentage.toFixed(1)}%
      </p>
    </article>
  );
}

export { SentimentCard };