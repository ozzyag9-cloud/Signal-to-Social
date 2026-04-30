"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/update") // ✅ FIXED HERE
      .then(res => res.json())
      .then(res => setData(res.data)) // important
      .catch(console.error);
  }, []);

  if (!data) {
    return (
      <main style={{ padding: 20, background: "#0a0a0a", color: "white" }}>
        <h1>📡 Signal Intelligence</h1>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 20, background: "#0a0a0a", color: "white" }}>
      <h1>📡 Signal Intelligence</h1>

      {/* CRYPTO */}
      <section>
        <h2>🪙 Crypto</h2>
        {data.crypto?.map((c: any) => (
          <div key={c.name}>{c.name}: ${c.price}</div>
        ))}
      </section>

      {/* FINANCE */}
      <section>
        <h2>📊 Markets</h2>
        {data.finance?.length ? (
          data.finance.map((f: any) => (
            <div key={f.name}>{f.name}: {f.price}</div>
          ))
        ) : (
          <p>No finance data</p>
        )}
      </section>

      {/* NEWS */}
      <section>
        <h2>📰 News</h2>
        {data.news?.map((n: any, i: number) => (
          <div key={i}>
            <a href={n.link} target="_blank">{n.title}</a>
          </div>
        ))}
      </section>
    </main>
  );
}
