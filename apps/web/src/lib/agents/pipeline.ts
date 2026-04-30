import { fetchRSS } from "../sources/rss";
import { summarize } from "../ai/summarize";

export async function runPipeline() {
  const news = await fetchRSS("https://feeds.bbci.co.uk/news/rss.xml");

  return await Promise.all(
    news.map(async (n: any) => ({
      ...n,
      summary: await summarize(n.title),
      score: Math.random()
    }))
  );
}
