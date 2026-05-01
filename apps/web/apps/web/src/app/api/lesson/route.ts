import { getDailyTeaching } from "@/lib/curriculum/engine";

export async function GET() {
  const lesson = getDailyTeaching();
  return Response.json(lesson);
}
