const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

// APIルーターの統合は、静的ファイル提供や基本ルートの前に置く必要がある
const fusionTransfer = require("./fusion-transfer.js");
app.use(fusionTransfer);

console.log("🚀 TKG Fusion Transfer System integrated!");

// index.html が配置されているディレクトリを静的ファイルとして公開
app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
  console.log(`Godmode Ultra running on port \${PORT}`);
});
