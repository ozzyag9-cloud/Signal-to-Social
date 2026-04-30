"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/agent/run")
      .then(res => res.json())
      .then(setData);

    const interval = setInterval(() => {
      fetch("/api/agent/run")
        .then(res => res.json())
        .then(setData);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!data) return <p style={{ color: "white" }}>Initializing system...</p>;

  return (
    <main className="container">
      <h1 className="title">📡 SIGNAL INTELLIGENCE</h1>

      <div className="grid">

        {/* TOP SIGNALS */}
        <div className="card large">
          <h2>🔥 Top Signals</h2>
          {data.news?.slice(0, 5).map((n: any, i: number) => (
            <div key={i} className="signal">
              <a href={n.link} target="_blank">{n.title}</a>
              <div className="meta">
                {n.source} • {new Date(n.pubDate).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>

        {/* LIVE PANEL */}
        <div className="card">
          <h2>📺 Live Feed</h2>
          {data.videos?.map((v: any) => (
            <iframe
              key={v.id}
              src={`https://www.youtube.com/embed/${v.id}`}
              width="100%"
              height="160"
            />
          ))}
        </div>

        {/* SYSTEM STATUS */}
        <div className="card">
          <h2>🧠 System Status</h2>
          <div className="status">
            <span className="pulse"></span>
            LIVE INGESTION ACTIVE
          </div>
        </div>

        {/* NEWS GRID */}
        <div className="card wide">
          <h2>📰 Stream</h2>
          <div className="newsGrid">
            {data.news?.slice(5, 20).map((n: any, i: number) => (
              <div key={i} className="newsItem">
                <a href={n.link} target="_blank">{n.title}</a>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        .container {
          background: #050505;
          color: white;
          min-height: 100vh;
          padding: 20px;
          font-family: sans-serif;
        }

        .title {
          font-size: 28px;
          margin-bottom: 20px;
        }

        .grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          grid-auto-rows: minmax(100px, auto);
          gap: 16px;
        }

        .card {
          background: rgba(20,20,20,0.7);
          border: 1px solid #1f1f1f;
          border-radius: 14px;
          padding: 14px;
          backdrop-filter: blur(8px);
          box-shadow: 0 0 20px rgba(0,255,200,0.05);
          transition: transform 0.2s ease;
        }

        .card:hover {
          transform: translateY(-3px);
        }

        .large {
          grid-row: span 2;
        }

        .wide {
          grid-column: span 2;
        }

        .signal {
          margin-bottom: 12px;
        }

        .signal a {
          color: #00ffe1;
          text-decoration: none;
        }

        .meta {
          font-size: 12px;
          opacity: 0.6;
        }

        .newsGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .newsItem a {
          font-size: 14px;
          color: white;
          text-decoration: none;
        }

        .status {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 10px;
          font-size: 14px;
        }

        .pulse {
          width: 10px;
          height: 10px;
          background: #00ff88;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </main>
  );
}
