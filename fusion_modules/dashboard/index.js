const express = require("express");
const app = express();
const PORT = 3010;

app.use(express.static(__dirname + "/public"));
app.get("/api/status", (req, res) => res.json({ module: "Dashboard", status: "operational" }));
app.get("/api/stats", (req, res) => res.json({
  totalAssets: "¥205T+",
  banks: 30,
  yield: "∞%",
  risk: "0.01%"
}));

app.listen(PORT, () => console.log(\`📊 Dashboard Module running on \${PORT}\`));
