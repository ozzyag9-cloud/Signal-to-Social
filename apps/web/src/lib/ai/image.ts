export async function generateImage(prompt: string) {
  try {
    if (process.env.OPENAI_API_KEY) {
      const res = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-image-1",
          prompt,
          size: "1024x1024"
        })
      });

      const json = await res.json();
      return json.data?.[0]?.url;
    }

    // fallback
    return `https://picsum.photos/seed/${encodeURIComponent(prompt)}/600/400`;

  } catch (e) {
    console.error("IMAGE ERROR:", e);
    return null;
  }
}
