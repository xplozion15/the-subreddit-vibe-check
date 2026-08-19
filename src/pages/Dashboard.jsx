import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHotPosts } from "../services/reddit.services";

function Dashboard() {
  const { subreddit } = useParams();

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getHotPosts(subreddit);
        setPosts(posts);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPosts();
  }, [subreddit]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>{subreddit} Vibe Check</h1>

      <p>{posts.length} posts found</p>

      {posts.map((post, index) => (
        <p key={index}>{post.title}</p>
      ))}
    </main>
  );
}

export { Dashboard };
