export async function fetchRSS(url: string) {
  return [
    {
      title: "News " + Math.floor(Math.random() * 100),
      link: "#",
      pubDate: new Date().toISOString()
    }
  ];
}
