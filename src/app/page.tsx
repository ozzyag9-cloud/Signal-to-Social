"use client";

export default function Landing() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl font-bold mb-6 tracking-tight">
          Apologetic Intelligence
        </h1>

        <p className="text-lg opacity-70 mb-8">
          A structured AI-driven Christian Academia platform.
          Rooted in Scripture. Guided by scholars. Designed for truth.
        </p>

        <a
          href="/app"
          className="px-8 py-4 bg-white text-black rounded-xl font-semibold hover:scale-105 transition"
        >
          Enter Platform
        </a>
      </div>

    </main>
  );
}
