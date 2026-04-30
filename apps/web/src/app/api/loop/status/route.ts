import { getState } from "../../../../lib/state/store";

export async function GET() {
  return Response.json(getState());
}
