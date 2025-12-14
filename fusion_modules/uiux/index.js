const express = require("express");
const app = express();
const PORT = 3003;

app.use(express.static(__dirname + "/public"));
app.get("/api/status", (req, res) => res.json({ module: "UIUX", status: "operational" }));

app.listen(PORT, () => console.log(\`🎨 UIUX Module running on \${PORT}\`));
