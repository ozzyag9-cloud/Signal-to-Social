import { askTheologian } from "../../../lib/ai/theologian";

export async function POST(req: Request) {
  const { question } = await req.json();

  const answer = await askTheologian(question);

  return Response.json({ answer });
}
