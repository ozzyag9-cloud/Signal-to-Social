"use client";
import { useEffect, useState } from "react";

function getHeat(score:number){
  if(score>0.9) return "#ff3b3b";
  if(score>0.7) return "#ff8c00";
  if(score>0.5) return "#ffd700";
  return "#00e5ff";
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

  if(!data) return <p style={{color:"white"}}>Initializing intelligence...</p>;

  const news = filter==="ALL"
    ? data.news
    : data.news.filter((n:any)=>n.source===filter);

  return (
    <main className="container">

      {/* BREAKING BANNER */}
      {data.news.some(isBreaking) && (
        <div className="breaking">🚨 BREAKING SIGNAL DETECTED</div>
      )}

      <div className="header">
        <h1>📡 SIGNAL INTELLIGENCE</h1>
        <select onChange={e=>setFilter(e.target.value)}>
          <option>ALL</option>
          <option>Reuters</option>
          <option>BBC</option>
          <option>DW</option>
        </select>
      </div>

      <div className="grid">

        {/* TOP SIGNALS */}
        <div className="card large">
          <h2>🔥 Top Signals</h2>
          {news.slice(0,6).map((n:any,i:number)=>(
            <div key={i} className="signal">
              <a href={n.link} target="_blank"
                style={{color:getHeat(n.score)}}
              >
                {n.title}
              </a>
              <div className="meta">
                {n.source} • {new Date(n.pubDate).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>

        {/* VIDEO PANEL */}
        <div className="card video">
          <h2>📺 Live Intelligence Feed</h2>

          <div className="videoWrap">
            <iframe
              src="https://www.youtube.com/embed/Ap-UM1O9RBU"
              allowFullScreen
            />
          </div>

          <div className="videoWrap">
            <iframe
              src="https://www.youtube.com/embed/dF5Y8X4uY9k"
              allowFullScreen
            />
          </div>
        </div>

        {/* STATUS */}
        <div className="card status">
          <h2>🧠 System</h2>
          <div className="statusRow">
            <span className="pulse"></span>
            LIVE PROCESSING
          </div>
          <div className="statusRow">
            Signals: {news.length}
          </div>
        </div>

        {/* CLUSTERS */}
        <div className="card wide">
          <h2>🧠 Intelligence Clusters</h2>
          {data.clusters?.slice(0,3).map((c:any,i:number)=>(
            <div key={i} className="cluster">
              <b>Cluster {i+1}</b>
              <p>{c.summary}</p>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        .container {
          background: radial-gradient(circle at top, #0a0a0a, #050505);
          color: white;
          min-height: 100vh;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .header {
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:20px;
        }

        .grid {
          display:grid;
          grid-template-columns: 2fr 1fr;
          gap:16px;
        }

        .card {
          background: rgba(20,20,20,0.7);
          border:1px solid rgba(255,255,255,0.05);
          border-radius:16px;
          padding:16px;
          backdrop-filter: blur(12px);
          box-shadow: 0 0 40px rgba(0,255,200,0.05);
          transition:0.3s;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 60px rgba(0,255,200,0.15);
        }

        .large { grid-row: span 2; }
        .wide { grid-column: span 2; }

        .signal {
          margin-bottom:12px;
        }

        .meta {
          font-size:11px;
          opacity:0.6;
        }

        /* VIDEO FIX (no squeeze) */
        .videoWrap {
          position:relative;
          width:100%;
          padding-top:56.25%;
          margin-bottom:12px;
          border-radius:12px;
          overflow:hidden;
        }

        .videoWrap iframe {
          position:absolute;
          top:0;
          left:0;
          width:100%;
          height:100%;
          border:none;
        }

        /* STATUS */
        .statusRow {
          display:flex;
          align-items:center;
          gap:8px;
          margin-top:10px;
        }

        .pulse {
          width:10px;
          height:10px;
          background:#00ff88;
          border-radius:50%;
          animation:pulse 1.5s infinite;
        }

        @keyframes pulse {
          50% { transform:scale(1.6); opacity:0.5; }
        }

        /* BREAKING */
        .breaking {
          background:red;
          padding:10px;
          margin-bottom:15px;
          text-align:center;
          font-weight:bold;
          animation:blink 1s infinite;
        }

        @keyframes blink {
          50% { opacity:0.5; }
        }

        .cluster {
          margin-bottom:10px;
          opacity:0.9;
        }

      `}</style>
    </main>
  );
}
