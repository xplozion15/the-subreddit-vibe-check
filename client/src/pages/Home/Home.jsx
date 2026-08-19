import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const [subreddit, setSubreddit] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!subreddit.trim()) return;

    navigate(`/dashboard/${subreddit.trim()}`);
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          The Subreddit Vibe Check
        </h1>

        <p className={styles.description}>
          Analyze the sentiment of a subreddit's hot posts.
        </p>

        <div className={styles.form}>
          <input
            type="text"
            placeholder="Enter a subreddit"
            value={subreddit}
            onChange={(e) => setSubreddit(e.target.value)}
            className={styles.input}
          />

          <button
            onClick={handleSearch}
            className={styles.button}
          >
            Check vibe
          </button>
        </div>
      </div>
    </main>
  );
};

export { Home };