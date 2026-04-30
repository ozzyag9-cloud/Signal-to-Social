import fs from "fs";
const FILE = "apps/web/data/memory.json";

export function loadMemory() {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf-8"));
  } catch {
    return [];
  }
}

export function saveMemory(data: any) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}
