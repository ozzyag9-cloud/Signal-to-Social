import { runPipeline } from "./pipeline";

export async function runPersonalized(user:any, prefs:any){
  const data = await runPipeline();

  const filtered = data.news.filter((n:any)=>
    prefs.sources.includes(n.source)
  );

  return {
    ...data,
    news: filtered
  };
}
