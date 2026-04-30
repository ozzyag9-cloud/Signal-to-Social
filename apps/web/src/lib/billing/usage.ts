const usage:any = {};

export function trackUsage(email:string, type:string){
  if(!usage[email]) usage[email] = { aiCalls:0 };

  if(type==="ai") usage[email].aiCalls++;

  return usage[email];
}

export function getUsage(email:string){
  return usage[email] || { aiCalls:0 };
}
