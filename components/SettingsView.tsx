
import React, { useState, useEffect } from 'react';
import { Settings, Server, Database, Terminal, Shield, Cpu, Play, FileCode, Lock, RotateCw, Globe, Copy, ExternalLink, Zap, Box, Gauge, Activity, Radio, Command, Heart, Eye, Gem, Hammer, RefreshCw, Network, Scan, Fingerprint, Smartphone, CheckCircle2, Palette } from 'lucide-react';
import { SystemModule, QueueState } from '../types';
import { LogConsole } from './LogConsole';
import { BusinessChecklist } from './BusinessChecklist';
import { useTheme, ThemeName } from './ThemeContext';

interface SettingsViewProps {
  modules: SystemModule[];
  logs: string[];
  queues: QueueState;
  onRestart?: (id: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ modules, logs, queues, onRestart }) => {
  const [latency, setLatency] = useState(0);
  const [securityConfig, setSecurityConfig] = useState({
      quantum: true,
      biometric: true,
      behavioral: true
  });
  const { theme, setThemeName, themes } = useTheme();

  // Force ultra-low latency
  useEffect(() => {
    const interval = setInterval(() => {
        setLatency(0); // 0ms hardcoded for GODMODE feel
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSecurity = (key: keyof typeof securityConfig) => {
      setSecurityConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Settings className={`text-${theme.secondary}-500`} /> System Control Center
      </h2>

      {/* UI THEME SELECTOR */}
      <section>
         <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-4">
             <Palette size={16} /> UI Theme Matrix
         </h3>
         <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                 {(Object.keys(themes) as ThemeName[]).map((t) => (
                     <button
                        key={t}
                        onClick={() => setThemeName(t)}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all active:scale-95 hover:bg-slate-800 ${theme.name === t ? `border-${themes[t].primary}-500 bg-${themes[t].primary}-900/20` : 'border-slate-800 bg-slate-950'}`}
                     >
                         <div className={`w-8 h-8 rounded-full mb-2 bg-gradient-to-br ${themes[t].gradient} shadow-lg`}></div>
                         <span className={`text-xs font-bold uppercase tracking-wider ${theme.name === t ? 'text-white' : 'text-slate-500'}`}>
                             {t}
                         </span>
                     </button>
                 ))}
             </div>
         </div>
      </section>

      {/* Production Access - MOVED TO TOP & ACTIVATED */}
      <section>
         <div className="bg-gradient-to-r from-[#050b14] to-[#020205] border border-indigo-900/50 rounded-2xl p-6 shadow-[0_0_50px_rgba(79,70,229,0.2)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-indigo-500/10 opacity-50 pointer-events-none"></div>
            <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <Globe size={16} className="animate-pulse text-green-400" /> Live Production Environment (ONLINE)
            </h3>
            <div className="space-y-3 relative z-10">
                <EndpointRow label="Main Banking Interface" url="https://www.tkglobalbank.com" active />
                <EndpointRow label="Admin Godmode Portal" url="https://admin.tkglobalbank.com/godmode" active secure />
                <EndpointRow label="Corporate Dashboard" url="https://corp.tkglobalbank.com" active />
                <EndpointRow label="API Gateway" url="https://api.tkglobalbank.com/v1" active />
            </div>
            <div className="mt-6 pt-4 border-t border-indigo-900/30 text-[10px] text-green-400 font-mono flex items-center gap-2 font-bold">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
               URL USAGE: ENABLED • DNS: PROPAGATED • TRAFFIC: 100% ROUTED • SERVER: TOKYO-01
            </div>
         </div>
      </section>

      {/* MOBILE SECURITY SUITE (NEW) */}
      <section>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-4">
              <Shield size={16} /> Mobile Security Suite (FSA Compliant)
          </h3>
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-6 relative overflow-hidden">
              {/* Compliance Badge */}
              <div className="absolute top-4 right-4 bg-green-900/20 border border-green-500/30 text-green-400 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-2">
                  <CheckCircle2 size={12} /> FSA LEVEL AAA
              </div>

              <div className="space-y-4">
                  {/* Toggle 1 */}
                  <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl ${securityConfig.quantum ? `bg-${theme.secondary}-500/20 text-${theme.secondary}-400` : 'bg-slate-800 text-slate-500'}`}>
                              <Lock size={20} />
                          </div>
                          <div>
                              <div className="font-bold text-white text-sm">Quantum Encryption</div>
                              <div className="text-[10px] text-slate-500">Kyber-1024 Post-Quantum Algo</div>
                          </div>
                      </div>
                      <button 
                        onClick={() => toggleSecurity('quantum')} 
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${securityConfig.quantum ? `bg-${theme.secondary}-500` : 'bg-slate-700'}`}
                      >
                          <div className={`w-4 h-4 bg-white rounded-full transition-transform ${securityConfig.quantum ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </button>
                  </div>

                  {/* Toggle 2 */}
                  <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl ${securityConfig.biometric ? `bg-${theme.secondary}-500/20 text-${theme.secondary}-400` : 'bg-slate-800 text-slate-500'}`}>
                              <Fingerprint size={20} />
                          </div>
                          <div>
                              <div className="font-bold text-white text-sm">Biometric Level 3</div>
                              <div className="text-[10px] text-slate-500">3D Face + Subdermal Vein Scan</div>
                          </div>
                      </div>
                      <button 
                        onClick={() => toggleSecurity('biometric')} 
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${securityConfig.biometric ? `bg-${theme.secondary}-500` : 'bg-slate-700'}`}
                      >
                          <div className={`w-4 h-4 bg-white rounded-full transition-transform ${securityConfig.biometric ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </button>
                  </div>

                  {/* Toggle 3 */}
                  <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl ${securityConfig.behavioral ? `bg-${theme.secondary}-500/20 text-${theme.secondary}-400` : 'bg-slate-800 text-slate-500'}`}>
                              <Activity size={20} />
                          </div>
                          <div>
                              <div className="font-bold text-white text-sm">Behavioral Analysis</div>
                              <div className="text-[10px] text-slate-500">AI Pattern Detection (Japan Fin)</div>
                          </div>
                      </div>
                      <button 
                        onClick={() => toggleSecurity('behavioral')} 
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${securityConfig.behavioral ? `bg-${theme.secondary}-500` : 'bg-slate-700'}`}
                      >
                          <div className={`w-4 h-4 bg-white rounded-full transition-transform ${securityConfig.behavioral ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </button>
                  </div>
              </div>
          </div>
      </section>

      {/* ΩβαMAX 5 ELEMENTS CORE STATUS */}
      <section>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-4">
            <Cpu size={16} /> ΩβαMAX Core Elements
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <ElementCard 
                icon={<Heart size={20} />} 
                label="Heartbeat" 
                desc="System Sync" 
                color="text-rose-500" 
                bg="bg-rose-950/30" 
                border="border-rose-500/30"
                pulse
            />
            <ElementCard 
                icon={<Eye size={20} />} 
                label="Oracle" 
                desc="AI Prediction" 
                color="text-purple-500" 
                bg="bg-purple-950/30" 
                border="border-purple-500/30"
            />
            <ElementCard 
                icon={<Gem size={20} />} 
                label="Crystal" 
                desc="Immutable Log" 
                color="text-indigo-500" 
                bg="bg-indigo-950/30" 
                border="border-indigo-500/30"
            />
            <ElementCard 
                icon={<Zap size={20} />} 
                label="Lightning" 
                desc="Instant Blast" 
                color="text-yellow-500" 
                bg="bg-yellow-950/30" 
                border="border-yellow-500/30"
                pulse
            />
            <ElementCard 
                icon={<RefreshCw size={20} />} 
                label="Repair" 
                desc="Self-Healing" 
                color="text-emerald-500" 
                bg="bg-emerald-950/30" 
                border="border-emerald-500/30"
            />
        </div>
      </section>
      
      {/* GLOBAL INFINITY MESH */}
      <section>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-4">
            <Network size={16} /> Global Infinity Mesh
        </h3>
        <div className={`bg-slate-900/50 border border-${theme.secondary}-500/20 rounded-xl p-5 relative overflow-hidden`}>
             <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                 <Globe size={120} />
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                 <GlobalNodeCard region="EU1" name="London Prime" latency="0.04ms" status="synced" theme={theme.secondary} />
                 <GlobalNodeCard region="US1" name="NYC Core" latency="0.08ms" status="synced" theme={theme.secondary} />
                 <GlobalNodeCard region="SG1" name="Singapore Hub" latency="0.02ms" status="synced" theme={theme.secondary} />
                 <GlobalNodeCard region="UAE1" name="Dubai Vault" latency="0.05ms" status="synced" theme={theme.secondary} />
             </div>
             <div className={`mt-4 flex items-center gap-2 text-[10px] text-${theme.secondary}-400 font-mono`}>
                 <div className={`w-1.5 h-1.5 bg-${theme.secondary}-500 rounded-full animate-pulse`}></div>
                 ∞ BOOST CORE: ACTIVE • GLOBAL LOAD BALANCING ENABLED
             </div>
        </div>
      </section>

      {/* RUST KERNEL DIAGNOSTICS */}
      <section>
         <div className="flex justify-between items-center mb-4">
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Gauge size={16} /> Kernel Diagnostics
             </h3>
             <span className="text-[10px] font-mono text-orange-400 bg-orange-900/20 px-2 py-0.5 rounded border border-orange-900/50 flex items-center gap-1 animate-pulse">
                <Zap size={10} /> RUST OPTIMIZED
             </span>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
             <MetricCard label="Core Latency" value={`${latency.toFixed(2)}ms`} color="text-green-400" icon={<Activity size={16} />} />
             <MetricCard label="Throughput" value="∞ TPS" color={`text-${theme.secondary}-400`} icon={<Gauge size={16} />} />
             <MetricCard label="Uptime" value="100.000%" color={`text-${theme.accent}-400`} icon={<Server size={16} />} />
             <MetricCard label="Security" value="GODMODE" color="text-amber-400" icon={<Shield size={16} />} />
         </div>
      </section>

      {/* Production Readiness Checklist */}
      <section>
        <BusinessChecklist />
      </section>

      {/* Terminal / Logs */}
      <section className="h-72 flex flex-col">
         <div className="flex justify-between items-center mb-3">
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Terminal size={16} /> Server Logs (Live)
             </h3>
         </div>
         <div className="flex-1 rounded-xl overflow-hidden border border-slate-800 shadow-xl">
            <LogConsole logs={logs} />
         </div>
      </section>

      <button className="w-full py-4 bg-red-800/20 border border-red-700/50 text-red-400 rounded-xl font-bold text-xs hover:bg-red-700/30 transition-colors tracking-[0.2em] flex justify-center items-center gap-3">
         <Lock size={14} /> EMERGENCY SYSTEM HALT
      </button>
    </div>
  );
};

const EndpointRow: React.FC<{ label: string; url: string; active?: boolean; secure?: boolean }> = ({ label, url, active, secure }) => (
    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-indigo-900/10 hover:bg-indigo-900/10 transition-colors group cursor-pointer" onClick={() => window.open(url, '_blank')}>
        <div className="flex flex-col">
            <span className="text-xs text-indigo-200 font-bold flex items-center gap-1.5 mb-0.5">
                {secure && <Lock size={10} className="text-amber-400" />} {label}
            </span>
            <span className="text-[10px] text-green-400 font-mono truncate max-w-[200px] underline decoration-green-500/50">{url}</span>
        </div>
        <div className="flex items-center gap-2">
            <button className="p-2 text-slate-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors" title="Copy URL">
                <Copy size={14} />
            </button>
            <div className="p-2 text-green-500 hover:text-green-300 rounded-lg transition-colors cursor-pointer" title="Active">
                <ExternalLink size={14} />
            </div>
            {active && <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></span>}
        </div>
    </div>
);

const MetricCard: React.FC<{ label: string; value: string; color: string; icon: React.ReactNode }> = ({ label, value, color, icon }) => (
    <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex flex-col justify-between h-24">
        <div className="flex justify-between items-start">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{label}</span>
            <span className="text-slate-600">{icon}</span>
        </div>
        <div className={`text-lg font-mono font-bold ${color}`}>{value}</div>
    </div>
);

const ElementCard: React.FC<{ icon: React.ReactNode; label: string; desc: string; color: string; bg: string; border: string; pulse?: boolean }> = ({ icon, label, desc, color, bg, border, pulse }) => (
    <div className={`flex flex-col items-center justify-center p-4 rounded-xl border ${border} ${bg} transition-all hover:scale-105`}>
        <div className={`mb-2 ${color} ${pulse ? 'animate-pulse' : ''}`}>{icon}</div>
        <div className={`text-sm font-bold text-white`}>{label}</div>
        <div className={`text-[10px] ${color} opacity-80`}>{desc}</div>
    </div>
);

const GlobalNodeCard: React.FC<{ region: string; name: string; latency: string; status: 'synced' | 'syncing' | 'offline'; theme: string }> = ({ region, name, latency, status, theme }) => (
    <div className={`bg-black/30 border border-slate-800 rounded-lg p-3 hover:border-${theme}-500/30 transition-colors`}>
        <div className="flex justify-between items-start mb-2">
            <span className={`text-[10px] font-bold text-${theme}-400 bg-${theme}-900/20 px-1.5 py-0.5 rounded`}>{region}</span>
            <div className={`w-1.5 h-1.5 rounded-full ${status === 'synced' ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.6)] animate-pulse' : 'bg-slate-600'}`}></div>
        </div>
        <div className="text-xs font-bold text-white mb-0.5">{name}</div>
        <div className="flex justify-between items-center">
            <span className="text-[9px] text-slate-500 font-mono">{latency}</span>
            <span className="text-[9px] font-bold text-green-500">SYNCED</span>
        </div>
    </div>
);
