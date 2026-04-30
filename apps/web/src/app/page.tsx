"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [breaking, setBreaking] = useState<any>(null);

  useEffect(() => {
    const es = new EventSource("/api/stream");

    es.onmessage = (e) => {
      const d = JSON.parse(e.data);
      setData(d);

      if (d.news?.[0]?.score > 8) {
        setBreaking(d.news[0]);
      }
    };

    return () => es.close();
  }, []);

  function getColor(score: number) {
    if (score > 8) return "text-red-400";
    if (score > 5) return "text-yellow-400";
    return "text-gray-300";
  }

  async function speak(text: string) {
    try {
      const res = await fetch("/api/voice", {
        method: "POST",
        body: JSON.stringify({ text })
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      new Audio(url).play();
    } catch {
      alert("Voice not ready (add ElevenLabs key)");
    }
  }

  if (!data) return <div className="p-10 text-white">Booting...</div>;

  return (
    <main className="min-h-screen bg-black text-white p-4 grid gap-4 grid-cols-12">

      {/* BREAKING BANNER */}
      {breaking && (
        <div className="col-span-12 bg-red-900 p-3 rounded animate-pulse">
          🚨 BREAKING: {breaking.title}
        </div>
      )}

      {/* NEWS */}
      <div className="col-span-6 bg-zinc-900 p-4 rounded-xl overflow-auto">
        <h2 className="mb-3">📰 Intelligence Feed</h2>

        {data.news.map((n: any, i: number) => (
          <div key={i} className="mb-3 border-b border-zinc-800 pb-2">

            <a
              href={n.link}
              target="_blank"
              className={`${getColor(n.score)} font-medium`}
            >
              {n.title}
            </a>

            <div className="flex gap-3 text-xs mt-2">
              <span>Score: {n.score}</span>
              <button onClick={() => speak(n.title)}>🔊 Voice</button>
            </div>

          </div>
        ))}
      </div>

      {/* MARKETS */}
      <div className="col-span-3 bg-zinc-900 p-4 rounded-xl">
        <h2>📊 Markets</h2>
        {data.finance?.map((f: any) => (
          <div key={f.name} className="flex justify-between">
            <span>{f.name}</span>
            <span>{f.price}</span>
          </div>
        ))}
      </div>

      {/* VIDEO */}
      <div className="col-span-3 bg-zinc-900 rounded-xl overflow-hidden">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/hHW1oY26kxQ"
        />
      </div>

    </main>
  );
}
