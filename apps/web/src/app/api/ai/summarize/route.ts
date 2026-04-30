import { summarize } from "@/lib/ai/summarize";

export async function POST(req: Request) {
  const { text } = await req.json();
  const summary = await summarize(text);
  return Response.json({ summary });
}
