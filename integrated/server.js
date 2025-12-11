
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());

app.get('/status', (req, res) => res.json({ system: 'ΩβαMAX', status: 'ONLINE', latency: 0 }));
app.get('/api/revenue', (req, res) => res.json({ revenue: 145000000 + Math.floor(Math.random() * 10000) }));

app.listen(PORT, () => {
  console.log(`⚡ Integrated Core API running on port ${PORT}`);
});
