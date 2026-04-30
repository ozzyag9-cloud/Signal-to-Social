"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [livePulse, setLivePulse] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource("/api/stream");

    eventSource.onmessage = (event) => {
      const incoming = JSON.parse(event.data);
      setData(incoming);

      setLivePulse(true);
      setTimeout(() => setLivePulse(false), 800);
    };

    return () => eventSource.close();
  }, []);

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Booting Intelligence Layer...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 grid gap-4 grid-cols-12 auto-rows-[180px]">

      {/* HEADER */}
      <div className="col-span-12 flex justify-between items-center">
        <h1 className="text-2xl font-bold">📡 Signal Intelligence</h1>

        <motion.div
          animate={{ scale: livePulse ? 1.4 : 1 }}
          className="flex items-center gap-2 text-green-400"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          LIVE
        </motion.div>
      </div>

      {/* NEWS */}
      <div className="col-span-6 row-span-2 bg-zinc-900 p-4 rounded-xl overflow-auto">
        <h2 className="mb-3 text-gray-400">📰 Headlines</h2>

        {data.news?.map((n: any, i: number) => (
          <a
            key={i}
            href={n.link}
            target="_blank"
            className="block mb-2 text-sm hover:text-blue-400"
          >
            {n.title}
          </a>
        ))}
      </div>

      {/* MARKETS */}
      <div className="col-span-3 bg-zinc-900 p-4 rounded-xl">
        <h2 className="mb-3 text-gray-400">📊 Markets</h2>
        {data.finance?.map((f: any) => (
          <div key={f.name} className="flex justify-between text-sm">
            <span>{f.name}</span>
            <span>{f.price}</span>
          </div>
        ))}
      </div>

      {/* CRYPTO */}
      <div className="col-span-3 bg-zinc-900 p-4 rounded-xl">
        <h2 className="mb-3 text-gray-400">🪙 Crypto</h2>
        {data.crypto?.map((c: any) => (
          <div key={c.name} className="flex justify-between text-sm">
            <span>{c.name}</span>
            <span>${c.price}</span>
          </div>
        ))}
      </div>

      {/* VIDEO */}
      <div className="col-span-6 row-span-2 bg-zinc-900 rounded-xl overflow-hidden">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/hHW1oY26kxQ"
          allowFullScreen
        />
      </div>

      {/* STATUS */}
      <div className="col-span-6 bg-zinc-900 p-4 rounded-xl">
        <h2 className="text-gray-400 mb-2">⚡ Live System</h2>
        <p className="text-sm text-gray-500">
          Streaming updates every 5 seconds.
        </p>
      </div>

    </main>
  );
}
