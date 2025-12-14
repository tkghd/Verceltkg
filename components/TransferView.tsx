
import React, { useState, useEffect } from 'react';
import { Send, Building2, Search, ChevronRight, AlertCircle, ArrowRight, CheckCircle2, ChevronDown, RefreshCw, Wallet, ArrowLeft, CreditCard, History, User, Pencil, Landmark, ShieldCheck, Smartphone, Zap, Mail, QrCode, FileText, Fingerprint, Lock, Shield, Scan, Bot, Sparkles, Siren, Mic, Network, Server, Globe, Wifi } from 'lucide-react';
import { WalletState, OwnerAccount } from '../types';

interface TransferViewProps {
  wallet: WalletState;
  ownerAccounts: OwnerAccount[];
  apiBase: string; // Add API base prop
}

type TransferStep = 'method_select' | 'bank_select' | 'account_input' | 'amount_input' | 'confirm' | 'processing_auth' | 'complete';
type TransferMethod = 'bank' | 'paypay' | 'cotra';

const MAJOR_BANKS = [
  { id: 'sbi', name: '住信SBIネット銀行', short: '住信SBI', color: 'bg-[#13284c]' },
  { id: 'minna', name: 'みんな銀行', short: 'みんな', color: 'bg-black border border-white/20' },
  { id: 'smbc', name: '三井住友銀行', short: 'SMBC', color: 'bg-[#679a05]' },
  { id: 'sony', name: 'ソニー銀行', short: 'Sony', color: 'bg-[#fa5686]' },
  { id: 'rakuten', name: '楽天銀行', short: '楽天', color: 'bg-[#bf0000]' },
  { id: 'mufg', name: '三菱UFJ銀行', short: '三菱UFJ', color: 'bg-[#d7000f]' },
  { id: 'mizuho', name: 'みずほ銀行', short: 'みずほ', color: 'bg-[#00287d]' },
  { id: 'jp', name: 'ゆうちょ銀行', short: 'ゆうちょ', color: 'bg-[#007b43]' },
  { id: 'paypay_bank', name: 'PayPay銀行', short: 'PayPay', color: 'bg-[#ff0033]' },
  { id: 'seven', name: 'セブン銀行', short: 'セブン', color: 'bg-[#009b4d]' },
  { id: 'jibun', name: 'auじぶん銀行', short: 'じぶん', color: 'bg-[#f39800]' },
  { id: 'gmo', name: 'GMOあおぞら', short: 'GMO', color: 'bg-[#00A1E9]' },
  { id: 'resona', name: 'りそな銀行', short: 'りそな', color: 'bg-[#008d4c]' },
  { id: 'aeon', name: 'イオン銀行', short: 'イオン', color: 'bg-[#ae0062]' },
  { id: 'shinsei', name: 'SBI新生銀行', short: 'SBI新生', color: 'bg-[#006090]' },
  { id: 'yokohama', name: '横浜銀行', short: '横浜', color: 'bg-[#003f8e]' },
  { id: 'chiba', name: '千葉銀行', short: '千葉', color: 'bg-[#d9000d]' },
];

export const TransferView: React.FC<TransferViewProps> = ({ wallet, ownerAccounts, apiBase }) => {
  const [step, setStep] = useState<TransferStep>('method_select');
  const [method, setMethod] = useState<TransferMethod>('bank');
  const [selectedSource, setSelectedSource] = useState<OwnerAccount>(ownerAccounts[0]);
  const [selectedBank, setSelectedBank] = useState<any>(null);
  
  // Account Details (Bank)
  const [isManualBank, setIsManualBank] = useState(false);
  const [manualBankName, setManualBankName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [accountType, setAccountType] = useState<'普通' | '当座' | '貯蓄'>('普通');
  const [accountNumber, setAccountNumber] = useState('');

  // Account Details (PayPay/Cotra)
  const [recipientId, setRecipientId] = useState(''); // Phone, ID, or Email
  const [recipientType, setRecipientType] = useState<'phone' | 'id' | 'email'>('phone');
  
  // Amount & Sender
  const [amount, setAmount] = useState('');
  const [senderName, setSenderName] = useState(selectedSource.accountName);
  const [isEditingSender, setIsEditingSender] = useState(false);
  
  // Process
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [txId, setTxId] = useState('');

  // Emergency Mode State
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [voiceListening, setVoiceListening] = useState(false);
  const [emergencyTarget, setEmergencyTarget] = useState('');

  // Update sender name default when source changes
  useEffect(() => {
    setSenderName(selectedSource.accountName);
  }, [selectedSource]);

  const handleMethodSelect = (m: TransferMethod) => {
      setMethod(m);
      if (m === 'bank') {
          setStep('bank_select');
      } else {
          setStep('account_input');
      }
  };

  const handleNext = () => {
    if (step === 'bank_select') {
        if (selectedBank || isManualBank) setStep('account_input');
    }
    else if (step === 'account_input') {
        if (method === 'bank') {
            const validBank = isManualBank ? manualBankName.length > 0 : true;
            if (validBank && branchName && accountNumber.length >= 1) setStep('amount_input');
        } 
        else if ((method === 'paypay' || method === 'cotra') && recipientId.length > 3) setStep('amount_input');
    }
    else if (step === 'amount_input' && amount) setStep('confirm');
  };

  const handleBack = () => {
    if (step === 'bank_select') setStep('method_select');
    else if (step === 'account_input') {
        if (method === 'bank') setStep('bank_select');
        else setStep('method_select');
    }
    else if (step === 'amount_input') setStep('account_input');
    else if (step === 'confirm') setStep('amount_input');
    else if (step === 'complete') {
        resetForm();
    }
  };

  const resetForm = () => {
    setStep('method_select');
    setMethod('bank');
    setAmount('');
    setAccountNumber('');
    setBranchName('');
    setManualBankName('');
    setIsManualBank(false);
    setRecipientId('');
    setSelectedBank(null);
    setTxId('');
  };

  const handleTransfer = async () => {
    setStep('processing_auth');
    setIsProcessing(true);
    
    setProcessingStage('Handshaking with API...');
    
    try {
        const response = await fetch(`${apiBase}/api/transfer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                from: selectedSource.id,
                to: method === 'bank' ? (selectedBank?.name || manualBankName) : recipientId,
                amount: parseInt(amount),
                currency: 'JPY'
            })
        });

        const data = await response.json();

        setProcessingStage('Finalizing Instant Settlement...');
        await new Promise(resolve => setTimeout(resolve, 600));

        if (response.ok) {
            setTxId(data.txId);
            setIsProcessing(false);
            setStep('complete');
        } else {
            alert("Transaction Failed: " + data.error);
            setStep('confirm');
            setIsProcessing(false);
        }
    } catch (err) {
        console.error("Transfer Error", err);
        setProcessingStage('Error connecting to Core...');
        setTimeout(() => {
             setIsProcessing(false);
             setStep('confirm');
        }, 1000);
    }
  };

  const autoFillBank = () => {
      setBranchName('本店営業部 (001)');
      setAccountNumber('1234567');
      if (isManualBank) setManualBankName('Simulated Bank Ltd.');
  };

  const handleEmergencyVoiceAuth = () => {
      setVoiceListening(true);
      setTimeout(() => {
          setVoiceListening(false);
          setShowVoiceModal(false);
          setMethod('bank');
          setSelectedBank(MAJOR_BANKS.find(b => emergencyTarget.includes('Mizuho') ? b.id === 'mizuho' : b.id === 'yokohama'));
          setBranchName('Emergency Branch');
          setAccountNumber('9999999');
          setAmount(emergencyTarget.includes('Mizuho') ? '1000000' : '500000');
          setStep('confirm');
      }, 2000);
  };

  // --- Render Header ---
  const renderHeader = (title: string) => (
    <div className="flex items-center gap-4 mb-4 pt-2 sticky top-0 bg-[#05050a]/95 z-20 py-4 border-b border-white/5 backdrop-blur-md">
      {step !== 'method_select' && step !== 'complete' && step !== 'processing_auth' && (
        <button onClick={handleBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors text-slate-300 hover:text-white">
          <ArrowLeft size={20} />
        </button>
      )}
      <div className="flex-1">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            {step === 'complete' ? <CheckCircle2 size={24} className="text-green-500" /> : <Landmark size={20} className="text-indigo-500" />}
            {title}
          </h2>
          {step !== 'complete' && step !== 'method_select' && step !== 'processing_auth' && (
              <div className="flex items-center gap-1 mt-1">
                  {[1,2,3,4].map(i => {
                      const current = step === 'bank_select' ? 1 : step === 'account_input' ? 2 : step === 'amount_input' ? 3 : 4;
                      return (
                          <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= current ? 'bg-cyan-500' : 'bg-slate-800'}`}></div>
                      )
                  })}
              </div>
          )}
      </div>
    </div>
  );

  // --- STEP: Processing Auth (3-Factor) ---
  if (step === 'processing_auth') {
      return (
        <div className="h-full flex flex-col items-center justify-center p-8 animate-in zoom-in-95 duration-300">
            <div className="relative mb-12">
                <div className="w-32 h-32 rounded-full border-4 border-slate-800 border-t-indigo-500 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <ShieldCheck size={48} className="text-indigo-500 animate-pulse" />
                </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">AUTHENTICATING</h3>
            <p className="text-indigo-400 font-mono mb-8">{processingStage}</p>

            <div className="w-full max-w-sm space-y-4">
                <div className="flex items-center gap-4 text-slate-400 anim-enter-right anim-delay-100">
                    <div className="w-8 h-8 rounded-full bg-indigo-900/30 flex items-center justify-center border border-indigo-500/50">
                        <Fingerprint size={16} className="text-indigo-400" />
                    </div>
                    <span className="text-sm">Biometric Scan</span>
                    <div className="ml-auto text-green-500 text-xs font-bold">VERIFIED</div>
                </div>
                <div className="flex items-center gap-4 text-slate-400 anim-enter-right anim-delay-200">
                    <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center border border-purple-500/50">
                        <Lock size={16} className="text-purple-400" />
                    </div>
                    <span className="text-sm">Secure Enclave PIN</span>
                    <div className="ml-auto text-green-500 text-xs font-bold">VERIFIED</div>
                </div>
                <div className="flex items-center gap-4 text-slate-400 anim-enter-right anim-delay-300">
                    <div className="w-8 h-8 rounded-full bg-amber-900/30 flex items-center justify-center border border-amber-500/50">
                        <Server size={16} className="text-amber-400" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm">Gateway Response</span>
                        <span className="text-[10px] text-slate-500 font-mono">200 OK (0.02s)</span>
                    </div>
                    <div className="ml-auto text-green-500 text-xs font-bold">PASSED</div>
                </div>
            </div>
        </div>
      );
  }

  // --- STEP 1: Method Selection ---
  if (step === 'method_select') {
    return (
      <div className="anim-enter-right max-w-3xl mx-auto pb-20 relative">
        {/* Gateway Status Bar */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-4 border-b border-slate-800">
            <GatewayStatus label="Zengin" status="online" ping="4ms" />
            <GatewayStatus label="PayPay API" status="online" ping="12ms" />
            <GatewayStatus label="Cotra Hub" status="online" ping="8ms" />
            <GatewayStatus label="SWIFT gpi" status="online" ping="140ms" />
        </div>

        {renderHeader('送金方法の選択')}
        
        {/* Source Selector */}
        <div className="mb-8 bg-[#0f0f18] border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
            <div className="absolute right-4 top-4">
                <span className="flex items-center gap-1 text-[10px] text-green-400 bg-green-900/20 px-2 py-0.5 rounded border border-green-500/30">
                    <Wifi size={10} /> API LINKED
                </span>
            </div>
            <label className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-2 uppercase tracking-wider">
               <Wallet size={14} className="text-indigo-500" /> 出金口座 (Source)
            </label>
            <div className="relative group">
                <select 
                    className="w-full bg-[#1a1a24] border border-slate-700 rounded-xl py-4 px-4 pr-10 text-white appearance-none focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all cursor-pointer hover:bg-[#20202e]"
                    value={selectedSource.id}
                    onChange={(e) => setSelectedSource(ownerAccounts.find(a => a.id === e.target.value) || ownerAccounts[0])}
                >
                    {ownerAccounts.map(acc => (
                        <option key={acc.id} value={acc.id}>
                            {acc.bankName} {acc.branchName} — {acc.currency === 'JPY' ? '¥' : '$'}{acc.balance}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-indigo-400 transition-colors" size={20} />
            </div>
            <div className="mt-3 flex justify-between px-1 items-center">
               <span className="text-[10px] text-slate-500 font-mono">AVAILABLE BALANCE</span>
               <span className="text-sm font-mono font-bold text-indigo-400 tracking-wide">¥ {selectedSource.balance}</span>
            </div>
        </div>

        <div className="space-y-4">
           {/* Emergency Access */}
           <div className="bg-red-950/20 border border-red-500/30 rounded-[2rem] p-6 animate-pulse-slow">
               <h3 className="text-red-400 font-bold flex items-center gap-2 mb-4 uppercase tracking-wider text-xs">
                   <Siren size={16} /> Emergency Quick Send
               </h3>
               <div className="grid grid-cols-2 gap-3">
                   <button 
                     onClick={() => { setEmergencyTarget('Parents (Mizuho)'); setShowVoiceModal(true); }}
                     className="bg-red-900/30 border border-red-500/30 hover:bg-red-900/50 p-3 rounded-xl text-left transition-colors group"
                   >
                       <div className="text-sm font-bold text-white group-hover:text-red-200">実家 (Mizuho)</div>
                       <div className="text-[10px] text-red-400">Limit: ¥1,000,000</div>
                   </button>
                   <button 
                     onClick={() => { setEmergencyTarget('Disaster Fund'); setShowVoiceModal(true); }}
                     className="bg-red-900/30 border border-red-500/30 hover:bg-red-900/50 p-3 rounded-xl text-left transition-colors group"
                   >
                       <div className="text-sm font-bold text-white group-hover:text-red-200">災害用 (Regional)</div>
                       <div className="text-[10px] text-red-400">Limit: ¥500,000</div>
                   </button>
               </div>
           </div>

           <button 
             onClick={() => handleMethodSelect('bank')}
             className="w-full p-6 rounded-[2rem] bg-gradient-to-r from-[#0f1520] to-[#0a0a12] border border-slate-800 hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(79,70,229,0.1)] transition-all flex items-center justify-between group anim-enter-right anim-delay-100"
           >
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 rounded-2xl bg-indigo-900/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Building2 size={28} />
                 </div>
                 <div className="text-left">
                    <div className="font-bold text-white text-lg">銀行振込 (Bank)</div>
                    <div className="text-xs text-slate-400 flex items-center gap-1"><Server size={10} /> Zengin System API</div>
                 </div>
              </div>
              <ChevronRight size={24} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
           </button>

           <button 
             onClick={() => handleMethodSelect('paypay')}
             className="w-full p-6 rounded-[2rem] bg-gradient-to-r from-[#1a0f0f] to-[#0a0a12] border border-slate-800 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] transition-all flex items-center justify-between group anim-enter-right anim-delay-200"
           >
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 rounded-2xl bg-red-900/20 text-red-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Smartphone size={28} />
                 </div>
                 <div className="text-left">
                    <div className="font-bold text-white text-lg">ペイペイ送金 (PayPay)</div>
                    <div className="text-xs text-slate-400 flex items-center gap-1"><Globe size={10} /> Connect Gateway</div>
                 </div>
              </div>
              <ChevronRight size={24} className="text-slate-600 group-hover:text-red-400 transition-colors" />
           </button>

           <button 
             onClick={() => handleMethodSelect('cotra')}
             className="w-full p-6 rounded-[2rem] bg-gradient-to-r from-[#0f1a15] to-[#0a0a12] border border-slate-800 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] transition-all flex items-center justify-between group anim-enter-right anim-delay-300"
           >
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 rounded-2xl bg-green-900/20 text-green-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <RefreshCw size={28} />
                 </div>
                 <div className="text-left">
                    <div className="font-bold text-white text-lg">ことら送金 (Cotra)</div>
                    <div className="text-xs text-slate-400 flex items-center gap-1"><Network size={10} /> J-Debit Network</div>
                 </div>
              </div>
              <ChevronRight size={24} className="text-slate-600 group-hover:text-green-400 transition-colors" />
           </button>
        </div>
        
        {/* Voice Modal Overlay */}
        {showVoiceModal && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-sm w-full text-center relative overflow-hidden">
                    <button onClick={() => setShowVoiceModal(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white">✕</button>
                    <div className={`w-24 h-24 mx-auto rounded-full bg-red-500/10 flex items-center justify-center mb-6 ring-2 ring-red-500/30 ${voiceListening ? 'animate-pulse' : ''}`}>
                        <Mic size={40} className={voiceListening ? 'text-red-400' : 'text-slate-400'} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Voice Confirmation</h3>
                    <p className="text-sm text-slate-400 mb-6">Say "Authorize" to confirm instant transfer to <span className="text-white font-bold">{emergencyTarget}</span>.</p>
                    
                    <button 
                        onClick={handleEmergencyVoiceAuth}
                        className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-900/50"
                    >
                        {voiceListening ? 'Listening...' : 'Tap to Speak'}
                    </button>
                </div>
            </div>
        )}
      </div>
    );
  }

  // --- STEP: Bank Selection ---
  if (step === 'bank_select') {
    return (
      <div className="anim-enter-right max-w-3xl mx-auto pb-20 relative">
        {renderHeader('金融機関の選択')}
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
           {MAJOR_BANKS.map(bank => (
             <button 
               key={bank.id}
               onClick={() => { setSelectedBank(bank); setIsManualBank(false); handleNext(); }}
               className="p-4 rounded-xl border border-slate-800 bg-[#0f0f18] hover:bg-slate-800 hover:border-indigo-500/50 transition-all flex flex-col items-center gap-3 group h-28 justify-center active:scale-95"
             >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-bold ${bank.color} shadow-lg group-hover:scale-110 transition-transform`}>
                  {bank.short.substring(0, 2)}
                </div>
                <span className="text-xs font-bold text-slate-300 group-hover:text-white">{bank.short}</span>
             </button>
           ))}
           <button 
             onClick={() => { setSelectedBank(null); setIsManualBank(true); handleNext(); }}
             className="p-4 rounded-xl border border-dashed border-indigo-500/30 hover:border-indigo-500 hover:bg-slate-800/50 transition-all flex flex-col items-center justify-center gap-2 group h-28 bg-indigo-900/10"
           >
              <Pencil size={24} className="text-indigo-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs text-indigo-400 font-bold">直接入力 (Free Input)</span>
           </button>
        </div>

        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
           <History size={16} className="text-slate-400" /> よく使う振込先
        </h3>
        <div className="space-y-2">
           {[1, 2].map(i => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[#0f0f18] border border-slate-800 hover:bg-slate-800 cursor-pointer transition-colors" onClick={() => { setSelectedBank(MAJOR_BANKS[0]); setIsManualBank(false); handleNext(); }}>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] text-slate-400">
                       履歴
                    </div>
                    <div>
                       <div className="text-sm font-bold text-white">株式会社 〇〇商事</div>
                       <div className="text-xs text-slate-500">三菱UFJ銀行 • 普通 1234567</div>
                    </div>
                 </div>
                 <ChevronRight size={16} className="text-slate-600" />
              </div>
           ))}
        </div>
      </div>
    );
  }

  // --- STEP: Account Input (Adaptive) ---
  if (step === 'account_input') {
      return (
        <div className="anim-enter-right max-w-3xl mx-auto pb-20 relative">
          {renderHeader(method === 'bank' ? '口座情報の入力' : method === 'paypay' ? 'PayPay ID/電話番号' : 'ことら送金先の指定')}
          
          <div className="bg-[#0f0f18] border border-slate-800 rounded-2xl p-6 space-y-6">
             
             {/* Method Indicator */}
             <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg ${
                    method === 'bank' ? (isManualBank ? 'bg-indigo-600' : selectedBank?.color) : 
                    method === 'paypay' ? 'bg-red-500' : 'bg-green-500'
                }`}>
                    {method === 'bank' ? (isManualBank ? 'M' : selectedBank?.short.substring(0,2)) : method === 'paypay' ? 'P' : 'C'}
                </div>
                <div>
                   <div className="font-bold text-white">
                       {method === 'bank' ? (isManualBank ? 'その他金融機関 (Manual)' : selectedBank?.name) : method === 'paypay' ? 'PayPay残高送金' : 'ことら送金 (10万円以下)'}
                   </div>
                   <div className="text-xs text-slate-500">への送金</div>
                </div>
             </div>

             {/* BANK INPUTS */}
             {method === 'bank' && (
                 <div className="space-y-4">
                    {/* Manual Bank Name Input if selected */}
                    {isManualBank && (
                       <div>
                           <label className="text-xs font-bold text-slate-400 mb-2 block">金融機関名</label>
                           <input 
                              type="text" 
                              value={manualBankName}
                              onChange={(e) => setManualBankName(e.target.value)}
                              placeholder="例：JPモルガン・チェース銀行"
                              className="w-full bg-black/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                           />
                       </div>
                    )}

                    <div>
                       <div className="flex justify-between">
                           <label className="text-xs font-bold text-slate-400 mb-2 block">支店名・支店番号</label>
                           <button onClick={autoFillBank} className="text-[10px] text-indigo-500 font-bold hover:underline">AUTO-FILL (TEST)</button>
                       </div>
                       <div className="relative">
                          <input 
                             type="text" 
                             value={branchName}
                             onChange={(e) => setBranchName(e.target.value)}
                             placeholder="例：本店営業部 (001)"
                             className="w-full bg-black/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors focus:shadow-[0_0_10px_rgba(79,70,229,0.2)]"
                          />
                          <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />
                       </div>
                    </div>

                    <div>
                       <label className="text-xs font-bold text-slate-400 mb-2 block">口座種別</label>
                       <div className="flex gap-2">
                          {(['普通', '当座', '貯蓄'] as const).map(type => (
                             <button 
                               key={type}
                               onClick={() => setAccountType(type)}
                               className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all ${accountType === type ? 'bg-indigo-900/30 border-indigo-500 text-indigo-400' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
                             >
                                {type}
                             </button>
                          ))}
                       </div>
                    </div>

                    <div>
                       <label className="text-xs font-bold text-slate-400 mb-2 block">口座番号 (7桁)</label>
                       <input 
                          type="tel" 
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 7))}
                          placeholder="1234567"
                          className="w-full bg-black/50 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono text-lg tracking-widest focus:outline-none focus:border-indigo-500 transition-colors focus:shadow-[0_0_10px_rgba(79,70,229,0.2)]"
                       />
                    </div>
                 </div>
             )}

             {/* PAYPAY / COTRA INPUTS */}
             {(method === 'paypay' || method === 'cotra') && (
                 <div className="space-y-6">
                     <div className="flex gap-2">
                        <button onClick={() => setRecipientType('phone')} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${recipientType === 'phone' ? 'bg-slate-800 border-white/20 text-white' : 'border-transparent text-slate-500'}`}>電話番号</button>
                        {method === 'paypay' && <button onClick={() => setRecipientType('id')} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${recipientType === 'id' ? 'bg-slate-800 border-white/20 text-white' : 'border-transparent text-slate-500'}`}>PayPay ID</button>}
                        {method === 'cotra' && <button onClick={() => setRecipientType('email')} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${recipientType === 'email' ? 'bg-slate-800 border-white/20 text-white' : 'border-transparent text-slate-500'}`}>メールアドレス</button>}
                     </div>

                     <div className="relative">
                        <input 
                           type={recipientType === 'phone' ? 'tel' : 'text'}
                           value={recipientId}
                           onChange={(e) => setRecipientId(e.target.value)}
                           placeholder={recipientType === 'phone' ? '090-1234-5678' : recipientType === 'id' ? 'paypay_id_sample' : 'sample@email.com'}
                           className="w-full bg-black/50 border border-slate-700 rounded-xl px-4 py-4 text-white text-lg focus:outline-none focus:border-indigo-500 transition-colors pl-12 focus:shadow-[0_0_10px_rgba(79,70,229,0.2)]"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                            {recipientType === 'phone' ? <Smartphone size={20} /> : recipientType === 'id' ? <QrCode size={20} /> : <Mail size={20} />}
                        </div>
                     </div>
                     <p className="text-xs text-slate-500 text-center">
                        ※ 入力された情報に紐づくアカウントを検索します
                     </p>
                 </div>
             )}

             <button 
               onClick={handleNext}
               disabled={
                   (method === 'bank' && (!branchName || accountNumber.length < 1)) ||
                   ((method === 'paypay' || method === 'cotra') && recipientId.length < 3)
               }
               className="w-full py-4 mt-4 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-indigo-500/20"
             >
                次へ進む <ArrowRight size={18} />
             </button>
          </div>
        </div>
      );
  }

  // --- STEP: Amount Input ---
  if (step === 'amount_input') {
      return (
        <div className="anim-enter-right max-w-3xl mx-auto pb-20 relative">
          {renderHeader('金額の入力')}

          <div className="bg-[#0f0f18] border border-slate-800 rounded-2xl p-6 space-y-6">
             <div className="text-center py-6">
                 {/* AI RATE INDICATOR */}
                 <div className="flex items-center justify-center gap-2 text-[10px] text-cyan-400 font-mono mb-4 animate-pulse">
                    <Bot size={12} /> AI RATE ANALYSIS: BEST ROUTE [GODMODE]
                 </div>

                 <label className="text-xs font-bold text-slate-500 mb-2 block">送金金額 (円)</label>
                 <div className="flex items-end justify-center gap-2">
                    <span className="text-4xl text-slate-400 mb-2">¥</span>
                    <input 
                       type="tel"
                       value={amount}
                       onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
                       placeholder="金額を入力（円）"
                       className="bg-transparent text-4xl sm:text-6xl font-mono font-bold text-white w-full text-center focus:outline-none placeholder-slate-800/50"
                       autoFocus
                    />
                 </div>
                 {amount && <div className="text-slate-500 mt-2 font-mono">手数料: ¥0 (Best Rate Applied)</div>}
                 {method === 'cotra' && parseInt(amount) > 100000 && (
                     <div className="text-red-400 text-xs mt-2 font-bold flex items-center justify-center gap-1">
                         <AlertCircle size={12} /> ことら送金の上限は10万円です
                     </div>
                 )}
             </div>

             <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                <div className="flex justify-between items-center mb-2">
                   <label className="text-xs font-bold text-slate-400">振込依頼人名</label>
                   <button onClick={() => setIsEditingSender(!isEditingSender)} className="text-indigo-400 text-xs flex items-center gap-1">
                      <Pencil size={12} /> 編集
                   </button>
                </div>
                {isEditingSender ? (
                    <input 
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full bg-black/50 border border-slate-700 rounded px-2 py-1 text-white text-sm"
                    />
                ) : (
                    <div className="text-white font-bold">{senderName}</div>
                )}
             </div>

             <button 
               onClick={handleNext}
               disabled={!amount || (method === 'cotra' && parseInt(amount) > 100000)}
               className="w-full py-4 mt-4 relative overflow-hidden bg-slate-900 border border-cyan-500/50 text-white font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(0,191,255,0.3)] group disabled:opacity-50 disabled:shadow-none"
             >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,191,255,0.8)_0%,rgba(0,191,255,0)_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative flex items-center justify-center gap-2">確認画面へ <ArrowRight size={18} /></span>
             </button>
          </div>
        </div>
      );
  }

  // --- STEP: Confirm (Redesigned) ---
  if (step === 'confirm') {
      return (
        <div className="anim-enter-right max-w-3xl mx-auto pb-20 relative">
          {renderHeader('内容確認')}

          <div className="space-y-6">
                <div className="bg-[#0f0f18] border border-slate-800 rounded-2xl p-0 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 w-full h-1.5 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600"></div>
                    
                    <div className="p-6 border-b border-slate-800 text-center">
                       <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Total Amount</span>
                       <div className="text-4xl font-mono font-bold text-white tracking-tight drop-shadow-md">
                          ¥ {parseInt(amount).toLocaleString()}
                       </div>
                       <span className="inline-block mt-2 px-2 py-0.5 bg-slate-900 rounded text-[10px] text-slate-400 border border-slate-800 flex items-center justify-center gap-1 mx-auto w-fit">
                          <Sparkles size={10} className="text-cyan-400" /> Best Rate: ¥0 (Godmode)
                       </span>
                    </div>

                    <div className="p-6 space-y-6">
                       {/* Recipient */}
                       <div className="flex gap-4">
                          <div className="flex flex-col items-center gap-1 min-w-[60px]">
                             <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${
                                 method === 'bank' ? (isManualBank ? 'bg-indigo-600' : selectedBank?.color) : method === 'paypay' ? 'bg-red-500' : 'bg-green-500'
                             }`}>
                                 {method === 'bank' ? (isManualBank ? 'M' : selectedBank?.short.substring(0,1)) : method === 'paypay' ? 'P' : 'C'}
                             </div>
                             <span className="text-[10px] font-bold text-slate-500">TO</span>
                          </div>
                          <div className="flex-1 border-l-2 border-slate-800 pl-4">
                             <div className="text-xs font-bold text-slate-500 uppercase mb-1">Recipient (送金先)</div>
                             <div className="font-bold text-white text-lg leading-tight">
                                {method === 'bank' ? (isManualBank ? manualBankName : selectedBank?.name) : method === 'paypay' ? 'PayPay ID' : 'Contact'}
                             </div>
                             <div className="text-sm text-indigo-400 font-mono mt-1">
                                {method === 'bank' ? `${branchName} / ${accountType} / ${accountNumber}` : recipientId}
                             </div>
                          </div>
                       </div>

                       {/* Sender */}
                       <div className="flex gap-4">
                          <div className="flex flex-col items-center gap-1 min-w-[60px]">
                             <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                                <User size={20} className="text-slate-400" />
                             </div>
                             <span className="text-[10px] font-bold text-slate-500">FROM</span>
                          </div>
                          <div className="flex-1 border-l-2 border-slate-800 pl-4">
                             <div className="text-xs font-bold text-slate-500 uppercase mb-1">Sender (送金元)</div>
                             <div className="font-bold text-white">{senderName}</div>
                             <div className="text-xs text-slate-500 mt-1">{selectedSource.bankName} {selectedSource.branchName}</div>
                          </div>
                       </div>
                    </div>

                    {/* Verification Seal */}
                    <div className="absolute bottom-6 right-6 opacity-20 pointer-events-none">
                       <ShieldCheck size={120} className="text-indigo-500 rotate-[-15deg]" />
                    </div>
                </div>

                <div className="bg-yellow-950/20 border border-yellow-500/20 p-4 rounded-xl flex gap-3 items-start">
                   <AlertCircle size={20} className="text-yellow-500 shrink-0" />
                   <p className="text-xs text-yellow-200/70 leading-relaxed">
                      This transaction will be processed immediately via the ΩMAX Priority Network. Please confirm details before signing.
                   </p>
                </div>

                <div className="flex gap-3 pt-2">
                    <button onClick={handleBack} className="flex-1 py-4 border border-slate-800 rounded-xl text-slate-400 font-bold hover:bg-slate-900 transition-colors">
                        修正 (Edit)
                    </button>
                    <button 
                        onClick={handleTransfer}
                        disabled={isProcessing}
                        className="flex-[2] py-4 relative overflow-hidden bg-slate-900 border border-cyan-500/50 text-white font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(0,191,255,0.3)] group disabled:opacity-50"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,191,255,0.8)_0%,rgba(0,191,255,0)_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <span className="relative flex items-center justify-center gap-2">
                            {isProcessing ? <RefreshCw size={20} className="animate-spin" /> : <Fingerprint size={20} />}
                            {isProcessing ? 'Processing...' : '承認して送金'}
                        </span>
                    </button>
                </div>
             </div>
        </div>
      );
  }

  // --- STEP 5: Complete (Digital Certificate) ---
  if (step === 'complete') {
     return (
        <div className="flex flex-col items-center justify-center py-8 animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center ring-2 ring-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.4)] mb-6 relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                <CheckCircle2 size={40} className="text-green-500 relative z-10" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">送金手続き完了</h2>
            <p className="text-slate-400 mb-8 text-sm">デジタル証明書が発行されました。</p>

            <div className="bg-white text-slate-900 rounded-sm p-8 w-full max-w-md shadow-2xl relative overflow-hidden mb-8 font-serif border-4 border-double border-slate-300 anim-enter-bottom">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/linen.png')]"></div>
                
                <div className="text-center border-b-2 border-slate-800 pb-4 mb-6">
                    <h3 className="text-xl font-bold uppercase tracking-widest">Transaction Certificate</h3>
                    <div className="text-[10px] text-slate-500 mt-1">TK Global Bank • Official Record</div>
                </div>

                <div className="space-y-4 text-sm relative z-10">
                    <div className="flex justify-between">
                        <span className="font-bold text-slate-600">Transaction ID</span>
                        <span className="font-mono font-bold">{txId}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-bold text-slate-600">Date</span>
                        <span className="font-mono">{new Date().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-300 pt-2">
                        <span className="font-bold text-slate-600">Amount</span>
                        <span className="font-mono font-bold text-lg">¥ {parseInt(amount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-bold text-slate-600">Recipient</span>
                        <span className="text-right max-w-[150px] truncate">{method === 'bank' ? (isManualBank ? manualBankName : selectedBank?.short) : 'Contact'}</span>
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t-2 border-slate-800 flex justify-between items-end">
                    <div className="text-[10px] text-slate-500">
                        Authorized by<br/>TK Global Core System
                    </div>
                    <div className="w-20 h-20 border-4 border-red-800 rounded-full flex items-center justify-center opacity-30 rotate-[-15deg] absolute bottom-4 right-4 pointer-events-none">
                        <span className="text-red-800 font-bold text-[10px] uppercase border-y border-red-800 px-1">Verified</span>
                    </div>
                </div>
            </div>

            <button onClick={resetForm} className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-xl font-bold transition-colors w-full max-w-md">
                閉じる (Close)
            </button>
        </div>
     );
  }

  return null;
};

const GatewayStatus: React.FC<{ label: string; status: 'online' | 'offline'; ping: string }> = ({ label, status, ping }) => (
    <div className="flex-shrink-0 flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-3 py-1.5 text-[10px]">
        <span className={`w-1.5 h-1.5 rounded-full ${status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
        <span className="font-bold text-slate-300">{label}</span>
        <span className="font-mono text-slate-500 border-l border-slate-700 pl-2 ml-1">{ping}</span>
    </div>
);
