"use client";
import { useEffect, useState } from "react";

export default function Home(){
  const [data,setData]=useState<any>(null);

  useEffect(()=>{
    fetch("/api/feed")
      .then(res=>res.json())
      .then(setData);

    // trigger background refresh
    fetch("/api/update");
  },[]);

  if(!data) return <p style={{color:"white"}}>Loading intelligence...</p>;

  return (
    <main style={{padding:20,color:"white",background:"#050505"}}>
      <h1>📡 Signal Intelligence</h1>

      <h2>📰 News</h2>
      {data.news?.slice(0,5).map((n:any,i:number)=>(
        <div key={i}>
          <a href={n.link}>{n.title}</a>
        </div>
      ))}

      <h2>📺 Live</h2>
      {data.videos?.map((v:any)=>(
        <iframe key={v.id}
          src={`https://www.youtube.com/embed/${v.id}`}
          width="100%" height="200"
        />
      ))}    </main>
  );
}
