export async function fetchCrypto(){
  try{
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd"
    );
    const data = await res.json();

    return [
      { name:"BTC", price:data.bitcoin.usd },
      { name:"ETH", price:data.ethereum.usd },
      { name:"SOL", price:data.solana.usd }
    ];
  }catch(e){
    console.error("CRYPTO ERROR", e);
    return [];
  }
}
