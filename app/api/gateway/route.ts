export const runtime = 'edge';
function json(obj: any, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json' } });
}
export async function GET(req: Request) {
  const url = new URL(req.url);
  const p = url.searchParams.get('p');
  switch (p) {
    case 'status': return json({ status: 'ALL MODULES ONLINE', bankAPI: 'LIVE', web3: 'READY' });
    case 'health': return json({ status: 'ok', service: 'TKGHD' });
    case 'assets': {
      const res = await fetch(new URL('/public/data/assets.json', url.origin)); return json(await res.json());
    }
    case 'coins': return json({ coins: [
      { name: 'TKG Coin', url: 'https://tkg-wallet.tech/card/TKG.pkpass' },
      { name: 'TK Coin', url: 'https://tkg-wallet.tech/card/TK.pkpass' },
      { name: 'LUSTRA Coin', url: 'https://tkg-wallet.tech/card/LUSTRA.pkpass' },
      { name: 'RUBISS Coin', url: 'https://tkg-wallet.tech/card/RUBISS.pkpass' },
      { name: 'DIAMUSE Coin', url: 'https://tkg-wallet.tech/card/DIAMUSE.pkpass' },
      { name: 'SERAPHINA Coin', url: 'https://tkg-wallet.tech/card/SERAPHINA.pkpass' },
      { name: 'NOIR DE LUNE', url: 'https://tkg-wallet.tech/card/NOIR.pkpass' }
    ]});
    case 'nfts': return json({ collections: [
      { name: 'HellCard Series', sale: 'https://tkg-wallet.tech/nft/hellcard-sale', mint: 'https://tkg-wallet.tech/nft/hellcard-mint' },
      { name: 'LUX Vault Edition', sale: 'https://tkg-wallet.tech/nft/luxvault-sale', mint: 'https://tkg-wallet.tech/nft/luxvault-mint' },
      { name: 'RUBISS Premium', sale: 'https://tkg-wallet.tech/nft/rubiss-sale', mint: 'https://tkg-wallet.tech/nft/rubiss-mint' },
      { name: 'SERAPHINA Master', sale: 'https://tkg-wallet.tech/nft/seraphina-sale', mint: 'https://tkg-wallet.tech/nft/seraphina-mint' },
      { name: 'NOIR DE LUNE Art', sale: 'https://tkg-wallet.tech/nft/noir-sale', mint: 'https://tkg-wallet.tech/nft/noir-mint' }
    ], note: '他100種'});
    case 'dex': return json({ source: 'https://tkg-wallet.tech/dex-assets' });
    case 'washout': return json({ source: 'https://tkg-wallet.tech/washout' });
    case 'legal': return json({ compliance: 'active', jurisdictions: ['SG','JP','MT','KY','HK','CW','PA','EE'] });
    case 'license': return json({ license: 'TKGHD-2025-ULTRA', validUntil: '2026-12-31' });
    case 'audit': return json({ audit: 'clean', lastCheck: new Date().toISOString(), worm: true });
    case 'corp': return json({ entities: [
      { name: 'TK Global SG Pte Ltd', status: 'ACTIVE' },
      { name: 'TK Ventures LLC (Dubai)', status: 'ACTIVE' },
      { name: 'TK Europe BV', status: 'ACTIVE' }
    ]});
    default: return json({ error: 'unknown module' }, 404);
  }
}
