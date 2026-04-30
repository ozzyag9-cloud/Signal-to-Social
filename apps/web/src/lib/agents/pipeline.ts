import { fetchRSS } from "../sources/rss";
import { fetchFinance } from "../sources/finance";
import { scoreNews } from "../signals/score";

export async function runPipeline() {
  const newsRaw = await fetchRSS(process.env.RSS_FEEDS!.split(",")[0]);
  const finance = await fetchFinance();

  const news = scoreNews(newsRaw);

  return {
    news,
    finance,
    crypto: [
      { name: "BTC", price: 76000 },
      { name: "ETH", price: 2200 }
    ]
  };
}
