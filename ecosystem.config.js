
module.exports = {
  apps: [
    { 
      name: "god_integrated", 
      script: "npm", 
      args: "run start:integrated", 
      watch: true, 
      autorestart: true, 
      max_memory_restart: "200M",
      env: { PORT: 3100 }
    },
    { 
      name: "god_hud", 
      script: "npm", 
      args: "run start:hud", 
      watch: true, 
      autorestart: true, 
      max_memory_restart: "150M",
      env: { PORT: 3200 }
    },
    { 
      name: "god_front", 
      script: "npm", 
      args: "run start:front", 
      watch: true, 
      autorestart: true, 
      max_memory_restart: "150M",
      env: { PORT: 3000 }
    },
    { 
      name: "god_ai", 
      script: "npm", 
      args: "run start:ai", 
      watch: true, 
      autorestart: true, 
      max_memory_restart: "250M",
      env: { PORT: 3130 }
    },
    { 
      name: "god_wallet_sync", 
      script: "npm", 
      args: "run start:wallet", 
      watch: true, 
      autorestart: true, 
      max_memory_restart: "100M",
      env: { PORT: 3140 }
    },
    { 
      name: "god_watchdog", 
      script: "npm", 
      args: "run start:watchdog", 
      watch: false, 
      autorestart: true, 
      max_memory_restart: "50M" 
    },
    { 
      name: "health", 
      script: "npm", 
      args: "run start:health", 
      watch: false, 
      autorestart: true, 
      max_memory_restart: "50M",
      env: { PORT: 3099 }
    }
  ]
};
