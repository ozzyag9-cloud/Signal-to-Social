import { fetchRSS } from "../sources/rss";
import { getYouTubeVideos } from "../sources/youtube";
import { scoreNews } from "./scoring";

type Article = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
};

const SOURCES = [
  { url: "https://feeds.bbci.co.uk/news/rss.xml", source: "BBC" },
  { url: "https://www.reutersagency.com/feed/?best-topics=business-finance&post_type=best", source: "Reuters" },
  { url: "https://www.aljazeera.com/xml/rss/all.xml", source: "Al Jazeera" },
  { url: "https://rss.dw.com/rdf/rss-en-all", source: "DW" },
  { url: "https://news.un.org/feed/subscribe/en/news/all/rss.xml", source: "UN" }
];

export async function runPipeline() {
  const results = await Promise.all(
    SOURCES.map(async (s) => {
      const items = await fetchRSS(s.url);
      return items.map((item: any) => ({
        ...item,
        source: s.source
      }));
    })
  );

  const merged: Article[] = results.flat();

  // Sort by time first (raw signal)
  const sorted = merged.sort((a, b) => {
    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
  });

  // Apply scoring layer
  const ranked = scoreNews(sorted);

  const videos = getYouTubeVideos();

  return {
    news: ranked,
    videos
  };
}
