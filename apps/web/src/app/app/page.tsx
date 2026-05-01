"use client";

import { useEffect, useState } from "react";

export default function AppPage() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("/api/update")
      .then(res => res.json())
      .then(res => {
        if (res?.data?.subjects) {
          setSubjects(res.data.subjects);
          setStatus("ready");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        ✝️ Loading Apologetic Intelligence...
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-red-500">
        ⚠️ Failed to load theology data
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">

      <h1 className="text-4xl font-bold mb-8">
        ✝️ Apologetic Intelligence
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {subjects.map((s, i) => (
          <div key={i} className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition">
            <h2 className="text-xl font-semibold mb-2">{s.title}</h2>
            <p className="text-sm opacity-70">{s.summary}</p>
          </div>
        ))}
      </div>

    </main>
  );
}
