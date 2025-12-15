export default function handler(req: any, res: any) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  const send = (event: any) => {
    res.write(`data: ${JSON.stringify(event)}\n\n`);
  };

  send({ type: "hello", ts: Date.now() });

  const interval = setInterval(() => {
    globalThis.__EVENTS__ = globalThis.__EVENTS__ || [];
    let ev;
    while ((ev = (globalThis.__EVENTS__ as any[]).shift())) {
      send(ev);
    }
    send({ type: "heartbeat", ts: Date.now() });
  }, 2000);

  req.on("close", () => {
    clearInterval(interval);
    res.end();
  });
}
