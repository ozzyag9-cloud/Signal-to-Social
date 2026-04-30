import { getUser } from "@/lib/user/user";
import { getPreferences } from "@/lib/memory/store";
import { runPersonalized } from "@/lib/agents/personalized";
import { trackUsage } from "@/lib/billing/usage";

export async function GET(req: Request) {
  const user = getUser(req);
  const prefs = getPreferences(user.email);

  const data = await runPersonalized(user, prefs);

  trackUsage(user.email, "ai");

  return Response.json({ user, prefs, data });
}
