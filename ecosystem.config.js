module.exports = {
  apps: [
    // UX/フロント系（Blue/Green＋カナリア対象）
    { name: "pwa-blue",   script: process.env.BASE_PATH + "/pwa/index.js",   env: { PORT: 3001, PROD_ENABLED: true, MONITOR_API_KEY: process.env.MONITOR_API_KEY } },
    { name: "pwa-green",  script: process.env.BASE_PATH + "/pwa/index.js",   env: { PORT: 3201, PROD_ENABLED: true, MONITOR_API_KEY: process.env.MONITOR_API_KEY } },
    { name: "web-blue",   script: process.env.BASE_PATH + "/we/index.js",    env: { PORT: 3002, PROD_ENABLED: true, MONITOR_API_KEY: process.env.MONITOR_API_KEY } },
    { name: "web-green",  script: process.env.BASE_PATH + "/we/index.js",    env: { PORT: 3202, PROD_ENABLED: true, MONITOR_API_KEY: process.env.MONITOR_API_KEY } },
    { name: "uiux-blue",  script: process.env.BASE_PATH + "/uiux/index.js",  env: { PORT: 3003, PROD_ENABLED: true, MONITOR_API_KEY: process.env.MONITOR_API_KEY } },
    { name: "uiux-green", script: process.env.BASE_PATH + "/uiux/index.js",  env: { PORT: 3203, PROD_ENABLED: true, MONITOR_API_KEY: process.env.MONITOR_API_KEY } },

    // コア業務・金融・監査系
    { name: "dashboard",  script: process.env.BASE_PATH + "/dashboard/index.js",  env: { PORT: 3010, PROD_ENABLED: true, MONITOR_API_KEY: process.env.MONITOR_API_KEY } },
    { name: "health",     script: process.env.BASE_PATH + "/health/index.js",     env: { PORT: 3099, PROD_ENABLED: true, MONITOR_API_KEY: process.env.MONITOR_API_KEY } },
    { name: "license",    script: process.env.BASE_PATH + "/license/index.js",    env: { PORT: 3120, PROD_ENABLED: true, MONITOR_API_KEY: process.env.MONITOR_API_KEY } },
    { name: "corporate",  script: process.env.BASE_PATH + "/corporate/index.js",  env: { PORT: 3121, PROD_ENABLED: true, MONITOR_API_KEY: process.env.MONITOR_API_KEY } },
    { name: "remittance", script: process.env.BASE_PATH + "/remittance/index.js", env: { PORT: 3122, PROD_ENABLED: true, MONITOR_API_KEY: process.env.MONITOR_API_KEY } },
    { name: "revenue",    script: process.env.BASE_PATH + "/revenue/index.js",    env: { PORT: 3130, PROD_ENABLED: true, MONITOR_API_KEY: process.env.MONITOR_API_KEY } },
    { name: "token",      script: process.env.BASE_PATH + "/token/index.js",      env: { PORT: 3131, PROD_ENABLED: true, MONITOR_API_KEY: process.env.MONITOR_API_KEY } },
    { name: "treasury",   script: process.env.BASE_PATH + "/treasury/index.js",   env: { PORT: 3132, PROD_ENABLED: true, MONITOR_API_KEY: process.env.MONITOR_API_KEY } },
    { name: "bank",       script: process.env.BASE_PATH + "/bank/index.js",       env: { PORT: 3140, PROD_ENABLED: true, MONITOR_API_KEY: process.env.MONITOR_API_KEY } },
    { name: "audit",      script: process.env.BASE_PATH + "/audit/index.js",      env: { PORT: 3103, PROD_ENABLED: true, MONITOR_API_KEY: process.env.MONITOR_API_KEY } },
    { name: "compliance", script: process.env.BASE_PATH + "/compliance/index.js", env: { PORT: 3111, PROD_ENABLED: true, MONITOR_API_KEY: process.env.MONITOR_API_KEY } }
  ]
}
