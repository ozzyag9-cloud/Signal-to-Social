export async function fetchFinance(){
  try{
    const key = process.env.ALPHA_VANTAGE_API_KEY;
    if(!key) return [];

    const res = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=SPY&apikey=${key}`
    );

    const data = await res.json();

    return [
      {
        name:"S&P 500",
        price:data["Global Quote"]?.["05. price"]
      }
    ];

  }catch(e){
    console.error("FINANCE ERROR", e);
    return [];
  }
}
