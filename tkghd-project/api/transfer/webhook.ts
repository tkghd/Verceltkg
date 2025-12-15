import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { txId, status } = req.body;

  // ここでDB保存・通知・UI push など
  console.log('WEBHOOK', txId, status);

  res.json({ ok: true });
}
