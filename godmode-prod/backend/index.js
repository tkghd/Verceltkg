require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for API Key
function apiKeyAuth(req, res, next) {
  const key = req.header('X-API-Key');
  if (!key || key !== process.env.API_KEY) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
}

// Public endpoints
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.get('/api/exchange-rates', (req, res) =>
  res.json({ JPY: 1, USD: 0.009, EUR: 0.008, BTC: 0.00000015 })
);

// Protected endpoints
app.get('/api/balance/:id', apiKeyAuth, (req, res) =>
  res.json({ id: req.params.id, balance: 2847592 })
);
app.get('/api/transactions/:id', apiKeyAuth, (req, res) =>
  res.json({
    id: req.params.id,
    tx: [
      { type: '給与', amount: 350000 },
      { type: 'Amazon決済', amount: -12500 }
    ]
  })
);

app.listen(PORT, () =>
  console.log(`Global Bank API listening on port ${PORT}`)
);
