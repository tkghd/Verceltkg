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
      env: { PORT: 3100 }
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
      env: { PORT: 3140 }
    }
  ]
};