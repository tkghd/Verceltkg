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
