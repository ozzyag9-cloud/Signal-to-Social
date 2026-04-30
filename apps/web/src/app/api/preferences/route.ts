import { getUser } from "@/lib/user/user";
import { updatePreferences } from "@/lib/memory/store";

export async function POST(req: Request){
  const user = getUser(req);
  const body = await req.json();

  updatePreferences(user.email, body);

  return Response.json({ success:true });
}
