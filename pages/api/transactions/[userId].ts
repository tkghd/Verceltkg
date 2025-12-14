export default function handler(req: any, res: any) {
  if (!process.env.REAL_API_KEY) return res.status(401).json({ error: "Unauthorized" });

  const { userId } = req.query;
  const txs = [
    { id: 1, name: "給与振込", amount: 350000, currency: "JPY", type: "positive" },
    { id: 2, name: "Amazon決済", amount: -12500, currency: "JPY", type: "negative" },
  ];

  res.status(200).json({ userId, transactions: txs });
}
