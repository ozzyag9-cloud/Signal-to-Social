export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return Response.json({
        summary: "AI not configured yet. Showing base theological summary."
      });
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a Christian theologian explaining doctrine clearly and faithfully."
          },
          {
            role: "user",
            content: text
          }
        ]
      })
    });

    const json = await res.json();

    return Response.json({
      summary: json.choices?.[0]?.message?.content || "No response"
    });

  } catch (e) {
    return Response.json({ summary: "AI error" });
  }
}
