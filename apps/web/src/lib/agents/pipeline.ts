import { fetchRSS } from "../sources/rss";
import { fetchCrypto } from "../sources/crypto";
import { fetchFinance } from "../sources/finance";

export async function runPipeline() {
  try {

    // 🔥 HARD TEST FEEDS (guaranteed working)
    const feeds = [
      "https://feeds.bbci.co.uk/news/rss.xml",
      "https://rss.cnn.com/rss/edition.rss"
    ];

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
