
import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, DollarSign, Bitcoin, Globe, Gem, Crown, ArrowUpRight, Building, Layers, Link, Loader2, ShieldCheck, CheckCircle2, XCircle, LogOut, Smartphone, HardDrive, Send, ArrowRight, Search, Flame, Zap, Boxes } from 'lucide-react';
import { WalletState, OwnerAccount } from '../types';

interface AssetsViewProps {
  wallet: WalletState;
  ownerAccounts: OwnerAccount[];
}

export const AssetsView: React.FC<AssetsViewProps> = ({ wallet, ownerAccounts }) => {
  const [selectedWallet, setSelectedWallet] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllTokens, setShowAllTokens] = useState(false);

  // 20 Proprietary Tokens List
  const proprietaryTokens = [
    { s: 'TKG', n: 'TK Global Coin', bal: '∞' },
    { s: 'LUSTRA', n: 'Lustra Gem', bal: '999,999' },
    { s: 'RUBISS', n: 'Rubiss Core', bal: '500,000' },
    { s: 'DIAMUSE', n: 'Diamuse Gov', bal: '12,000' },
    { s: 'VOID', n: 'Void Walker', bal: '666' },
    { s: 'AURA', n: 'Aura Sync', bal: '1,000,000' },
    { s: 'NEXUS', n: 'Nexus Bridge', bal: '45,000' },
    { s: 'ZEN', n: 'Zenith', bal: '88,888' },
    { s: 'OMNI', n: 'Omni Layer', bal: '250,000' },
    { s: 'FLUX', n: 'Flux Energy', bal: '10,000' },
    { s: 'TITAN', n: 'Titan Reserve', bal: '5,000' },
    { s: 'NOVA', n: 'Nova Blast', bal: '100,000' },
    { s: 'APEX', n: 'Apex Predator', bal: '1' },
    { s: 'ECHO', n: 'Echo Protocol', bal: '333,333' },
    { s: 'SOLAR', n: 'Solar Flare', bal: '9,000' },
    { s: 'LUNA', n: 'Luna Tides', bal: '15,000' },
    { s: 'TERRA', n: 'Terra Firma', bal: '20,000' },
    { s: 'ZERO', n: 'Zero Point', bal: '0.001' },
    { s: 'INF', n: 'Infinity Loop', bal: '∞' },
    { s: 'GOD', n: 'God Mode', bal: '1' },
  ];

  const filteredAccounts = ownerAccounts.filter(acc => 
    acc.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    acc.branchName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    acc.accountName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-1 anim-enter-bottom">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Layers className="text-cyan-500" />
          資産ポートフォリオ
        </h2>
        <p className="text-sm text-slate-400">リアルタイム資産状況サマリー (Global Sync)</p>
      </div>

      {/* Owner Free Use Assets (Top Hero) */}
      <div className="p-1 rounded-[2.5rem] bg-gradient-to-r from-cyan-600 via-indigo-400 to-cyan-600 shadow-[0_0_50px_rgba(6,182,212,0.4)] anim-pulse-glow relative group anim-enter-bottom anim-delay-100">
         <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
         <div className="bg-[#08080f] rounded-[2.2rem] p-8 relative overflow-hidden h-full">
             <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                <Crown size={200} className="text-cyan-500" />
             </div>
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             
             <div className="relative z-10">
                 <h3 className="text-cyan-500 font-bold uppercase tracking-[0.2em] text-xs mb-4 flex items-center gap-2">
                    <Crown size={14} /> オーナー自由用途資産 (Personal Vault)
                 </h3>
                 <div className="text-4xl sm:text-5xl lg:text-6xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 tracking-tight drop-shadow-2xl my-6">
                    ¥ 2,000,000,000,000
                 </div>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 border-t border-white/10 pt-6">
                     <div className="bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Total Market Cap</div>
                        <div className="text-lg font-mono text-white font-bold">162京 5,000兆円</div>
                     </div>
                     <div className="bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Token Valuation</div>
                        <div className="text-lg font-mono text-white font-bold">35,888京 2,500兆円</div>
                     </div>
                 </div>
             </div>
         </div>
      </div>

      {/* Proprietary Token Vault (20 Tokens) */}
      <div className="anim-enter-bottom anim-delay-200">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
           <Boxes size={20} className="text-purple-500" /> Proprietary Token Vault (20 Assets)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
           {proprietaryTokens.slice(0, showAllTokens ? undefined : 10).map((t, i) => (
             <div key={i} className="bg-slate-900/50 border border-slate-800 p-3 rounded-xl hover:bg-slate-800 transition-colors group">
                <div className="flex justify-between items-start mb-2">
                   <div className="text-[10px] font-bold text-slate-500">{t.s}</div>
                   <Gem size={12} className="text-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="font-bold text-white text-sm truncate">{t.n}</div>
                <div className="font-mono text-xs text-purple-400 mt-1">{t.bal}</div>
             </div>
           ))}
        </div>
        <button 
          onClick={() => setShowAllTokens(!showAllTokens)} 
          className="w-full mt-4 py-2 text-xs text-slate-500 hover:text-white border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors"
        >
           {showAllTokens ? "Show Less" : "View All 20 Assets"}
        </button>
      </div>

      {/* International Corporate Sync */}
      <div className="bg-[#0a0a12] border border-indigo-900/30 rounded-[2rem] p-6 relative overflow-hidden anim-enter-bottom anim-delay-300">
         <div className="flex justify-between items-center mb-6 relative z-10">
             <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Globe size={20} className="text-indigo-400" /> International Corporate Sync
             </h3>
             <span className="bg-indigo-900/20 text-indigo-300 text-[10px] px-2 py-1 rounded border border-indigo-500/30 animate-pulse">
                SYNCING LIVE
             </span>
         </div>
         <div className="space-y-3 relative z-10 max-h-60 overflow-y-auto custom-scrollbar pr-2">
             <CorporateSyncRow name="TK Holdings HK Ltd" region="Hong Kong" balance="HK$ 450M" status="active" />
             <CorporateSyncRow name="TK Global SG Pte Ltd" region="Singapore" balance="S$ 120M" status="active" />
             <CorporateSyncRow name="TK Ventures LLC" region="Dubai" balance="AED 85M" status="active" />
             <CorporateSyncRow name="TK Europe BV" region="Netherlands" balance="€ 55M" status="sync" />
             <CorporateSyncRow name="TK Caribbean Trust" region="Cayman" balance="$ 999M" status="active" />
         </div>
      </div>

      {/* 350 Owner Accounts Summary */}
      <div className="bg-[#0a0a12] border border-slate-800 rounded-[2rem] p-6 shadow-xl relative overflow-hidden flex flex-col gap-4 anim-enter-bottom anim-delay-400">
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
             <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Building size={20} className="text-cyan-400" /> 分散資産管理 (全{ownerAccounts.length}口座)
             </h3>
             <div className="relative w-full sm:w-64">
                <input 
                   type="text" 
                   placeholder="口座を検索..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500 transition-all"
                />
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
             </div>
         </div>
         <div className="h-64 overflow-y-auto custom-scrollbar space-y-2 pr-2">
            {filteredAccounts.map((acc, idx) => (
               <div key={acc.id} className="flex justify-between items-center p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 hover:bg-slate-900 transition-all group cursor-pointer hover:shadow-md">
                  <div className="flex items-center gap-4">
                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shadow-lg transition-transform group-hover:scale-105 ${acc.isOverseas ? 'bg-indigo-900/50 text-indigo-200 ring-1 ring-indigo-500/30' : 'bg-slate-800 text-slate-300 ring-1 ring-white/10'}`}>
                        {acc.bankName.substring(0, 2)}
                     </div>
                     <div>
                        <div className="text-sm font-bold text-slate-200 group-hover:text-white">{acc.bankName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{acc.branchName} • {acc.accountNumber}</div>
                     </div>
                  </div>
                  <div className="text-right">
                     <div className="text-sm font-mono text-white font-bold tracking-tight">{acc.currency === 'JPY' ? '¥' : '$'} {acc.balance}</div>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

const CorporateSyncRow: React.FC<{ name: string; region: string; balance: string; status: 'active' | 'sync' }> = ({ name, region, balance, status }) => (
    <div className="flex justify-between items-center p-3 bg-slate-900/30 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
        <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-indigo-900/20 flex items-center justify-center text-indigo-400">
                 <Globe size={14} />
             </div>
             <div>
                 <div className="text-sm font-bold text-white">{name}</div>
                 <div className="text-[10px] text-slate-500">{region}</div>
             </div>
        </div>
        <div className="text-right">
             <div className="font-mono text-white text-sm font-bold">{balance}</div>
             <div className={`text-[9px] uppercase font-bold ${status === 'active' ? 'text-green-500' : 'text-amber-500'}`}>{status}</div>
        </div>
    </div>
);
