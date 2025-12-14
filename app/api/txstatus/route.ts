export const runtime = 'edge';
export async function GET(req: Request) {
  const url = new URL(req.url);
  const txHash = url.searchParams.get('hash');
  if (!txHash) return new Response(JSON.stringify({error:"missing hash"}), {status:400, headers:{'content-type':'application/json'}});
  const rpc = process.env.NEXT_PUBLIC_RPC_MAINNET!;
  const body = { jsonrpc:"2.0", id:1, method:"eth_getTransactionReceipt", params:[txHash] };
  const res = await fetch(rpc, { method:"POST", headers:{'content-type':'application/json'}, body: JSON.stringify(body) });
  const data = await res.json();
  if (data.result && data.result.status === "0x1") {
    return new Response(JSON.stringify({status:"CONFIRMED", block:data.result.blockNumber}), {headers:{'content-type':'application/json'}});
  }
  return new Response(JSON.stringify({status:"PENDING"}), {headers:{'content-type':'application/json'}});
}
