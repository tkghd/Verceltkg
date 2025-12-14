const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.static('public'));
app.get('/health', (req, res) => res.json({ status: 'online', service: 'dashboard' }));
app.get('/', (req, res) => res.send(\`
<!DOCTYPE html>
<html><head><title>TK Global Bank - Dashboard</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Segoe UI', Tahoma, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 20px; }
.container { max-width: 1400px; margin: 0 auto; }
.header { background: rgba(255,255,255,0.95); padding: 30px; border-radius: 20px; margin-bottom: 30px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); }
h1 { color: #2d3748; font-size: 2.5em; margin-bottom: 10px; }
.status { display: inline-block; padding: 8px 20px; background: #48bb78; color: white; border-radius: 20px; font-weight: bold; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
.card { background: rgba(255,255,255,0.95); padding: 25px; border-radius: 15px; box-shadow: 0 8px 30px rgba(0,0,0,0.12); transition: transform 0.3s; }
.card:hover { transform: translateY(-5px); }
.card-title { font-size: 1.3em; color: #2d3748; margin-bottom: 15px; font-weight: 600; }
.stat { font-size: 2.5em; color: #667eea; font-weight: bold; margin: 10px 0; }
.label { color: #718096; font-size: 0.9em; }
.metric { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
.pulse { animation: pulse 2s infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
</style>
</head><body>
<div class="container">
  <div class="header">
    <h1>🏦 TK Global Bank - Live Dashboard</h1>
    <span class="status pulse">● OPERATIONAL</span>
  </div>
  <div class="grid">
    <div class="card">
      <div class="card-title">🌐 System Status</div>
      <div class="metric"><span>Bank Server</span><span style="color:#48bb78">✓ Online</span></div>
      <div class="metric"><span>Vault Server</span><span style="color:#48bb78">✓ Online</span></div>
      <div class="metric"><span>Dashboard</span><span style="color:#48bb78">✓ Online</span></div>
      <div class="metric"><span>Uptime</span><span>\${Math.floor(process.uptime() / 60)}m</span></div>
    </div>
    <div class="card">
      <div class="card-title">💰 Total Assets</div>
      <div class="stat">$270M</div>
      <div class="label">Across all vaults</div>
    </div>
    <div class="card">
      <div class="card-title">👥 Active Accounts</div>
      <div class="stat">100</div>
      <div class="label">Live customer accounts</div>
    </div>
    <div class="card">
      <div class="card-title">🔒 Security Status</div>
      <div class="metric"><span>Encryption</span><span style="color:#48bb78">AES-256</span></div>
      <div class="metric"><span>Firewall</span><span style="color:#48bb78">Active</span></div>
      <div class="metric"><span>2FA</span><span style="color:#48bb78">Enabled</span></div>
    </div>
    <div class="card">
      <div class="card-title">🌍 Global Vaults</div>
      <div class="metric"><span>Tokyo</span><span>$50M</span></div>
      <div class="metric"><span>New York</span><span>$80M</span></div>
      <div class="metric"><span>London</span><span>$70M</span></div>
      <div class="metric"><span>Singapore</span><span>$40M</span></div>
      <div class="metric"><span>Dubai</span><span>$30M</span></div>
    </div>
    <div class="card">
      <div class="card-title">📊 Today's Activity</div>
      <div class="metric"><span>Transactions</span><span>1,247</span></div>
      <div class="metric"><span>Volume</span><span>$2.4M</span></div>
      <div class="metric"><span>Avg. Size</span><span>$1,926</span></div>
    </div>
  </div>
</div>
</body></html>
\`));

app.listen(PORT, () => console.log(\`Dashboard: http://localhost:\${PORT}\`));
