
import React, { useState } from 'react';
import { CreditCard, Lock, Eye, EyeOff, ShieldAlert, Wifi, Copy, Globe, ShieldCheck, Zap, Shield } from 'lucide-react';

export const CardView: React.FC = () => {
  const [isFrozen, setIsFrozen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [secure3D, setSecure3D] = useState(true);
  const [onlinePay, setOnlinePay] = useState(true);
  const [limit, setLimit] = useState(100); // 0-100 scale for slider

  const toggleSetting = (setter: React.Dispatch<React.SetStateAction<boolean>>, value: boolean, label: string) => {
      setter(!value);
      // Simulate blast event (visual only here, or log)
      console.log(`Setting ${label} changed to ${!value}`);
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <CreditCard className="text-indigo-500" /> Virtual Card Control
      </h2>

      {/* Card Visual */}
      <div className={`relative w-full aspect-[1.586/1] rounded-2xl p-6 flex flex-col justify-between transition-all duration-500 overflow-hidden shadow-2xl ${isFrozen ? 'grayscale opacity-75' : ''}`}>
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-black z-0"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 z-0"></div>
        <div className="absolute top-[-50%] right-[-20%] w-[300px] h-[300px] bg-indigo-500/20 blur-[80px] rounded-full"></div>

        {/* Card Content */}
        <div className="relative z-10 flex justify-between items-start">
           <div className="text-indigo-400 font-bold tracking-widest text-lg">GODMODE</div>
           <Wifi className="text-slate-400 rotate-90" size={24} />
        </div>

        <div className="relative z-10">
           <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-8 bg-amber-400/80 rounded-md flex items-center justify-center overflow-hidden relative">
                <div className="absolute w-8 h-8 rounded-full border border-black/20 left-[-5px]"></div>
                <div className="absolute w-8 h-8 rounded-full border border-black/20 right-[-5px]"></div>
              </div>
           </div>
           
           <div className="font-mono text-xl sm:text-2xl text-white tracking-[0.15em] drop-shadow-md mb-2">
              {showDetails ? "4980 1234 5678 9010" : "4980 •••• •••• 9010"}
           </div>
           
           <div className="flex justify-between items-end text-slate-300 font-mono text-sm">
              <div className="flex flex-col">
                 <span className="text-[8px] uppercase text-slate-500">Card Holder</span>
                 <span className="font-bold tracking-wider">TK GLOBAL ADMIN</span>
              </div>
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

        {isFrozen && (
           <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-red-500 font-bold border border-red-500/50 bg-red-950/80 px-4 py-2 rounded-full">
                 <Lock size={16} /> CARD FROZEN
              </div>
           </div>
        )}
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-2 gap-4">
         <button 
           onClick={() => setIsFrozen(!isFrozen)}
           className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${isFrozen ? 'bg-red-900/20 border-red-800 text-red-400' : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'}`}
         >
            <ShieldAlert size={24} />
            <span className="text-xs font-bold">{isFrozen ? "UNFREEZE" : "FREEZE CARD"}</span>
         </button>
         
         <button 
           onClick={() => setShowDetails(!showDetails)}
           className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 flex flex-col items-center gap-2 hover:bg-slate-800 transition-all"
         >
            {showDetails ? <EyeOff size={24} /> : <Eye size={24} />}
            <span className="text-xs font-bold">{showDetails ? "HIDE NUMBERS" : "SHOW NUMBERS"}</span>
         </button>
      </div>

      {/* Security Settings */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 space-y-6">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck size={16} /> Security Controls
          </h3>
          
          {/* 3D Secure Toggle */}
          <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${secure3D ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-500'}`}>
                      <Shield size={20} />
                  </div>
                  <div>
                      <div className="text-sm font-bold text-white">3D Secure 2.0</div>
                      <div className="text-[10px] text-slate-500">Enhanced Auth Verification</div>
                  </div>
              </div>
              <button 
                onClick={() => toggleSetting(setSecure3D, secure3D, "3DSecure")}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${secure3D ? 'bg-green-500' : 'bg-slate-700'}`}
              >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${secure3D ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
          </div>

          {/* Online Payment Toggle */}
          <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg transition-colors ${onlinePay ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'}`}>
                      {onlinePay ? <Globe size={20} /> : <ShieldAlert size={20} />}
                  </div>
                  <div>
                      <div className="text-sm font-bold text-white">Online Payments</div>
                      <div className={`text-[10px] ${onlinePay ? 'text-slate-500' : 'text-red-400 font-bold'}`}>
                          {onlinePay ? 'Global E-Commerce Enabled' : 'BLOCKED (Security Mode)'}
                      </div>
                  </div>
              </div>
              <button 
                onClick={() => toggleSetting(setOnlinePay, onlinePay, "OnlinePay")}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${onlinePay ? 'bg-blue-500' : 'bg-slate-700 border border-slate-600'}`}
              >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${onlinePay ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
          </div>

          {/* Limit Slider */}
          <div>
              <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold text-slate-400">Spending Limit</span>
                  <span className={`font-mono font-bold transition-all ${limit >= 100 ? "text-amber-400" : limit === 0 ? "text-red-400" : "text-indigo-400"}`}>
                      {limit >= 100 ? "∞ (GODMODE)" : limit === 0 ? "🚫 BLOCKED" : `¥ ${(limit * 100000).toLocaleString()}`}
                  </span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={limit} 
                onChange={(e) => setLimit(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between mt-1 text-[10px] text-slate-600">
                  <span>Block (¥0)</span>
                  <span>UNLIMITED</span>
              </div>
          </div>
      </div>

      {/* Transactions */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
         <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase">Recent Charges</h3>
            <button className="text-xs text-indigo-500">View All</button>
         </div>
         <div className="space-y-3">
            <TransactionItem name="AWS Web Services" date="Today, 2:30 PM" amount="-$142.50" icon="☁️" />
            <TransactionItem name="Uber Technologies" date="Yesterday" amount="-$24.00" icon="🚗" />
            <TransactionItem name="Starbucks" date="Yesterday" amount="-$8.50" icon="☕" />
         </div>
      </div>
    </div>
  );
};

const TransactionItem: React.FC<{ name: string; date: string; amount: string; icon: string }> = ({ name, date, amount, icon }) => (
  <div className="flex items-center justify-between p-2 hover:bg-slate-800/50 rounded transition-colors">
     <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
           {icon}
        </div>
        <div>
           <div className="text-sm font-bold text-slate-200">{name}</div>
           <div className="text-[10px] text-slate-500">{date}</div>
        </div>
     </div>
     <span className="text-sm font-mono text-slate-200">{amount}</span>
  </div>
);
