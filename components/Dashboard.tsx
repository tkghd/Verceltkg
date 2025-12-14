
import React from 'react';
import { Activity, ShieldCheck, Server, Globe, Database, Cpu, Wifi, Lock, Boxes, Zap, TrendingUp, Radio, Wand2, Infinity, Terminal, CheckCircle2 } from 'lucide-react';
import { SystemModule, WalletState, QueueState, ApiHealth, ApiTransaction } from '../types';
import { MetricsChart } from './MetricsChart';
import { WorldMapHUD } from './WorldMapHUD';
import { useTheme } from './ThemeContext';

interface DashboardProps {
  modules: SystemModule[];
  booted: boolean;
  wallet: WalletState;
  queues: QueueState;
  onNavigate: (tab: any) => void;
  health?: ApiHealth | null;
  transactions?: ApiTransaction[];
}

export const Dashboard: React.FC<DashboardProps> = ({ modules, booted, wallet, queues, health, transactions }) => {
  const { theme } = useTheme();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 pb-10 animate-in fade-in duration-700">
      
      {/* World Map HUD - Centerpiece */}
      <div className="col-span-1 md:col-span-2 lg:col-span-12">
        <WorldMapHUD />
      </div>

      {/* Welcome Banner - ULTIMATE MODE */}
      <div className={`col-span-1 md:col-span-2 lg:col-span-12 bg-gradient-to-r from-[#1a1200] to-[#000000] border border-${theme.primary}-500/30 p-8 rounded-[2rem] flex flex-col md:flex-row justify-between items-center shadow-[0_0_50px_rgba(${theme.glow},0.1)] backdrop-blur-sm relative overflow-hidden group`}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 animate-pulse"></div>
        <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-l from-${theme.primary}-500/10 to-transparent`}></div>
        
        <div className="flex flex-col gap-2 mb-4 md:mb-0 relative z-10">
           <div className="flex items-center gap-2 mb-1">
             <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-green-500 text-black font-bold border border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.5)] animate-pulse">
                ALL SYSTEMS ONLINE ✅
             </span>
             <span className={`px-2 py-0.5 rounded text-[10px] font-mono bg-${theme.accent}-500/20 text-${theme.accent}-400 border border-${theme.accent}-500/50`}>
                REALITY: OVERWRITTEN
             </span>
           </div>
           <h2 className="text-3xl font-bold text-white tracking-wide">
             システム完全超越、<span className={`text-transparent bg-clip-text bg-gradient-to-r from-${theme.primary}-200 via-${theme.accent}-400 to-amber-400 font-black drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]`}>究極神 (ULTIMATE)</span>。
           </h2>
           <p className="text-sm text-slate-400">現在、<span className="text-amber-400 font-bold">全次元金融統合</span> 及び <span className={`text-${theme.primary}-400 font-bold`}>無限流動性プロトコル</span> が稼働中です。</p>
        </div>
        <div className={`flex gap-4 text-xs font-medium bg-black/60 p-1.5 rounded-2xl border border-${theme.primary}-500/20 relative z-10 backdrop-blur-md`}>
           <div className={`flex items-center gap-2 px-4 py-2 bg-${theme.primary}-500/10 rounded-xl border border-${theme.primary}-500/30 text-${theme.primary}-300`}>
             <Infinity size={16} className="animate-spin-slow" /> 
             <span>Resources: ∞</span>
           </div>
           <div className={`flex items-center gap-2 px-4 py-2 bg-${theme.accent}-500/10 rounded-xl border border-${theme.accent}-500/20 text-${theme.accent}-400`}>
             <Wand2 size={16} /> 
             <span>Magic: ON</span>
           </div>
        </div>
      </div>

      {/* Asset Overview - LIMIT BREAK */}
      <div className={`col-span-1 md:col-span-2 lg:col-span-4 bg-[#050505] border border-${theme.primary}-500/20 rounded-[2rem] p-8 relative overflow-hidden shadow-2xl group hover:border-${theme.primary}-500/50 transition-all duration-500`}>
        <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-500">
           <Zap size={180} className={`text-${theme.primary}-500`} />
        </div>
        
        <div className="flex items-center justify-between mb-8">
           <h3 className={`text-xs font-bold text-${theme.primary}-500 uppercase tracking-widest flex items-center gap-2`}>
             <TrendingUp size={16} className={`text-${theme.primary}-500`} /> 
             GOD ASSET FEED
           </h3>
           <div className={`w-2 h-2 rounded-full bg-${theme.primary}-500 animate-pulse shadow-[0_0_15px_rgba(${theme.glow})]`}></div>
        </div>

        <div className="space-y-6 relative z-10">
           <BalanceRow label="日本円 (JPY)" value={wallet.jpy} highlight color="text-white" />
           <BalanceRow label="米ドル (USD)" value={wallet.usd} highlight color="text-white" />
           <div className="pt-2">
              <BalanceRow label="TK Coin (Gov)" value={wallet.tk_coin} highlight color={`text-${theme.primary}-400 font-black text-2xl`} />
           </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-white/5">
           <div className="flex justify-between items-center mb-3">
              <div className={`text-[10px] font-bold text-${theme.primary}-600 uppercase tracking-wider`}>Market Manipulation Efficiency</div>
              <div className={`text-xs font-mono text-${theme.primary}-400`}>MAXIMUM 🚀</div>
           </div>
           <MetricsChart />
        </div>
      </div>

      {/* API / Environment Status (New) */}
      <div className="col-span-1 md:col-span-1 lg:col-span-4 flex flex-col gap-6">
        <div className="bg-[#0a0a12] border border-white/5 rounded-[2rem] p-6 shadow-lg relative overflow-hidden flex-1">
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
               <Terminal size={14} /> Production Environment
             </h3>
             {health ? (
               <div className="space-y-3 font-mono text-xs">
                 <div className="flex justify-between">
                   <span className="text-slate-500">ENV</span>
                   <span className="text-white font-bold">{health.environment}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-slate-500">BUILD ID</span>
                   <span className="text-indigo-400">{health.buildId}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-slate-500">API STATUS</span>
                   <span className="text-green-400 flex items-center gap-1"><CheckCircle2 size={10} /> {health.status}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-slate-500">LICENSE</span>
                   <span className="text-amber-400">{health.licenseStatus}</span>
                 </div>
                 <div className="mt-2 pt-2 border-t border-white/5 text-[10px] text-slate-600 truncate">
                   CORP: {health.corpId}
                 </div>
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center h-32 text-slate-500 animate-pulse">
                 Connecting to Core...
               </div>
             )}
        </div>

        {/* Live Transaction Feed (Replaces Queues) */}
        <div className="bg-[#0a0a12] border border-white/5 rounded-[2rem] p-6 flex-1 shadow-lg relative overflow-hidden">
           <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
             <Activity size={14} /> Live Transactions (API)
           </h3>
           <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
              {transactions && transactions.length > 0 ? transactions.map((tx) => (
                <div key={tx.id} className="flex justify-between items-center p-2 rounded bg-white/5 border border-white/5">
                   <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${tx.type === 'positive' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-xs text-slate-300 truncate max-w-[100px]">{tx.name}</span>
                   </div>
                   <span className={`text-xs font-mono font-bold ${tx.type === 'positive' ? 'text-green-400' : 'text-slate-200'}`}>
                      {tx.type === 'positive' ? '+' : ''}{tx.amount.toLocaleString()} {tx.currency}
                   </span>
                </div>
              )) : (
                <div className="text-xs text-slate-500 text-center py-4">No recent activity</div>
              )}
           </div>
        </div>
      </div>

      {/* System Health (Module Status) */}
      <div className="col-span-1 md:col-span-1 lg:col-span-4 bg-[#0a0a12] border border-white/5 rounded-[2rem] p-6 flex flex-col gap-3 h-full shadow-lg relative overflow-hidden">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-white/5 pb-4 flex items-center gap-2">
          <Server size={14} /> System Modules
        </h3>
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {modules.map((mod) => (
            <div key={mod.id} className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all group">
              <div className="flex items-center gap-3">
                <div className={`relative w-2.5 h-2.5 flex items-center justify-center`}>
                    <div className={`absolute inset-0 rounded-full opacity-75 animate-ping ${mod.status === 'online' ? 'bg-green-500' : mod.status === 'booting' ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                    <div className={`relative w-2 h-2 rounded-full ${mod.status === 'online' ? 'bg-green-500' : mod.status === 'booting' ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">{mod.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono tracking-tight">{mod.status === 'online' ? 'PERMANENT' : mod.status.toUpperCase()}</span>
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                 <Radio size={12} className={mod.status === 'online' ? 'text-green-500' : 'text-slate-500'} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

const QueueItem: React.FC<{ label: string; value: number; color: string; bg: string; border: string; status?: string }> = React.memo(({ label, value, color, bg, border, status }) => (
  <div className={`flex justify-between items-center p-3 rounded-xl border ${border} ${bg} transition-all hover:brightness-110`}>
     <span className="text-xs text-slate-300 font-medium">{label}</span>
     <span className={`font-mono font-bold ${color}`}>{status || value}</span>
  </div>
));

const BalanceRow: React.FC<{ label: string; value: string; highlight?: boolean; color?: string }> = React.memo(({ label, value, highlight, color }) => (
  <div className="flex justify-between items-end border-b border-white/5 pb-3 group">
     <span className="text-xs font-bold text-slate-500 group-hover:text-slate-400 transition-colors">{label}</span>
     <span className={`font-mono text-xl tracking-tight ${highlight ? (color || 'text-cyan-400') : 'text-slate-200'} drop-shadow-sm`}>{value}</span>
  </div>
));
