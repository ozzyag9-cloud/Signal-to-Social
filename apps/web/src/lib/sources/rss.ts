export async function fetchAllRSS() {
  try {
    // 1. Try combined RSS_FEEDS
    const combined = process.env.RSS_FEEDS;

    // 2. Fallback: collect all env variables ending with _RSS or _FEED
    const envFeeds = Object.entries(process.env)
      .filter(([key, val]) =>
        (key.endsWith("_RSS") || key.endsWith("_FEED")) && val
      )
      .map(([_, val]) => val as string);

    const urls = combined
      ? combined.split(",")
      : envFeeds;

    if (!urls || urls.length === 0) {
      console.warn("⚠️ No RSS feeds found, using fallback BBC");
      urls.push("https://feeds.bbci.co.uk/news/rss.xml");
    }

    const results = await Promise.all(
      urls.map(async (url) => {
        try {
          const res = await fetch(url);
          const text = await res.text();

          const items = [...text.matchAll(/<item>([\s\S]*?)<\/item>/g)];

          return items.slice(0, 5).map((item: any) => {
            const get = (tag: string) => {
              const match = item[1].match(new RegExp(`<${tag}>(.*?)<\/${tag}>`));
              return match ? match[1].replace(/<!\[CDATA\[|\]\]>/g, "") : "";
            };

            return {
              title: get("title"),
              link: get("link"),
              pubDate: get("pubDate"),
              source: "RSS"
            };
          });
        } catch (e) {
          return [];
        }
      })
    );

    return results.flat();
  } catch (err) {
    console.error("RSS ERROR:", err);
    return [];
  }
}
