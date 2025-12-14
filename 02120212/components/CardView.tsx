
import React, { useState, useEffect } from 'react';
import { CreditCard, Lock, Eye, EyeOff, ShieldAlert, Wifi, Globe, ShieldCheck, Shield, Activity, RefreshCw, AlertTriangle } from 'lucide-react';

export const CardView: React.FC = () => {
  const [isFrozen, setIsFrozen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [secure3D, setSecure3D] = useState(true);
  const [onlinePay, setOnlinePay] = useState(true);
  const [limit, setLimit] = useState(100); // 0-100 scale for slider
  const [isSyncingLimit, setIsSyncingLimit] = useState(false);

  // Debounce effect for limit slider to simulate API sync
  useEffect(() => {
    if (limit === 100) return; // Don't sync on initial render if default
    setIsSyncingLimit(true);
    const timer = setTimeout(() => {
        setIsSyncingLimit(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [limit]);

  const toggleSetting = (setter: React.Dispatch<React.SetStateAction<boolean>>, value: boolean) => {
      setter(!value);
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <CreditCard className="text-indigo-500" /> Virtual Card Control
          </h2>
          {isFrozen && <span className="bg-red-500 text-white text-[10px] px-2 py-1 rounded font-bold animate-pulse">DISABLED</span>}
      </div>

      {/* Card Visual */}
      <div className={`relative w-full aspect-[1.586/1] rounded-2xl p-6 flex flex-col justify-between transition-all duration-500 overflow-hidden shadow-2xl group ${isFrozen ? 'grayscale opacity-75' : ''}`}>
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-black z-0"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 z-0"></div>
        <div className="absolute top-[-50%] right-[-20%] w-[300px] h-[300px] bg-indigo-600/20 blur-[80px] rounded-full group-hover:bg-indigo-500/30 transition-colors duration-500"></div>

        {/* Card Content */}
        <div className="relative z-10 flex justify-between items-start">
           <div className="text-indigo-400 font-bold tracking-widest text-lg flex items-center gap-2">
              GODMODE <span className="text-[8px] bg-indigo-500/20 border border-indigo-500/50 rounded px-1 text-indigo-300">ULTRA</span>
           </div>
           <Wifi className="text-slate-400 rotate-90" size={24} />
        </div>

        <div className="relative z-10">
           <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-8 bg-amber-400/80 rounded-md flex items-center justify-center overflow-hidden relative shadow-lg">
                <div className="absolute w-8 h-8 rounded-full border border-black/20 left-[-5px]"></div>
                <div className="absolute w-8 h-8 rounded-full border border-black/20 right-[-5px]"></div>
              </div>
              <div className="flex gap-1">
                 <div className="w-1 h-2 bg-slate-600 rounded-full"></div>
                 <div className="w-1 h-2 bg-slate-600 rounded-full"></div>
                 <div className="w-1 h-2 bg-slate-600 rounded-full"></div>
              </div>
           </div>
           
           <div className="font-mono text-xl sm:text-2xl text-white tracking-[0.15em] drop-shadow-md mb-2">
              {showDetails ? "4980 1234 5678 9010" : "4980 •••• •••• 9010"}
           </div>
           
           <div className="flex justify-between items-end text-slate-300 font-mono text-sm">
              <div className="flex flex-col">
                 <span className="text-[8px] uppercase text-slate-500">Card Holder</span>
                 <span className="font-bold tracking-wider text-xs sm:text-sm">TK GLOBAL ADMIN</span>
              </div>
              <div className="flex gap-6">
                  <div className="flex flex-col">
                     <span className="text-[8px] uppercase text-slate-500">Expires</span>
                     <span className="font-bold">12/28</span>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[8px] uppercase text-slate-500">CVV</span>
                     <span className="font-bold">{showDetails ? "892" : "•••"}</span>
                  </div>
              </div>
           </div>
        </div>

        {isFrozen && (
           <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-all animate-in fade-in">
              <div className="flex items-center gap-2 text-red-500 font-bold border border-red-500/50 bg-red-950/80 px-6 py-3 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                 <Lock size={18} /> CARD FROZEN
              </div>
           </div>
        )}
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-2 gap-4">
         <button 
           onClick={() => setIsFrozen(!isFrozen)}
           className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all active:scale-95 duration-200 ${isFrozen ? 'bg-red-900/20 border-red-800 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'}`}
         >
            <ShieldAlert size={24} />
            <span className="text-xs font-bold">{isFrozen ? "UNFREEZE CARD" : "FREEZE CARD"}</span>
         </button>
         
         <button 
           onClick={() => setShowDetails(!showDetails)}
           className="p-4 rounded-2xl bg-slate-900 border border-slate-700 text-slate-300 flex flex-col items-center gap-2 hover:bg-slate-800 hover:border-slate-600 transition-all active:scale-95 duration-200"
         >
            {showDetails ? <EyeOff size={24} /> : <Eye size={24} />}
            <span className="text-xs font-bold">{showDetails ? "HIDE NUMBERS" : "SHOW NUMBERS"}</span>
         </button>
      </div>

      {/* Security Settings */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-8">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-4">
              <ShieldCheck size={16} /> Security Controls
          </h3>
          
          {/* 3D Secure Toggle */}
          <div className="flex items-center justify-between group">
              <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl transition-colors ${secure3D ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-500'}`}>
                      <Shield size={20} />
                  </div>
                  <div>
                      <div className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">3D Secure 2.0</div>
                      <div className="text-[10px] text-slate-500">Enhanced Auth Verification</div>
                  </div>
              </div>
              <button 
                onClick={() => toggleSetting(setSecure3D, secure3D)}
                className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${secure3D ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'bg-slate-700'}`}
              >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${secure3D ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
          </div>

          {/* Online Payment Toggle */}
          <div className="flex items-center justify-between group">
              <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl transition-colors duration-300 ${onlinePay ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'}`}>
                      {onlinePay ? <Globe size={20} /> : <ShieldAlert size={20} />}
                  </div>
                  <div>
                      <div className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">Online Payments</div>
                      <div className={`text-[10px] transition-colors duration-300 ${onlinePay ? 'text-slate-500' : 'text-red-400 font-bold flex items-center gap-1'}`}>
                          {onlinePay ? 'Global E-Commerce Enabled' : <><AlertTriangle size={10} /> BLOCKED (Security Mode)</>}
                      </div>
                  </div>
              </div>
              <button 
                onClick={() => toggleSetting(setOnlinePay, onlinePay)}
                className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${onlinePay ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]' : 'bg-red-900/50 border border-red-500/30'}`}
              >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${onlinePay ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
          </div>

          {/* Limit Slider */}
          <div className="bg-black/20 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between items-end mb-4">
                  <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-400 mb-1">Global Spending Limit</span>
                      <div className="flex items-center gap-2">
                          <span className={`font-mono font-bold text-lg transition-all ${limit >= 100 ? "text-amber-400 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]" : limit === 0 ? "text-red-400" : "text-indigo-400"}`}>
                              {limit >= 100 ? "∞ GODMODE" : limit === 0 ? "🚫 BLOCKED" : `¥ ${(limit * 100000).toLocaleString()}`}
                          </span>
                          {isSyncingLimit && <RefreshCw size={12} className="text-slate-500 animate-spin" />}
                      </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${limit === 100 ? 'bg-amber-900/20 border-amber-500/30 text-amber-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                      {limit === 100 ? 'MAXIMUM' : `${limit}%`}
                  </span>
              </div>
              
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={limit} 
                onChange={(e) => setLimit(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
              />
              
              <div className="flex justify-between mt-2 text-[9px] text-slate-600 font-mono uppercase">
                  <span>Block (¥0)</span>
                  <span>5M</span>
                  <span>UNLIMITED</span>
              </div>
              {limit > 80 && (
                  <div className="mt-3 flex items-center gap-2 text-[10px] text-amber-500 bg-amber-900/10 p-2 rounded">
                      <AlertTriangle size={12} />
                      <span>Warning: High limit enabled. Transactions over ¥50M will require biometric auth.</span>
                  </div>
              )}
          </div>
      </div>

      {/* Transactions */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
         <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase flex items-center gap-2">
                <Activity size={14} /> Recent Charges
            </h3>
            <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">View All</button>
         </div>
         <div className="space-y-1">
            <TransactionItem name="AWS Web Services" date="Today, 2:30 PM" amount="-$142.50" icon="☁️" />
            <TransactionItem name="Uber Technologies" date="Yesterday" amount="-$24.00" icon="🚗" />
            <TransactionItem name="Starbucks" date="Yesterday" amount="-$8.50" icon="☕" />
         </div>
      </div>
    </div>
  );
};

const TransactionItem: React.FC<{ name: string; date: string; amount: string; icon: string }> = ({ name, date, amount, icon }) => (
  <div className="flex items-center justify-between p-3 hover:bg-slate-800/50 rounded-xl transition-all cursor-pointer group">
     <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
           {icon}
        </div>
        <div>
           <div className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{name}</div>
           <div className="text-[10px] text-slate-500">{date}</div>
        </div>
     </div>
     <span className="text-sm font-mono text-slate-200 group-hover:text-white transition-colors font-bold">{amount}</span>
  </div>
);
