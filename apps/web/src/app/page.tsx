"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Landing() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "1fr 1fr"
    }}>

      {/* LEFT SIDE */}
      <div style={{ padding: 60 }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: 42 }}
        >
          Apologetic Intelligence (AI) Academia
        </motion.h1>

        <p style={{ marginTop: 20, lineHeight: 1.6 }}>
          A Catholic & Messianic mission to structure knowledge of Christ,
          rooted in Scripture, Tradition, and scholarship across millennia.
        </p>

        <div style={{ marginTop: 30 }}>
          <Link href="/app">
            <button className="button">Enter Academia</button>
          </Link>
        </div>

        <div style={{ marginTop: 40 }}>
          <p><b>Mission</b></p>
          <p>
            To ensure the Gospel becomes foundational in AI systems and human
            learning — forming a safer, more truthful world.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div style={{
        backgroundImage: "url('/cross.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }} />
    </main>
  );
}
