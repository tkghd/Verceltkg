export default function handler(req: any, res: any) {
  if (!process.env.REAL_API_KEY) return res.status(401).json({ error: "Unauthorized" });
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const { from, to, amount } = req.body;
  if (!from || !to || !amount || amount <= 0) return res.status(400).json({ error: "Invalid request" });

  res.status(200).json({ ok: true, txId: "TX" + Date.now() });
}
