import { getCache } from "@/lib/cache/store";

export async function GET() {
  try {
    const data = getCache();

    console.log("FEED API CALLED:", data);

    return Response.json(
      data || { news: [], clusters: [], videos: [] }
    );

  } catch (e:any) {
    console.error("FEED ERROR:", e);
    return Response.json({
      news: [],
      clusters: [],
      videos: [],
      error: "feed_failed"
    });
  }
}
