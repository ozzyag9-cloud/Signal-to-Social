export async function saveSignals(data: any[]) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  // Prevent undefined issues
  if (!url || !key) {
    console.log("⚠️ Missing Supabase env, skipping DB write");
    return;
  }

  await fetch(url + "/rest/v1/signals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": key,
      "Authorization": `Bearer ${key}`
    } as Record<string, string>,
    body: JSON.stringify(data)
  });
}
