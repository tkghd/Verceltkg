export default function handler(req: any, res: any) {
  const apiKey = process.env.REAL_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "REAL_API_KEY 未設定" });

  res.status(200).json({
    user: "demoUser",
    assets: [
      { type: "fiat", currency: "USD", balance: 5000 },
      { type: "fiat", currency: "JPY", balance: 600000 },
      { type: "crypto", currency: "BTC", balance: 0.25 },
      { type: "crypto", currency: "ETH", balance: 10 },
      { type: "token", currency: "TKG", balance: 100000 },
      { type: "nft", id: "nft-001", name: "Vaultmaster Genesis", value: "unique" }
    ],
    timestamp: new Date().toISOString()
  });
}
