import React from "react";

export default function Home() {
  const [health, setHealth] = React.useState<any>(null);
  const [balance, setBalance] = React.useState<any>(null);
  const [transactions, setTransactions] = React.useState<any>(null);

  React.useEffect(() => {
    fetch("/api/health").then(r => r.json()).then(setHealth);
    fetch("/api/balance/demoUser").then(r => r.json()).then(setBalance);
    fetch("/api/transactions/demoUser").then(r => r.json()).then(setTransactions);
  }, []);

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
      <ul>{balance?.accounts?.map((a:any) => (<li key={a.currency}>{a.currency}: {a.balance}</li>))}</ul>
      <h3>📜 取引履歴</h3>
      <ul>{transactions?.transactions?.map((t:any) => (<li key={t.id}>{t.name} {t.amount} {t.currency}</li>))}</ul>
    </div>
  );
}
