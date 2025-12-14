const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.json());

// マーケットデータ
const markets = {
  NYSE: { status: 'open', volume: 2847392847, change: +0.42 },
  NASDAQ: { status: 'open', volume: 3928472934, change: +0.68 },
  TSE: { status: 'closed', volume: 1847392847, change: -0.12 },
  LSE: { status: 'open', volume: 1247392847, change: +0.28 },
  HKEX: { status: 'closed', volume: 847392847, change: +0.15 }
};

const prices = {
  BTC: { price: 43250.42, change: +2.3 },
  ETH: { price: 2280.18, change: +1.8 },
  GOLD: { price: 2042.50, change: -0.4 },
  SILVER: { price: 24.32, change: -0.2 },
  OIL: { price: 73.45, change: +1.1 }
};

app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'tkg_finance_system',
    version: '1.5.0',
    uptime: process.uptime(),
    markets_tracked: Object.keys(markets).length,
    assets_tracked: Object.keys(prices).length,
    timestamp: new Date().toISOString()
  });
});

app.get('/finance', (req, res) => {
  res.json({
    status: 'operational',
    markets,
    prices,
    uptime: process.uptime()
  });
});

app.get('/api/markets', (req, res) => {
  res.json(markets);
});

app.get('/api/prices', (req, res) => {
  res.json(prices);
});

app.get('/api/market/:name', (req, res) => {
  const market = markets[req.params.name.toUpperCase()];
  if (!market) return res.status(404).json({ error: 'Market not found' });
  res.json({ name: req.params.name.toUpperCase(), ...market });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`📈 TKG Finance System v1.5 running on port ${PORT}`);
  console.log(`💹 Tracking ${Object.keys(markets).length} markets`);
});
