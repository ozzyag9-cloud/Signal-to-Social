export async function publish(data: any) {
  if (!process.env.N8N_WEBHOOK_URL) return;

  await fetch(process.env.N8N_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}
