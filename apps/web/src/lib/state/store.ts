let running = false;
let lastRun: number | null = null;

export function setRunning(v: boolean) {
  running = v;
}
export function isRunning() {
  return running;
}
export function setLastRun(ts: number) {
  lastRun = ts;
}
export function getState() {
  return { running, lastRun };
}
