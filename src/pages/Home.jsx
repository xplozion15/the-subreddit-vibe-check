import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [subreddit, setSubreddit] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!subreddit.trim()) return;

    navigate(`/dashboard/${subreddit.trim()}`);
  };

  return (
    <main>
      <h1>The Subreddit Vibe Check</h1>

      <input
        type="text"
        placeholder="Enter a subreddit"
        value={subreddit}
        onChange={(e) => setSubreddit(e.target.value)}
      />

      <button onClick={handleSearch}>Check vibe</button>
    </main>
  );
}

export { Home };
