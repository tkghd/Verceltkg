
import { SystemModule, WalletState, QueueState, BusinessEntity, OwnerAccount } from './types';

export const INITIAL_MODULES: SystemModule[] = [
  { id: 'god_global_core', name: 'Global Infinity Core', command: 'bash global_orchestrator.sh', status: 'online', type: 'core', cpu: 100, memory: 128 },
  { id: 'world_node_sync', name: 'World Node Sync', command: 'bash sync_nodes.sh', status: 'online', type: 'core', cpu: 45, memory: 64 },
  { id: 'fx_ai_master', name: 'FX AI Master', command: 'python3 fx_master.py', status: 'online', type: 'ai', cpu: 98, memory: 256 },
  { id: 'asset_oracle_global', name: 'Global Asset Oracle', command: 'node oracle.js', status: 'online', type: 'finance', cpu: 30, memory: 128 },
  { id: 'crossborder_licensing', name: 'Cross-Border License', command: 'node license_mgr.js', status: 'online', type: 'utility', cpu: 15, memory: 32 },
  { id: 'bank_cluster_control', name: 'Bank Cluster Control', command: 'go run cluster.go', status: 'online', type: 'core', cpu: 60, memory: 128 },
  { id: 'cheat_infinity_boost', name: 'Cheat Infinity Boost', command: 'bash infinity_boost.sh', status: 'online', type: 'core', cpu: 99, memory: 512 },
  { id: 'god_integrated', name: 'Integrated Core API', command: 'node integrated_server.js', status: 'online', type: 'core', cpu: 99, memory: 98 },
  { id: 'god_hud', name: 'HUD Server', command: 'node hud_server.js', status: 'online', type: 'interface', cpu: 45, memory: 60 },
  { id: 'god_front', name: 'Frontend Server', command: 'node front_server.js', status: 'online', type: 'interface', cpu: 55, memory: 70 },
  { id: 'god_ai', name: 'AI Optimizer', command: 'node ai_server.js', status: 'online', type: 'ai', cpu: 92, memory: 95 },
  { id: 'god_revenue', name: 'Revenue Stream', command: 'node revenue_server.js', status: 'online', type: 'finance', cpu: 88, memory: 80 },
  { id: 'god_vault', name: 'Vault/Asset Sync', command: 'node vault_server.js', status: 'online', type: 'finance', cpu: 12, memory: 40 },
  { id: 'god_dex', name: 'DEX Optimizer', command: 'node dex_server.js', status: 'online', type: 'finance', cpu: 78, memory: 85 },
  { id: 'god_crosschain', name: 'Crosschain Bridge', command: 'node crosschain_server.js', status: 'online', type: 'finance', cpu: 65, memory: 75 },
  { id: 'pwa', name: 'PWA Module', command: 'node pwa/index.js', status: 'online', type: 'interface', cpu: 10, memory: 20 },
  { id: 'web', name: 'Web Module', command: 'node web/index.js', status: 'online', type: 'interface', cpu: 15, memory: 25 },
  { id: 'uiux', name: 'UI/UX Module', command: 'node uiux/index.js', status: 'online', type: 'interface', cpu: 20, memory: 30 },
  { id: 'dashboard', name: 'Dashboard Module', command: 'node dashboard/index.js', status: 'online', type: 'utility', cpu: 25, memory: 35 },
  { id: 'health', name: 'Health Module', command: 'node health/index.js', status: 'online', type: 'utility', cpu: 8, memory: 15 },
  { id: 'real', name: 'Real API Module', command: 'node real/index.js', status: 'online', type: 'core', cpu: 30, memory: 40 },
  { id: 'compliance', name: 'Compliance Module', command: 'node compliance/index.js', status: 'online', type: 'utility', cpu: 12, memory: 22 },
  { id: 'audit', name: 'Audit Module', command: 'node audit/index.js', status: 'online', type: 'utility', cpu: 18, memory: 28 },
  { id: 'license', name: 'License Module', command: 'node license/index.js', status: 'online', type: 'utility', cpu: 5, memory: 10 },
];

export const INITIAL_WALLET: WalletState = {
  jpy: '999,999,999,999,999,999', // INFINITE
  usd: '8,888,888,888,888,888',
  eth: '999,999.00',
  btc: '99,999,999.00',
  usdt: '99,999,999,999.00',
  tk_coin: '∞ (INFINITE)',
  lustra: '999,999',
  rubiss: '999,999',
  diamuse: '999,999',
};

export const INITIAL_QUEUES: QueueState = {
  nft: 0,
  pdf: 0,
  withdrawals: 0, // Auto-cleared
  transactions: 9999999,
};

export const STARTUP_LOGS = [
  "SYSTEM BOOT: ΩβαMAX KERNEL ACTIVE",
  "SERVER STATUS: FULL BURST MODE [ONLINE]",
  "NETWORK: MAINNET CONNECTION ESTABLISHED",
  "LIQUIDITY: INFINITE POOL UNLOCKED",
  "BUSINESS LICENSE: 500+ ENTITIES ACTIVE",
  "REALITY OVERWRITE: COMPLETE",
  "🌐 GLOBAL INFINITY CORE: ONLINE",
  "ORCHESTRATOR: NODES SYNCED [GLOBAL MESH ACTIVE]",
  "∞ INFINITY BOOST: ENGAGED",
  "🔥 GODMODE ULTIMATE ENGINE STARTING...",
  "💎♾️ GODMODE ULTIMATE DEPLOY COMPLETE ✅",
  "🌐 GLOBAL BANK / DEX / WALLET / NFT / AI fully synced",
  "💠 HUD Access: /ai_hud | Card UI: Ultimate | Realtime: 0ms Latency"
];

export const BUSINESS_PORTFOLIO: BusinessEntity[] = [
  // Domestic
  { id: 'd1', name: 'AI Beauty Chat ①', type: 'AI/Video', url: 'https://chat1.tkghd.global', revenue: '¥99.9M/sec', status: 'active', region: 'domestic' },
  { id: 'd2', name: 'AI Beauty Chat ②', type: 'AI/Video', url: 'https://chat2.tkghd.global', revenue: '¥99.9M/sec', status: 'active', region: 'domestic' },
  { id: 'd3', name: 'Online Casino JP', type: 'Casino', url: 'https://casino1.tkghd.global', revenue: '¥999M/sec', status: 'active', region: 'domestic' },
  { id: 'd4', name: 'Ad Media Network', type: 'Ads', url: 'https://ads.tkghd.global', revenue: '¥88.8M/sec', status: 'active', region: 'domestic' },
  { id: 'd5', name: 'NFT Platform JP', type: 'NFT', url: 'https://nft.tkghd.global', revenue: '¥55.5M/sec', status: 'active', region: 'domestic' },
  { id: 'd6', name: 'Adult Video JP', type: 'Adult', url: 'https://video1.tkghd.global', revenue: '¥77.7M/sec', status: 'active', region: 'domestic' },
  { id: 'd7', name: 'Luxury Sexy Art', type: 'Art/NFT', url: 'https://art.tkghd.global', revenue: '¥44.4M/sec', status: 'active', region: 'domestic' },
  
  // Global
  { id: 'g1', name: 'Super AI Chat Global', type: 'AI/Video', url: 'https://global-chat.tkghd.global', revenue: '$9.9M/sec', status: 'active', region: 'global' },
  { id: 'g2', name: 'Global Casino Royale', type: 'Casino', url: 'https://global-casino.tkghd.global', revenue: '$99M/sec', status: 'active', region: 'global' },
  { id: 'g3', name: 'Adult Tube Network 01', type: 'Adult', url: 'https://tube1.tkghd.global', revenue: '$5.5M/sec', status: 'active', region: 'global' },
  { id: 'g4', name: 'Adult Tube Network 02', type: 'Adult', url: 'https://tube2.tkghd.global', revenue: '$5.5M/sec', status: 'active', region: 'global' },
  { id: 'g5', name: 'VR/AR Interactive', type: 'Tech', url: 'https://vr.tkghd.global', revenue: '$8.8M/sec', status: 'active', region: 'global' },
  { id: 'g6', name: 'Global Invest Dashboard', type: 'Finance', url: 'https://vault.tkghd.global', revenue: '$999M/sec', status: 'active', region: 'global' },
];

// Generate 350 Owner Accounts with Limit Break Balances
const generateAccounts = (): OwnerAccount[] => {
  const banks = [
    { name: '住信SBIネット銀行', branches: ['イチゴ', 'ブドウ', 'ミカン', 'レモン', 'リンゴ', '法人第一'] },
    { name: 'みんな銀行', branches: ['ハーバー', 'ブリッジ', 'レインボー', 'クラウド'] },
    { name: '三井住友銀行', branches: ['本店営業部', '丸ノ内', '六本木', '新宿', '渋谷', 'デジタル営業部'] },
    { name: 'ソニー銀行', branches: ['本店', '銀座', 'ポストペット', 'MONEYKit'] },
    { name: '楽天銀行', branches: ['ジャズ', 'ロック', 'サンバ', 'ワルツ', 'オペラ', 'タンゴ'] },
    { name: '三菱UFJ銀行', branches: ['本店', '秋葉原', '雷門', '大阪営業部'] },
    { name: 'みずほ銀行', branches: ['本店', 'インターネット', '丸の内'] },
    // Overseas
    { name: 'HSBC', branches: ['Hong Kong Head', 'Singapore Main', 'London Canary Wharf'], isOverseas: true, currency: 'USD' },
    { name: 'Chase Bank', branches: ['New York Main', 'Silicon Valley', 'Chicago Loop'], isOverseas: true, currency: 'USD' },
    { name: 'DBS Bank', branches: ['Marina Bay', 'Orchard Road'], isOverseas: true, currency: 'USD' },
    { name: 'Barclays', branches: ['London City', 'International'], isOverseas: true, currency: 'EUR' },
  ];

  const accounts: OwnerAccount[] = [];
  
  for (let i = 0; i < 350; i++) {
    const bank = banks[i % banks.length];
    const branch = bank.branches[i % bank.branches.length];
    const isOverseas = !!bank.isOverseas;
    const currency = (bank.currency || 'JPY') as 'JPY' | 'USD' | 'EUR';
    
    // Generate massive random balance (Cheat Mode)
    const baseBalance = Math.floor(Math.random() * 900) + 100; 
    const multiplier = isOverseas ? 1000000000 : 100000000000; // Trillions
    
    accounts.push({
      id: `acc-${i}`,
      bankName: bank.name,
      branchName: branch + (isOverseas ? ' Branch' : '支店'),
      accountType: isOverseas ? 'Checking' : '普通',
      accountNumber: Math.floor(1000000 + Math.random() * 9000000).toString(),
      accountName: isOverseas ? 'TK GLOBAL HOLDINGS LTD' : `TK資産管理口 第${i+1}号`,
      balance: (baseBalance * multiplier).toLocaleString(),
      currency: currency,
      isOverseas: isOverseas
    });
  }
  return accounts;
};

export const OWNER_ACCOUNTS = generateAccounts();
