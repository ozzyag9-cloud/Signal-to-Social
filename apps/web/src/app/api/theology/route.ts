import { getDailyTopic } from "@/lib/theology/curriculum";

export async function GET() {
  const topic = getDailyTopic();
  return Response.json({ topic });
}
