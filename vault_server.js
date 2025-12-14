const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

const vaults = {
  tokyo: { gold: 5000, silver: 10000, cash: 50000000 },
  newyork: { gold: 7000, silver: 15000, cash: 80000000 },
  london: { gold: 6000, silver: 12000, cash: 70000000 },
  singapore: { gold: 4000, silver: 8000, cash: 40000000 },
  dubai: { gold: 3000, silver: 6000, cash: 30000000 }
};

app.get('/health', (req, res) => res.json({ status: 'secured', vaults: Object.keys(vaults).length }));
app.get('/api/vaults', (req, res) => res.json(vaults));
app.get('/api/vault/:location', (req, res) => res.json(vaults[req.params.location] || { error: 'Vault not found' }));

app.listen(PORT, () => console.log(\`Vault Server: http://localhost:\${PORT}\`));
