#!/bin/bash

echo "🚀 Godmode Ultra System Deployment"
echo "=================================="

# 既存システム保護（触らない）
echo "✅ 既存システム: god_front(3000), ΩβαMAX_Full, godmode-hud, neo-banking-api"

# 新システムのポート配置
# 3100: Banking API (既存)
# 3130: AI Core
# 3140: Wallet Sync
# 3150: NFT Sync
# 3160: DEX
# 3200: HUD Socket

cd temp-repo

# 依存関係インストール
npm install

# ビルド
npm run build

# 各マイクロサービスを起動
pm2 start ai/server.js --name "godmode-ai" --node-args="--env-file=.env.local"
pm2 start wallet/server.js --name "godmode-wallet" 
pm2 start nft/server.js --name "godmode-nft"
pm2 start dex/server.js --name "godmode-dex"
pm2 start hud/server.js --name "godmode-hud-socket"
pm2 start integrated/server.js --name "godmode-integrated"

# フロントエンドは既存と被るので別ポートで起動
PORT=3001 pm2 start front/server.js --name "godmode-ultra-front"

pm2 save

echo ""
echo "✅ デプロイ完了！"
echo ""
echo "📡 起動中のサービス:"
echo "  🤖 AI Core:      http://localhost:3130"
echo "  💰 Wallet:       http://localhost:3140"
echo "  🖼️  NFT:          http://localhost:3150"
echo "  🦄 DEX:          http://localhost:3160"
echo "  💠 HUD Socket:   http://localhost:3200"
echo "  ⚡ Integrated:   http://localhost:3100"
echo "  🎨 Ultra Front:  http://localhost:3001"
echo ""

pm2 status

