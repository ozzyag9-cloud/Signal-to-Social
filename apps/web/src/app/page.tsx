"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/update")
      .then(res => res.json())
      .then(d => setData(d.data));

    fetch("/api/events")
      .then(res => res.json())
      .then(d => setEvents(d.events || []));
  }, []);

  if (!data) return <p style={{ padding: 20 }}>⚡ Booting...</p>;

  return (
    <main style={{ padding: 20, background: "#050505", color: "white" }}>
      <h1>📡 Signal Intelligence</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 15
      }}>

        {/* NEWS */}
        <div style={{ background: "#111", padding: 15 }}>
          <h2>📰 News</h2>
          {data.news?.slice(0, 5).map((n: any, i: number) => (
            <a key={i} href={n.link} target="_blank" style={{ display: "block", marginBottom: 8 }}>
              {n.title}
            </a>
          ))}
        </div>

        {/* VIDEO */}
        <div style={{ background: "#111", padding: 15 }}>
          <h2>📺 Live</h2>
          <iframe
            src="https://www.youtube.com/embed/hHW1oY26kxQ"
            width="100%"
            height="200"
          />
        </div>

        {/* CRYPTO */}
        <div style={{ background: "#111", padding: 15 }}>
          <h2>💰 Crypto</h2>
          {data.crypto?.map((c: any, i: number) => (
            <div key={i}>{c.name}: ${c.price}</div>
          ))}
        </div>

        {/* EVENTS */}
        <div style={{ background: "#111", padding: 15 }}>
          <h2>🎟️ Events</h2>
          {events.length === 0 ? (
            <p>No events</p>
          ) : (
            events.map((e, i) => <div key={i}>{e.name}</div>)
          )}
        </div>

      </div>
    </main>
  );
}
