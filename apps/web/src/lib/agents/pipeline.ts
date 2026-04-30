import { fetchRSS } from "../sources/rss";
import { getYouTubeVideos } from "../sources/youtube";
import { scoreNews } from "./scoring";
import { clusterNews } from "./cluster";

const SOURCES = [
  { url: "https://feeds.bbci.co.uk/news/rss.xml", source: "BBC" },
  { url: "https://www.reutersagency.com/feed/?best-topics=business-finance&post_type=best", source: "Reuters" },
  { url: "https://rss.dw.com/rdf/rss-en-all", source: "DW" }
];

export async function runPipeline() {
  const results = await Promise.all(
    SOURCES.map(async (s) => {
      const items = await fetchRSS(s.url);
      return items.map((i:any)=>({...i, source: s.source}));
    })
  );

  const merged = results.flat();

  const sorted = merged.sort((a,b)=>
    new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  const ranked = scoreNews(sorted);
  const clusters = clusterNews(ranked);
  const videos = getYouTubeVideos();

  return { news: ranked, clusters, videos };
}
