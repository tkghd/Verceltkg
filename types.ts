

export type ServiceStatus = 'offline' | 'booting' | 'online' | 'error';
export type ActiveTab = 'assets' | 'transfer' | 'atm' | 'card' | 'crypto' | 'ai_hud' | 'settings' | 'pwa' | 'web' | 'uiux' | 'dashboard' | 'health' | 'real' | 'compliance' | 'audit' | 'license';

export interface SystemModule {
  id: string;
  name: string;
  command: string;
  status: ServiceStatus;
  type: 'core' | 'ai' | 'finance' | 'interface' | 'utility';
  uptime?: string;
  cpu: number;
  memory: number;
  latency?: number;
  endpoint?: string;
  httpStatus?: number;
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
  role: string; // e.g. "統括管理", "銀行系サービス"
  category: 'governance' | 'finance' | 'business';
  url?: string;
  revenue: string;
  status: 'active' | 'optimizing' | 'maintenance';
  region: 'domestic' | 'global';
}

export interface LicenseData {
  id: string;
  name: string;
  type: 'domestic' | 'global' | 'hybrid'; // Blue, Red, Purple
  licenses: {
    bank: boolean;
    securities: boolean;
    crypto: boolean;
    insurance: boolean;
  };
  hash: string;
  expiry: string;
  auditStatus: string;
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