import { runPipeline } from "@/lib/agents/pipeline";

export async function GET() {
  const data = await runPipeline();

  // ✅ FIX: slice the correct array (news, not whole object)
  const topNews = data.news.slice(0, 3);

  return Response.json({
    ...data,
    topNews
  });
}
