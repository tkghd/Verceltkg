
import express from 'express';
const app = express();
const PORT = process.env.PORT || 3130;

app.get('/health', (req, res) => res.json({ ai_core: 'GEMINI-PRO-3', status: 'READY' }));

app.listen(PORT, () => {
  console.log(`🤖 AI Core Server running on port ${PORT}`);
});
