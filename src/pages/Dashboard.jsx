import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHotPosts } from "../services/reddit.services";
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
        const posts = await getHotPosts(subreddit);
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

      <p>{stats.total} posts analyzed</p>

      <p>Overall vibe: {stats.overallSentiment}</p>

      <p>Positive: {stats.positive}</p>
      <p>Neutral: {stats.neutral}</p>
      <p>Negative: {stats.negative}</p>

      <p>Median sentiment score: {stats.medianScore}</p>
    </main>
  );
}

export { Dashboard };
