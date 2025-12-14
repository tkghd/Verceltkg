const express = require("express");
const app = express();
const PORT = 3106;

app.get("/", (req, res) => res.send("<h1>health Module</h1><p>Status: Operational</p>"));
app.get("/api/status", (req, res) => res.json({ module: "health", status: "operational", port: PORT }));

app.listen(PORT, () => console.log(\`✅ health Module running on \${PORT}\`));
