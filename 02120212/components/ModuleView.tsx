
import React, { useState, useEffect } from 'react';
import { Smartphone, Terminal, Palette, FileText, CheckCircle2, AlertTriangle, Activity, Code, Layers, Box, Cpu, Wifi, Battery, Signal, Globe, Lock, Search, Menu, Bell, User, Star, Shield, Server } from 'lucide-react';

interface ModuleViewProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  variant: 'app' | 'dev' | 'design' | 'admin';
}

export const ModuleView: React.FC<ModuleViewProps> = ({ id, title, icon, variant }) => {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    setLogs([]);
    const timer = setTimeout(() => setLoading(false), 800);
    
    // Simulate live logs
    const interval = setInterval(() => {
        const actions = ['Syncing', 'Validating', 'Encrypting', 'Rendering', 'Optimizing'];
        const targets = ['Data Node', 'UI Thread', 'Secure Enclave', 'API Gateway'];
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${actions[Math.floor(Math.random()*actions.length)]} ${targets[Math.floor(Math.random()*targets.length)]}...`, ...prev].slice(0, 8));
    }, 1500);

    return () => {
        clearTimeout(timer);
        clearInterval(interval);
    };
  }, [id]);

  if (loading) {
      return (
          <div className="h-full flex flex-col items-center justify-center p-8 bg-[#0a0a12] rounded-3xl border border-slate-800 animate-pulse">
              <div className="text-cyan-500 mb-4 animate-spin">{icon}</div>
              <div className="text-sm font-mono text-slate-400">Loading Module: {title}...</div>
          </div>
      );
  }

  return (
    <div className="h-full flex flex-col bg-[#05050a] rounded-3xl border border-slate-800 overflow-hidden relative shadow-2xl anim-enter-bottom">
        {/* Module Header */}
        <div className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 p-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-lg text-cyan-400">{icon}</div>
                <div>
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h2>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        SYSTEM ONLINE • v2.4.0
                    </div>
                </div>
            </div>
            <div className="text-[10px] font-mono text-slate-600 border border-slate-800 px-2 py-1 rounded">
                PID: {Math.floor(Math.random() * 9000) + 1000}
            </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
            
            {/* VARIANT: APP (Mobile Simulator) */}
            {variant === 'app' && (
                <div className="h-full flex items-center justify-center p-6">
                    <div className="relative w-[300px] h-[600px] bg-black rounded-[3rem] border-4 border-slate-800 shadow-2xl overflow-hidden ring-4 ring-slate-900/50">
                        {/* Status Bar */}
                        <div className="bg-[#0f172a] text-white px-6 py-3 flex justify-between items-center text-[10px] pt-4">
                            <span>12:42</span>
                            <div className="flex gap-1.5">
                                <Signal size={10} />
                                <Wifi size={10} />
                                <Battery size={10} />
                            </div>
                        </div>
                        {/* App Content */}
                        <div className="h-full bg-slate-50 text-slate-900 overflow-y-auto pb-20">
                            {/* App Header */}
                            <div className="bg-indigo-600 text-white p-6 rounded-b-3xl shadow-lg mb-4">
                                <div className="flex justify-between items-center mb-4">
                                    <Menu size={20} />
                                    <div className="flex gap-3">
                                        <Search size={20} />
                                        <Bell size={20} />
                                    </div>
                                </div>
                                <div className="text-xs opacity-80">Total Balance</div>
                                <div className="text-3xl font-bold">¥ 45,200,900</div>
                            </div>
                            
                            {/* Actions Grid */}
                            <div className="grid grid-cols-4 gap-4 px-4 mb-6">
                                {['Send', 'Pay', 'Topup', 'More'].map((label, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1">
                                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600">
                                            <Box size={20} />
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-500">{label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Promo Card */}
                            <div className="mx-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-4 text-white shadow-lg mb-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-bold text-lg mb-1">Super Cash Back</div>
                                        <div className="text-xs opacity-90">Get 5% back on all transactions</div>
                                    </div>
                                    <Star className="text-yellow-300 fill-yellow-300" />
                                </div>
                            </div>

                            {/* Transactions */}
                            <div className="px-4">
                                <h4 className="font-bold text-slate-700 mb-3 text-sm">Recent Activity</h4>
                                {[1,2,3].map(i => (
                                    <div key={i} className="flex items-center justify-between py-3 border-b border-slate-200">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
                                                <User size={16} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-xs">Payment to Store</div>
                                                <div className="text-[10px] text-slate-400">Today, 10:23 AM</div>
                                            </div>
                                        </div>
                                        <div className="font-bold text-sm text-slate-800">- ¥1,200</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Home Indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full"></div>
                    </div>
                </div>
            )}

            {/* VARIANT: DEV (Code/API Console) */}
            {variant === 'dev' && (
                <div className="h-full flex flex-col">
                    <div className="flex-1 p-4 font-mono text-xs overflow-y-auto custom-scrollbar">
                        <div className="text-slate-500 mb-2">// Initializing secure connection to Global Mesh...</div>
                        {logs.map((log, i) => (
                            <div key={i} className="mb-1">
                                <span className="text-indigo-400">$</span> <span className="text-slate-300">{log}</span>
                            </div>
                        ))}
                        <div className="mt-4 animate-pulse text-cyan-400">_</div>
                    </div>
                    <div className="h-1/3 border-t border-slate-800 bg-[#080810] p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-400 uppercase">Active Nodes</span>
                            <span className="text-xs text-green-400">12/12 ONLINE</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {[1,2,3,4].map(i => (
                                <div key={i} className="bg-slate-900 border border-slate-700 p-2 rounded flex flex-col items-center">
                                    <Server size={16} className="text-indigo-500 mb-1" />
                                    <span className="text-[10px] text-slate-400">Node-{i}</span>
                                    <span className="text-[9px] text-green-500">98% CPU</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* VARIANT: DESIGN (UI Kit) */}
            {variant === 'design' && (
                <div className="h-full p-8 overflow-y-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="col-span-2 md:col-span-3 mb-4">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Palette size={16} /> Color System</h3>
                            <div className="flex gap-4">
                                <div className="h-16 w-16 rounded-xl bg-cyan-500 shadow-lg shadow-cyan-500/20"></div>
                                <div className="h-16 w-16 rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/20"></div>
                                <div className="h-16 w-16 rounded-xl bg-purple-600 shadow-lg shadow-purple-600/20"></div>
                                <div className="h-16 w-16 rounded-xl bg-slate-900 border border-slate-700"></div>
                            </div>
                        </div>
                        
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                            <h4 className="text-xs text-slate-400 font-bold uppercase mb-3">Typography</h4>
                            <div className="text-2xl font-bold text-white mb-1">Heading 1</div>
                            <div className="text-lg font-bold text-white mb-1">Heading 2</div>
                            <div className="text-sm text-slate-300">Body text example for the UI kit.</div>
                        </div>

                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                            <h4 className="text-xs text-slate-400 font-bold uppercase mb-3">Components</h4>
                            <div className="space-y-2">
                                <button className="w-full py-2 bg-cyan-600 rounded-lg text-xs font-bold text-white">Primary Button</button>
                                <button className="w-full py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-slate-300">Secondary</button>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                            <h4 className="text-xs text-slate-400 font-bold uppercase mb-3">Icons</h4>
                            <div className="grid grid-cols-4 gap-2 text-slate-400">
                                <Box size={20} /> <Layers size={20} /> <Code size={20} /> <Cpu size={20} />
                                <Wifi size={20} /> <Lock size={20} /> <Globe size={20} /> <Shield size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* VARIANT: ADMIN (Documents & Compliance) */}
            {variant === 'admin' && (
                <div className="h-full p-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><Shield size={16} className="text-green-500" /> Compliance Status</h3>
                            <div className="space-y-3">
                                <CheckItem label="GDPR Compliance" status="verified" />
                                <CheckItem label="SOC2 Type II" status="verified" />
                                <CheckItem label="ISO 27001" status="pending" />
                                <CheckItem label="FSA License" status="verified" />
                            </div>
                        </div>

                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><FileText size={16} className="text-amber-500" /> Audit Logs</h3>
                            <div className="space-y-2">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="flex items-center gap-3 text-xs p-2 hover:bg-slate-800 rounded transition-colors">
                                        <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
                                        <span className="text-slate-400 font-mono">2024-03-15 10:0{i}</span>
                                        <span className="text-slate-200">System check initiated by admin</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

const CheckItem: React.FC<{ label: string; status: 'verified' | 'pending' }> = ({ label, status }) => (
    <div className="flex items-center justify-between p-2 bg-black/20 rounded border border-slate-800/50">
        <span className="text-xs text-slate-300">{label}</span>
        {status === 'verified' ? (
            <span className="text-[10px] text-green-400 flex items-center gap-1 font-bold"><CheckCircle2 size={12} /> VERIFIED</span>
        ) : (
            <span className="text-[10px] text-yellow-500 flex items-center gap-1 font-bold"><AlertTriangle size={12} /> PENDING</span>
        )}
    </div>
);
