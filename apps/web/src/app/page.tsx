"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/agent/run")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <main style={{ padding: 20, background: "#0a0a0a", color: "white" }}>
      <h1>📡 Signal Dashboard</h1>

      <h2>📰 News</h2>
      {data.news?.map((n: any, i: number) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <a href={n.link} target="_blank">{n.title}</a>
        </div>
      ))}

      <h2>📺 Live Streams</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {data.videos?.map((v: any) => (
          <iframe
            key={v.id}
            src={`https://www.youtube.com/embed/${v.id}`}
            width="100%"
            height="200"
          />
        ))}
      </div>
    </main>
  );
}
