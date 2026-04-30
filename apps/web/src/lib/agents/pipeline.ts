import { fetchRSS } from "@/lib/sources/rss";
import { summarize } from "@/lib/ai/summarize";

export async function runPipeline() {
  const rssUrl = process.env.NEWS_RSS || "https://feeds.bbci.co.uk/news/rss.xml";
  const news = await fetchRSS(rssUrl);

  const enriched = await Promise.all(
    news.map(async (n: any) => ({
      ...n,
      summary: await summarize(n.title),
      score: Math.random() // placeholder for sentiment/impact
    }))
  );

  return enriched;
}
