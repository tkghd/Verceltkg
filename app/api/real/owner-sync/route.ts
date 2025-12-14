export const runtime='edge';
const deny=()=>new Response('unauthorized',{status:401});
const ok=(j:any)=>new Response(JSON.stringify(j),{headers:{'content-type':'application/json'}});
export async function GET(req:Request){
  const auth=req.headers.get('authorization')||''; const [,basic]=auth.split(' '); if(!basic) return deny();
  const [id,pw]=atob(basic).split(':'); if(id!==process.env.AUTH_ID||pw!==process.env.AUTH_PW) return deny();
  const base=process.env.REAL_API_BASE!; const key=process.env.REAL_API_KEY_OWNER!;
  const r=await fetch(`${base}/owner`,{headers:{'x-api-key':key}}); const d=await r.json();
  return ok({updatedAt:new Date().toISOString(),fiat:d.fiat,crypto:d.crypto,note:'OWNER_SYNC'});
}
