const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.GLOBAL_BANK_API_KEY;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

app.use(cors({ origin: '*' }));
app.use(express.json());

// ミドルウェア: API Key 検証
const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const token = req.headers['authorization']?.replace('Bearer ', '');
  
  // Public endpoints (認証不要)
  if (req.path === '/api/health' || req.path === '/api/exchange-rates') {
    return next();
  }
  
  // API Key または Token チェック
  if (apiKey === API_KEY || token === ADMIN_TOKEN) {
    next();
  } else {
    res.status(401).json({ 
      error: 'Unauthorized', 
      message: 'Valid API key or token required',
      hint: 'Add X-API-Key header or Authorization: Bearer token'
    });
  }
};

// すべてのAPIルートに認証を適用
app.use('/api', (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - API Key: ${req.headers['x-api-key'] ? 'Present' : 'Missing'}`);
  verifyApiKey(req, res, next);
});

// データベース (In-Memory)
let users = [{
  id: 1,
  name: 'Global Account Holder',
  accounts: [
    { currency: 'JPY', balance: 2547835 },
    { currency: 'USD', balance: 18500 },
    { currency: 'EUR', balance: 12000 },
    { currency: 'BTC', balance: 0.0234 }
  ]
}];

let txs = [
  { id: 1, userId: 1, name: 'International Transfer', amount: -5000, currency: 'USD', icon: '🌍', type: 'negative', date: new Date().toISOString() },
  { id: 2, userId: 1, name: 'Salary', amount: 450000, currency: 'JPY', icon: '💰', type: 'positive', date: new Date().toISOString() }
];

const rates = { USD: 1, JPY: 149.5, EUR: 0.92, BTC: 0.000023 };

// Public Endpoints
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'Global Bank API (Secured)',
    version: '2.1.0',
    authentication: 'enabled',
    currencies: Object.keys(rates),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/exchange-rates', (req, res) => {
  res.json({ rates, base: 'USD', updated: new Date() });
});

// Protected Endpoints
app.get('/api/balance/:userId', (req, res) => {
  res.json({ accounts: users[0].accounts, rates });
});

app.get('/api/transactions/:userId', (req, res) => {
  res.json(txs.slice(0, parseInt(req.query.limit) || 10));
});

app.post('/api/transactions', (req, res) => {
  const tx = { 
    id: txs.length + 1, 
    ...req.body, 
    date: new Date().toISOString() 
  };
  txs.unshift(tx);
  res.json({ success: true, transaction: tx });
});

// Admin Endpoints
app.get('/api/admin/keys', (req, res) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (token !== ADMIN_TOKEN) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  res.json({
    api_key: API_KEY,
    admin_token: ADMIN_TOKEN,
    note: 'Store these securely'
  });
});

app.listen(PORT, () => {
  console.log('🌍💎 =====================================');
  console.log('🔐 Global Bank API (SECURED) Started');
  console.log('🌍💎 =====================================');
  console.log(`📡 Port: ${PORT}`);
  console.log(`🔑 API Key: ${API_KEY}`);
  console.log(`🔐 Admin Token: ${ADMIN_TOKEN}`);
  console.log(`🌐 http://localhost:${PORT}/api/health`);
  console.log('🌍💎 =====================================');
});
