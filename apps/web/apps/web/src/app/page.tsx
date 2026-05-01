"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [topics, setTopics] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/topics")
      .then(res => res.json())
      .then(data => {
        setTopics(data);
        setSelected(data[0]);
      });
  }, []);

  async function ask() {
    setLoading(true);
    setAnswer("");

    const res = await fetch("/api/ask", {
      method: "POST",
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    setAnswer(data.answer);
    setLoading(false);
  }

  if (!selected) return <p>Loading...</p>;

  return (
    <main style={{
      display: "grid",
      gridTemplateColumns: "250px 1fr",
      height: "100vh",
      background: "#0b0b0f",
      color: "white",
      fontFamily: "Inter, sans-serif"
    }}>

      {/* SIDEBAR */}
      <aside style={{
        borderRight: "1px solid #222",
        padding: 20
      }}>
        <h2 style={{ marginBottom: 20 }}>✝️ Topics</h2>

        {topics.map((t, i) => (
          <div
            key={i}
            onClick={() => setSelected(t)}
            style={{
              padding: 10,
              marginBottom: 10,
              cursor: "pointer",
              borderRadius: 8,
              background: selected?.id === t.id ? "#222" : "transparent"
            }}
          >
            {t.title}
          </div>
        ))}
      </aside>

      {/* MAIN GRID */}
      <section style={{
        padding: 20,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "auto auto",
        gap: 20,
        overflowY: "auto"
      }}>

        {/* MAIN CARD */}
        <div style={{
          gridColumn: "span 2",
          padding: 20,
          border: "1px solid #222",
          borderRadius: 12
        }}>
          <h1 style={{ fontSize: 28 }}>{selected.title}</h1>
          <p>{selected.description}</p>

          <button
            onClick={() => {
              setQuestion(`Explain ${selected.title} in depth`);
              ask();
            }}
            style={{
              marginTop: 10,
              padding: 10,
              background: "#333",
              borderRadius: 8,
              border: "none",
              cursor: "pointer"
            }}
          >
            Dive deeper
          </button>
        </div>

        {/* SOURCES */}
        <div style={{
          padding: 20,
          border: "1px solid #222",
          borderRadius: 12
        }}>
          <h3>📚 Sources</h3>
          {selected.sources.map((s: string, i: number) => (
            <p key={i}>• {s}</p>
          ))}
        </div>

        {/* ASK AI */}
        <div style={{
          padding: 20,
          border: "1px solid #222",
          borderRadius: 12
        }}>
          <h3>Ask</h3>

          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a theological question..."
            style={{
              width: "100%",
              padding: 10,
              marginTop: 10,
              borderRadius: 8,
              border: "1px solid #333",
              background: "#111",
              color: "white"
            }}
          />

          <button
            onClick={ask}
            style={{
              marginTop: 10,
              padding: 10,
              background: "#444",
              borderRadius: 8,
              border: "none"
            }}
          >
            Ask
          </button>

          {loading && <p>Thinking...</p>}
          {answer && <p style={{ marginTop: 10 }}>{answer}</p>}
        </div>

      </section>
    </main>
  );
}
