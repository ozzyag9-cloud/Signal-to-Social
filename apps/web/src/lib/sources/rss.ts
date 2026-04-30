export async function fetchRSS(url: string) {
  return [
    {
      title: "Sample News (RSS OK)",
      link: "#",
      pubDate: new Date().toISOString()
    }
  ];
}
