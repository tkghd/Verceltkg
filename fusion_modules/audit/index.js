const express = require("express");
const app = express();
const PORT = 3105;

app.get("/", (req, res) => res.send("<h1>audit Module</h1><p>Status: Operational</p>"));
app.get("/api/status", (req, res) => res.json({ module: "audit", status: "operational", port: PORT }));

app.listen(PORT, () => console.log(\`✅ audit Module running on \${PORT}\`));
