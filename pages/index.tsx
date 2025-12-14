import React, { useState, useEffect } from "react";

export default function Home() {
  const [balance, setBalance] = useState<any>(null);
  const [rates, setRates] = useState<any>(null);

  useEffect(() => {
    fetch("/api/balance/demoUser").then(r => r.json()).then(setBalance);

    // 外部レート取得 (USD/JPY, BTC)
    Promise.all([
      fetch("https://api.coindesk.com/v1/bpi/currentprice/USD.json").then(r => r.json()),
      fetch("https://api.coindesk.com/v1/bpi/currentprice/JPY.json").then(r => r.json())
    ]).then(([usd, jpy]) => {
      setRates({
        usd: usd.bpi.USD.rate_float,
        jpy: jpy.bpi.JPY.rate_float
      });
    });
  }, []);

  return (
    <div style={{ fontFamily: "system-ui", padding: "2rem" }}>
      <h1>💠 全搭載 HUD — 外部レート統合</h1>
      <h2>ALL SYSTEMS ONLINE ✅</h2>

      <h3>💰 残高</h3>
      <ul>
        {balance?.accounts?.map((a:any) => (
          <li key={a.currency}>
            {a.currency}: {a.balance}
            {rates && a.currency === "BTC" && (
              <span> ≈ {(a.balance * rates.usd).toFixed(2)} USD / {(a.balance * rates.jpy).toFixed(0)} JPY</span>
            )}
          </li>
        ))}
      </ul>

      <h3>📈 外部レート</h3>
      {rates ? (
        <div>
          <p>BTC/USD: {rates.usd.toFixed(2)}</p>
          <p>BTC/JPY: {rates.jpy.toFixed(0)}</p>
        </div>
      ) : <p>レート取得中...</p>}
    </div>
  );
}
