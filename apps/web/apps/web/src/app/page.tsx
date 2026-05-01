"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [lesson, setLesson] = useState<any>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/lesson")
      .then(res => res.json())
      .then(setLesson);
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

  if (!lesson) return <p>Loading theological intelligence...</p>;

  return (
    <main style={{
      padding: 20,
      background: "#0b0b0f",
      color: "#eaeaea",
      fontFamily: "serif",
      maxWidth: 900,
      margin: "auto"
    }}>
      <h1 style={{ fontSize: 32 }}>✝️ Theological Intelligence</h1>

      {/* DAILY LESSON */}
      <div style={{
        marginTop: 20,
        padding: 20,
        border: "1px solid #333",
        borderRadius: 12
      }}>
        <h2>{lesson.topic.title}</h2>
        <p>{lesson.topic.description}</p>

        <h3>📚 Sources</h3>
        {lesson.topic.sources.map((s: string, i: number) => (
          <p key={i}>• {s}</p>
        ))}

        <button
          onClick={() => {
            setQuestion(`Explain ${lesson.topic.title} in depth`);
            ask();
          }}
          style={{
            marginTop: 10,
            padding: 10,
            background: "#222",
            border: "none",
            borderRadius: 8,
            color: "white",
            cursor: "pointer"
          }}
        >
          Dive deeper
        </button>
      </div>

      {/* ASK AI */}
      <div style={{
        marginTop: 30,
        padding: 20,
        border: "1px solid #333",
        borderRadius: 12
      }}>
        <h2>Ask a theologian</h2>

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about Trinity, Christ, Church history..."
          style={{
            width: "100%",
            padding: 10,
            marginTop: 10,
            borderRadius: 8,
            border: "1px solid #444",
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
            border: "none",
            borderRadius: 8,
            color: "white",
            cursor: "pointer"
          }}
        >
          Ask
        </button>

        {loading && <p>Thinking...</p>}

        {answer && (
          <div style={{ marginTop: 20 }}>
            <h3>Response</h3>
            <p>{answer}</p>
          </div>
        )}
      </div>
    </main>
  );
}
