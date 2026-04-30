let useMemory = !process.env.SUPABASE_URL;

export async function saveSignals(data: any[]) {
  if (useMemory) {
    console.log("⚠️ Using memory fallback");
    return;
  }

  await fetch(process.env.SUPABASE_URL + "/rest/v1/signals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": process.env.SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify(data)
  });
}
