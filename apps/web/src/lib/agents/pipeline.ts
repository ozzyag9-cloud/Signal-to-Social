import { fetchAllRSS } from "../sources/rss";
import { getYouTubeVideos } from "../sources/youtube";

export async function runPipeline() {
  const news = await fetchAllRSS();
  const videos = getYouTubeVideos();

  return {
    news,
    videos
  };
}
