'use client';
import { useEffect, useState } from 'react';
export default function Web3HUD(){
  const eth=typeof window!=='undefined'?(window as any).ethereum:null;
  const [addr,setAddr]=useState<string>(''); const [chain,setChain]=useState<number|undefined>();
  const [status,setStatus]=useState<string>('DISCONNECTED'); const [events,setEvents]=useState<string[]>([]); const [txHash,setTxHash]=useState<string>('');
  async function connect(){ if(!eth){setStatus('NO_WALLET');return;} try{ const [a]=await eth.request({method:'eth_requestAccounts'}); const c=await eth.request({method:'eth_chainId'}); setAddr(a); setChain(parseInt(c,16)); setStatus('CONNECTED'); }catch(e:any){ setStatus('ERROR:'+ (e?.message||'failed')); } }
  useEffect(()=>{ const sse=new EventSource(process.env.NEXT_PUBLIC_EVENTS_PATH||'/api/events'); sse.onmessage=(m)=>setEvents(e=>[m.data,...e].slice(0,25)); sse.onerror=()=>sse.close(); return ()=>sse.close(); },[]);
  async function sendEth(to:string,wei:string){ if(!eth||!addr) return; const v='0x'+BigInt(wei).toString(16); const h=await eth.request({method:'eth_sendTransaction',params:[{from:addr,to,value:v}]}); setTxHash(h); setStatus('TX_SUBMITTED'); }
  async function sendERC20(to:string,amount:string,token:string){ if(!eth||!addr) return; const abi=[{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"type":"function"}]; const data=(new (window as any).Web3(eth)).eth.abi.encodeFunctionCall(abi[0],[to,amount]); const h=await eth.request({method:'eth_sendTransaction',params:[{from:addr,to:token,data}]}); setTxHash(h); setStatus('TX_SUBMITTED'); poll(h); }
  async function poll(h:string){ const url='/api/txstatus?hash='+h; let t=0; const tick=async()=>{ t++; const r=await fetch(url); const j=await r.json(); if(j.status==='CONFIRMED'){ setStatus('BLOCK_CONFIRMED'); setEvents(e=>[`CONFIRMED ${h}`,...e]); } else if(t<60) setTimeout(tick,2000); else setStatus('PENDING_TIMEOUT'); }; tick(); }
  return (<div style={{padding:16,display:'grid',gap:12}}>
    <button onClick={connect}>Connect Wallet</button>
    <div><b>Address:</b> {addr||'-'}</div><div><b>Chain:</b> {chain??'-'}</div><div><b>Status:</b> {status}</div><div><b>TxHash:</b> {txHash||'-'}</div>
    <form onSubmit={(e)=>{e.preventDefault(); const f=e.target as any; sendEth(f.eth_to.value,f.eth_wei.value);}}>
      <input name="eth_to" placeholder="0xRecipient (ETH)" style={{width:'60%'}}/><input name="eth_wei" placeholder="1000000000000000"/><button type="submit">Send ETH</button>
    </form>
    <form onSubmit={(e)=>{e.preventDefault(); const f=e.target as any; sendERC20(f.erc_to.value,f.erc_amount.value,f.erc_token.value);}}>
      <input name="erc_to" placeholder="0xRecipient (ERC20)" style={{width:'60%'}}/><input name="erc_amount" placeholder="1000000"/><input name="erc_token" placeholder="0xTokenContractAddress"/><button type="submit">Send ERC20</button>
    </form>
    <div><b>Events (SSE):</b><ul>{events.map((x,i)=><li key={i}>{x}</li>)}</ul></div>
  </div>);}
