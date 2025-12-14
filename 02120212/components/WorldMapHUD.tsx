
import React, { useState, useEffect } from 'react';
import { Globe, Server, Activity, ArrowUpRight, ArrowDownRight, Zap, Shield, Wifi } from 'lucide-react';
import { WorldNode, FxRate } from '../types';

export const WorldMapHUD: React.FC = () => {
  const [nodes, setNodes] = useState<WorldNode[]>([
    { id: 'jp', region: 'JP', city: 'Tokyo', ping: 2, status: 'online', coordinates: { x: 85, y: 35 } },
    { id: 'us', region: 'US', city: 'New York', ping: 85, status: 'sync', coordinates: { x: 25, y: 32 } },
    { id: 'eu', region: 'EU', city: 'London', ping: 140, status: 'online', coordinates: { x: 48, y: 25 } },
    { id: 'sg', region: 'SG', city: 'Singapore', ping: 35, status: 'online', coordinates: { x: 75, y: 55 } },
    { id: 'uae', region: 'UAE', city: 'Dubai', ping: 120, status: 'reserve', coordinates: { x: 60, y: 40 } },
  ]);

  const [fxRates, setFxRates] = useState<FxRate[]>([
    { pair: 'USD/JPY', rate: 151.45, prediction: 'up', confidence: 92 },
    { pair: 'EUR/JPY', rate: 164.20, prediction: 'up', confidence: 88 },
    { pair: 'BTC/JPY', rate: 10250000, prediction: 'down', confidence: 65 },
    { pair: 'TKG/USD', rate: 150.00, prediction: 'up', confidence: 99 },
  ]);

  // Simulate Pings and Rates
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev.map(n => ({
        ...n,
        ping: Math.max(1, n.ping + (Math.random() * 10 - 5))
      })));
      
      setFxRates(prev => prev.map(r => ({
        ...r,
        rate: r.rate * (1 + (Math.random() * 0.002 - 0.001)),
        confidence: Math.min(99, Math.max(50, r.confidence + (Math.random() * 4 - 2)))
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0a0a12] border border-cyan-900/50 rounded-[2rem] p-6 relative overflow-hidden shadow-2xl">
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Globe className="text-cyan-500 animate-pulse" /> WORLD MAP HUD
        </h2>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-900/20 px-3 py-1 rounded-full border border-cyan-500/30">
                <Wifi size={12} /> GLOBAL SYNC: ACTIVE
            </div>
        </div>
      </div>

      {/* Map Visualization */}
      <div className="relative w-full h-64 sm:h-80 bg-[#05050a] rounded-xl border border-slate-800 mb-6 overflow-hidden group">
        {/* Abstract World Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.15),transparent_70%)]"></div>
        
        {/* World Outline (Simplified SVG) */}
        <svg viewBox="0 0 100 60" className="absolute inset-0 w-full h-full text-slate-800 fill-current opacity-30 pointer-events-none">
           <path d="M20,10 Q30,5 40,15 T60,20 T80,15 T90,30 T80,50 T60,45 T40,50 T20,40 T10,25 T20,10 Z" /> 
        </svg>

        {/* Nodes */}
        {nodes.map(node => (
          <div 
            key={node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group/node"
            style={{ left: `${node.coordinates.x}%`, top: `${node.coordinates.y}%` }}
          >
            {/* Ping Ripple */}
            <div className="absolute inset-0 rounded-full bg-cyan-500 animate-ping opacity-50"></div>
            
            {/* Node Dot */}
            <div className={`relative w-3 h-3 rounded-full border border-black shadow-[0_0_10px_currentColor] ${
                node.status === 'online' ? 'bg-green-500 text-green-500' :
                node.status === 'sync' ? 'bg-amber-500 text-amber-500' : 'bg-purple-500 text-purple-500'
            }`}></div>

            {/* Label */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur border border-slate-700 px-2 py-1 rounded text-[9px] whitespace-nowrap opacity-0 group-hover/node:opacity-100 transition-opacity z-20 flex flex-col items-center">
                <span className="font-bold text-white">{node.region} - {node.city}</span>
                <span className="font-mono text-cyan-400">{node.ping.toFixed(0)}ms</span>
                <span className="text-[8px] uppercase text-slate-400">{node.status}</span>
            </div>
            
            {/* Connecting Lines (Visual only) */}
            <div className="absolute top-1.5 left-1.5 w-40 h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent origin-left rotate-[30deg] -z-10 opacity-30"></div>
          </div>
        ))}
      </div>

      {/* Tickers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         {/* FX Rates */}
         <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
             <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                 <Activity size={14} /> Live FX & Crypto
             </h3>
             <div className="space-y-2">
                 {fxRates.map((fx, i) => (
                     <div key={i} className="flex justify-between items-center text-sm border-b border-slate-800/50 pb-1 last:border-0 last:pb-0">
                         <span className="font-bold text-slate-300">{fx.pair}</span>
                         <div className="flex items-center gap-3">
                             <span className="font-mono text-white">{fx.rate.toLocaleString()}</span>
                             <div className={`flex items-center gap-1 text-xs font-bold ${fx.prediction === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                                 {fx.prediction === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                 {fx.confidence}% AI
                             </div>
                         </div>
                     </div>
                 ))}
             </div>
         </div>

         {/* Bank Status */}
         <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
             <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                 <Server size={14} /> Bank Core Status
             </h3>
             <div className="grid grid-cols-2 gap-2">
                 <StatusBadge label="SWIFT Gateway" status="online" />
                 <StatusBadge label="SEPA Core" status="online" />
                 <StatusBadge label="FedWire" status="sync" />
                 <StatusBadge label="Quantum Ledger" status="online" />
                 <StatusBadge label="AI Risk Engine" status="online" />
                 <StatusBadge label="Loan Protocol" status="reserve" />
             </div>
         </div>
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ label: string; status: 'online' | 'sync' | 'reserve' }> = ({ label, status }) => {
    const colors = {
        online: 'bg-green-500/10 text-green-400 border-green-500/20',
        sync: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        reserve: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    };

    return (
        <div className={`flex justify-between items-center px-2 py-1.5 rounded border ${colors[status]}`}>
            <span className="text-[10px] font-bold">{label}</span>
            <div className={`w-1.5 h-1.5 rounded-full ${status === 'online' ? 'bg-green-500' : status === 'sync' ? 'bg-amber-500' : 'bg-purple-500'} animate-pulse`}></div>
        </div>
    );
};
