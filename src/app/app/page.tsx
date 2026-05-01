"use client";

import { useEffect, useState } from "react";

export default function AppPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/update")
      .then(res => res.json())
      .then(res => setData(res.data))
      .catch(() => setData(null));
  }, []);

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
        📡 Intelligence Feed
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* News */}
        <div className="bg-white/5 p-4 rounded-xl">
          <h2 className="mb-4 font-semibold">News</h2>
          {data.news?.slice(0,5).map((n:any,i:number)=>(
            <a key={i} href={n.link} target="_blank" className="block mb-2 hover:underline">
              {n.title}
            </a>
          ))}
        </div>

        {/* Crypto */}
        <div className="bg-white/5 p-4 rounded-xl">
          <h2 className="mb-4 font-semibold">Crypto</h2>
          {data.crypto?.map((c:any,i:number)=>(
            <div key={i}>{c.name}: ${c.price}</div>
          ))}
        </div>

        {/* Finance */}
        <div className="bg-white/5 p-4 rounded-xl">
          <h2 className="mb-4 font-semibold">Finance</h2>
          {data.finance?.length
            ? data.finance.map((f:any,i:number)=>(
                <div key={i}>{f.symbol}: {f.price}</div>
              ))
            : "No data yet"}
        </div>

      </div>

    </main>
  );
}
