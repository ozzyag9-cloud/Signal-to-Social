"use client";
import { useEffect, useState } from "react";
import Card from "./components/bento/Card";
import YouTube from "./components/player/YouTube";

export default function Home() {
  const [data, setData] = useState<any>({ news: [], videos: [] });

  useEffect(() => {
    const es = new EventSource("/api/stream/live");
    es.onmessage = (e) => setData(JSON.parse(e.data));
    return () => es.close();
  }, []);

  return (
    <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card title="📰 AI News Feed">
        <ul className="space-y-3">
          {data.news?.map((n: any, i: number) => (
            <li key={i}>
              <a href={n.link} target="_blank" className="font-semibold underline">{n.title}</a>
              <p className="text-sm opacity-70">{n.summary}</p>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="📺 YouTube">
        <div className="space-y-3">
          {data.videos?.slice(0,2).map((v: any, i: number) => (
            <YouTube key={i} id={v.videoId} />
          ))}
        </div>
      </Card>

      <Card title="⚡ Live Data">
        <pre className="text-xs overflow-auto">{JSON.stringify(data, null, 2)}</pre>
      </Card>
    </main>
  );
}
