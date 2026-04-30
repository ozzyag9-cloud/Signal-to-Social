import { runPipeline } from "@/lib/agents/pipeline";

export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      async function send() {
        try {
          const data = await runPipeline();

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
          );
        } catch (e) {
          console.error("STREAM ERROR", e);
        }

        setTimeout(send, 5000); // every 5s
      }

      send();
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    }
  });
}
