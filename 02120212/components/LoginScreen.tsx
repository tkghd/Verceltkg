
import React, { useState, useEffect } from 'react';
import { Fingerprint, Scan, ShieldCheck, ArrowRight, Activity, Command, Lock, AlertOctagon, Key } from 'lucide-react';
import { BankGateway } from '../services/BankGateway';

interface LoginProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginProps> = ({ onLogin }) => {
  const [account, setAccount] = useState('1190212');
  const [password, setPassword] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [status, setStatus] = useState('Secure Connection Est.');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate system startup sequence
    const sequence = [
        "Initializing ΩβαMAX Core...",
        "Syncing Global Nodes...",
        "Establishing Secure Tunnel...",
        "System Ready."
    ];
    let i = 0;
    const interval = setInterval(() => {
        if (i < sequence.length) {
            setStatus(sequence[i]);
            i++;
        }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // STRICT ID & PASSWORD GUARD
    if (account === '1190212' && password === '010612') {
        BankGateway.logAuth(true, account, "Biometric Challenge Started");
        handleBiometricAuth();
    } else {
        const msg = "ACCESS DENIED: INVALID CREDENTIALS";
        setError(msg);
        BankGateway.logAuth(false, account, "Invalid ID/PW Provided");
        
        // Shake effect or similar could be added here
        setStatus("SECURITY ALERT: UNAUTHORIZED");
    }
  };

  const handleBiometricAuth = () => {
      setIsScanning(true);
      setStatus("Verifying Biometrics...");
      setTimeout(() => {
          BankGateway.logAuth(true, account, "Session Token Granted");
          onLogin();
      }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full relative overflow-hidden bg-[#05050a] font-sans">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-slate-950 to-cyan-900/20 anim-gradient"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
      
      {/* Floating Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

      {/* Main Card */}
      <div className="w-full max-w-sm mx-4 relative z-10 anim-enter-bottom">
        
        {/* Header */}
        <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.4)] anim-float mb-6 relative group">
                <div className="absolute inset-0 bg-white/20 rounded-[2rem] animate-ping opacity-20"></div>
                <span className="text-4xl text-white drop-shadow-md">💠</span>
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-indigo-200 tracking-tight mb-2">
                TK Global Bank
            </h1>
            <p className="text-sm text-slate-400 font-mono tracking-widest uppercase flex items-center justify-center gap-2">
                <Lock size={12} className="text-amber-500" /> ID GUARD: ACTIVE
            </p>
        </div>

        {/* Login Form Panel */}
        <div className="glass-panel rounded-3xl p-8 shadow-2xl relative overflow-hidden border border-white/10 backdrop-blur-xl">
            {/* Status Bar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${error ? 'bg-red-500' : 'bg-green-500'}`}></div>
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${error ? 'text-red-400' : 'text-green-400'}`}>{status}</span>
                </div>
                <Activity size={14} className="text-slate-500" />
            </div>

            {isScanning ? (
                <div className="flex flex-col items-center justify-center py-8 space-y-6">
                    <div className="relative w-24 h-24">
                        <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-t-cyan-400 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Fingerprint size={48} className="text-cyan-400 animate-pulse" />
                        </div>
                    </div>
                    <p className="text-sm text-cyan-300 font-mono animate-pulse">AUTHENTICATING ID: {account}...</p>
                </div>
            ) : (
                <form onSubmit={handleLogin} className="space-y-5">
                    {error && (
                        <div className="bg-red-900/20 border border-red-500/50 p-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                            <AlertOctagon size={20} className="text-red-500" />
                            <div className="text-xs text-red-200 font-bold">{error}</div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-xs font-bold text-slate-400 ml-1 uppercase">Account ID</label>
                            <span className="text-[10px] text-amber-500 bg-amber-900/20 px-2 py-0.5 rounded border border-amber-500/30">1190212</span>
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-xl opacity-0 group-hover:opacity-30 transition duration-500"></div>
                            <input 
                                className={`relative w-full bg-slate-950/80 border rounded-xl px-4 py-4 text-white placeholder-slate-600 outline-none transition-all font-mono tracking-widest text-lg ${error ? 'border-red-500/50 focus:border-red-500' : 'border-slate-700 focus:border-cyan-500/50'}`}
                                placeholder="ENTER ID" 
                                value={account}
                                onChange={(e) => setAccount(e.target.value)}
                                autoFocus
                            />
                            <ShieldCheck size={20} className={`absolute right-4 top-1/2 -translate-y-1/2 ${error ? 'text-red-500' : 'text-slate-600'}`} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-xs font-bold text-slate-400 ml-1 uppercase">Password</label>
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-xl opacity-0 group-hover:opacity-30 transition duration-500"></div>
                            <input 
                                type="password"
                                className={`relative w-full bg-slate-950/80 border rounded-xl px-4 py-4 text-white placeholder-slate-600 outline-none transition-all font-mono tracking-widest text-lg ${error ? 'border-red-500/50 focus:border-red-500' : 'border-slate-700 focus:border-cyan-500/50'}`}
                                placeholder="••••••" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Key size={20} className={`absolute right-4 top-1/2 -translate-y-1/2 ${error ? 'text-red-500' : 'text-slate-600'}`} />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
                    >
                        <span>Access Vault</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="pt-4 flex items-center justify-center gap-4">
                        <button type="button" className="p-3 rounded-full bg-slate-800/50 hover:bg-slate-700 border border-slate-700 text-cyan-400 transition-all hover:scale-110 opacity-50 cursor-not-allowed" title="Keycard Disabled">
                            <Scan size={24} />
                        </button>
                        <span className="text-[10px] text-slate-500">MANUAL ENTRY ONLY</span>
                    </div>
                </form>
            )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
            <p className="text-[10px] text-slate-600 font-mono">
                SECURE ENCLAVE ACTIVE • <span className="text-slate-500">V 2.0.5 PROD</span>
            </p>
        </div>
      </div>
    </div>
  );
};
