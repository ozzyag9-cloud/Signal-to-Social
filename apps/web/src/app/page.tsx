"use client";
import { useEffect, useState } from "react";

function getHeat(score:number){
  if(score>0.9) return "critical";
  if(score>0.7) return "high";
  if(score>0.5) return "medium";
  return "low";
}

function isBreaking(n:any){
  return Date.now() - new Date(n.pubDate).getTime() < 600000;
}

export default function Home(){
  const [data,setData]=useState<any>(null);
  const [filter,setFilter]=useState("ALL");

  useEffect(()=>{
    const es = new EventSource("/api/stream");
    es.onmessage = e => setData(JSON.parse(e.data));
    return ()=>es.close();
  },[]);

  if(!data) return <p className="loading">Booting intelligence layer...</p>;

  const news = filter==="ALL"
    ? data.news
    : data.news.filter((n:any)=>n.source===filter);

  return (
    <main className="container">

      {/* BREAKING */}
      {data.news.some(isBreaking) && (
        <div className="breaking">🚨 BREAKING SIGNAL</div>
      )}

      <header className="header">
        <h1 className="title">SIGNAL INTELLIGENCE</h1>
        <select onChange={e=>setFilter(e.target.value)}>
          <option>ALL</option>
          <option>Reuters</option>
          <option>BBC</option>
          <option>DW</option>
        </select>
      </header>

      <section className="grid">

        {/* SIGNALS */}
        <div className="card large fade">
          <h2>Top Signals</h2>
          {news.slice(0,6).map((n:any,i:number)=>(
            <div key={i} className={`signal ${getHeat(n.score)}`}>
              <a href={n.link} target="_blank">{n.title}</a>
              <div className="meta">
                {n.source} • {new Date(n.pubDate).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>

        {/* VIDEO */}
        <div className="card fade">
          <h2>Live Feed</h2>
          <div className="videoWrap">
            <iframe src="https://www.youtube.com/embed/Ap-UM1O9RBU" />
          </div>
        </div>

        {/* STATUS */}
        <div className="card fade">
          <h2>System</h2>
          <div className="status">
            <span className="pulse"></span>
            ACTIVE
          </div>
        </div>

        {/* CLUSTERS */}
        <div className="card wide fade">
          <h2>Clusters</h2>
          {data.clusters?.slice(0,3).map((c:any,i:number)=>(
            <div key={i} className="cluster">
              <p>{c.summary}</p>
            </div>
          ))}
        </div>

      </section>

      <style jsx>{`

        /* GLOBAL */
        .container {
          background: radial-gradient(circle at top, #0a0a0a, #040404);
          color: #eaeaea;
          min-height: 100vh;
          padding: 24px;
          font-family: "Inter", system-ui, sans-serif;
        }

        .title {
          font-weight: 600;
          letter-spacing: 1px;
          font-size: 20px;
          opacity: 0.9;
        }

        /* GRID */
        .grid {
          display:grid;
          grid-template-columns: 2fr 1fr;
          gap:18px;
        }

        .card {
          background: rgba(20,20,20,0.65);
          border-radius:18px;
          padding:18px;
          border:1px solid rgba(255,255,255,0.05);
          backdrop-filter: blur(14px);
          transition: all 0.3s ease;
        }

        .card:hover {
          transform: translateY(-6px) scale(1.01);
        }

        .large { grid-row: span 2; }
        .wide { grid-column: span 2; }

        /* SIGNAL */
        .signal {
          margin-bottom:14px;
          padding:10px;
          border-radius:10px;
          transition:0.3s;
        }

        .signal a {
          text-decoration:none;
          color:white;
        }

        .signal:hover {
          transform: translateX(4px);
        }

        /* HEAT GLOW SYSTEM */
        .critical {
          box-shadow: 0 0 12px rgba(255,50,50,0.6);
        }

        .high {
          box-shadow: 0 0 10px rgba(255,140,0,0.5);
        }

        .medium {
          box-shadow: 0 0 8px rgba(255,215,0,0.4);
        }

        .low {
          opacity:0.85;
        }

        .meta {
          font-size:11px;
          opacity:0.6;
        }

        /* VIDEO */
        .videoWrap {
          position:relative;
          width:100%;
          padding-top:56.25%;
          border-radius:14px;
          overflow:hidden;
        }

        .videoWrap iframe {
          position:absolute;
          width:100%;
          height:100%;
          top:0;
          left:0;
          border:none;
        }

        /* STATUS */
        .status {
          display:flex;
          align-items:center;
          gap:10px;
        }

        .pulse {
          width:10px;
          height:10px;
          background:#00ff88;
          border-radius:50%;
          animation:pulse 1.4s infinite;
        }

        @keyframes pulse {
          50% { transform:scale(1.5); opacity:0.4; }
        }

        /* BREAKING */
        .breaking {
          background: linear-gradient(90deg, red, darkred);
          padding:10px;
          margin-bottom:14px;
          text-align:center;
          font-weight:600;
          animation:blink 1s infinite;
        }

        @keyframes blink {
          50% { opacity:0.6; }
        }

        /* FADE-IN */
        .fade {
          animation:fadeIn 0.6s ease forwards;
          opacity:0;
        }

        @keyframes fadeIn {
          to { opacity:1; transform:translateY(0); }
          from { opacity:0; transform:translateY(10px); }
        }

        /* LOADING */
        .loading {
          color:white;
          padding:40px;
        }

      `}</style>
    </main>
  );
}
