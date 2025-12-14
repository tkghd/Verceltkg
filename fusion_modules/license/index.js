const express = require("express");
const app = express();
const PORT = 3107;

app.get("/", (req, res) => res.send("<h1>license Module</h1><p>Status: Operational</p>"));
app.get("/api/status", (req, res) => res.json({ module: "license", status: "operational", port: PORT }));

app.listen(PORT, () => console.log(\`✅ license Module running on \${PORT}\`));
