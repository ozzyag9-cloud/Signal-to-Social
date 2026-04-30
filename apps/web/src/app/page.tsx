"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/feed")
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) {
    return (
      <main style={{ padding: 20, background: "#0a0a0a", color: "white" }}>
        <h1>📡 Signal Intelligence</h1>
        <p>Loading data...</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 20, background: "#0a0a0a", color: "white" }}>
      <h1>📡 Signal Intelligence</h1>

      {/* CRYPTO */}
      <section style={{ marginBottom: 30 }}>
        <h2>🪙 Crypto</h2>
        {data.crypto?.length ? (
          data.crypto.map((c: any) => (
            <div key={c.name}>
              {c.name}: ${c.price}
            </div>
          ))
        ) : (
          <p>No crypto data</p>
        )}
      </section>

      {/* FINANCE */}
      <section style={{ marginBottom: 30 }}>
        <h2>📊 Markets</h2>
        {data.finance?.length ? (
          data.finance.map((f: any) => (
            <div key={f.name}>
              {f.name}: {f.price}
            </div>
          ))
        ) : (
          <p>No market data</p>
        )}
      </section>

      {/* NEWS */}
      <section>
        <h2>📰 News</h2>
        {data.news?.length ? (
          data.news.map((n: any, i: number) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <a href={n.link} target="_blank" style={{ color: "#4da6ff" }}>
                {n.title}
              </a>
            </div>
          ))
        ) : (
          <p>No news available</p>
        )}
      </section>
    </main>
  );
}
