import { startLoop } from "../../../../lib/loop/engine";
import { setRunning } from "../../../../lib/state/store";

export async function GET() {
  startLoop();
  setRunning(true);
  return Response.json({ started: true });
}
