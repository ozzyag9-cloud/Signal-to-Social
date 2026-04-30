import { runPipeline } from "../agents/pipeline";

async function processSignals(items: any[]) {
  return items.map((item, i) => ({
    ...item,
    score: 100 - i // simple ranking placeholder
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

  // ✅ FIX: process only news array
  const signals = (await processSignals(data.news)).slice(0, 5);

  await saveSignals(signals);
  await publish(signals);

  return signals;
}
