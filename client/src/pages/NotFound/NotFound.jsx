import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <p className={styles.code}>404</p>

        <h1 className={styles.title}>Page not found</h1>

        <p className={styles.description}>
          The page you're looking for doesn't exist.
        </p>
      </div>
    </main>
  );
};

export { NotFound };