import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

const auth = (req: VercelRequest) => {
  if (req.headers.authorization !== `Bearer ${process.env.API_KEY}`) {
    throw new Error('unauthorized');
  }
};

const verifyHellID = (payload: any, sig: string) => {
  const h = crypto
    .createHmac('sha256', process.env.HELLID_SECRET!)
    .update(JSON.stringify(payload))
    .digest('hex');
  if (h !== sig) throw new Error('HellID signature invalid');
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    auth(req);
    const { to, amount, chain, hellSig } = req.body;

    verifyHellID({ to, amount, chain }, hellSig);

    const endpoint =
      chain === 'SOL'
        ? 'https://api.mainnet-beta.solana.com'
        : process.env.ETH_RPC!;

    const tx = await fetch(process.env.EXTERNAL_SEND_API!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.EXTERNAL_API_KEY!,
      },
      body: JSON.stringify({ to, amount, chain, endpoint }),
    }).then(r => r.json());

    res.json({ status: 'submitted', txId: tx.txId });
  } catch (e:any) {
    res.status(401).json({ error: e.message });
  }
}
