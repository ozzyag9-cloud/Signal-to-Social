const KEYWORDS = ["war","crash","breaking","alert","AI","market","bitcoin","fed"];

export function scoreItem(item: any) {
  let score = 0;
  const text = (item.title || "").toLowerCase();

  // keyword boost
  KEYWORDS.forEach(k => {
    if (text.includes(k)) score += 2;
  });

  // recency boost
  const age = Date.now() - new Date(item.pubDate || Date.now()).getTime();
  if (age < 1000 * 60 * 60) score += 3; // <1h
  else if (age < 1000 * 60 * 60 * 6) score += 2;

  return score;
}
