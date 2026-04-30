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
    return <div style={{padding:40}}>⚡ Booting Intelligence...</div>;
  }

  return (
    <main style={{
      background:"#0a0a0a",
      color:"#fff",
      fontFamily:"system-ui",
      minHeight:"100vh"
    }}>

      {/* 🔴 CRYPTO TICKER */}
      <div style={{
        whiteSpace:"nowrap",
        overflow:"hidden",
        borderBottom:"1px solid #222",
        padding:"8px 0",
        fontSize:13,
        opacity:0.8
      }}>
        <div style={{
          display:"inline-block",
          animation:"scroll 20s linear infinite"
        }}>
          ₿ BTC 62,000 ▲ • ETH 3,200 ▼ • SOL 140 ▲ • GLOBAL MARKETS ACTIVE •
        </div>
      </div>

      {/* HEADER */}
      <div style={{padding:20}}>
        <h1 style={{fontSize:36}}>Signal Intelligence</h1>
      </div>

      {/* MAIN GRID */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"2fr 1fr 1fr",
        gap:20,
        padding:20
      }}>

        {/* 📰 NEWS */}
        <div>
          {data.news?.slice(0,6).map((n:any,i:number)=>(
            <div key={i} style={{marginBottom:15}}>
              <a href={n.link} target="_blank">
                {clean(n.title)}
              </a>
            </div>
          ))}
        </div>

        {/* 📊 FINANCE */}
        <div style={{
          background:"#111",
          padding:15,
          borderRadius:10
        }}>
          <h3>📊 Markets</h3>

          <div>🇺🇸 S&P 500</div>
          <div>🇬🇧 FTSE 100</div>
          <div>🇯🇵 Nikkei 225</div>
          <div>🇪🇺 Euro Stoxx</div>

          <div style={{marginTop:10,fontSize:12,opacity:0.6}}>
            (API coming next phase)
          </div>
        </div>

        {/* 📺 LIVE VIDEO */}
        <div>
          <iframe
            src="https://www.youtube.com/embed/hHW1oY26kxQ"
            style={{
              width:"100%",
              height:200,
              border:"none"
            }}
          />

          {data.image && (
            <img
              src={data.image}
              style={{
                width:"100%",
                height:200,
                objectFit:"cover",
                marginTop:10
              }}
            />
          )}
        </div>

      </div>

      {/* 🌍 EVENTS */}
      <div style={{
        padding:20,
        borderTop:"1px solid #222"
      }}>
        <h3>🌍 Global Events</h3>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(3,1fr)",
          gap:10
        }}>
          <div>🎵 Music Festivals</div>
          <div>🎨 Art Exhibitions</div>
          <div>🏛 Political Events</div>
        </div>
      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

    </main>
  );
}
