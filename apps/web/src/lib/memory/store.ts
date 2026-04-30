import fs from "fs";

const FILE = "apps/web/data/memory.json";

function ensureFile() {
  if (!fs.existsSync("apps/web/data")) {
    fs.mkdirSync("apps/web/data", { recursive: true });
  }

  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, "[]");
  }
}

export function loadMemory() {
  ensureFile();
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf-8"));
  } catch {
    return [];
  }
}

export function saveMemory(data: any) {
  ensureFile();
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}
