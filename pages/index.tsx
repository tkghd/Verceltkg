import React, { useState, useEffect } from "react";

export default function Home() {
  const [health, setHealth] = useState<any>(null);
  const [balance, setBalance] = useState<any>(null);
  const [transactions, setTransactions] = useState<any>(null);
  const [transferResult, setTransferResult] = useState<any>(null);

  useEffect(() => {
    fetch("/api/health").then(r => r.json()).then(setHealth);
    fetch("/api/balance/demoUser").then(r => r.json()).then(setBalance);
    fetch("/api/transactions/demoUser").then(r => r.json()).then(setTransactions);
  }, []);

  const handleTransfer = async () => {
    const res = await fetch("/api/transfer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from: "demoUser", to: "targetUser", amount: 10000 })
    });
    const data = await res.json();
    setTransferResult(data);
  };

  return (
    <div style={{ fontFamily: "system-ui", padding: "2rem" }}>
      <h1>🚀 全搭載 — 統合本番システム</h1>
      <h2>ALL SYSTEMS ONLINE ✅</h2>

      <div style={{ background: "#222", color: "#fff", padding: "1rem", borderRadius: "8px" }}>
        <p>環境: {process.env.NEXT_PUBLIC_ENV}</p>
        <p>ビルドID: {process.env.NEXT_PUBLIC_BUILD_ID}</p>
        <p>APIステータス: {health?.status}</p>
        <p>ライセンス: {health?.licenseStatus}</p>
      </div>

      <h3>💰 残高</h3>
      <ul>
        {balance?.accounts?.map((a:any) => (
          <li key={a.currency}>{a.currency}: {a.balance}</li>
        ))}
      </ul>

      <h3>📜 取引履歴</h3>
      <table border={1} cellPadding={6}>
        <thead>
          <tr><th>ID</th><th>内容</th><th>金額</th><th>通貨</th></tr>
        </thead>
        <tbody>
          {transactions?.transactions?.map((t:any) => (
            <tr key={t.id}>
              <td>{t.id}</td><td>{t.name}</td><td>{t.amount}</td><td>{t.currency}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>💸 送金</h3>
      <button onClick={handleTransfer}>送金実行 (demoUser → targetUser, 10000)</button>
      {transferResult && (
        <p style={{ marginTop: "1rem", color: "green" }}>
          送金結果: {transferResult.ok ? `成功 (TxID: ${transferResult.txId})` : "失敗"}
        </p>
      )}
    </div>
  );
}
