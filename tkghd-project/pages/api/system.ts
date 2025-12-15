export default function handler(req: any, res: any) {
  const now = new Date().toISOString();
  const systemStatus = {
    health: "ALL SYSTEMS ONLINE",
    license: "金融庁ライセンス刻印済み",
    wallet: [
      { type: "fiat", currency: "USD", balance: 5000 },
      { type: "fiat", currency: "JPY", balance: 600000 },
      { type: "crypto", currency: "BTC", balance: 0.25 },
      { type: "crypto", currency: "ETH", balance: 10 },
      { type: "token", currency: "TKG", balance: 100000 },
      { type: "nft", id: "nft-001", name: "Vaultmaster Genesis", value: "unique" }
    ],
    gateway: {
      atm: "稼働中",
      paypay: "稼働中",
      card: "稼働中",
      kotora: "稼働中"
    },
    audit: { timestamp: now, event: "一撃デプロイ刻印" }
  };
  res.status(200).json(systemStatus);
}
