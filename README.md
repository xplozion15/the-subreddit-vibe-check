# The Subreddit Vibe Check

A simple React app that checks the sentiment of the top 50 hot posts from a subreddit.

## Live Demo

https://the-subreddit-vibe-check-9978.onrender.com

## Features

* Search for a subreddit
* Analyze post titles
* Show positive, neutral, and negative results
* Show the overall vibe
* Show the median sentiment score

## Tech Stack

* React + Vite
* React Router
* CSS Modules
* Sentiment.js

## Reddit API

I initially used Reddit's `/r/{subreddit}/hot` endpoint to fetch the 50 hot posts.

While working on the project, Reddit started blocking the API requests because of its network/security restrictions. I also looked into Reddit OAuth, but creating an API application required some extra steps and approval.

Since I still wanted to finish and test the dashboard properly, I used mock data for the final version.

So the Reddit service can be connected later without changing the sentiment analysis or dashboard logic.

## Assumptions

* Only post titles are analyzed.
* The dashboard works with 50 posts.
* Sentiment is calculated using the `sentiment` npm package.
* The median is calculated from the sentiment scores.

## How to run

```bash
npm install
npm run dev
```
