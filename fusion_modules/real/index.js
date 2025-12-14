const express = require("express");
const app = express();
const PORT = 3104;

app.get("/", (req, res) => res.send("<h1>real Module</h1><p>Status: Operational</p>"));
app.get("/api/status", (req, res) => res.json({ module: "real", status: "operational", port: PORT }));

app.listen(PORT, () => console.log(\`✅ real Module running on \${PORT}\`));
