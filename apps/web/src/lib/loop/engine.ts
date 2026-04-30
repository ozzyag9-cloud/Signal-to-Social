import { runPipeline } from "../agents/pipeline";
import { publish } from "../publish/webhook";
import { processSignals } from "../signals/engine";
import { saveSignals } from "../db/client";
import { setLastRun } from "../state/store";

let interval: any = null;

export function startLoop() {
  if (interval) return;

  interval = setInterval(async () => {
    try {
      const data = await runPipeline();

      const signals = processSignals(data).slice(0, 5);

      await saveSignals(signals);   // NEW: DB SAVE
      await publish(signals);

      setLastRun(Date.now());
      console.log("🚀 Signals:", signals.map(s => s.hits));
    } catch (e) {
      console.error("Loop error:", e);
    }
  }, 20000);
}

export function stopLoop() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}
