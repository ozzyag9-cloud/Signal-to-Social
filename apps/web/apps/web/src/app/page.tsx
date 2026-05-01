"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [lesson, setLesson] = useState<any>(null);

  useEffect(() => {
    fetch("/api/lesson")
      .then(res => res.json())
      .then(setLesson);
  }, []);

  if (!lesson) return <p>Loading theological intelligence...</p>;

  return (
    <main style={{
      padding: 20,
      background: "#0b0b0f",
      color: "#eaeaea",
      fontFamily: "serif"
    }}>
      <h1 style={{ fontSize: 28 }}>✝️ Daily Doctrine</h1>

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

        <h3>🧠 Lesson</h3>
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {lesson.lesson}
        </pre>
      </div>
    </main>
  );
}
