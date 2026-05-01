import { runPipeline } from "@/lib/agents/pipeline";
import { setCache } from "@/lib/cache/store";

export async function GET() {
  try {
    const data = await runPipeline();
    setCache(data);
    return Response.json({ updated: true });
  } catch (e) {
    console.error(e);
    return Response.json({ updated: false });
  }
}
