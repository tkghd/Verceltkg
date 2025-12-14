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
