import { runPipeline } from "@/lib/agents/pipeline";

export async function GET() {
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      async function send() {
        try {
          const data = await runPipeline();

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
          );

        } catch (err:any) {
          console.error("STREAM ERROR:", err);

          // fallback so UI doesn't freeze
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({
              news: [],
              clusters: [],
              videos: [],
              error: "pipeline_failed"
            })}\n\n`)
          );
        }
      }

      await send();
      const interval = setInterval(send, 30000);

      return () => clearInterval(interval);
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive"
    }
  });
}
