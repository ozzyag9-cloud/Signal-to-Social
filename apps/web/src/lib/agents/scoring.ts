const sourceWeight: Record<string, number> = {
  "Reuters": 1.0,
  "AP": 1.0,
  "AFP": 1.0,
  "BBC": 0.9,
  "DW": 0.9,
  "Al Jazeera": 0.85,
  "UN": 1.0
};

export function scoreNews(news:any[]) {
  return news.map((n,i)=>{

    const timeScore =
      new Date(n.pubDate).getTime() / 1000000000000;

    const reliability = sourceWeight[n.source] || 0.8;

    return {
      ...n,
      score: (timeScore * 0.7) + (reliability * 0.3) - (i * 0.001)
    };

  }).sort((a,b)=>b.score - a.score);
}
