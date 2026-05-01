export async function GET() {
  try {
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      return new Response("No API key", { status: 400 });
    }

    const res = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/YOUR_VOICE_ID",
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: "Top global intelligence update",
        }),
      }
    );

    const audio = await res.arrayBuffer();

    return new Response(audio, {
      headers: { "Content-Type": "audio/mpeg" },
    });
  } catch (err) {
    console.error("VOICE ERROR:", err);
    return new Response("error", { status: 500 });
  }
}
