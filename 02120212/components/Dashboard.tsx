
import React from 'react';
import { Activity, ShieldCheck, Server, Globe, Database, Cpu, Wifi, Lock, Boxes, Zap, TrendingUp, Radio, Wand2, Infinity, Terminal, CheckCircle2, FileText, Scale, Smartphone, Rocket } from 'lucide-react';
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

  const prodModules = [
      { name: 'BUILD', status: 'SUCCESS', impact: 'Deploy', icon: <CheckCircle2 size={10} />, color: 'text-green-400', bg: 'bg-green-900/20', border: 'border-green-500/30' },
      { name: 'DEPLOY', status: 'LIVE', impact: 'Vercel', icon: <Rocket size={10} />, color: 'text-blue-400', bg: 'bg-blue-900/20', border: 'border-blue-500/30' },
      { name: 'MODULES', status: 'ONLINE', impact: 'All Systems', icon: <Boxes size={10} />, color: 'text-purple-400', bg: 'bg-purple-900/20', border: 'border-purple-500/30' },
      { name: 'BANK API', status: 'LIVE', impact: 'Gateway', icon: <Globe size={10} />, color: 'text-cyan-400', bg: 'bg-cyan-900/20', border: 'border-cyan-500/30' },
      { name: 'PWA UI/UX', status: 'ACTIVE', impact: 'Interface', icon: <Smartphone size={10} />, color: 'text-indigo-400', bg: 'bg-indigo-900/20', border: 'border-indigo-500/30' },
      { name: 'SUBMODULES', status: 'SYNCED', impact: 'Integration', icon: <Database size={10} />, color: 'text-amber-400', bg: 'bg-amber-900/20', border: 'border-amber-500/30' },
      { name: 'AUTH', status: 'LOCKED', impact: 'ID: 1190212', icon: <Lock size={10} />, color: 'text-red-400', bg: 'bg-red-900/20', border: 'border-red-500/30' },
      { name: 'REALapi', status: 'LIVE', impact: 'Transactions', icon: <Zap size={10} />, color: 'text-red-400', bg: 'bg-red-900/20', border: 'border-red-500/30' },
      { name: 'LICENSE', status: 'VERIFIED', impact: 'Legal', icon: <ShieldCheck size={10} />, color: 'text-green-400', bg: 'bg-green-900/20', border: 'border-green-500/30' },
      { name: 'AUDIT', status: 'ACTIVE', impact: 'Compliance', icon: <FileText size={10} />, color: 'text-amber-400', bg: 'bg-amber-900/20', border: 'border-amber-500/30' },
      { name: 'HEALTH', status: 'MONITORED', impact: 'System', icon: <Activity size={10} />, color: 'text-pink-400', bg: 'bg-pink-900/20', border: 'border-pink-500/30' },
      { name: 'DATA', status: 'STREAMING', impact: 'Realtime', icon: <Database size={10} />, color: 'text-emerald-400', bg: 'bg-emerald-900/20', border: 'border-emerald-500/30' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 pb-10">
      
      {/* World Map HUD - Centerpiece */}
      <div className="col-span-1 md:col-span-2 lg:col-span-12 anim-enter-bottom">
        <WorldMapHUD />
      </div>

      {/* Welcome Banner - ULTIMATE MODE */}
      <div className={`col-span-1 md:col-span-2 lg:col-span-12 bg-gradient-to-r from-[#1a1200] to-[#000000] border border-${theme.primary}-500/30 p-8 rounded-[2rem] flex flex-col md:flex-row justify-between items-center shadow-[0_0_50px_rgba(${theme.glow},0.1)] backdrop-blur-sm relative overflow-hidden group anim-enter-bottom anim-delay-100`}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 animate-pulse"></div>
        <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-l from-${theme.primary}-500/10 to-transparent`}></div>
        
        <div className="flex flex-col gap-2 mb-4 md:mb-0 relative z-10">
           <div className="flex items-center gap-2 mb-1">
             <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-green-500 text-black font-bold border border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.5)] animate-pulse">
                REALITY: OVERWRITTEN ✅
             </span>
             <span className={`px-2 py-0.5 rounded text-[10px] font-mono bg-${theme.accent}-500/20 text-${theme.accent}-400 border border-${theme.accent}-500/50`}>
                PROTOCOL: GODMODE
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
      <div className={`col-span-1 md:col-span-2 lg:col-span-4 bg-[#050505] border border-${theme.primary}-500/20 rounded-[2rem] p-8 relative overflow-hidden shadow-2xl group hover:border-${theme.primary}-500/50 transition-all duration-500 anim-enter-bottom anim-delay-200`}>
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

      {/* Production Lane Matrix (New) */}
      <div className="col-span-1 md:col-span-1 lg:col-span-4 bg-[#0a0a12] border border-white/5 rounded-[2rem] p-6 flex flex-col shadow-lg relative overflow-hidden anim-enter-bottom anim-delay-300">
         <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Lock size={14} className="text-green-500" /> Production Lane Matrix
         </h3>
         <div className="flex-1 grid grid-cols-2 gap-2 overflow-y-auto custom-scrollbar pr-1">
            {prodModules.map((mod, i) => (
                <div key={i} className={`flex items-center justify-between p-2 rounded-lg border ${mod.border} ${mod.bg}`}>
                    <div className="flex items-center gap-2">
                        <span className={mod.color}>{mod.icon}</span>
                        <div>
                            <div className="text-[10px] font-bold text-slate-200 uppercase">{mod.name}</div>
                            <div className="text-[8px] text-slate-500">{mod.impact}</div>
                        </div>
                    </div>
                    <span className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded bg-black/30 ${mod.color}`}>
                        {mod.status}
                    </span>
                </div>
            ))}
         </div>
         <div className="mt-4 pt-3 border-t border-white/5 text-center">
             <span className="text-[10px] text-green-500 font-bold tracking-widest animate-pulse">
                 ALL SYSTEMS: REAL WORLD IMPACT [ACTIVE]
             </span>
         </div>
      </div>

      {/* Live Transaction Feed */}
      <div className="col-span-1 md:col-span-1 lg:col-span-4 bg-[#0a0a12] border border-white/5 rounded-[2rem] p-6 shadow-lg relative overflow-hidden anim-enter-bottom anim-delay-400">
           <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
             <Activity size={14} /> Live Transactions (API)
           </h3>
           <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
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
  );
};

const BalanceRow: React.FC<{ label: string; value: string; highlight?: boolean; color?: string }> = React.memo(({ label, value, highlight, color }) => (
  <div className="flex justify-between items-end border-b border-white/5 pb-3 group">
     <span className="text-xs font-bold text-slate-500 group-hover:text-slate-400 transition-colors">{label}</span>
     <span className={`font-mono text-xl tracking-tight ${highlight ? (color || 'text-cyan-400') : 'text-slate-200'} drop-shadow-sm`}>{value}</span>
  </div>
));
