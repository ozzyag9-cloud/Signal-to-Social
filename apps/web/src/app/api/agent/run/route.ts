import { runPipeline } from "@/lib/agents/pipeline";
import { publish } from "@/lib/publish/webhook";

export async function GET() {
  const data = await runPipeline();

  // Send top signals only
  const top = data.slice(0, 3);

  await publish(top);

  return Response.json({ processed: top.length, data: top });
}
