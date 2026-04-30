import { runPipeline } from "@/lib/agents/pipeline";

export async function GET(){
  const data = await runPipeline();
  return Response.json(data);
}
