export function scoreNews(news: any[]) {
  return news.map((n) => {
    let score = 0;

    const text = (n.title || "").toLowerCase();

    // keywords = importance
    if (text.includes("war") || text.includes("attack")) score += 5;
    if (text.includes("crash") || text.includes("collapse")) score += 4;
    if (text.includes("breaking")) score += 6;
    if (text.includes("fed") || text.includes("rates")) score += 5;
    if (text.includes("bitcoin") || text.includes("crypto")) score += 3;

    // recency boost
    const time = new Date(n.pubDate).getTime();
    const now = Date.now();
    const diffHours = (now - time) / (1000 * 60 * 60);

    if (diffHours < 1) score += 5;
    else if (diffHours < 6) score += 3;

    return { ...n, score };
  })
  .sort((a, b) => b.score - a.score);
}
