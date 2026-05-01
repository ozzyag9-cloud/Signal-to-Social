export async function GET() {
  try {
    const key = process.env.TICKETMASTER_KEY;

    if (!key) {
      return Response.json({ events: [] });
    }

    const res = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${key}&size=5`
    );

    const json = await res.json();

    const events =
      json?._embedded?.events?.map((e: any) => ({
        name: e.name,
      })) || [];

    return Response.json({ events });
  } catch (e) {
    console.error("EVENT ERROR:", e);
    return Response.json({ events: [] });
  }
}
