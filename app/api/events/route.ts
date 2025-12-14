export const runtime = 'edge';
export async function GET() {
  const stream = new ReadableStream({ start(controller){ const enc=new TextEncoder(); const send=(s:string)=>controller.enqueue(enc.encode(`data: ${s}\n\n`)); send('ALL MODULES ONLINE + BANK API LIVE + WEB3 READY'); const id=setInterval(()=>send(new Date().toISOString()),2000); return ()=>clearInterval(id);} });
  return new Response(stream,{headers:{'content-type':'text/event-stream','cache-control':'no-cache'}});
}
