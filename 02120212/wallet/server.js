import express from 'express';
const app = express();
const PORT = process.env.PORT || 3140;

app.get('/sync', (req, res) => res.json({ sync: true, block: 99999999 }));

app.listen(PORT, () => {
  console.log(`💰 Wallet Sync Server running on port ${PORT}`);
});