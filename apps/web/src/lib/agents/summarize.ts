export function summarizeCluster(cluster:any) {
  return cluster.items.slice(0,3).map((i:any)=>i.title).join(". ") + "...";
}
