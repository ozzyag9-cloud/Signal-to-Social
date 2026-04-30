import { fetchRSS } from "../sources/rss";
import { getYouTubeVideos } from "../sources/youtube";

export async function runPipeline() {
  const news = await fetchRSS("https://feeds.bbci.co.uk/news/rss.xml");
  const videos = getYouTubeVideos();

  return {
    news,
    videos
  };
}
