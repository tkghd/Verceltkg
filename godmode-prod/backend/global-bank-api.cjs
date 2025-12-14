const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: '*' }));
app.use(express.json());

let users = [{
  id: 1,
  name: 'Global Account',
  accounts: [
    { currency: 'JPY', balance: 2547835 },
    { currency: 'USD', balance: 18500 },
    { currency: 'EUR', balance: 12000 },
    { currency: 'BTC', balance: 0.0234 }
  ]
}];

let txs = [
  { id: 1, userId: 1, name: 'International Transfer', amount: -5000, currency: 'USD', icon: '🌍', type: 'negative' },
  { id: 2, userId: 1, name: 'Salary', amount: 450000, currency: 'JPY', icon: '💰', type: 'positive' }
];

const rates = { USD: 1, JPY: 149.5, EUR: 0.92, BTC: 0.000023 };

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'Global Bank API', 
    version: '2.0.0',
    currencies: Object.keys(rates),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/balance/:userId', (req, res) => {
  res.json({ accounts: users[0].accounts, rates });
});

app.get('/api/transactions/:userId', (req, res) => {
  res.json(txs.slice(0, parseInt(req.query.limit) || 10));
});

app.post('/api/transactions', (req, res) => {
  const tx = { id: txs.length + 1, ...req.body, date: new Date().toISOString() };
  txs.unshift(tx);
  res.json({ success: true, transaction: tx });
});

app.get('/api/exchange-rates', (req, res) => {
  res.json({ rates, base: 'USD', updated: new Date() });
});

app.listen(PORT, () => {
  console.log('🌍💎 Global Bank API Started');
  console.log(`📡 Port: ${PORT}`);
  console.log(`🌐 http://localhost:${PORT}/api/health`);
});
