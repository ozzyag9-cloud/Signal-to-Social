import { fetchRSS } from "../sources/rss";
import { getYouTubeVideos } from "../sources/youtube";
import { scoreNews } from "./scoring";

import { semanticCluster } from "../ai/cluster";
import { summarizeCluster } from "../ai/summarize";
import { embed } from "../ai/embeddings";
import { detectAnomalies } from "../ai/anomaly";

const SOURCES = [
  { url: "https://feeds.bbci.co.uk/news/rss.xml", source: "BBC" },
  { url: "https://www.reutersagency.com/feed/?best-topics=business-finance&post_type=best", source: "Reuters" },
  { url: "https://rss.dw.com/rdf/rss-en-all", source: "DW" }
];

export async function runPipeline() {
  const results = await Promise.all(
    SOURCES.map(async (s) => {
      const items = await fetchRSS(s.url);
      return items.map((i:any)=>({...i, source:s.source}));
    })
  );

  const merged = results.flat();

  const ranked = scoreNews(merged);

  // --- AI CLUSTERING ---
  const clusters = await semanticCluster(ranked.slice(0,20), embed);

  // --- AI SUMMARIES ---
  for (const c of clusters) {
    c.summary = await summarizeCluster(c);
  }

  // --- ANOMALIES ---
  const anomalies = detectAnomalies(ranked);

  const videos = getYouTubeVideos();

  return {
    news: ranked,
    clusters,
    anomalies,
    videos
  };
}
