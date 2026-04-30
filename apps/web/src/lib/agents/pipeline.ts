import { fetchRSS } from "../sources/rss";
import { fetchCrypto } from "../sources/crypto";
import { fetchFinance } from "../sources/finance";

function getAllFeeds() {
  const feeds: string[] = [];

  // 1. Comma-separated master feeds
  if (process.env.RSS_FEEDS) {
    feeds.push(
      ...process.env.RSS_FEEDS.split(",").map(f => f.trim())
    );
  }

  // 2. Individual RSS env variables
  Object.entries(process.env).forEach(([key, value]) => {
    if (key.includes("RSS") || key.includes("FEED")) {
      if (value && typeof value === "string") {
        feeds.push(value.trim());
      }
    }
  });

  // remove duplicates
  return [...new Set(feeds)].filter(Boolean);
}

export async function runPipeline() {
  try {
    const feeds = getAllFeeds();

    console.log("FEEDS DETECTED:", feeds.length);

    const rssResults = await Promise.all(
      feeds.map(url => fetchRSS(url))
    );

    const news = rssResults.flat();

    const crypto = await fetchCrypto();
    const finance = await fetchFinance();

    return {
      news,
      crypto,
      finance,
      updatedAt: new Date().toISOString()
    };

  } catch (e) {
    console.error("PIPELINE ERROR:", e);

    return {
      news: [],
      crypto: [],
      finance: [],
      updatedAt: null
    };
  }
}
