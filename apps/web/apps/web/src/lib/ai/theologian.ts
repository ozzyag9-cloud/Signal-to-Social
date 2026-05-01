export async function askTheologian(question: string) {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a Christian theologian trained in early church fathers, councils, and classical theology. Answer with clarity, depth, and neutrality. Avoid modern bias."
          },
          {
            role: "user",
            content: question
          }
        ]
      })
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "No response.";
  } catch (err) {
    return "Error contacting theological engine.";
  }
}
