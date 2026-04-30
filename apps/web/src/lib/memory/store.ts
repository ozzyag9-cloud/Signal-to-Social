import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "apps/web/data/memory.json");

function ensureFile() {
  const dir = path.dirname(FILE);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, "[]");
  }
}

export function loadMemory() {
  ensureFile();
  try {
    const raw = fs.readFileSync(FILE, "utf-8");
    return JSON.parse(raw || "[]");
  } catch {
    return [];
  }
}

export function saveMemory(data: any) {
  ensureFile();
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
  console.log("💾 Memory saved:", data.length);
}
