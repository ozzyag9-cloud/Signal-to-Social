import { fetchRSS } from "../sources/rss";
import { getYouTubeVideos } from "../sources/youtube";
import { generateImage } from "../ai/image";

export async function runPipeline() {
  try {
    const newsRaw = await fetchRSS("https://feeds.bbci.co.uk/news/rss.xml");

    const news = newsRaw.map((n:any) => ({
      ...n,
      source: "BBC"
    }));

    // 🔥 generate ONE image based on top headline
    const topHeadline = news[0]?.title || "global news";
    const image = await generateImage(topHeadline);

    const videos = [
      { id: "M7lc1UVf-VE", title: "YouTube News" },
      { id: "hHW1oY26kxQ", title: "Live News" }
    ];

    return {
      news,
      clusters: [],
      videos,
      image
    };

  } catch (err:any) {
    console.error("PIPELINE ERROR:", err);

    return {
      news: [],
      clusters: [],
      videos: [],
      image: null
    };
  }
}
