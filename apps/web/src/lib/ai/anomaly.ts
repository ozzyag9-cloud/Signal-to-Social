export function detectAnomalies(news:any[]) {
  const now = Date.now();

  return news.filter(n => {
    const age = now - new Date(n.pubDate).getTime();
    return age < 1000 * 60 * 15; // last 15 min
  });
}
