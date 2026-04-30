const memory:any = {};

export function getPreferences(email:string){
  if(!memory[email]){
    memory[email] = { sources:["BBC","Reuters","DW"], interests:[] };
  }
  return memory[email];
}

export function updatePreferences(email:string, prefs:any){
  memory[email] = { ...getPreferences(email), ...prefs };
}


// --- COMPATIBILITY LAYER (for legacy engine) ---

let globalMemory:any = {};

export function loadMemory(){
  return globalMemory;
}

export function saveMemory(data:any){
  globalMemory = data;
}
