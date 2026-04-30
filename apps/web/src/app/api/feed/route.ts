import { runPipeline } from "@/lib/agents/pipeline";

export async function GET() {
  const data = await runPipeline();

  return Response.json({
    DEBUG: {
      envRSS: Object.keys(process.env).filter(k => k.includes("RSS") || k.includes("FEED")),
      hasAlphaKey: !!process.env.ALPHA_VANTAGE_API_KEY
    },
    data
  });
}
