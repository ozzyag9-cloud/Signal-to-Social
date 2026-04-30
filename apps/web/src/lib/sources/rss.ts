export async function fetchRSS(url: string) {
  const res = await fetch(url);
  const text = await res.text();

  const items = [...text.matchAll(/<item>([\s\S]*?)<\/item>/g)];

  return items.slice(0, 10).map((item: any) => {
    const get = (tag: string) => {
      const match = item[1].match(new RegExp(`<${tag}>(.*?)<\/${tag}>`));
      return match ? match[1] : "";
    };

    return {
      title: get("title"),
      link: get("link"),
      pubDate: get("pubDate")
    };
  });
}
