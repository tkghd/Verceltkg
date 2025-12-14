
import React from 'react';
import { Building2, TrendingUp, Users, Globe, Briefcase, Activity, CheckCircle2, Zap, BarChart3, PieChart } from 'lucide-react';
import { WalletState, BusinessEntity } from '../types';
import { BUSINESS_PORTFOLIO } from '../constants';

interface CorporateViewProps {
  wallet: WalletState;
}

export const CorporateView: React.FC<CorporateViewProps> = ({ wallet }) => {
  const domesticUnits = BUSINESS_PORTFOLIO.filter(b => b.region === 'domestic');
  const globalUnits = BUSINESS_PORTFOLIO.filter(b => b.region === 'global');

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      <div className="flex justify-between items-center border-b border-cyan-900/30 pb-4">
        <div>
           <h2 className="text-2xl font-bold text-white flex items-center gap-2">
             <Building2 className="text-cyan-500" /> TKG HOLDINGS
           </h2>
           <p className="text-xs text-slate-500 font-mono mt-1">FULL-CORPORATE-MODULES :: IMMORTAL MODE</p>
        </div>
        <div className="flex flex-col items-end">
             <span className="px-3 py-1 bg-cyan-950 border border-cyan-800 rounded-full text-xs text-cyan-400 font-mono animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.3)] mb-1">
                AUDIT: PASSED ✅
             </span>
             <span className="text-[10px] text-slate-500 font-mono">Synced: 0.02s ago</span>
        </div>
      </div>

      {/* GLOBAL PULSE (NEW) */}
      <div className="bg-gradient-to-r from-indigo-950 to-slate-950 border border-indigo-800/50 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="flex justify-between items-start relative z-10">
              <div>
                  <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-widest mb-1 flex items-center gap-2">
                      <Activity size={16} className="animate-pulse" /> Global Market Heartbeat
                  </h3>
                  <div className="text-4xl font-mono font-bold text-white tracking-tight mt-2">
                      $ 205,000,000,000,000
                  </div>
                  <div className="text-xs text-indigo-400 mt-2 font-mono">
                      Target Market Reach (Planned)
                  </div>
              </div>
              <div className="h-16 w-32 flex items-end justify-between gap-1">
                  {[40, 60, 45, 70, 50, 80, 65, 90, 75, 55, 85, 95].map((h, i) => (
                      <div key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} className="w-1.5 bg-indigo-500/50 rounded-t-sm animate-pulse"></div>
                  ))}
              </div>
          </div>
      </div>

      {/* AI PREDICTION BADGES */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <PredictionBadge label="Credit Score" value="AAA+" trend="up" color="text-green-400" border="border-green-500/30" />
          <PredictionBadge label="Risk Analysis" value="0.01%" trend="down" color="text-cyan-400" border="border-cyan-500/30" />
          <PredictionBadge label="Revenue Forecast" value="+22.5%" trend="up" color="text-amber-400" border="border-amber-500/30" />
          <PredictionBadge label="Market Sentiment" value="BULLISH" trend="neutral" color="text-purple-400" border="border-purple-500/30" />
      </div>

      {/* Structure Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         
         {/* Domestic Holdings */}
         <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 relative overflow-hidden group hover:border-cyan-700/50 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <Briefcase size={100} />
            </div>
            <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
               <span className="text-xl">🇯🇵</span> TKG HOLDINGS (JAPAN)
            </h3>
            <div className="space-y-3 relative z-10">
               <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Total Units</span>
                  <span className="font-mono text-white">12 Entities</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Monthly Revenue</span>
                  <span className="font-mono text-cyan-400">¥ 145,280,000</span>
               </div>
               <div className="mt-4 pt-4 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Portfolio Highlights</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar pr-2">
                     {domesticUnits.map(unit => (
                        <BusinessRow key={unit.id} unit={unit} />
                     ))}
                  </div>
               </div>
            </div>
         </div>

         {/* Global Holdings */}
         <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 relative overflow-hidden group hover:border-purple-700/50 transition-colors">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <Globe size={100} />
            </div>
            <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
               <span className="text-xl">🌏</span> TKG GLOBAL HOLDINGS
            </h3>
            <div className="space-y-3 relative z-10">
               <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Global Entities</span>
                  <span className="font-mono text-white">200+ Active</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Revenue (USD)</span>
                  <span className="font-mono text-purple-400">$ 8,950,000</span>
               </div>
               <div className="mt-4 pt-4 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">International Divisions</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar pr-2">
                     {globalUnits.map(unit => (
                        <BusinessRow key={unit.id} unit={unit} />
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Expansion Roadmap */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
             <TrendingUp size={16} /> Global Expansion Roadmap
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative z-10">
              <PhaseCard phase="Q1" title="Entry" desc="Hong Kong / SG" status="done" />
              <PhaseCard phase="Q2" title="Integration" desc="Bank / AI / Pay" status="active" />
              <PhaseCard phase="Q3" title="Expansion" desc="EU / Caribbean" status="pending" />
              <PhaseCard phase="Q4" title="Dominion" desc="205T Market" status="pending" />
          </div>
          {/* Connector Line (Desktop) */}
          <div className="hidden sm:block absolute top-[60%] left-10 right-10 h-0.5 bg-slate-800 -z-0"></div>
      </div>
    </div>
  );
};

const BusinessRow: React.FC<{ unit: BusinessEntity }> = ({ unit }) => (
   <div className="flex items-center justify-between p-2 rounded bg-slate-950/50 border border-slate-800/50 hover:border-slate-600 transition-colors text-xs">
      <div className="flex flex-col">
         <span className="font-bold text-slate-300">{unit.name}</span>
         <span className="text-[10px] text-slate-500 truncate max-w-[120px]">{unit.url}</span>
      </div>
      <div className="text-right">
         <div className="font-mono text-cyan-500">{unit.revenue}</div>
         <span className={`text-[9px] px-1 rounded ${unit.status === 'active' ? 'bg-green-900/30 text-green-500' : 'bg-yellow-900/30 text-yellow-500'}`}>
            {unit.status.toUpperCase()}
         </span>
      </div>
   </div>
);

const PredictionBadge: React.FC<{ label: string; value: string; trend: 'up' | 'down' | 'neutral'; color: string; border: string }> = ({ label, value, trend, color, border }) => (
    <div className={`flex-shrink-0 w-36 bg-slate-900/50 border ${border} rounded-xl p-3 flex flex-col justify-between`}>
        <div className="text-[10px] text-slate-500 uppercase font-bold">{label}</div>
        <div className={`text-lg font-mono font-bold ${color}`}>{value}</div>
    </div>
);

const PhaseCard: React.FC<{ phase: string; title: string; desc: string; status: 'done' | 'active' | 'pending' }> = ({ phase, title, desc, status }) => {
    const statusColor = status === 'done' ? 'bg-green-500' : status === 'active' ? 'bg-cyan-500' : 'bg-slate-700';
    const textColor = status === 'done' ? 'text-green-500' : status === 'active' ? 'text-cyan-500' : 'text-slate-500';
    
    return (
        <div className={`bg-slate-900 border ${status === 'active' ? 'border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'border-slate-800'} p-4 rounded-xl flex flex-col gap-2 relative z-10`}>
            <div className="flex justify-between items-center">
                <span className={`text-xs font-bold ${textColor}`}>{phase}</span>
                <div className={`w-2 h-2 rounded-full ${statusColor} ${status === 'active' ? 'animate-pulse' : ''}`}></div>
            </div>
            <div className="font-bold text-white text-sm">{title}</div>
            <div className="text-[10px] text-slate-500">{desc}</div>
        </div>
    );
};
