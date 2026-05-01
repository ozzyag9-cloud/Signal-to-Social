"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [topics, setTopics] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    fetch("/api/topics")
      .then(res => res.json())
      .then(data => {
        setTopics(data);
        setSelected(data[0]);
      });
  }, []);

  if (!selected) return <p>Loading...</p>;

  return (
    <main style={{
      display: "grid",
      gridTemplateColumns: "250px 1fr",
      height: "100vh"
    }}>

      {/* SIDEBAR */}
      <aside style={{
        padding: 20,
        borderRight: "1px solid #222"
      }}>
        <h3>✝️ Doctrine</h3>

        {topics.map((t, i) => (
          <div
            key={i}
            onClick={() => setSelected(t)}
            style={{
              padding: 10,
              marginTop: 10,
              cursor: "pointer",
              borderRadius: 8,
              background: selected.id === t.id ? "#222" : "transparent"
            }}
          >
            {t.title}
          </div>
        ))}
      </aside>

      {/* MAIN */}
      <section style={{
        padding: 20,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 20
      }}>

        <motion.div
          className="card glow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1>{selected.title}</h1>
          <p>{selected.description}</p>
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3>📚 Sources</h3>
          {selected.sources.map((s: string, i: number) => (
            <p key={i}>• {s}</p>
          ))}
        </motion.div>

      </section>
    </main>
  );
}
