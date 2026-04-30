export async function fetchFinance() {
  try {
    const symbols = ["^GSPC", "^IXIC", "^DJI"]; // S&P500, Nasdaq, Dow

    const results = await Promise.all(
      symbols.map(async (symbol) => {
        const res = await fetch(
          `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`,
          { cache: "no-store" }
        );

        const data = await res.json();
        const quote = data?.quoteResponse?.result?.[0];

        if (!quote) return null;

        return {
          name: symbol,
          price: quote.regularMarketPrice,
          change: quote.regularMarketChangePercent
        };
      })
    );

    return results.filter(Boolean);

  } catch (e) {
    console.error("YAHOO FINANCE ERROR", e);
    return [];
  }
}
