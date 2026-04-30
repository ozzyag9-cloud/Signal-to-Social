"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/agent/run")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p style={{color:"white"}}>Loading signals...</p>;

  return (
    <main style={{
      background: "#050505",
      color: "white",
      minHeight: "100vh",
      padding: 20,
      fontFamily: "sans-serif"
    }}>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>
        📡 SIGNAL INTELLIGENCE
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: 20
      }}>

        {/* MAIN SIGNALS */}
        <div style={{
          background: "#111",
          padding: 15,
          borderRadius: 12
        }}>
          <h2>🔥 Top Signals</h2>
          {data.news?.slice(0,5).map((n:any,i:number)=>(
            <div key={i} style={{
              marginBottom:10,
              padding:10,
              borderBottom:"1px solid #222"
            }}>
              <a href={n.link} target="_blank" style={{
                color:"#00ffe1",
                textDecoration:"none"
              }}>
                {n.title}
              </a>
              <div style={{ fontSize: 12, opacity: 0.6 }}>
                {n.pubDate}
              </div>
            </div>
          ))}
        </div>

        {/* LIVE VIDEO */}
        <div style={{
          background:"#111",
          padding:15,
          borderRadius:12
        }}>
          <h2>📺 Live Feed</h2>
          {data.videos?.map((v:any)=>(
            <iframe
              key={v.id}
              src={`https://www.youtube.com/embed/${v.id}`}
              width="100%"
              height="180"
              style={{ marginBottom:10, borderRadius:8 }}
            />
          ))}
        </div>

      </div>

      {/* FULL NEWS GRID */}
      <div style={{
        marginTop:20,
        display:"grid",
        gridTemplateColumns:"1fr 1fr 1fr",
        gap:15
      }}>
        {data.news?.slice(5,15).map((n:any,i:number)=>(
          <div key={i} style={{
            background:"#0f0f0f",
            padding:10,
            borderRadius:10
          }}>
            <a href={n.link} target="_blank" style={{color:"white"}}>
              {n.title}
            </a>
          </div>
        ))}
      </div>

    </main>
  );
}
