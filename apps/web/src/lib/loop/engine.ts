import { runPipeline } from "../agents/pipeline";

let running = false;

async function processSignals(items: any[]) {
  return items.map((item, i) => ({
    ...item,
    score: 100 - i
  }));
}

async function saveSignals(signals: any[]) {
  console.log("Saving signals:", signals.length);
}

async function publish(signals: any[]) {
  console.log("Publishing signals:", signals.length);
}

export async function runEngine() {
  const data = await runPipeline();

  const signals = (await processSignals(data.news)).slice(0, 5);

  await saveSignals(signals);
  await publish(signals);

  return signals;
}

// ✅ ADD THESE (fix missing exports)
export async function startLoop() {
  running = true;
  console.log("Loop started");

  while (running) {
    await runEngine();
    await new Promise(r => setTimeout(r, 60000)); // 1 min loop
  }
}

export function stopLoop() {
  running = false;
  console.log("Loop stopped");
}
