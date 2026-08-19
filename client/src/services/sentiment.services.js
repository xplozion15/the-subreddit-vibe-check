import Sentiment from "sentiment";

const sentiment = new Sentiment();

const analyzeTitles = (posts) => {
  const results = posts.map((post) => {
    const result = sentiment.analyze(post.title);
    
    return {
      title: post.title,
      score: result.score,
      comparative: result.comparative,
      positive: result.positive,
      negative: result.negative,
    };
  });

  return results;
};

export { analyzeTitles };
