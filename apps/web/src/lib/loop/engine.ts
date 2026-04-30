import { runPipeline } from "../agents/pipeline";
import { publish } from "../publish/webhook";
import { scoreItem } from "../engine/score";
import { setLastRun } from "../state/store";

let interval: any = null;

export function startLoop() {
  if (interval) return;

  interval = setInterval(async () => {
    try {
      const data = await runPipeline();

      const scored = data
        .map((d: any) => ({ ...d, score: scoreItem(d) }))
        .sort((a: any, b: any) => b.score - a.score)
        .slice(0, 5);

      await publish(scored);

      setLastRun(Date.now());
      console.log("Loop run:", scored.length);
    } catch (e) {
      console.error("Loop error:", e);
    }
  }, 20000); // every 20s
}

export function stopLoop() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}
