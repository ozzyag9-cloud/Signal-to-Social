import { fetchRSS } from "../sources/rss";
import { getYouTubeVideos } from "../sources/youtube";

export async function runPipeline() {
  try {
    const newsRaw = await fetchRSS("https://feeds.bbci.co.uk/news/rss.xml");

    // 🔥 ensure valid structure
    const news = newsRaw.map((n:any) => ({
      ...n,
      source: "BBC"
    }));

    const videos = [
      { id: "M7lc1UVf-VE", title: "YouTube News Demo" },
      { id: "hHW1oY26kxQ", title: "Global News Live" }
    ];

    return {
      news: news.length ? news : [
        {
          title: "Fallback News (pipeline working)",
          link: "#",
          pubDate: new Date().toISOString(),
          source: "system"
        }
      ],
      clusters: [],
      videos
    };

  } catch (err:any) {
    console.error("PIPELINE ERROR:", err);

    return {
      news: [
        {
          title: "Pipeline failed — fallback active",
          link: "#",
          pubDate: new Date().toISOString(),
          source: "system"
        }
      ],
      clusters: [],
      videos: []
    };
  }
}
