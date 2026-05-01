"use client";

import { useEffect, useState } from "react";

export default function AppPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/update")
      .then(res => res.json())
      .then(res => {
        if (res?.data) {
          setData(res.data);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
        ⚠️ Failed to load intelligence layer
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Booting Intelligence Layer...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">

      <h1 className="text-3xl font-bold mb-6">
        🛰 Intelligence Feed
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {/* News */}
        <div className="bg-white/5 p-4 rounded-xl">
          <h2 className="mb-4 font-semibold">News</h2>
          {data.news?.length
            ? data.news.slice(0,5).map((n:any,i:number)=>(
                <a key={i} href={n.link} target="_blank" className="block mb-2 hover:underline">
                  {n.title}
                </a>
              ))
            : "No news available"}
        </div>

        {/* Crypto */}
        <div className="bg-white/5 p-4 rounded-xl">
          <h2 className="mb-4 font-semibold">Crypto</h2>
          {data.crypto?.length
            ? data.crypto.map((c:any,i:number)=>(
                <div key={i}>{c.name}: ${c.price}</div>
              ))
            : "No crypto data"}
        </div>

        {/* Finance */}
        <div className="bg-white/5 p-4 rounded-xl">
          <h2 className="mb-4 font-semibold">Finance</h2>
          {data.finance?.length
            ? data.finance.map((f:any,i:number)=>(
                <div key={i}>{f.symbol}: {f.price}</div>
              ))
            : "No finance data"}
        </div>

      </div>

    </main>
  );
}
