function SentimentCard({ label, count, percentage }) {
  return (
    <article>
      <h3>{label}</h3>
      <p>{count}</p>
      <p>{percentage.toFixed(1)}%</p>
    </article>
  );
}

export { SentimentCard };
