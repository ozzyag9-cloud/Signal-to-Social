import { fetchRSS } from "../sources/rss";
import { fetchCrypto } from "../sources/crypto";
import { fetchFinance } from "../sources/finance";

export async function runPipeline(){
  try{

    const rssSources = [
      process.env.RSS_1,
      process.env.RSS_2,
      process.env.RSS_3
    ].filter(Boolean);

    const rssResults = await Promise.all(
      rssSources.map((url:any)=>fetchRSS(url))
    );

    const news = rssResults.flat();

    const crypto = await fetchCrypto();
    const finance = await fetchFinance();

    return {
      news,
      crypto,
      finance,
      updatedAt: new Date().toISOString()
    };

  }catch(e){
    console.error("PIPELINE ERROR", e);

    return {
      news: [],
      crypto: [],
      finance: [],
      updatedAt: null
    };
  }
}
