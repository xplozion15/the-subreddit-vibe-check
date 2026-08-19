const getMedian = (numbers) => {
  numbers.sort((a, b) => a - b);

  const middle = Math.floor(numbers.length / 2);

  if (numbers.length % 2 === 0) {
    return (numbers[middle - 1] + numbers[middle]) / 2;
  }

  return numbers[middle];
};

const getSentimentStats = (results) => {
  let positive = 0;
  let neutral = 0;
  let negative = 0;

  results.forEach((result) => {
    if (result.score > 0) {
      positive++;
    } else if (result.score < 0) {
      negative++;
    } else {
      neutral++;
    }
  });

  const scores = results.map((result) => result.score);

  const total = results.length;

  return {
    total,
    positive,
    neutral,
    negative,
    positivePercentage: (positive / total) * 100,
    neutralPercentage: (neutral / total) * 100,
    negativePercentage: (negative / total) * 100,
    medianScore: getMedian(scores),
  };
};

const getOverallSentiment = (positive, neutral, negative) => {
  if (positive > neutral && positive > negative) {
    return "Positive";
  }

  if (negative > positive && negative > neutral) {
    return "Negative";
  }

  return "Neutral";
};

export { getMedian, getSentimentStats, getOverallSentiment };
