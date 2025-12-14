
export type ServiceStatus = 'offline' | 'booting' | 'online' | 'error';
export type ActiveTab = 'assets' | 'transfer' | 'atm' | 'card' | 'crypto' | 'bank_services' | 'corporate' | 'ai_hud' | 'settings' | 'pwa' | 'web' | 'uiux' | 'dashboard' | 'health' | 'real' | 'compliance' | 'audit' | 'license';

export interface SystemModule {
  id: string;
  name: string;
  command: string;
  status: ServiceStatus;
  type: 'core' | 'ai' | 'finance' | 'interface' | 'utility';
  uptime?: string;
  cpu: number;
  memory: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface WalletState {
  jpy: string;
  usd: string;
  eth: string;
  btc: string;
  usdt: string;
  // Sovereign Token Suite
  tk_coin: string;
  lustra: string;
  rubiss: string;
  diamuse: string;
  [key: string]: string; // Allow dynamic access
}

export interface QueueState {
  nft: number;
  pdf: number;
  withdrawals: number;
  transactions: number;
}

export interface BusinessEntity {
  id: string;
  name: string;
  type: string;
  url: string;
  revenue: string;
  status: 'active' | 'optimizing' | 'maintenance';
  region: 'domestic' | 'global';
}

export interface OwnerAccount {
  id: string;
  bankName: string;
  branchName: string;
  accountType: '普通' | '当座' | '貯蓄' | 'Checking' | 'Savings';
  accountNumber: string;
  accountName: string;
  balance: string;
  currency: 'JPY' | 'USD' | 'EUR';
  isOverseas: boolean;
}

export interface WorldNode {
  id: string;
  region: string;
  city: string;
  ping: number;
  status: 'online' | 'sync' | 'reserve';
  coordinates: { x: number; y: number }; // Percentage 0-100
}

export interface FxRate {
  pair: string;
  rate: number;
  prediction: 'up' | 'down';
  confidence: number;
}
