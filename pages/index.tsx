import React, { useState, useEffect } from "react";

export default function Home() {
  const [wallet, setWallet] = useState<any>(null);

  useEffect(() => {
    fetch("/api/wallet").then(r => r.json()).then(setWallet);
  }, []);

  return (
    <div style={{ fontFamily: "system-ui", padding: "2rem" }}>
      <h1>💠 全搭載 HUD — Wallet + NFT</h1>
      <h2>ALL SYSTEMS ONLINE ✅</h2>

      <h3>💰 全資産一覧</h3>
      <ul>
        {wallet?.assets?.filter((a:any) => a.type !== "nft").map((a:any, i:number) => (
          <li key={i}>{a.type.toUpperCase()} {a.currency}: {a.balance}</li>
        ))}
      </ul>

      <h3>🎨 NFTギャラリー</h3>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {wallet?.assets?.filter((a:any) => a.type === "nft").map((nft:any, i:number) => (
          <div key={i} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
            <p>ID: {nft.id}</p>
            <p>Name: {nft.name}</p>
            <p>Value: {nft.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
