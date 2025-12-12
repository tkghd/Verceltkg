
import React, { useState, useEffect, useRef } from 'react';
import { QrCode, Copy, CheckCircle, Camera, Receipt, ArrowRight, ShieldCheck, AlertTriangle, Calculator, RefreshCw, X, Banknote, Timer, MapPin, Smartphone } from 'lucide-react';
import { WalletState } from '../types';

interface ATMViewProps {
  wallet: WalletState;
}

type Mode = 'scan' | 'withdraw';
type ScanStep = 'camera' | 'manual' | 'processing' | 'success';
type WithdrawStep = 'input' | 'qr_display';

interface TransactionData {
  id: string;
  recipient: string;
  location: string;
  amount: string;
  fee: string;
  timestamp: string;
}

export const ATMView: React.FC<ATMViewProps> = ({ wallet }) => {
  const [mode, setMode] = useState<Mode>('scan');
  
  // Scan Mode State
  const [scanStep, setScanStep] = useState<ScanStep>('camera');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [txData, setTxData] = useState<TransactionData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [manualCode, setManualCode] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Withdraw Mode State
  const [withdrawStep, setWithdrawStep] = useState<WithdrawStep>('input');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [qrTimer, setQrTimer] = useState<number>(60);
  const [qrEncryptionKey, setQrEncryptionKey] = useState<string>('');

  // Camera Management
  const startCamera = async () => {
    setErrorMsg("");
    setHasPermission(null);

    const isSecure = typeof window !== 'undefined' && (
      window.isSecureContext || 
      window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1'
    );

    if (!isSecure) {
      setHasPermission(false);
      setErrorMsg("HTTPS connection required for biometric scan.");
      return;
    }

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        
        streamRef.current = stream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(e => {
              console.error("Video play failed", e);
              setErrorMsg("Video stream initialized but failed to render.");
          });
        }
        setHasPermission(true);
      } else {
        setHasPermission(false);
        setErrorMsg("Camera hardware not detected.");
      }
    } catch (err: any) {
      console.warn("Camera access error:", err);
      setHasPermission(false);
      setErrorMsg(err.message || "Access denied by system policy.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  useEffect(() => {
    if (mode === 'scan' && scanStep === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [mode, scanStep]);

  // QR Timer Logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (mode === 'withdraw' && withdrawStep === 'qr_display' && qrTimer > 0) {
      interval = setInterval(() => {
        setQrTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [mode, withdrawStep, qrTimer]);

  // Actions
  const handleProcessTransaction = () => {
    setScanStep('processing');
    
    // Simulate Rust Core Processing (Super Fast)
    setTimeout(() => {
      setTxData({
        id: `TX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        recipient: 'Global Vault ATM #229',
        location: 'Tokyo, Minato-ku',
        amount: '¥ 50,000',
        fee: '¥ 0',
        timestamp: new Date().toLocaleString()
      });
      setScanStep('success');
    }, 800); // Fast processing
  };

  const resetScan = () => {
    setScanStep('camera');
    setTxData(null);
    setManualCode("");
    setErrorMsg("");
  };

  const generateWithdrawQR = () => {
    if (!withdrawAmount) return;
    setQrEncryptionKey(`KYBER-${Math.random().toString(36).substr(2, 16).toUpperCase()}`);
    setQrTimer(60);
    setWithdrawStep('qr_display');
  };

  // --- RENDER: Success Receipt ---
  if (scanStep === 'success' && txData) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-4 anim-enter-bottom">
         <div className="w-full max-w-sm bg-slate-950 border border-green-500/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(34,197,94,0.1)] relative overflow-hidden">
           {/* Success Header */}
           <div className="flex flex-col items-center mb-8">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-4 ring-2 ring-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.4)] animate-pulse">
                 <CheckCircle size={40} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-wide">Deposit Confirmed</h2>
              <div className="flex items-center gap-2 mt-2">
                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                 <p className="text-xs text-green-400 font-mono">BLOCKCHAIN SYNCED</p>
              </div>
           </div>

           {/* Receipt Card */}
           <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4 font-mono text-sm relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-slate-950 rounded-full border border-slate-800"></div>
              
              <div className="flex justify-between items-center pb-3 border-b border-dashed border-slate-700">
                 <span className="text-slate-500">Transaction ID</span>
                 <span className="text-indigo-400 font-bold">{txData.id}</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-slate-500">Destination</span>
                 <span className="text-white text-xs">{txData.recipient}</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-slate-500">Amount</span>
                 <span className="text-2xl font-bold text-white tracking-tighter">{txData.amount}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                 <span className="text-slate-500">Fee</span>
                 <span className="text-green-400 bg-green-900/20 px-2 py-0.5 rounded">WAIVED</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-slate-800 text-[10px] text-slate-500">
                 <span>{txData.timestamp}</span>
                 <span className="flex items-center gap-1 text-indigo-500"><ShieldCheck size={12} /> ΩMAX Verified</span>
              </div>
           </div>

           {/* Actions */}
           <div className="mt-8 space-y-3">
              <button 
                onClick={resetScan}
                className="w-full py-4 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                 <ArrowRight size={20} /> Perform Another Action
              </button>
              <button className="w-full py-4 bg-slate-900 text-slate-400 font-bold rounded-xl hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center gap-2 border border-slate-800">
                 <Receipt size={20} /> Save Digital Receipt
              </button>
           </div>
        </div>
      </div>
    );
  }

  // --- RENDER: Processing State ---
  if (scanStep === 'processing') {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="relative">
            <div className="w-24 h-24 border-4 border-slate-800 border-t-indigo-500 rounded-full animate-spin"></div>
            <div className="w-16 h-16 border-4 border-slate-800 border-b-purple-500 rounded-full animate-spin absolute top-4 left-4 direction-reverse"></div>
        </div>
        <div className="font-mono text-indigo-400 animate-pulse mt-8 text-lg font-bold">PROCESSING TRANSACTION</div>
        <div className="text-xs text-slate-500 mt-2 font-mono">Syncing with Global Vault (Rust Core)</div>
      </div>
    );
  }

  // --- RENDER: Manual Input State ---
  if (scanStep === 'manual') {
      return (
          <div className="h-full p-6 anim-enter-bottom">
              <div className="max-w-md mx-auto">
                  <button onClick={() => setScanStep('camera')} className="mb-6 text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
                      <X size={20} /> Cancel
                  </button>
                  <h2 className="text-2xl font-bold text-white mb-2">Manual Entry</h2>
                  <p className="text-sm text-slate-400 mb-8">Enter the 8-digit token ID from the ATM screen.</p>

                  <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-8">
                      <input 
                        type="text" 
                        value={manualCode}
                        readOnly
                        className="w-full bg-black/50 border border-slate-800 rounded-xl p-4 text-center text-3xl font-mono text-white tracking-[0.5em] focus:outline-none"
                        placeholder="_ _ _ _"
                      />
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, 'GO'].map((key) => (
                          <button
                            key={key}
                            onClick={() => {
                                if (key === 'C') setManualCode("");
                                else if (key === 'GO') { if (manualCode.length > 0) handleProcessTransaction(); }
                                else if (manualCode.length < 8) setManualCode(prev => prev + key);
                            }}
                            className={`h-16 rounded-xl font-bold text-xl flex items-center justify-center transition-all active:scale-95 ${
                                key === 'GO' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 
                                key === 'C' ? 'bg-red-900/20 text-red-400 border border-red-900/50' : 
                                'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
                            }`}
                          >
                              {key}
                          </button>
                      ))}
                  </div>
              </div>
          </div>
      );
  }

  // --- RENDER: Main Interface ---
  return (
    <div className="h-full flex flex-col space-y-4 anim-enter-right">
      {/* Mode Switcher */}
      <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 shrink-0 shadow-lg">
        <button 
          onClick={() => setMode('scan')}
          className={`flex-1 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${mode === 'scan' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <Camera size={18} /> SCAN
        </button>
        <button 
          onClick={() => { setMode('withdraw'); setWithdrawStep('input'); }}
          className={`flex-1 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${mode === 'withdraw' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <Banknote size={18} /> ATM CASH OUT
        </button>
      </div>

      <div className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden relative shadow-2xl">
         {mode === 'scan' ? (
             <>
                {/* Camera View */}
                {hasPermission === true && (
                   <div className="w-full h-full relative">
                      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                      
                      {/* Godmode Overlay */}
                      <div className="absolute inset-0 border-[2px] border-indigo-500/10 z-10 pointer-events-none"></div>
                      
                      {/* Scanning Reticle */}
                      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                         <div className="w-72 h-72 border-2 border-indigo-500/30 rounded-3xl relative overflow-hidden backdrop-blur-[2px]">
                            {/* Corners */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-indigo-400 rounded-tl-lg"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-indigo-400 rounded-tr-lg"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-indigo-400 rounded-bl-lg"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-indigo-400 rounded-br-lg"></div>
                            
                            {/* Scanning Laser */}
                            <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent shadow-[0_0_20px_#6366f1] anim-scanline"></div>
                            
                            <div className="absolute bottom-4 w-full text-center">
                                <span className="bg-black/60 text-indigo-400 text-[10px] font-mono px-3 py-1 rounded-full border border-indigo-500/30 backdrop-blur-md">
                                    SEARCHING FOR TOKEN...
                                </span>
                            </div>
                         </div>
                      </div>

                      {/* Manual Trigger */}
                      <div className="absolute bottom-10 w-full flex justify-center z-30 pointer-events-none">
                         <div className="flex gap-4 pointer-events-auto">
                            <button onClick={handleProcessTransaction} className="bg-indigo-500/20 hover:bg-indigo-500/40 text-indigo-400 border border-indigo-500/50 p-4 rounded-full backdrop-blur-md transition-all active:scale-95">
                                <div className="w-12 h-12 bg-indigo-500 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.6)]"></div>
                            </button>
                         </div>
                      </div>
                      
                      {/* Manual Entry Link */}
                      <button 
                        onClick={() => setScanStep('manual')}
                        className="absolute top-6 right-6 z-30 bg-black/60 text-white p-3 rounded-full border border-white/10 hover:bg-slate-800 transition-colors"
                      >
                         <Calculator size={20} />
                      </button>
                   </div>
                )}
                
                {/* Error State */}
                {hasPermission === false && (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#080810]">
                        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 ring-1 ring-red-500/30">
                           <AlertTriangle size={32} className="text-red-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Scanner Unavailable</h3>
                        <p className="text-sm text-slate-400 mb-8 max-w-xs mx-auto leading-relaxed">
                           {errorMsg}
                        </p>
                        <div className="flex flex-col gap-3 w-full max-w-xs">
                            <button 
                               onClick={() => setScanStep('manual')}
                               className="w-full py-4 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                            >
                               <Calculator size={18} /> Enter Code Manually
                            </button>
                            <button 
                               onClick={startCamera}
                               className="w-full py-4 bg-slate-900 border border-slate-800 text-slate-300 font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                            >
                               <RefreshCw size={18} /> Retry Camera
                            </button>
                        </div>
                    </div>
                )}

                {/* Initial Loading */}
                {hasPermission === null && (
                   <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950">
                      <div className="w-16 h-16 border-4 border-slate-800 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                      <div className="text-xs text-slate-500 font-mono animate-pulse">INITIALIZING OPTICS...</div>
                   </div>
                )}
             </>
         ) : (
             <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#080812] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                
                {withdrawStep === 'input' ? (
                    <div className="w-full max-w-xs z-10 space-y-6">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-white mb-2">Cardless Withdrawal</h3>
                            <p className="text-slate-400 text-xs">Enter amount to generate secure QR</p>
                        </div>
                        
                        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative">
                            <label className="text-[10px] uppercase font-bold text-slate-500 mb-2 block">Amount (JPY)</label>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-2xl text-slate-400">¥</span>
                                <input 
                                    type="number" 
                                    value={withdrawAmount}
                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                    placeholder="0"
                                    className="w-full bg-transparent text-3xl font-mono font-bold text-white focus:outline-none placeholder-slate-700"
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {[10000, 30000, 50000].map(amt => (
                                    <button 
                                        key={amt}
                                        onClick={() => setWithdrawAmount(amt.toString())}
                                        className="py-2 bg-slate-800 rounded-lg text-xs font-bold text-slate-300 hover:bg-slate-700 transition-colors"
                                    >
                                        ¥{amt/1000}k
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button 
                            onClick={generateWithdrawQR}
                            disabled={!withdrawAmount || parseInt(withdrawAmount) <= 0}
                            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <QrCode size={18} /> Generate Secure QR
                        </button>
                    </div>
                ) : (
                    <div className="w-full max-w-sm z-10 flex flex-col items-center animate-in zoom-in-95">
                        <div className="bg-white p-6 rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.1)] mb-6 relative group">
                            {qrTimer > 0 ? (
                                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${qrEncryptionKey}`} alt="Secure QR" className="w-56 h-56 mix-blend-multiply" />
                            ) : (
                                <div className="w-56 h-56 bg-slate-100 flex flex-col items-center justify-center text-slate-400">
                                    <AlertTriangle size={48} className="mb-2 opacity-50" />
                                    <span className="text-xs font-bold">QR EXPIRED</span>
                                </div>
                            )}
                            
                            {/* Scanning Line Animation */}
                            {qrTimer > 0 && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent h-4 w-full animate-scanline pointer-events-none rounded-3xl"></div>}
                        </div>

                        <div className="w-full bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-4 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-400">Expires in</span>
                                <div className={`flex items-center gap-2 font-mono font-bold ${qrTimer < 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                                    <Timer size={14} /> 00:{qrTimer.toString().padStart(2, '0')}
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-500">
                                <div className="bg-slate-800/50 p-2 rounded flex items-center gap-2">
                                    <ShieldCheck size={10} className="text-green-500" /> KYBER-1024
                                </div>
                                <div className="bg-slate-800/50 p-2 rounded flex items-center gap-2">
                                    <Smartphone size={10} className="text-indigo-500" /> TEE AUTH
                                </div>
                                <div className="bg-slate-800/50 p-2 rounded flex items-center gap-2 col-span-2">
                                    <MapPin size={10} className="text-amber-500" /> GeoHash: tk7-35.68-139.76
                                </div>
                            </div>

                            {qrTimer === 0 ? (
                                <button 
                                    onClick={generateWithdrawQR}
                                    className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                                >
                                    <RefreshCw size={14} /> Regenerate QR
                                </button>
                            ) : (
                                <button 
                                    onClick={() => setWithdrawStep('input')}
                                    className="w-full py-3 border border-slate-700 text-slate-400 text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                )}
             </div>
         )}
      </div>
    </div>
  );
};
