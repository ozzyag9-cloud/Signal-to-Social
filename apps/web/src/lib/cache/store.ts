let cache:any = {
  news: [],
  clusters: [],
  videos: [],
  updatedAt: null
};

export function getCache(){
  return cache;
}

export function setCache(data:any){
  cache = {
    ...data,
    updatedAt: Date.now()
  };
}
