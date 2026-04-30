export async function fetchFinance(){
  try{
    const key = process.env.ALPHA_VANTAGE_API_KEY;
    if(!key){
      console.log("NO API KEY");
      return [];
    }

    const symbols = ["SPY", "QQQ", "DIA"]; // multiple ETFs

    const results = [];

    for (const symbol of symbols) {
      const res = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${key}`
      );

      const data = await res.json();

      if (data["Global Quote"]) {
        results.push({
          name: symbol,
          price: data["Global Quote"]["05. price"]
        });
      } else {
        console.log("ALPHA ERROR:", data);
      }
    }

    return results;

  }catch(e){
    console.error("FINANCE ERROR", e);
    return [];
  }
}
