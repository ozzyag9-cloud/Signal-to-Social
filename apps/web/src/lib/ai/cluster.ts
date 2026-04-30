function cosine(a:number[], b:number[]) {
  const dot = a.reduce((sum,v,i)=>sum+v*b[i],0);
  const magA = Math.sqrt(a.reduce((s,v)=>s+v*v,0));
  const magB = Math.sqrt(b.reduce((s,v)=>s+v*v,0));
  return dot/(magA*magB);
}

export async function semanticCluster(items:any[], embedFn:any) {
  const clusters:any[] = [];

  for (const item of items) {
    const emb = await embedFn(item.title);

    let placed = false;

    for (const c of clusters) {
      const sim = cosine(emb, c.embedding);

      if (sim > 0.85) {
        c.items.push(item);
        placed = true;
        break;
      }
    }

    if (!placed) {
      clusters.push({
        embedding: emb,
        items: [item]
      });
    }
  }

  return clusters;
}
