import { runPipeline } from "@/lib/agents/pipeline";

async function publish(items: any[]) {
  console.log("Publishing:", items.length);
}

export async function GET() {
  const data = await runPipeline();

  // ✅ FIX: slice the correct array
  const top = data.news.slice(0, 3);

  await publish(top);

  return Response.json({
    triggered: true,
    processed: top.length
  });
}
