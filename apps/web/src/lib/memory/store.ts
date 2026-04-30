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
