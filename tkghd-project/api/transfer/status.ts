import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { txId } = req.query;

  const status = await fetch(
    `https://external-pay/api/status/${txId}`,
    {
      headers: { 'X-API-KEY': process.env.EXTERNAL_API_KEY! },
    }
  ).then(r => r.json());

  res.json(status);
}
