"use client";
import { useEffect, useState } from "react";

function clean(text:string){
  return text.replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1");
}

export default function Home(){
  const [data,setData]=useState<any>(null);
  const [summary,setSummary]=useState<string | null>(null);

  useEffect(()=>{
    fetch("/api/feed")
      .then(res=>res.json())
      .then(setData);

    fetch("/api/update");
  },[]);

  async function getSummary(text:string){
    const res = await fetch("/api/ai/summarize",{
      method:"POST",
      body: JSON.stringify({ text })
    });
    const json = await res.json();
    setSummary(json.summary);
  }

  function speak(text:string){
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }

  function share(link:string){
    const url = encodeURIComponent(link);

    window.open(`https://wa.me/?text=${url}`);
  }

  if(!data){
    return <div style={{padding:40}}>⚡ Booting Intelligence...</div>;
  }

  return (
    <main style={{
      background:"#0a0a0a",
      color:"#fff",
      padding:24,
      fontFamily:"Georgia, serif",
      minHeight:"100vh"
    }}>

      {/* HERO */}
      <h1 style={{
        fontSize:42,
        marginBottom:20,
        lineHeight:1.2
      }}>
        Global Signal Intelligence
      </h1>

      {/* GRID */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"2fr 1fr",
        gap:20
      }}>

        {/* NEWS */}
        <div>
          {data.news?.slice(0,8).map((n:any,i:number)=>(
            <div key={i} style={{
              marginBottom:20,
              paddingBottom:15,
              borderBottom:"1px solid #222",
              cursor:"pointer",
              transition:"0.3s"
            }}
            onMouseEnter={(e:any)=>{
              e.currentTarget.style.transform="scale(1.02)";
            }}
            onMouseLeave={(e:any)=>{
              e.currentTarget.style.transform="scale(1)";
            }}
            >

              <h2 style={{
                fontSize:20,
                marginBottom:6
              }}>
                {clean(n.title)}
              </h2>

              <div style={{fontSize:12,opacity:0.6}}>
                {n.source}
              </div>

              {/* ACTIONS */}
              <div style={{
                marginTop:8,
                display:"flex",
                gap:10,
                flexWrap:"wrap"
              }}>
                <button onClick={()=>getSummary(n.title)}>🧠 Summary</button>
                <button onClick={()=>speak(n.title)}>🔊 Listen</button>
                <button onClick={()=>share(n.link)}>📤 Share</button>
                <a href={n.link} target="_blank">🔗 Open</a>
              </div>

            </div>
          ))}
        </div>

        {/* SIDE */}
        <div>

          {/* VIDEO */}
          <iframe
            src={`https://www.youtube.com/embed/${data.videos?.[0]?.id}`}
            style={{
              width:"100%",
              height:220,
              border:"none",
              marginBottom:20
            }}
          />

          {/* AI IMAGE */}
          {data.image && (
            <img
              src={data.image}
              style={{
                width:"100%",
                height:220,
                objectFit:"cover",
                marginBottom:20
              }}
            />
          )}

          {/* SUMMARY BOX */}
          {summary && (
            <div style={{
              background:"#111",
              padding:15,
              borderRadius:10
            }}>
              <h3>AI Summary</h3>
              <p style={{fontSize:14,opacity:0.8}}>
                {summary}
              </p>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
