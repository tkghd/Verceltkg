
import React, { useState, useEffect } from 'react';
import { Fingerprint, Scan, ShieldCheck, ArrowRight, Activity, Command } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginProps> = ({ onLogin }) => {
  const [account, setAccount] = useState('1190212');
  const [isScanning, setIsScanning] = useState(false);
  const [status, setStatus] = useState('Secure Connection Est.');

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
    if (account) {
      handleBiometricAuth();
    }
  };

  const handleBiometricAuth = () => {
      setIsScanning(true);
      setStatus("Verifying Biometrics...");
      setTimeout(() => {
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
                Godmode Bank
            </h1>
            <p className="text-sm text-slate-400 font-mono tracking-widest uppercase">
                Ultimate Financial Core
            </p>
        </div>

        {/* Login Form Panel */}
        <div className="glass-panel rounded-3xl p-8 shadow-2xl relative overflow-hidden border border-white/10 backdrop-blur-xl">
            {/* Status Bar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] text-green-400 font-mono font-bold uppercase tracking-wider">{status}</span>
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
                    <p className="text-sm text-cyan-300 font-mono animate-pulse">AUTHENTICATING...</p>
                </div>
            ) : (
                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 ml-1 uppercase">Account ID</label>
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-xl opacity-0 group-hover:opacity-30 transition duration-500"></div>
                            <input 
                                className="relative w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-4 text-white placeholder-slate-600 outline-none focus:border-cyan-500/50 transition-all font-mono tracking-widest text-lg" 
                                placeholder="1190212" 
                                value={account}
                                onChange={(e) => setAccount(e.target.value)}
                                autoFocus
                            />
                            <ShieldCheck size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" />
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
                        <button type="button" onClick={handleBiometricAuth} className="p-3 rounded-full bg-slate-800/50 hover:bg-slate-700 border border-slate-700 text-cyan-400 transition-all hover:scale-110">
                            <Scan size={24} />
                        </button>
                        <span className="text-[10px] text-slate-500">BIOMETRIC</span>
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
