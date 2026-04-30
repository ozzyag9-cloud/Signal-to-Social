import { runPipeline } from "@/lib/agents/pipeline";

export async function GET() {
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      // 🔥 SEND IMMEDIATE RESPONSE (NO WAIT)
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({
          news: [],
          clusters: [],
          videos: [],
          status: "booting"
        })}\n\n`)
      );

      async function send() {
        try {
          const data = await runPipeline();

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({
              ...data,
              status: "live"
            })}\n\n`)
          );

        } catch (err:any) {
          console.error("STREAM ERROR:", err);

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({
              news: [],
              clusters: [],
              videos: [],
              status: "error"
            })}\n\n`)
          );
        }
      }

      // run async AFTER first response
      setTimeout(send, 1000);

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
