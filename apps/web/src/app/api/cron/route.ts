export async function GET() {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/agent/run`);
  return Response.json({ triggered: true });
}
