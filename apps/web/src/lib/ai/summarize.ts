import { openai } from "./openai";

export async function summarizeCluster(cluster:any) {
  const text = cluster.items
    .map((i:any)=>i.title)
    .join("\n");

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Summarize these news headlines factually in 2 sentences."
      },
      {
        role: "user",
        content: text
      }
    ]
  });

  return res.choices[0].message.content;
}
