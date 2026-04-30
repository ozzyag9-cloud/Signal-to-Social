"use client";
import { useEffect, useState } from "react";

function getHeat(score:number){
  if(score>0.9) return "#ff3b3b";
  if(score>0.7) return "#ff8c00";
  if(score>0.5) return "#ffd700";
  return "#00ffe1";
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

  if(!data) return <p style={{color:"white"}}>Connecting...</p>;

  const news = filter==="ALL"
    ? data.news
    : data.news.filter((n:any)=>n.source===filter);

  return (
    <main style={{background:"#050505",color:"white",padding:20}}>

      {data.news.some(isBreaking) && (
        <div style={{
          background:"red",
          padding:10,
          marginBottom:10,
          animation:"blink 1s infinite"
        }}>
          🚨 BREAKING SIGNAL
        </div>
      )}

      <h1>📡 SIGNAL INTELLIGENCE</h1>

      <select onChange={e=>setFilter(e.target.value)}>
        <option>ALL</option>
        <option>BBC</option>
        <option>Reuters</option>
        <option>DW</option>
      </select>

      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:15}}>

        <div>
          <h2>🔥 Signals</h2>
          {news.slice(0,5).map((n:any,i:number)=>(
            <div key={i}>
              <a href={n.link} target="_blank"
                style={{color:getHeat(n.score)}}
              >
                {n.title}
              </a>
              <div style={{fontSize:12,opacity:.6}}>
                {n.source}
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2>📺 Live</h2>
          {data.videos.map((v:any)=>(
            <iframe key={v.id}
              src={`https://www.youtube.com/embed/${v.id}`}
              width="100%" height="150"
            />
          ))}
        </div>

      </div>

      <h2>🧠 Clusters</h2>
      {data.clusters.slice(0,3).map((c:any,i:number)=>(
        <div key={i} style={{marginBottom:10}}>
          <b>Cluster {i+1}</b>
          <p>{c.items.slice(0,3).map((x:any)=>x.title).join(". ")}</p>
        </div>
      ))}

      <style jsx>{`
        @keyframes blink {
          50% { opacity: 0.5 }
        }
      `}</style>

    </main>
  );
}
