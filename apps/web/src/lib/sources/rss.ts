function clean(text:string){
  return text.replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1");
}

export async function fetchRSS(url:string){
  try{
    const res = await fetch(url);
    const xml = await res.text();

    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];

    return items.slice(0,10).map((item:any)=>{
      const get = (tag:string)=>{
        const m = item[1].match(new RegExp(`<${tag}>(.*?)<\/${tag}>`));
        return m ? clean(m[1]) : "";
      };

      return {
        title: get("title"),
        link: get("link"),
        pubDate: get("pubDate"),
        source: "RSS"
      };
    });

  }catch(e){
    console.error("RSS ERROR", e);
    return [];
  }
}
