export function clusterNews(news:any[]) {
  const clusters:any[] = [];

  news.forEach(item => {
    const key = item.title.toLowerCase().split(" ").slice(0,3).join(" ");

    let found = clusters.find(c => c.key === key);

    if (found) {
      found.items.push(item);
    } else {
      clusters.push({ key, items: [item] });
    }
  });

  return clusters;
}
