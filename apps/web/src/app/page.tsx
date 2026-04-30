"use client";
import { useEffect, useState } from "react";

function clean(text:string){
  return text.replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1");
}

export default function Home(){
  const [data,setData]=useState<any>(null);

  useEffect(()=>{
    fetch("/api/feed")
      .then(res=>res.json())
      .then(setData);

    fetch("/api/update");
  },[]);

  if(!data){
    return (
      <div style={{
        height:"100vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        color:"#00ffe1",
        fontSize:18
      }}>
        ⚡ Booting Intelligence Layer...
      </div>
    );
  }

  return (
    <main style={{
      background:"#050505",
      color:"white",
      padding:20,
      fontFamily:"system-ui",
      minHeight:"100vh"
    }}>

      {/* HEADER */}
      <div style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:20
      }}>
        <h1 style={{
          fontSize:28,
          background:"linear-gradient(90deg,#00ffe1,#4da3ff)",
          WebkitBackgroundClip:"text",
          color:"transparent"
        }}>
          📡 SIGNAL TERMINAL
        </h1>

        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{
            width:10,
            height:10,
            borderRadius:"50%",
            background:"#00ff88",
            boxShadow:"0 0 10px #00ff88",
            animation:"pulse 1.5s infinite"
          }} />
          <span style={{fontSize:12}}>LIVE</span>
        </div>
      </div>

      {/* GRID */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"2fr 1fr",
        gap:16
      }}>

        {/* NEWS PANEL */}
        <div style={{
          padding:16,
          borderRadius:16,
          background:"rgba(255,255,255,0.03)",
          border:"1px solid rgba(255,255,255,0.08)",
          backdropFilter:"blur(10px)"
        }}>
          <h2 style={{marginBottom:10}}>📰 Intelligence Feed</h2>

          {data.news?.slice(0,6).map((n:any,i:number)=>(
            <div key={i} style={{
              marginBottom:12,
              padding:10,
              borderRadius:10,
              transition:"0.3s",
              cursor:"pointer"
            }}
            onMouseEnter={(e:any)=>{
              e.currentTarget.style.background="rgba(77,163,255,0.1)";
              e.currentTarget.style.boxShadow="0 0 10px rgba(77,163,255,0.2)";
            }}
            onMouseLeave={(e:any)=>{
              e.currentTarget.style.background="transparent";
              e.currentTarget.style.boxShadow="none";
            }}
            >
              <a href={n.link} target="_blank" style={{
                color:"#4da3ff",
                textDecoration:"none"
              }}>
                {clean(n.title)}
              </a>

              <div style={{
                fontSize:11,
                opacity:0.6
              }}>
                {n.source} • {new Date(n.pubDate).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>

        {/* SIDE PANEL */}
        <div style={{
          display:"grid",
          gap:16
        }}>

          {/* VIDEO */}
          <div style={{
            borderRadius:16,
            overflow:"hidden",
            border:"1px solid rgba(255,255,255,0.1)"
          }}>
            <iframe
              src={`https://www.youtube.com/embed/${data.videos?.[0]?.id}`}
              style={{
                width:"100%",
                height:200,
                border:"none"
              }}
            />
          </div>

          {/* AI IMAGE PLACEHOLDER */}
          <div style={{
            borderRadius:16,
            height:200,
            background:"linear-gradient(135deg,#111,#222)",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            color:"#666",
            border:"1px solid rgba(255,255,255,0.1)"
          }}>
            🧠 AI VISUAL (coming next phase)
          </div>

        </div>
      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>

    </main>
  );
}
