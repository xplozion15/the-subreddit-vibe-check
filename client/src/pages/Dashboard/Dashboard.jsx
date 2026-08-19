import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { getHotPosts } from "../../services/reddit.services";
import { mockPosts } from "../../data/mockPosts";
import { analyzeTitles } from "../../services/sentiment.services";
import {
  getSentimentStats,
  getOverallSentiment,
} from "../../utils/sentiment.utils";
import { SentimentCard } from "../../components/SentimentCard/SentimentCard";
import { OverallVibe } from "../../components/OverallVibe/OverallVibe";
import { MedianScore } from "../../components/MedianScore/MedianScore";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { subreddit } = useParams();

  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAndAnalyzePosts = async () => {
      try {
        // const posts = await getHotPosts(subreddit);
        const posts = mockPosts;

        const results = analyzeTitles(posts);
        const sentimentStats = getSentimentStats(results);

        const overallSentiment = getOverallSentiment(
          sentimentStats.positive,
          sentimentStats.neutral,
          sentimentStats.negative,
        );

        setStats({
          ...sentimentStats,
          overallSentiment,
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAndAnalyzePosts();
  }, [subreddit]);

  if (error) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <p className={styles.secondary}>{error}</p>
        </div>
      </main>
    );
  }

  if (!stats) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <p className={styles.secondary}>Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>r/{subreddit}</h1>
          <p className={styles.secondary}>{stats.total} hot posts</p>
        </header>

        <section className={styles.vibe}>
          <p className={styles.secondary}>Overall vibe</p>
          <OverallVibe sentiment={stats.overallSentiment} />
        </section>

        <section className={styles.stats}>
          <SentimentCard
            label="Positive"
            count={stats.positive}
            percentage={stats.positivePercentage}
          />

          <SentimentCard
            label="Neutral"
            count={stats.neutral}
            percentage={stats.neutralPercentage}
          />

          <SentimentCard
            label="Negative"
            count={stats.negative}
            percentage={stats.negativePercentage}
          />
        </section>

        <section className={styles.median}>
          <MedianScore score={stats.medianScore} />
        </section>
      </div>
    </main>
  );
};

export { Dashboard };