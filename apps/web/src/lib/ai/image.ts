export async function generateImage(prompt: string) {
  try {
    // 🔥 Replace later with OpenAI / Anthropic image API
    return `https://picsum.photos/seed/${encodeURIComponent(prompt)}/600/400`;
  } catch (e) {
    console.error("IMAGE ERROR:", e);
    return null;
  }
}
