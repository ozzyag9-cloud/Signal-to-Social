import { summarizeCluster } from "@/lib/ai/summarize";

export async function POST(req: Request) {
  const { cluster } = await req.json();

  const summary = await summarizeCluster(cluster);

  return Response.json({ summary });
}
