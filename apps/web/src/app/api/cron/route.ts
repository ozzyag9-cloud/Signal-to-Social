import { runPipeline } from "@/lib/agents/pipeline";
import { publish } from "@/lib/publish/webhook";

export async function GET() {
  const data = await runPipeline();
  const top = data.slice(0, 3);
  await publish(top);

  return Response.json({ triggered: true, processed: top.length });
}
