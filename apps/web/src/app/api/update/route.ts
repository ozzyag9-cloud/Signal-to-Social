import { runPipeline } from "@/lib/agents/pipeline";
import { setCache } from "@/lib/cache/store";

export async function GET() {
  try {
    console.log("UPDATE API CALLED");

    const data = await runPipeline();

    console.log("PIPELINE RESULT:", data);

    setCache(data);

    return Response.json({ updated: true, data });

  } catch (e:any) {
    console.error("UPDATE ERROR:", e);

    return Response.json({
      updated: false,
      error: e.message
    });
  }
}
