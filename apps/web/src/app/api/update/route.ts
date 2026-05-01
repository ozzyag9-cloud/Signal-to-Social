export async function GET() {
  try {
    const feeds = process.env.RSS_FEEDS || "";

    const urls = feeds ? feeds.split(",") : [];

    return Response.json({
      updated: true,
      data: {
        news: urls.length
          ? urls.map((u, i) => ({
              title: "Feed loaded: " + u,
              link: u,
              pubDate: new Date().toISOString()
            }))
          : [],
        crypto: [],
        finance: [],
        updatedAt: new Date().toISOString()
      }
    });
  } catch (e) {
    return Response.json({
      updated: false,
      error: String(e)
    });
  }
}
