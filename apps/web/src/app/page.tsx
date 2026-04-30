"use client";
import { useEffect, useState } from "react";

export default function Home(){
  const [data,setData]=useState<any>(null);
  const [error,setError]=useState<any>(null);

  useEffect(()=>{
    async function load(){
      try {
        console.log("Fetching /api/feed...");
        const res = await fetch("/api/feed");

        console.log("Response status:", res.status);

        const json = await res.json();

        console.log("DATA RECEIVED:", json);

        setData(json);

      } catch (e:any) {
        console.error("FETCH ERROR:", e);
        setError(e.message);
      }
    }

    load();
  },[]);

  if(error){
    return <pre style={{color:"red"}}>ERROR: {error}</pre>;
  }

  if(!data){
    return <p style={{color:"white"}}>Booting intelligence layer...</p>;
  }

  return (
    <main style={{padding:20,color:"white",background:"#050505"}}>
      <h1>📡 Signal Intelligence</h1>

      <pre>{JSON.stringify(data,null,2)}</pre>
    </main>
  );
}
