"use client";

import { useEffect, useState } from "react";

export default function AppPage() {
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    fetch("/api/update")
      .then(res => res.json())
      .then(res => {
        if (!res || !res.data) throw new Error("Bad response");
        setData(res.data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        ✝️ Loading Academia Intelligence...
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <p className="text-xl mb-4">⚠️ Data unavailable</p>
        <p className="text-sm opacity-70">
          Backend not responding or structure mismatch
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">✝️ Apologetic Intelligence</h1>

      {!data?.subjects && (
        <div className="text-yellow-400">
          No structured theology data yet — backend needs upgrade
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {data?.subjects?.map((s: any, i: number) => (
          <div key={i} className="bg-white/5 p-4 rounded-xl">
            <h2 className="font-semibold mb-2">{s.title}</h2>
            <p className="text-sm opacity-70">{s.summary}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
