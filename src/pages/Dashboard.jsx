import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { getHotPosts } from "../services/reddit.services";
import { mockPosts } from "../data/mockPosts";
import { analyzeTitles } from "../services/sentiment.services";
import {
  getSentimentStats,
  getOverallSentiment,
} from "../utils/sentiment.utils";
import { SentimentCard } from "../components/SentimentCard";
import { OverallVibe } from "../components/OverallVibe";
import { MedianScore } from "../components/MedianScore";

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

      <OverallVibe sentiment={stats.overallSentiment} />

      <section>
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

      <MedianScore score={stats.medianScore} />
    </main>
  );
}

export { Dashboard };