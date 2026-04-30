import { loadMemory, saveMemory } from "../memory/store";

export function processSignals(items: any[]) {
  const memory = loadMemory();

  const updated = items.map(item => {
    const existing = memory.find((m: any) => m.title === item.title);

    if (existing) {
      return {
        ...item,
        hits: existing.hits + 1,
        trend: "rising"
      };
    }

    return {
      ...item,
      hits: 1,
      trend: "new"
    };
  });

  // merge with old memory
  const merged = [...memory];

  updated.forEach(u => {
    const idx = merged.findIndex((m: any) => m.title === u.title);
    if (idx >= 0) merged[idx] = u;
    else merged.push(u);
  });

  // keep only latest 50
  const trimmed = merged.slice(-50);

  saveMemory(trimmed);

  return updated.sort((a, b) => b.hits - a.hits);
}
