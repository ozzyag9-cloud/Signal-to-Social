import { publish } from "@/lib/publish/webhook";

export async function POST(req: Request) {
  const body = await req.json();
  await publish(body);
  return Response.json({ status: "sent" });
}
