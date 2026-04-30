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

    // trigger refresh in background
    fetch("/api/update");
  },[]);

  if(!data){
    return <p style={{color:"white"}}>Booting intelligence layer...</p>;
  }

  return (
    <main style={{
      padding:20,
      background:"#050505",
      color:"white",
      fontFamily:"system-ui"
    }}>
      <h1 style={{fontSize:28}}>📡 Signal Intelligence</h1>

      <h2 style={{marginTop:20}}>📰 News Feed</h2>
      {data.news?.slice(0,8).map((n:any,i:number)=>(
        <div key={i} style={{
          marginBottom:12,
          padding:12,
          border:"1px solid #222",
          borderRadius:10
        }}>
          <a href={n.link} target="_blank" style={{color:"#4da3ff"}}>
            {clean(n.title)}
          </a>
          <div style={{fontSize:12,opacity:0.6}}>
            {n.source} • {new Date(n.pubDate).toLocaleString()}
          </div>
        </div>
      ))}

      <h2 style={{marginTop:30}}>📺 Live News</h2>
      <div style={{
        display:"grid",
        gridTemplateColumns:"1fr 1fr",
        gap:12
      }}>
        {data.videos?.map((v:any)=>(
          <iframe
            key={v.id}
            src={`https://www.youtube.com/embed/${v.id}`}
            width="100%"
            height="220"
            style={{borderRadius:12}}
          />
        ))}
      </div>
    </main>
  );
}
