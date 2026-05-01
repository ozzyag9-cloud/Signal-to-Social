"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState<any>(null);
  const [summary, setSummary] = useState<string>("");

  useEffect(() => {
    fetch("/api/theology")
      .then(res => res.json())
      .then(d => setTopic(d.topic));
  }, []);

  async function runAI() {
    const res = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({ text: topic.summary })
    });

    const data = await res.json();
    setSummary(data.summary);
  }

  if (!topic) return <p style={{ padding: 20 }}>Loading theology...</p>;

  return (
    <main style={{ padding: 20, background: "#050505", color: "white" }}>
      <h1>✝️ Christian Intelligence</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 20
      }}>

        {/* DAILY DOCTRINE */}
        <div style={{ background: "#111", padding: 20 }}>
          <h2>📖 Daily Doctrine</h2>
          <h3>{topic.topic}</h3>
          <p>{topic.summary}</p>
          <button onClick={runAI}>🤖 Explain deeper</button>
        </div>

        {/* AI OUTPUT */}
        <div style={{ background: "#111", padding: 20 }}>
          <h2>🧠 AI Explanation</h2>
          <p>{summary || "Run AI to expand this topic"}</p>
        </div>

        {/* SOURCES */}
        <div style={{ background: "#111", padding: 20 }}>
          <h2>📚 Primary Sources</h2>
          {topic.sources.map((s: string, i: number) => (
            <div key={i}>{s}</div>
          ))}
        </div>

        {/* VIDEO PLACEHOLDER */}
        <div style={{ background: "#111", padding: 20 }}>
          <h2>📺 Teaching</h2>
          <iframe
            src="https://www.youtube.com/embed/8k0GJYk0x1E"
            width="100%"
            height="200"
          />
        </div>

      </div>
    </main>
  );
}
