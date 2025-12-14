const express = require("express");
const app = express();
const PORT = 3110;

app.get("/", (req, res) => res.send("<h1>compliance Module</h1><p>Status: Operational</p>"));
app.get("/api/status", (req, res) => res.json({ module: "compliance", status: "operational", port: PORT }));

app.listen(PORT, () => console.log(\`✅ compliance Module running on \${PORT}\`));
