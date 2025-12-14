const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
app.use(express.json());
app.get('/health', (req, res) => res.json({status: 'OK', service: 'fusion-api', timestamp: new Date().toISOString()}));
app.get('/fusion/health', (req, res) => res.json({status: 'ACTIVE', fusion_api: true, transfer_ready: true}));
app.listen(PORT, () => console.log(`FUSION-API listening on port ${PORT}`));
