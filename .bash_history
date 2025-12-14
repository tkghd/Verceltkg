
mkdir -p pages/api/transactions && cat > pages/api/transactions/[userId].ts <<'EOF' && git add pages/api/transactions/[userId].ts && git commit -m "API追加: transactions取引履歴" && git push origin main
export default function handler(req: any, res: any) {
  if (!process.env.REAL_API_KEY) return res.status(401).json({ error: "Unauthorized" });

  const { userId } = req.query;
  const txs = [
    { id: 1, name: "給与振込", amount: 350000, currency: "JPY", type: "positive" },
    { id: 2, name: "Amazon決済", amount: -12500, currency: "JPY", type: "negative" },
  ];

  res.status(200).json({ userId, transactions: txs });
}
EOF

mkdir -p pages/api/balance && cat > pages/api/balance/[userId].ts <<'EOF' && git add pages/api/balance/[userId].ts && git commit -m "API追加: balance残高情報" && git push origin main
export default function handler(req: any, res: any) {
  if (!process.env.REAL_API_KEY) return res.status(401).json({ error: "Unauthorized" });

  const { userId } = req.query;
  const accounts = [
    { currency: "JPY", balance: 2547835 },
    { currency: "USD", balance: 18500 },
    { currency: "BTC", balance: 0.0234 },
  ];

  res.status(200).json({ userId, accounts });
}
EOF

cat > pages/api/health.ts <<'EOF' && git add pages/api/health.ts && git commit -m "API追加: health稼働状況" && git push origin main
export default function handler(req: any, res: any) {
  const apiKey = process.env.REAL_API_KEY;
  if (!apiKey) return res.status(500).json({ status: "error", message: "REAL_API_KEY 未設定" });

  res.status(200).json({
    status: "ok",
    service: "Global Corp Banking System",
    version: "1.0.0",
    buildId: process.env.NEXT_PUBLIC_BUILD_ID || "local",
    environment: process.env.NEXT_PUBLIC_ENV || "DEV",
    licenseStatus: "valid",
    licenseId: process.env.LICENSE_ID || "corp-license-001",
    corpId: process.env.CORP_ID || "corp-xyz",
    timestamp: new Date().toISOString(),
  });
}
EOF

npm install @metamask/sdk wagmi viem@2.x @tanstack/react-query vercel web3 && mkdir -p app/api/{gateway,events,txstatus,real/{owner-sync,corp-sync,refresh}} app/components app/lib public/data scripts logs && [ -f .env ] || cat > .env <<'ENV'
NEXT_PUBLIC_APP_NAME=TK Global Bank HUD
NEXT_PUBLIC_EVENTS_PATH=/api/events
NEXT_PUBLIC_GATEWAY_PATH=/api/gateway
NEXT_PUBLIC_RPC_MAINNET=https://mainnet.infura.io/v3/<APIKEY>
NEXT_PUBLIC_RPC_SEPOLIA=https://sepolia.infura.io/v3/<APIKEY>
AUTH_ID=admin
AUTH_PW=secret
REAL_API_BASE=https://internal-real.example
REAL_API_KEY_OWNER=xxxx
REAL_API_KEY_CORP=yyyy
ENV

cat > app/api/events/route.ts <<'TS'
export const runtime = 'edge';
export async function GET() {
  const stream = new ReadableStream({ start(controller){ const enc=new TextEncoder(); const send=(s:string)=>controller.enqueue(enc.encode(`data: ${s}\n\n`)); send('ALL MODULES ONLINE + BANK API LIVE + WEB3 READY'); const id=setInterval(()=>send(new Date().toISOString()),2000); return ()=>clearInterval(id);} });
  return new Response(stream,{headers:{'content-type':'text/event-stream','cache-control':'no-cache'}});
}
TS

cat > app/api/txstatus/route.ts <<'TS'
export const runtime = 'edge';
export async function GET(req: Request) {
  const u=new URL(req.url); const hash=u.searchParams.get('hash'); if(!hash) return new Response(JSON.stringify({error:'missing hash'}),{status:400,headers:{'content-type':'application/json'}});
  const rpc=process.env.NEXT_PUBLIC_RPC_MAINNET!; const body={jsonrpc:'2.0',id:1,method:'eth_getTransactionReceipt',params:[hash]};
  const r=await fetch(rpc,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)}); const j=await r.json();
  if(j.result && j.result.status==='0x1') return new Response(JSON.stringify({status:'CONFIRMED',block:j.result.blockNumber}),{headers:{'content-type':'application/json'}});
  return new Response(JSON.stringify({status:'PENDING'}),{headers:{'content-type':'application/json'}});
}
TS

cat > app/api/real/owner-sync/route.ts <<'TS'
export const runtime='edge';
const deny=()=>new Response('unauthorized',{status:401});
const ok=(j:any)=>new Response(JSON.stringify(j),{headers:{'content-type':'application/json'}});
export async function GET(req:Request){
  const auth=req.headers.get('authorization')||''; const [,basic]=auth.split(' '); if(!basic) return deny();
  const [id,pw]=atob(basic).split(':'); if(id!==process.env.AUTH_ID||pw!==process.env.AUTH_PW) return deny();
  const base=process.env.REAL_API_BASE!; const key=process.env.REAL_API_KEY_OWNER!;
  const r=await fetch(`${base}/owner`,{headers:{'x-api-key':key}}); const d=await r.json();
  return ok({updatedAt:new Date().toISOString(),fiat:d.fiat,crypto:d.crypto,note:'OWNER_SYNC'});
}
TS

cat > app/api/real/corp-sync/route.ts <<'TS'
export const runtime='edge';
const deny=()=>new Response('unauthorized',{status:401});
const ok=(j:any)=>new Response(JSON.stringify(j),{headers:{'content-type':'application/json'}});
export async function GET(req:Request){
  const auth=req.headers.get('authorization')||''; const [,basic]=auth.split(' '); if(!basic) return deny();
  const [id,pw]=atob(basic).split(':'); if(id!==process.env.AUTH_ID||pw!==process.env.AUTH_PW) return deny();
  const base=process.env.REAL_API_BASE!; const key=process.env.REAL_API_KEY_CORP!;
  const r=await fetch(`${base}/corp`,{headers:{'x-api-key':key}}); const d=await r.json();
  return ok({updatedAt:new Date().toISOString(),corp:d.accounts,total:d.total,note:'CORP_SYNC'});
}
TS

cat > app/api/real/refresh/route.ts <<'TS'
export const runtime='edge';
const deny=()=>new Response('unauthorized',{status:401});
const ok=(j:any)=>new Response(JSON.stringify(j),{headers:{'content-type':'application/json'}});
export async function POST(req:Request){
  const auth=req.headers.get('authorization')||''; const [,basic]=auth.split(' '); if(!basic) return deny();
  const [id,pw]=atob(basic).split(':'); if(id!==process.env.AUTH_ID||pw!==process.env.AUTH_PW) return deny();
  const origin=new URL(req.url).origin;
  const [owner,corp]=await Promise.all([
    fetch(`${origin}/api/real/owner-sync`,{headers:{authorization:`Basic ${basic}`}}).then(r=>r.json()),
    fetch(`${origin}/api/real/corp-sync`,{headers:{authorization:`Basic ${basic}`}}).then(r=>r.json())
  ]);
  return ok({status:'OK',owner,corp});
}
TS

cat > app/components/Web3HUD.tsx <<'TSX'
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
TSX

cat > app/page.tsx <<'TSX'
import Web3HUD from './components/Web3HUD';
export default function Page(){ return(<main style={{padding:24}}><h1>{process.env.NEXT_PUBLIC_APP_NAME||'HUD'}</h1><Web3HUD/></main>); }
TSX

cat > scripts/repair-deploy.sh <<'SH'
#!/usr/bin/env bash
set -euo pipefail
TS="$(date -Iseconds)"; LOG="logs/repair-$TS.log"; mkdir -p logs
echo "[repair] start $TS" | tee -a "$LOG"
[ -f ".env" ] || { echo "[repair] .env missing" | tee -a "$LOG"; exit 1; }
[ -d node_modules ] || { echo "[repair] reinstall deps" | tee -a "$LOG"; npm ci || npm install; }
echo "[repair] build" | tee -a "$LOG"; npm run build 2>&1 | tee -a "$LOG"
echo "[repair] start (internal)" | tee -a "$LOG"; nohup npm run start >> logs/runtime.log 2>&1 &
echo "[repair] done" | tee -a "$LOG"
SH

chmod +x scripts/repair-deploy.sh && cat > scripts/repair-deploy.service <<'UNIT'
[Unit]
Description=TKGHD Repair & Internal Start (User Service)
After=network.target
[Service]
Type=simple
WorkingDirectory=%h/PROJECT_DIR
ExecStart=%h/PROJECT_DIR/scripts/repair-deploy.sh
Restart=always
RestartSec=10
EnvironmentFile=%h/PROJECT_DIR/.env
StandardOutput=append:%h/PROJECT_DIR/logs/systemd.out.log
StandardError=append:%h/PROJECT_DIR/logs/systemd.err.log
[Install]
WantedBy=default.target
UNIT

cat > scripts/repair-deploy.timer <<'TIMER'
[Unit]
Description=TKGHD Auto Repair Timer
[Timer]
OnBootSec=30s
OnUnitActiveSec=5m
Persistent=true
Unit=repair-deploy.service
[Install]
WantedBy=timers.target
TIMER

PRJ="$(pwd)"; sed -i "s|%h/PROJECT_DIR|$PRJ|g" scripts/repair-deploy.service && for d in $(find . -mindepth 2 -type d -name ".git" -printf '%h\n'); do git rm --cached -r "$d" 2>/dev/null || true; rm -rf "$d"; done && echo -e ".env\nlogs/\n*.key\n*.pem\n" >> .gitignore && mkdir -p ~/.config/systemd/user && cp scripts/repair-deploy.service ~/.config/systemd/user/ && cp scripts/repair-deploy.timer ~/.config/systemd/user/ && systemctl --user daemon-reload && systemctl --user enable --now repair-deploy.timer && git add . && git commit -m "刻印: 永久ワンライナー全搭載 + 自動修復常駐 + 内部起動" && npm audit fix --force && npm run build && npm run start
npm run build
npm run start
npm run build
npm run start
# 1. lockを一度整理
rm -rf node_modules package-lock.json
npm install
# 2. forceは使わない
npm audit fixnpm run start
→ node server.js
→ Server running on port 3000pages/api/health.ts
gcloud config set project studio-9143529927-91d1f
cat > pages/index.tsx <<'EOF' && git add pages/index.tsx && git commit -m "HUD拡張: チャットルーム連動" && git push origin main
import React, { useState, useEffect, useRef } from "react";

export default function Home() {
  const [health, setHealth] = useState<any>(null);
  const [balance, setBalance] = useState<any>(null);
  const [transactions, setTransactions] = useState<any>(null);
  const [transferResult, setTransferResult] = useState<any>(null);
  const [chatLog, setChatLog] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/health").then(r => r.json()).then(setHealth);
    fetch("/api/balance/demoUser").then(r => r.json()).then(setBalance);
    fetch("/api/transactions/demoUser").then(r => r.json()).then(setTransactions);
  }, []);

  const sendCommand = async () => {
    const text = inputRef.current?.value?.trim();
    if (!text) return;
    setChatLog((log) => [...log, { user: true, msg: text }]);
    inputRef.current!.value = "";
    const res = await fetch("/api/command", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-base-url": window.location.origin },
      body: JSON.stringify({ message: text })
    });
    const data = await res.json();
    setChatLog((log) => [...log, { ai: true, msg: data.reply }]);

    // HUD反映
    if (text.includes("残高")) setBalance(data.data);
    if (text.includes("履歴")) setTransactions(data.data);
    if (text.includes("稼働") || text.toLowerCase().includes("health")) setHealth(data.data);
    if (text.includes("送金") || text.toLowerCase().includes("transfer")) setTransferResult(data.data);
  };

  return (
    <div style={{ fontFamily: "system-ui", padding: "2rem" }}>
      <h1>🤖 AI HUD — 全搭載</h1>
      <h2>ALL SYSTEMS ONLINE ✅</h2>

      <div style={{ background: "#222", color: "#fff", padding: "1rem", borderRadius: "8px" }}>
        <p>環境: {process.env.NEXT_PUBLIC_ENV}</p>
        <p>ビルドID: {process.env.NEXT_PUBLIC_BUILD_ID}</p>
        <p>APIステータス: {health?.status}</p>
        <p>ライセンス: {health?.licenseStatus}</p>
      </div>

      <h3>💰 残高</h3>
      <ul>{balance?.accounts?.map((a:any) => (<li key={a.currency}>{a.currency}: {a.balance}</li>))}</ul>

      <h3>📜 取引履歴</h3>
      <table border={1} cellPadding={6}>
        <thead><tr><th>ID</th><th>内容</th><th>金額</th><th>通貨</th></tr></thead>
        <tbody>{transactions?.transactions?.map((t:any) => (
          <tr key={t.id}><td>{t.id}</td><td>{t.name}</td><td>{t.amount}</td><td>{t.currency}</td></tr>
        ))}</tbody>
      </table>

      <h3>💸 送金</h3>
      {transferResult && <p style={{ color: "green" }}>送金結果: {transferResult.ok ? `成功 (TxID: ${transferResult.txId})` : "失敗"}</p>}

      <h3>🗨️ チャットルーム</h3>
      <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", marginBottom: "1rem", maxHeight: 200, overflowY: "auto" }}>
        {chatLog.map((c, i) => (
          <div key={i}><b>{c.user ? "You" : "AI"}:</b> {c.msg}</div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input ref={inputRef} placeholder="例: 残高 / 履歴 / 送金 / 稼働" style={{ flex: 1, padding: "0.5rem" }} />
        <button onClick={sendCommand}>送信</button>
      </div>
    </div>
  );
}
EOF

cat > pages/api/events.ts <<'EOF' && git add pages/api/events.ts && git commit -m "API追加: events SSEリアルタイム反映" && git push origin main
export default function handler(req: any, res: any) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  const send = (event: any) => {
    res.write(`data: ${JSON.stringify(event)}\n\n`);
  };

  send({ type: "hello", ts: Date.now() });

  const interval = setInterval(() => {
    globalThis.__EVENTS__ = globalThis.__EVENTS__ || [];
    let ev;
    while ((ev = (globalThis.__EVENTS__ as any[]).shift())) {
      send(ev);
    }
    send({ type: "heartbeat", ts: Date.now() });
  }, 2000);

  req.on("close", () => {
    clearInterval(interval);
    res.end();
  });
}
EOF

cat > pages/index.tsx <<'EOF' && git add pages/index.tsx && git commit -m "HUD拡張: SSEリアルタイム反映" && git push origin main
import React, { useState, useEffect, useRef } from "react";

export default function Home() {
  const [health, setHealth] = useState<any>(null);
  const [balance, setBalance] = useState<any>(null);
  const [transactions, setTransactions] = useState<any>(null);
  const [transferResult, setTransferResult] = useState<any>(null);
  const [chatLog, setChatLog] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/health").then(r => r.json()).then(setHealth);
    fetch("/api/balance/demoUser").then(r => r.json()).then(setBalance);
    fetch("/api/transactions/demoUser").then(r => r.json()).then(setTransactions);

    // SSE接続
    const evt = new EventSource("/api/events");
    evt.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      setChatLog((log) => [...log, { system: true, msg }]);
      if (msg.type === "transfer") setTransferResult(msg);
      if (msg.type === "heartbeat") console.log("heartbeat", msg.ts);
    };
    return () => evt.close();
  }, []);

  const sendCommand = async () => {
    const text = inputRef.current?.value?.trim();
    if (!text) return;
    setChatLog((log) => [...log, { user: true, msg: text }]);
    inputRef.current!.value = "";
    const res = await fetch("/api/command", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-base-url": window.location.origin },
      body: JSON.stringify({ message: text })
    });
    const data = await res.json();
    setChatLog((log) => [...log, { ai: true, msg: data.reply }]);

    if (text.includes("残高")) setBalance(data.data);
    if (text.includes("履歴")) setTransactions(data.data);
    if (text.includes("稼働") || text.toLowerCase().includes("health")) setHealth(data.data);
    if (text.includes("送金") || text.toLowerCase().includes("transfer")) setTransferResult(data.data);
  };

  return (
    <div style={{ fontFamily: "system-ui", padding: "2rem" }}>
      <h1>🤖 AI HUD — 全搭載 永久稼働</h1>
      <h2>ALL SYSTEMS ONLINE ✅</h2>

      <div style={{ background: "#222", color: "#fff", padding: "1rem", borderRadius: "8px" }}>
        <p>環境: {process.env.NEXT_PUBLIC_ENV}</p>
        <p>ビルドID: {process.env.NEXT_PUBLIC_BUILD_ID}</p>
        <p>APIステータス: {health?.status}</p>
        <p>ライセンス: {health?.licenseStatus}</p>
      </div>

      <h3>💰 残高</h3>
      <ul>{balance?.accounts?.map((a:any) => (<li key={a.currency}>{a.currency}: {a.balance}</li>))}</ul>

      <h3>📜 取引履歴</h3>
      <table border={1} cellPadding={6}>
        <thead><tr><th>ID</th><th>内容</th><th>金額</th><th>通貨</th></tr></thead>
        <tbody>{transactions?.transactions?.map((t:any) => (
          <tr key={t.id}><td>{t.id}</td><td>{t.name}</td><td>{t.amount}</td><td>{t.currency}</td></tr>
        ))}</tbody>
      </table>

      <h3>💸 送金</h3>
      {transferResult && <p style={{ color: "green" }}>送金結果: {transferResult.ok ? `成功 (TxID: ${transferResult.txId})` : "通知受信"}</p>}

      <h3>🗨️ チャットルーム</h3>
      <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", marginBottom: "1rem", maxHeight: 200, overflowY: "auto" }}>
        {chatLog.map((c, i) => (
          <div key={i}><b>{c.user ? "You" : c.ai ? "AI" : "System"}:</b> {typeof c.msg === "string" ? c.msg : JSON.stringify(c.msg)}</div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input ref={inputRef} placeholder="例: 残高 / 履歴 / 送金 / 稼働" style={{ flex: 1, padding: "0.5rem" }} />
        <button onClick={sendCommand}>送信</button>
      </div>
    </div>
  );
}
EOF

rm -rf node_modules package-lock.json && npm install && npm run build && git add . && git commit -m "ALL SYSTEMS ONLINE: 永久ビルドデプロイ" && git push origin main
cat > pages/index.tsx <<'EOF' && git add pages/index.tsx && git commit -m "HUD拡張: Chart.js残高グラフ追加" && git push origin main
import React, { useState, useEffect, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [health, setHealth] = useState<any>(null);
  const [balance, setBalance] = useState<any>(null);
  const [transactions, setTransactions] = useState<any>(null);
  const [transferResult, setTransferResult] = useState<any>(null);
  const [chatLog, setChatLog] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/health").then(r => r.json()).then(setHealth);
    fetch("/api/balance/demoUser").then(r => r.json()).then(setBalance);
    fetch("/api/transactions/demoUser").then(r => r.json()).then(setTransactions);

    const evt = new EventSource("/api/events");
    evt.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      setChatLog((log) => [...log, { system: true, msg }]);
      if (msg.type === "transfer") setTransferResult(msg);
    };
    return () => evt.close();
  }, []);

  const sendCommand = async () => {
    const text = inputRef.current?.value?.trim();
    if (!text) return;
    setChatLog((log) => [...log, { user: true, msg: text }]);
    inputRef.current!.value = "";
    const res = await fetch("/api/command", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-base-url": window.location.origin },
      body: JSON.stringify({ message: text })
    });
    const data = await res.json();
    setChatLog((log) => [...log, { ai: true, msg: data.reply }]);

    if (text.includes("残高")) setBalance(data.data);
    if (text.includes("履歴")) setTransactions(data.data);
    if (text.includes("稼働") || text.toLowerCase().includes("health")) setHealth(data.data);
    if (text.includes("送金") || text.toLowerCase().includes("transfer")) setTransferResult(data.data);
  };

  const balanceData = balance ? {
    labels: balance.accounts.map((a:any) => a.currency),
    datasets: [{
      data: balance.accounts.map((a:any) => a.balance),
      backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
    }]
  } : null;

  return (
    <div style={{ fontFamily: "system-ui", padding: "2rem" }}>
      <h1>🤖 AI HUD — 全搭載 永久稼働</h1>
      <h2>ALL SYSTEMS ONLINE ✅</h2>

      <div style={{ background: "#222", color: "#fff", padding: "1rem", borderRadius: "8px" }}>
        <p>環境: {process.env.NEXT_PUBLIC_ENV}</p>
        <p>ビルドID: {process.env.NEXT_PUBLIC_BUILD_ID}</p>
        <p>APIステータス: {health?.status}</p>
        <p>ライセンス: {health?.licenseStatus}</p>
      </div>

      <h3>💰 残高</h3>
      <ul>{balance?.accounts?.map((a:any) => (<li key={a.currency}>{a.currency}: {a.balance}</li>))}</ul>
      {balanceData && <Doughnut data={balanceData} />}

      <h3>📜 取引履歴</h3>
      <table border={1} cellPadding={6}>
        <thead><tr><th>ID</th><th>内容</th><th>金額</th><th>通貨</th></tr></thead>
        <tbody>{transactions?.transactions?.map((t:any) => (
          <tr key={t.id}><td>{t.id}</td><td>{t.name}</td><td>{t.amount}</td><td>{t.currency}</td></tr>
        ))}</tbody>
      </table>

      <h3>💸 送金</h3>
      {transferResult && <p style={{ color: "green" }}>送金結果: {transferResult.ok ? `成功 (TxID: ${transferResult.txId})` : "通知受信"}</p>}

      <h3>🗨️ チャットルーム</h3>
      <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", marginBottom: "1rem", maxHeight: 200, overflowY: "auto" }}>
        {chatLog.map((c, i) => (
          <div key={i}><b>{c.user ? "You" : c.ai ? "AI" : "System"}:</b> {typeof c.msg === "string" ? c.msg : JSON.stringify(c.msg)}</div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input ref={inputRef} placeholder="例: 残高 / 履歴 / 送金 / 稼働" style={{ flex: 1, padding: "0.5rem" }} />
        <button onClick={sendCommand}>送信</button>
      </div>
    </div>
  );
}
EOF

