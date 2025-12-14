
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3100;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Data Store
const MOCK_DB = {
  balance: {
    JPY: 2547835,
    USD: 18500,
    BTC: 0.0234,
    TKG: 1000000 // Infinite
  },
  transactions: [
    { id: 1, name: "Salary Deposit", amount: 350000, currency: "JPY", type: "positive", date: "2024-05-20" },
    { id: 2, name: "Amazon JP", amount: -12500, currency: "JPY", type: "negative", date: "2024-05-19" },
    { id: 3, name: "AWS Services", amount: -150, currency: "USD", type: "negative", date: "2024-05-18" }
  ]
};

// --- APIs ---

// 1. Health & License Audit
app.get('/api/health', (req, res) => {
  // Simulate API Key Check (Allowing default for demo)
  const apiKey = process.env.REAL_API_KEY || "demo-key";
  
  res.status(200).json({
    status: "ok",
    service: "Global Corp Banking System",
    version: "2.0.0",
    buildId: process.env.NEXT_PUBLIC_BUILD_ID || "20251214-ALLSYSTEMS",
    environment: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'DEV',
    licenseStatus: "VALID (CORP-001)",
    licenseId: process.env.LICENSE_ID || "corp-license-001",
    corpId: process.env.CORP_ID || "corp-xyz",
    timestamp: new Date().toISOString(),
  });
});

// 2. Balance API
app.get('/api/balance/:userId', (req, res) => {
  const { userId } = req.params;
  // In a real app, fetch by userId
  res.status(200).json({ 
    userId, 
    accounts: [
      { currency: "JPY", balance: MOCK_DB.balance.JPY },
      { currency: "USD", balance: MOCK_DB.balance.USD },
      { currency: "BTC", balance: MOCK_DB.balance.BTC },
      { currency: "TKG", balance: MOCK_DB.balance.TKG }
    ]
  });
});

// 3. Transactions API
app.get('/api/transactions/:userId', (req, res) => {
  res.status(200).json({ transactions: MOCK_DB.transactions });
});

// 4. Transfer API
app.post('/api/transfer', (req, res) => {
  const { from, to, amount, currency } = req.body;
  
  if (!to || !amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid request parameters" });
  }

  // Simulate processing
  const txId = "TX" + Date.now();
  const newTx = {
    id: Date.now(),
    name: `Transfer to ${to}`,
    amount: -parseInt(amount),
    currency: currency || 'JPY',
    type: 'negative',
    date: new Date().toISOString().split('T')[0]
  };
  
  // Update Mock DB
  MOCK_DB.transactions.unshift(newTx);
  if (MOCK_DB.balance[currency as keyof typeof MOCK_DB.balance] !== undefined) {
      // @ts-ignore
      MOCK_DB.balance[currency] -= parseInt(amount);
  }

  console.log(`[TRANSFER] ${amount} ${currency} -> ${to} (TX: ${txId})`);

  res.status(200).json({ 
    ok: true, 
    txId: txId,
    message: "Transfer processed via Global Mesh",
    status: "COMPLETED"
  });
});

// Legacy/Other endpoints
app.get('/status', (req, res) => res.json({ system: 'ΩβαMAX', status: 'ONLINE', latency: 0 }));
app.get('/api/revenue', (req, res) => res.json({ revenue: 145000000 + Math.floor(Math.random() * 10000) }));

// --- Serve Static Assets (Production) ---
// Serve built assets from dist (one level up from integrated/)
app.use(express.static(path.join(__dirname, '../dist')));

// SPA Fallback
app.get('*', (req, res) => {
  // If it's an API request that wasn't caught, return 404 JSON
  if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'API Endpoint Not Found' });
  }
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`⚡ Integrated Core API & Frontend running on port ${PORT}`);
});
