import { openai } from "./openai";

export async function embed(text: string) {
  const res = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text
  });

  return res.data[0].embedding;
}
