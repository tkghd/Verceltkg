const express = require('express');
const app = express();

app.get('/health', (req, res) => res.send('OK'));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

app.get('/', (req, res) => {
  res.json({
    status: 'active',
    service: 'HUD API Global',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});
