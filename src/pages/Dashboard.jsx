import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { getHotPosts } from "../services/reddit.services";
import { mockPosts } from "../data/mockPosts";
import { analyzeTitles } from "../services/sentiment.services";
import {
  getSentimentStats,
  getOverallSentiment,
} from "../utils/sentiment.utils";

function Dashboard() {
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
    return <p>{error}</p>;
  }

  if (!stats) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <h1>r/{subreddit}</h1>
      <p>{stats.total} hot posts</p>

      <section>
        <h2>Overall vibe</h2>
        <p>{stats.overallSentiment}</p>
      </section>

      <section>
        <p>Positive: {stats.positive}</p>
        <p>Neutral: {stats.neutral}</p>
        <p>Negative: {stats.negative}</p>
      </section>

      <section>
        <p>Positive: {stats.positivePercentage.toFixed(1)}%</p>
        <p>Neutral: {stats.neutralPercentage.toFixed(1)}%</p>
        <p>Negative: {stats.negativePercentage.toFixed(1)}%</p>
      </section>

      <p>Median sentiment score: {stats.medianScore}</p>
    </main>
  );
}

export { Dashboard };
