import { useParams } from "react-router-dom";

function Dashboard() {
  const { subreddit } = useParams();

  return (
    <main>
      <h1>{subreddit} Vibe Check</h1>
    </main>
  );
}

export { Dashboard };