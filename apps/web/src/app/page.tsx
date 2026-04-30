"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/update")
      .then(res => res.json())
      .then(res => setData(res.data))
      .catch(console.error);
  }, []);

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Booting Intelligence Layer...
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 grid gap-4 grid-cols-12 auto-rows-[180px]">

      {/* HEADER */}
      <div className="col-span-12 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">
          📡 Signal Intelligence
        </h1>
        <div className="flex items-center gap-2 text-sm text-green-400">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
          LIVE
        </div>
      </div>

      {/* NEWS */}
      <motion.div
        className="col-span-6 row-span-2 bg-zinc-900 p-4 rounded-2xl overflow-auto"
        whileHover={{ scale: 1.01 }}
      >
        <h2 className="text-lg mb-3 text-gray-400">📰 Headlines</h2>
        {data.news?.map((n: any, i: number) => (
          <a
            key={i}
            href={n.link}
            target="_blank"
            className="block mb-2 text-sm hover:text-blue-400 transition"
          >
            {n.title}
          </a>
        ))}
      </motion.div>

      {/* MARKETS */}
      <motion.div
        className="col-span-3 bg-zinc-900 p-4 rounded-2xl"
        whileHover={{ scale: 1.02 }}
      >
        <h2 className="text-lg mb-3 text-gray-400">📊 Markets</h2>
        {data.finance?.map((f: any) => (
          <div key={f.name} className="flex justify-between text-sm">
            <span>{f.name}</span>
            <span className={f.change > 0 ? "text-green-400" : "text-red-400"}>
              {f.price} ({f.change?.toFixed(2)}%)
            </span>
          </div>
        ))}
      </motion.div>

      {/* CRYPTO */}
      <motion.div
        className="col-span-3 bg-zinc-900 p-4 rounded-2xl"
        whileHover={{ scale: 1.02 }}
      >
        <h2 className="text-lg mb-3 text-gray-400">🪙 Crypto</h2>
        {data.crypto?.map((c: any) => (
          <div key={c.name} className="flex justify-between text-sm">
            <span>{c.name}</span>
            <span>${c.price}</span>
          </div>
        ))}
      </motion.div>

      {/* VIDEO */}
      <motion.div
        className="col-span-6 row-span-2 bg-zinc-900 rounded-2xl overflow-hidden"
        whileHover={{ scale: 1.01 }}
      >
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/hHW1oY26kxQ"
          title="Live News"
          allowFullScreen
        />
      </motion.div>

      {/* AI PANEL */}
      <motion.div
        className="col-span-3 bg-zinc-900 p-4 rounded-2xl"
        whileHover={{ scale: 1.02 }}
      >
        <h2 className="text-lg mb-2 text-gray-400">🧠 AI Brief</h2>
        <p className="text-xs text-gray-500">
          Select a headline to generate summary.
        </p>
      </motion.div>

      {/* ALERTS */}
      <motion.div
        className="col-span-3 bg-zinc-900 p-4 rounded-2xl"
        whileHover={{ scale: 1.02 }}
      >
        <h2 className="text-lg mb-2 text-gray-400">🔔 Alerts</h2>
        <p className="text-xs text-gray-500">
          No alerts triggered.
        </p>
      </motion.div>

      {/* EVENTS / ADS */}
      <motion.div
        className="col-span-12 bg-zinc-900 p-4 rounded-2xl"
        whileHover={{ scale: 1.01 }}
      >
        <h2 className="text-lg mb-2 text-gray-400">🌍 Events / Sponsored</h2>
        <p className="text-sm text-gray-500">
          Global events, ads, and sponsored intelligence will appear here.
        </p>
      </motion.div>

    </main>
  );
}
