import { stopLoop } from "../../../../../lib/loop/engine";
import { setRunning } from "../../../../../lib/state/store";

export async function GET() {
  stopLoop();
  setRunning(false);
  return Response.json({ stopped: true });
}
