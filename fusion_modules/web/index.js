const express = require("express");
const app = express();
const PORT = 3002;

app.use(express.static(__dirname + "/public"));
app.get("/api/status", (req, res) => res.json({ module: "Web", status: "operational" }));

app.listen(PORT, () => console.log(\`🌐 Web Module running on \${PORT}\`));
