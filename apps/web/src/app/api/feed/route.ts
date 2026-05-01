import { getCache } from "@/lib/cache/store";

export async function GET() {
  return Response.json(getCache());
}
