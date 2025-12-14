export const runtime = 'edge';
function ok(j:any){ return new Response(JSON.stringify(j), {headers:{'content-type':'application/json'}}); }
function deny(){ return new Response('unauthorized',{status:401}); }
export async function POST(req: Request) {
  const auth = req.headers.get('authorization') || '';
  const [, basic] = auth.split(' ');
  if (!basic) return deny();
  const [id,pw] = atob(basic).split(':');
  if (id !== process.env.AUTH_ID || pw !== process.env.AUTH_PW) return deny();
  const origin = new URL(req.url).origin;
  const [owner,corp] = await Promise.all([
    fetch(`${origin}/api/real/owner-sync`,{headers:{authorization:`Basic ${basic}`}}).then(r=>r.json()),
    fetch(`${origin}/api/real/corp-sync`,{headers:{authorization:`Basic ${basic}`}}).then(r=>r.json())
  ]);
  return ok({status:'OK',owner,corp});
}
