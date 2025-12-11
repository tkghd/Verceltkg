module.exports = {
  apps: [
    {
      name: "god_front",
      script: "./front/server.js",
      instances: 1,
      exec_mode: "fork",
      env: { PORT: 3000, NODE_ENV: "production" }
    },
    {
      name: "god_integrated",
      script: "./integrated/server.js",
      instances: 1,
      exec_mode: "fork",
      env: { 
        PORT: 3100,
        BANK_API_KEY: "BANK_API_KEY",
        KOTRA_API_KEY: "KOTRA_API_KEY",
        PAYPAY_API_KEY: "PAYPAY_API_KEY",
        DEX_API_KEY: "DEX_API_KEY",
        ATM_SYNC: "ENABLED",
        CRYPTO_SYNC: "ENABLED",
        HUD_ACCESS: "ENABLED"
      }
    },
    {
      name: "god_hud",
      script: "./hud/server.js",
      instances: 1,
      exec_mode: "fork",
      env: { PORT: 3200 }
    },
    {
      name: "god_ai",
      script: "./ai/server.js",
      instances: 1,
      exec_mode: "fork",
      env: { PORT: 3130 }
    },
    {
      name: "god_wallet_sync",
      script: "./wallet/server.js",
      instances: 1,
      exec_mode: "fork",
      env: { 
          PORT: 3140,
          WALLET_SYNC: "ENABLED",
          CARD_UI: "FULL"
      }
    },
    {
      name: "god_nft_sync",
      script: "./nft/server.js",
      instances: 1,
      exec_mode: "fork",
      env: { PORT: 3150, NFT_SYNC: "ENABLED" }
    },
    {
      name: "god_dex",
      script: "./dex/server.js",
      instances: 1,
      exec_mode: "fork",
      env: { PORT: 3160, DEX_API_KEY: "DEX_API_KEY" }
    }
  ]
};