const getHotPosts = async (subreddit) => {
  const url = `https://www.reddit.com/r/${subreddit}/hot.json?limit=50`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch subreddit");
  }

  const data = await response.json();

  const posts = data.data.children;

  const titles = posts.map((post) => {
    return {
      title: post.data.title,
    };
  });

  return titles;
};

export { getHotPosts };
