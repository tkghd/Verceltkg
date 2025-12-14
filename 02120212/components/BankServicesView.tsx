
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Landmark, Globe, CreditCard, Plus, ArrowRight, ShieldCheck, Banknote, Building2, CheckCircle2, AlertCircle, RefreshCw, Zap, Cpu, Scan, ArrowDownToLine, Settings, Copy, Activity, Server, Radio, Network, Database, Save, Trash2, Hash, FileText, BookOpen, UserCheck, FileUp, ScanFace, Shield, Upload, Camera, X, Lock, Search } from 'lucide-react';
import { ActiveTab } from '../types';
import { BankGateway } from '../services/BankGateway';

type ServiceTab = 'accounts' | 'transfer_intl' | 'loans' | 'admin_registry' | 'directory' | 'kyc';

interface BankServicesViewProps {
  onNavigate: (tab: ActiveTab) => void;
}

interface BankInfo {
  code: string;
  name: string;
  flag: string;
  currency: string;
  swift: string;
  format: string;
  desc: string;
}

// Enhanced Bank List with Major Global Economies
const INITIAL_BANK_DB: BankInfo[] = [
  // Major Global
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', swift: 'TKGB US 33', format: 'Routing / Account', desc: 'ACH / FedWire / SWIFT' },
  { code: 'EU', name: 'European Union', flag: '🇪🇺', currency: 'EUR', swift: 'TKGB LT 2X', format: 'IBAN (LT)', desc: 'SEPA / TARGET2' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', swift: 'TKGB GB 2L', format: 'Sort Code / Account', desc: 'FPS / CHAPS / BACS' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', currency: 'JPY', swift: 'TKGB JP JT', format: 'Bank-Branch-Account', desc: 'Zengin System' },
  
  // Europe Extended
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR', swift: 'TKGB DE FF', format: 'IBAN (DE)', desc: 'Bundesbank / SEPA' },
  { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'EUR', swift: 'TKGB FR PP', format: 'IBAN (FR)', desc: 'BdF / SEPA' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', currency: 'CHF', swift: 'TKGB CH ZZ', format: 'IBAN (CH)', desc: 'SIC / SEPA' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', currency: 'EUR', swift: 'TKGB IT MM', format: 'IBAN (IT)', desc: 'Bank of Italy / SEPA' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', currency: 'EUR', swift: 'TKGB ES MM', format: 'IBAN (ES)', desc: 'Banco de España / SEPA' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', currency: 'EUR', swift: 'TKGB NL AA', format: 'IBAN (NL)', desc: 'DNB / SEPA' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', currency: 'SEK', swift: 'TKGB SE SS', format: 'IBAN (SE)', desc: 'Riksbank / RIX' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', currency: 'EUR', swift: 'TKGB BE BB', format: 'IBAN (BE)', desc: 'NBB / SEPA' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', currency: 'PLN', swift: 'TKGB PL PP', format: 'IBAN (PL)', desc: 'NBP / ELIXIR' },
  
  // Asia Extended
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', currency: 'SGD', swift: 'TKGB SG SG', format: 'Bank-Branch-Account', desc: 'FAST / PayNow' },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰', currency: 'HKD', swift: 'TKGB HK HH', format: 'Bank-Branch-Account', desc: 'HKMA / FPS' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', currency: 'KRW', swift: 'TKGB KR SE', format: 'XXX-XX-XXXXXX', desc: 'KFTC / BOK-Wire' },
  { code: 'CN', name: 'China', flag: '🇨🇳', currency: 'CNY', swift: 'TKGB CN CC', format: 'CNAPS / Account', desc: 'CIPS / CNAPS' },
  { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', swift: 'TKGB IN BB', format: 'IFSC / Account', desc: 'UPI / IMPS / NEFT' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', currency: 'VND', swift: 'TKGB VN HH', format: 'XXXX XXXX XXXX', desc: 'CITAD / VCB' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', currency: 'THB', swift: 'TKGB TH BK', format: 'XXX-X-XXXXX-X', desc: 'PromptPay / BAHTNET' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', currency: 'IDR', swift: 'TKGB ID JA', format: 'Account Number', desc: 'BI-FAST / SKNBI' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', currency: 'MYR', swift: 'TKGB MY KL', format: 'Account Number', desc: 'DuitNow / RENTAS' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', currency: 'PHP', swift: 'TKGB PH MM', format: 'Account Number', desc: 'InstaPay / PESONet' },
  
  // Others
  { code: 'AE', name: 'UAE (Dubai)', flag: '🇦🇪', currency: 'AED', swift: 'TKGB AE AA', format: 'IBAN (AE)', desc: 'UAEFTS / ICCS' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', currency: 'SAR', swift: 'TKGB SA RR', format: 'IBAN (SA)', desc: 'SAMA / SARIE' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', currency: 'TRY', swift: 'TKGB TR IS', format: 'IBAN (TR)', desc: 'CBRT / EFT' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', swift: 'TKGB AU 2S', format: 'BSB / Account', desc: 'BECS / NPP' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', swift: 'TKGB CA 2T', format: 'Transit-Inst-Account', desc: 'ACSS / LVTS' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', currency: 'BRL', swift: 'TKGB BR BB', format: 'Ag / Account', desc: 'Pix / STR' },
  { code: 'KY', name: 'Cayman Islands', flag: '🇰🇾', currency: 'KYD', swift: 'TKGB KY KK', format: 'Account Number', desc: 'Offshore / SWIFT' },
];

// Helper for Mock Generation (Simulating a library)
const MockBankGenerator = {
    randNum: (len: number) => Array.from({length: len}, () => Math.floor(Math.random() * 10)).join(''),
    
    // Generate IBAN for supported countries
    generateIBAN: (country: string) => {
        const r = MockBankGenerator.randNum;
        switch(country) {
            case 'DE': return `DE${r(2)} ${r(8)} ${r(10)}`;
            case 'FR': return `FR${r(2)} ${r(5)} ${r(5)} ${r(11)} ${r(2)}`;
            case 'CH': return `CH${r(2)} ${r(5)} ${r(12)}`;
            case 'GB': return `GB${r(2)} TKGB ${r(6)} ${r(8)}`;
            case 'AE': return `AE${r(2)} 033 ${r(16)}`;
            case 'EU': return `LT${r(2)} 3500 00${r(10)}`; // Defaulting EU to LT for now
            case 'IT': return `IT${r(2)} X ${r(5)} ${r(5)} ${r(12)}`;
            case 'ES': return `ES${r(2)} ${r(4)} ${r(4)} ${r(2)} ${r(10)}`;
            case 'NL': return `NL${r(2)} TKGB ${r(10)}`;
            case 'SE': return `SE${r(2)} ${r(3)} ${r(16)} ${r(1)}`;
            case 'BE': return `BE${r(2)} ${r(3)} ${r(7)} ${r(2)}`;
            case 'PL': return `PL${r(2)} ${r(8)} ${r(16)}`;
            case 'SA': return `SA${r(2)} 80 ${r(18)}`;
            case 'TR': return `TR${r(2)} ${r(5)} ${r(1)} ${r(16)}`;
            default: return `${country}${r(2)} ${r(4)} ${r(4)} ${r(4)} ${r(4)}`;
        }
    },
    
    // Generate Local format for non-IBAN countries
    generateLocal: (country: string) => {
        const r = MockBankGenerator.randNum;
        switch(country) {
            case 'US': return `Routing: 0${r(8)} / Acc: ${r(10)}`;
            case 'JP': return `Bank: 00${r(2)} / Branch: ${r(3)} / Acc: ${r(7)}`;
            case 'SG': return `Bank: 7${r(3)} / Branch: 0${r(2)} / Acc: ${r(9)}`;
            case 'HK': return `Bank: 0${r(2)} / Branch: ${r(3)} / Acc: ${r(9)}`;
            case 'KR': return `${r(3)}-${r(2)}-${r(6)}-${r(1)}`;
            case 'CN': return `CNAPS: ${r(12)} / Acc: ${r(19)}`;
            case 'IN': return `IFSC: TKGB0${r(6)} / Acc: ${r(12)}`;
            case 'AU': return `BSB: 0${r(2)}-${r(3)} / Acc: ${r(9)}`;
            case 'CA': return `Transit: ${r(5)} / Inst: 003 / Acc: ${r(7)}`;
            case 'VN': return `9704 ${r(4)} ${r(4)} ${r(4)}`;
            case 'TH': return `${r(3)}-${r(1)}-${r(5)}-${r(1)}`;
            case 'ID': return `${r(4)}-${r(2)}-${r(6)}-${r(2)}`;
            case 'MY': return `${r(4)} ${r(2)} ${r(6)}`;
            case 'PH': return `${r(4)} ${r(4)} ${r(2)}`;
            case 'BR': return `Ag: ${r(4)} / Acc: ${r(8)}-${r(1)}`;
            default: return `ACC: ${r(12)}`;
        }
    },

    // Generate SWIFT/BIC
    generateSWIFT: (country: string) => {
        const codes = ['TKGB', 'GODM', 'VLTX', 'OMNI'];
        const bank = codes[Math.floor(Math.random() * codes.length)];
        const loc = country + Array.from({length: 2}, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');
        return `${bank} ${country} ${loc} XXX`;
    }
};

export const BankServicesView: React.FC<BankServicesViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<ServiceTab>('accounts');
  const [loanProcessing, setLoanProcessing] = useState(false);
  const [loanApproved, setLoanApproved] = useState(false);
  const [aiAction, setAiAction] = useState<string>('');
  
  // Bank List Management
  const [bankList, setBankList] = useState<BankInfo[]>(INITIAL_BANK_DB);

  // Global Bank Generation State
  const [selectedCountry, setSelectedCountry] = useState<BankInfo>(INITIAL_BANK_DB[0]);
  const [generatedAccount, setGeneratedAccount] = useState<any | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Fetching State
  const [isFetchingInfo, setIsFetchingInfo] = useState(false);
  const [bankNetworkStatus, setBankNetworkStatus] = useState<any>({
     clearing: 'SEPA Instant',
     latency: '12ms',
     status: 'OPERATIONAL',
     settlement: 'Immediate'
  });

  // Registry Form State
  const [newBank, setNewBank] = useState<BankInfo>({
      code: '', name: '', flag: '🏳️', currency: '', swift: 'TKGB', format: '', desc: ''
  });

  // Directory Filter State
  const [filterCountry, setFilterCountry] = useState<string>('ALL');

  // KYC State
  const [kycStatus, setKycStatus] = useState<'unverified' | 'pending' | 'verified' | 'rejected'>('unverified');
  const [kycStep, setKycStep] = useState(1);
  const [kycData, setKycData] = useState({ fullName: '', dob: '', address: '', docType: 'passport' });
  const [kycUploadProgress, setKycUploadProgress] = useState(0);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const simulateAiAction = (action: string) => {
    setAiAction(action);
    setTimeout(() => setAiAction(''), 3000);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    const country = bankList.find(c => c.code === code);
    if (country) {
        setIsFetchingInfo(true);
        setGeneratedAccount(null);
        setBankNetworkStatus(prev => ({ ...prev, status: 'GATEWAY SYNCING...' }));
        
        // Use BankGateway to simulate latency check
        setTimeout(async () => {
            setSelectedCountry(country);
            
            // Use Gateway logic for latency if possible, or just mock here linked to gateway
            const latencyVal = Math.floor(Math.random() * 40) + 15 + 'ms';
            
            setBankNetworkStatus({
                clearing: country.desc.split(' / ')[0] + ' Network',
                latency: latencyVal,
                status: 'GATEWAY_LOCKED',
                settlement: new Date(Date.now() + 3600000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' (Next Batch)'
            });
            
            setIsFetchingInfo(false);
        }, 800);
    }
  };

  const handleRegisterBank = () => {
      if (!newBank.code || !newBank.name || !newBank.swift) return;
      
      const bankToAdd = {
          ...newBank,
          code: newBank.code.toUpperCase(),
          swift: newBank.swift.toUpperCase()
      };
      
      setBankList([...bankList, bankToAdd]);
      setNewBank({ code: '', name: '', flag: '🏳️', currency: '', swift: 'TKGB', format: '', desc: '' });
      simulateAiAction(`New Entity Registered: ${bankToAdd.name}`);
  };

  const handleDeleteBank = (code: string) => {
      setBankList(prev => prev.filter(b => b.code !== code));
  };

  const generateAccountDetails = () => {
    setIsGenerating(true);
    // Use BankGateway to "Inquire" or setup
    setTimeout(async () => {
        // Use Mock Generator
        const isIBAN = ['EU','DE','FR','CH','GB','AE','IT','ES','NL','SE','TR','BE','PL','SA'].includes(selectedCountry.code);
        
        const accountNumber = isIBAN 
            ? MockBankGenerator.generateIBAN(selectedCountry.code)
            : MockBankGenerator.generateLocal(selectedCountry.code);

        const swiftCode = MockBankGenerator.generateSWIFT(selectedCountry.code);

        // Simulate Gateway registration
        await BankGateway.inquireBalance({ accountId: accountNumber, bankCode: selectedCountry.code });

        setGeneratedAccount({
            country: selectedCountry.name,
            flag: selectedCountry.flag,
            currency: selectedCountry.currency,
            swift: swiftCode,
            accountNumber: accountNumber,
            type: 'Corporate Checking (Godmode)',
            timestamp: new Date().toLocaleString(),
            isIBAN: isIBAN
        });
        setIsGenerating(false);
    }, 1500);
  };

  const filteredBanks = useMemo(() => 
    filterCountry === 'ALL' 
      ? bankList 
      : bankList.filter(b => b.name === filterCountry),
  [filterCountry, bankList]);

  // KYC Flow Handlers
  const handleKycNext = () => {
      if (kycStep === 3 && isCameraActive) {
          stopCamera();
      }
      if (kycStep < 4) setKycStep(prev => prev + 1);
  };

  const handleKycSubmit = () => {
      setKycStatus('pending');
      setKycStep(1); // Reset step or go to a specific "processing" view
      
      // Simulate verification process
      simulateAiAction('Uploading encrypted biometric data...');
      
      setTimeout(() => {
          simulateAiAction('Validating against Global Watchlist...');
      }, 1500);

      setTimeout(() => {
          setKycStatus('verified');
          simulateAiAction('Identity Verified (Level 4 clearance granted)');
      }, 4000);
  };

  const simulateFileUpload = () => {
      setKycUploadProgress(0);
      const interval = setInterval(() => {
          setKycUploadProgress(prev => {
              if (prev >= 100) {
                  clearInterval(interval);
                  return 100;
              }
              return prev + 10;
          });
      }, 200);
  };

  // Camera Logic for KYC Liveness
  const startCamera = async () => {
      setIsCameraActive(true);
      setCameraError('');
      
      try {
          if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
              let stream;
              try {
                  // Prefer front camera for liveness check
                  stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
              } catch (e) {
                  console.warn("Front camera not available, falling back.");
                  stream = await navigator.mediaDevices.getUserMedia({ video: true });
              }
              
              streamRef.current = stream;
              if (videoRef.current) {
                  videoRef.current.srcObject = stream;
                  await videoRef.current.play();
              }
          } else {
              setCameraError('Camera API not supported');
          }
      } catch (err: any) {
          console.error(err);
          setCameraError('Permission denied or camera missing');
          setIsCameraActive(false);
      }
  };

  const stopCamera = () => {
      if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
      }
      setIsCameraActive(false);
  };

  useEffect(() => {
      return () => stopCamera();
  }, []);

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-4">
        <div>
           <h2 className="text-2xl font-bold text-white flex items-center gap-2">
             <Landmark className="text-cyan-500" /> Bank Module
           </h2>
           <p className="text-xs text-slate-400 font-mono mt-1">Global Banking Services & Credit Protocol</p>
        </div>
        <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] bg-green-900/30 text-green-400 border border-green-500/30 px-2 py-0.5 rounded font-bold animate-pulse flex items-center gap-1">
                <Lock size={10} /> Gateway: CONNECTED
            </span>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-1 max-w-[100%]">
            <TabButton active={activeTab === 'accounts'} onClick={() => setActiveTab('accounts')} label="Accounts" icon={<Plus size={14} />} />
            <TabButton active={activeTab === 'transfer_intl'} onClick={() => setActiveTab('transfer_intl')} label="Intl. Wire" icon={<Globe size={14} />} />
            <TabButton active={activeTab === 'loans'} onClick={() => setActiveTab('loans')} label="Lending" icon={<Banknote size={14} />} />
            <TabButton active={activeTab === 'kyc'} onClick={() => setActiveTab('kyc')} label="KYC" icon={<UserCheck size={14} />} />
            <TabButton active={activeTab === 'directory'} onClick={() => setActiveTab('directory')} label="Directory" icon={<BookOpen size={14} />} />
            <TabButton active={activeTab === 'admin_registry'} onClick={() => setActiveTab('admin_registry')} label="Registry" icon={<Database size={14} />} />
      </div>

      {/* AI Command Nexus */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
          <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                  <Cpu size={16} /> AI Command Nexus
              </h3>
              {aiAction && (
                  <span className="text-xs text-green-400 font-mono animate-pulse flex items-center gap-2">
                      <CheckCircle2 size={12} /> {aiAction}
                  </span>
              )}
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button 
                onClick={() => simulateAiAction('Withdrawal Protocol Initiated')}
                className="p-3 bg-red-900/20 border border-red-500/30 rounded-xl hover:bg-red-900/40 transition-colors flex flex-col items-center gap-2 group/btn"
              >
                  <ArrowDownToLine size={20} className="text-red-400 group-hover/btn:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-red-200">Withdraw ALL</span>
              </button>

              <button 
                onClick={() => simulateAiAction('Portfolio Optimization: Complete')}
                className="p-3 bg-cyan-900/20 border border-cyan-500/30 rounded-xl hover:bg-cyan-900/40 transition-colors flex flex-col items-center gap-2 group/btn"
              >
                  <Zap size={20} className="text-cyan-400 group-hover/btn:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-cyan-200">AI Optimize</span>
              </button>

              <button 
                onClick={() => simulateAiAction('Manual Override: Active')}
                className="p-3 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-800 transition-colors flex flex-col items-center gap-2 group/btn"
              >
                  <Settings size={20} className="text-slate-400 group-hover/btn:text-white transition-colors" />
                  <span className="text-xs font-bold text-slate-300">Custom Amount</span>
              </button>

              <button 
                onClick={() => onNavigate('atm')}
                className="p-3 bg-indigo-900/20 border border-indigo-500/30 rounded-xl hover:bg-indigo-900/40 transition-colors flex flex-col items-center gap-2 group/btn"
              >
                  <Scan size={20} className="text-indigo-400 group-hover/btn:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-indigo-200">ATM Scan</span>
              </button>
          </div>
      </div>

      {activeTab === 'accounts' && (
          <div className="space-y-6">
              {/* Account Generator */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none"><Globe size={120} /></div>
                  <h3 className="text-lg font-bold text-white mb-4">Open New Account (Global)</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400">Jurisdiction</label>
                          <select 
                             className="w-full bg-black/40 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                             onChange={handleCountryChange}
                             value={selectedCountry.code}
                             disabled={isFetchingInfo || isGenerating}
                          >
                              {bankList.map(bank => (
                                  <option key={bank.code} value={bank.code}>
                                      {bank.flag} {bank.name} ({bank.code})
                                  </option>
                              ))}
                          </select>
                      </div>

                      {/* Network Status Panel */}
                      <div className="bg-black/20 rounded-xl p-4 border border-slate-700/50 relative overflow-hidden">
                          {isFetchingInfo ? (
                              <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm z-20 flex items-center justify-center rounded-xl">
                                  <div className="flex flex-col items-center gap-3">
                                      <RefreshCw size={24} className="text-cyan-500 animate-spin" />
                                      <span className="text-xs text-cyan-500 font-mono animate-pulse">Syncing...</span>
                                  </div>
                              </div>
                          ) : null}
                          
                          <div className="grid grid-cols-2 gap-2 text-xs">
                             <div>
                                 <div className="text-slate-500">Network</div>
                                 <div className="text-white font-bold">{bankNetworkStatus.clearing}</div>
                             </div>
                             <div>
                                 <div className="text-slate-500">Latency</div>
                                 <div className="text-green-400 font-mono">{bankNetworkStatus.latency}</div>
                             </div>
                             <div>
                                 <div className="text-slate-500">Status</div>
                                 <div className="text-cyan-400 font-bold">{bankNetworkStatus.status}</div>
                             </div>
                             <div>
                                 <div className="text-slate-500">Settlement</div>
                                 <div className="text-white font-mono">{bankNetworkStatus.settlement}</div>
                             </div>
                          </div>
                      </div>
                  </div>

                  {generatedAccount && (
                      <div className="bg-gradient-to-r from-indigo-900/40 to-slate-900 border border-indigo-500/30 rounded-xl p-6 mb-6 anim-enter-bottom">
                          <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-2xl shadow-lg">
                                      {generatedAccount.flag}
                                  </div>
                                  <div>
                                      <div className="text-white font-bold text-lg">{generatedAccount.type}</div>
                                      <div className="text-xs text-indigo-300 font-mono">Created: {generatedAccount.timestamp}</div>
                                  </div>
                              </div>
                              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded border border-green-500/30">ACTIVE</span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
                              <div className="bg-black/30 p-3 rounded-lg border border-slate-800">
                                  <div className="text-xs text-slate-500 mb-1">Beneficiary Name</div>
                                  <div className="text-white font-bold">TK GLOBAL HOLDINGS LTD</div>
                              </div>
                              <div className="bg-black/30 p-3 rounded-lg border border-slate-800">
                                  <div className="text-xs text-slate-500 mb-1">{generatedAccount.isIBAN ? 'IBAN' : 'Account Number'}</div>
                                  <div className="text-cyan-400 font-bold tracking-wider">{generatedAccount.accountNumber}</div>
                              </div>
                              <div className="bg-black/30 p-3 rounded-lg border border-slate-800">
                                  <div className="text-xs text-slate-500 mb-1">SWIFT / BIC</div>
                                  <div className="text-white font-bold">{generatedAccount.swift}</div>
                              </div>
                              <div className="bg-black/30 p-3 rounded-lg border border-slate-800">
                                  <div className="text-xs text-slate-500 mb-1">Currency</div>
                                  <div className="text-white font-bold">{generatedAccount.currency}</div>
                              </div>
                          </div>

                          <div className="mt-4 flex gap-3">
                              <button className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                                  <Copy size={16} /> Copy Details
                              </button>
                              <button className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors">
                                  Download PDF
                              </button>
                          </div>
                      </div>
                  )}

                  <button 
                     onClick={generateAccountDetails}
                     disabled={isGenerating || isFetchingInfo}
                     className="w-full py-4 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                     {isGenerating ? <RefreshCw size={20} className="animate-spin" /> : <Plus size={20} />}
                     {isGenerating ? 'Registering with Central Bank...' : 'Instant Generate Account'}
                  </button>
              </div>
          </div>
      )}

      {activeTab === 'transfer_intl' && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <div className="text-center py-10 text-slate-500">
                  <Globe size={48} className="mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-bold text-white">International Wire Transfer</h3>
                  <p className="text-sm">Secure SWIFT/SEPA transfers are available in the <span className="text-indigo-400 font-bold">Transfers</span> tab.</p>
                  <button onClick={() => onNavigate('transfer')} className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-500 transition-colors">
                      Go to Transfers
                  </button>
              </div>
          </div>
      )}

      {activeTab === 'loans' && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none"><Banknote size={120} /></div>
               <h3 className="text-lg font-bold text-white mb-6">Instant Credit Line (AI Underwritten)</h3>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                   <div className="bg-black/20 p-4 rounded-xl border border-slate-800">
                       <div className="text-xs text-slate-500 uppercase font-bold mb-1">Available Limit</div>
                       <div className="text-2xl font-mono text-green-400 font-bold">$ 5,000,000</div>
                   </div>
                   <div className="bg-black/20 p-4 rounded-xl border border-slate-800">
                       <div className="text-xs text-slate-500 uppercase font-bold mb-1">Interest Rate</div>
                       <div className="text-2xl font-mono text-indigo-400 font-bold">0.5% <span className="text-xs text-slate-500">APR</span></div>
                   </div>
                   <div className="bg-black/20 p-4 rounded-xl border border-slate-800">
                       <div className="text-xs text-slate-500 uppercase font-bold mb-1">Approval Time</div>
                       <div className="text-2xl font-mono text-cyan-400 font-bold">Instant</div>
                   </div>
               </div>

               {loanApproved ? (
                   <div className="bg-green-900/20 border border-green-500/30 p-6 rounded-xl text-center anim-enter-bottom">
                       <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                       <h3 className="text-xl font-bold text-white mb-2">Funds Disbursed</h3>
                       <p className="text-sm text-green-300 mb-4">Your credit line has been successfully activated. Funds are available in your main wallet.</p>
                       <button onClick={() => setLoanApproved(false)} className="px-6 py-2 bg-slate-800 text-white rounded-lg font-bold">Close</button>
                   </div>
               ) : (
                   <button 
                    onClick={() => {
                        setLoanProcessing(true);
                        setTimeout(() => {
                            setLoanProcessing(false);
                            setLoanApproved(true);
                            simulateAiAction('Credit Line Approved & Disbursed');
                        }, 2000);
                    }}
                    disabled={loanProcessing}
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                   >
                       {loanProcessing ? <RefreshCw size={20} className="animate-spin" /> : <Zap size={20} />}
                       {loanProcessing ? 'AI Underwriting in Progress...' : 'Draw Funds Now'}
                   </button>
               )}
          </div>
      )}

      {activeTab === 'kyc' && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <ScanFace size={24} className="text-cyan-500" /> Identity Verification (eKYC)
                  </h3>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 ${
                      kycStatus === 'verified' ? 'bg-green-900/30 text-green-400 border border-green-500/30' :
                      kycStatus === 'pending' ? 'bg-amber-900/30 text-amber-400 border border-amber-500/30' :
                      'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                      {kycStatus === 'verified' ? <CheckCircle2 size={12} /> : kycStatus === 'pending' ? <RefreshCw size={12} className="animate-spin" /> : <AlertCircle size={12} />}
                      {kycStatus.toUpperCase()}
                  </div>
              </div>

              {kycStatus === 'verified' ? (
                  <div className="text-center py-10">
                      <ShieldCheck size={64} className="text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white">Verification Complete</h3>
                      <p className="text-slate-400 mt-2">You have Level 4 clearance. Unlimited global transfers enabled.</p>
                  </div>
              ) : kycStatus === 'pending' ? (
                   <div className="text-center py-10">
                      <div className="relative w-20 h-20 mx-auto mb-6">
                          <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
                          <div className="absolute inset-0 border-4 border-t-cyan-500 rounded-full animate-spin"></div>
                      </div>
                      <h3 className="text-xl font-bold text-white">Verifying Identity...</h3>
                      <p className="text-slate-400 mt-2 text-sm max-w-md mx-auto">Our AI agents are validating your documents against global databases. This usually takes less than 60 seconds.</p>
                  </div>
              ) : (
                  <div className="space-y-6">
                      {/* Step Indicator */}
                      <div className="flex items-center justify-between mb-8 px-4">
                          {[1, 2, 3, 4].map(step => (
                              <div key={step} className="flex flex-col items-center gap-2 relative z-10">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step <= kycStep ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                                      {step < kycStep ? <CheckCircle2 size={16} /> : step}
                                  </div>
                                  <span className={`text-[10px] font-bold ${step <= kycStep ? 'text-cyan-400' : 'text-slate-600'}`}>
                                      {step === 1 ? 'Info' : step === 2 ? 'Doc' : step === 3 ? 'Liveness' : 'Review'}
                                  </span>
                              </div>
                          ))}
                          {/* Progress Line */}
                          <div className="absolute left-0 w-full h-0.5 bg-slate-800 top-4 -z-0"></div>
                          <div className="absolute left-0 h-0.5 bg-cyan-600 top-4 -z-0 transition-all duration-500" style={{ width: `${((kycStep - 1) / 3) * 100}%` }}></div>
                      </div>

                      {/* Step Content */}
                      <div className="bg-black/20 rounded-xl p-6 border border-slate-800 min-h-[300px]">
                          {kycStep === 1 && (
                              <div className="space-y-4 anim-enter-right">
                                  <h4 className="font-bold text-white mb-4">Personal Information</h4>
                                  <div className="space-y-3">
                                      <input type="text" placeholder="Full Name (as per Passport)" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none" value={kycData.fullName} onChange={(e) => setKycData({...kycData, fullName: e.target.value})} />
                                      <input type="date" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none" value={kycData.dob} onChange={(e) => setKycData({...kycData, dob: e.target.value})} />
                                      <input type="text" placeholder="Residential Address" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none" value={kycData.address} onChange={(e) => setKycData({...kycData, address: e.target.value})} />
                                  </div>
                              </div>
                          )}

                          {kycStep === 2 && (
                              <div className="space-y-4 anim-enter-right">
                                  <h4 className="font-bold text-white mb-4">Document Upload</h4>
                                  <div className="grid grid-cols-3 gap-3 mb-4">
                                      {['passport', 'id_card', 'license'].map(type => (
                                          <button 
                                            key={type}
                                            onClick={() => setKycData({...kycData, docType: type})}
                                            className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-colors ${kycData.docType === type ? 'bg-cyan-900/20 border-cyan-500 text-cyan-400' : 'bg-slate-900 border-slate-700 text-slate-500'}`}
                                          >
                                              <FileText size={20} />
                                              <span className="text-[10px] font-bold uppercase">{type.replace('_', ' ')}</span>
                                          </button>
                                      ))}
                                  </div>
                                  <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:border-cyan-500/50 hover:bg-slate-900/50 transition-colors cursor-pointer" onClick={simulateFileUpload}>
                                      {kycUploadProgress > 0 && kycUploadProgress < 100 ? (
                                          <div className="w-full max-w-xs">
                                              <div className="flex justify-between text-xs mb-2 text-cyan-400"><span>Uploading...</span><span>{kycUploadProgress}%</span></div>
                                              <div className="h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-cyan-500 transition-all duration-200" style={{ width: `${kycUploadProgress}%` }}></div></div>
                                          </div>
                                      ) : kycUploadProgress === 100 ? (
                                          <div className="text-green-400 flex flex-col items-center gap-2">
                                              <CheckCircle2 size={32} />
                                              <span className="font-bold">Upload Complete</span>
                                          </div>
                                      ) : (
                                          <>
                                              <Upload size={32} className="mb-2" />
                                              <span className="text-sm font-bold">Click to Upload Document</span>
                                              <span className="text-xs">JPG, PNG or PDF (Max 5MB)</span>
                                          </>
                                      )}
                                  </div>
                              </div>
                          )}

                          {kycStep === 3 && (
                              <div className="space-y-4 anim-enter-right">
                                  <h4 className="font-bold text-white mb-2">Liveness Check</h4>
                                  <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-slate-700">
                                      {isCameraActive ? (
                                          <video ref={videoRef} className="w-full h-full object-cover transform scale-x-[-1]" autoPlay playsInline muted />
                                      ) : (
                                          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                                              {cameraError ? (
                                                  <>
                                                      <AlertCircle size={32} className="text-red-500 mb-2" />
                                                      <span className="text-red-400 text-sm">{cameraError}</span>
                                                  </>
                                              ) : (
                                                  <>
                                                      <ScanFace size={48} className="mb-4 opacity-50" />
                                                      <p className="text-sm">Camera permission required</p>
                                                  </>
                                              )}
                                          </div>
                                      )}
                                      
                                      {isCameraActive && (
                                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                              <div className="w-48 h-64 border-2 border-cyan-500/50 rounded-[50%] relative">
                                                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-cyan-500 text-xs font-bold bg-black/50 px-2 py-1 rounded">Position Face Here</div>
                                              </div>
                                          </div>
                                      )}
                                  </div>
                                  
                                  {!isCameraActive ? (
                                      <button onClick={startCamera} className="w-full py-3 bg-slate-800 text-white rounded-lg font-bold hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                                          <Camera size={18} /> Enable Camera
                                      </button>
                                  ) : (
                                      <div className="text-center text-xs text-green-400 animate-pulse font-mono">
                                          Analyzing biometrics...
                                      </div>
                                  )}
                              </div>
                          )}

                          {kycStep === 4 && (
                              <div className="space-y-4 anim-enter-right">
                                  <h4 className="font-bold text-white mb-4">Review Information</h4>
                                  <div className="space-y-2 text-sm">
                                      <div className="flex justify-between border-b border-slate-800 pb-2">
                                          <span className="text-slate-500">Full Name</span>
                                          <span className="text-white">{kycData.fullName || 'Not provided'}</span>
                                      </div>
                                      <div className="flex justify-between border-b border-slate-800 pb-2">
                                          <span className="text-slate-500">Date of Birth</span>
                                          <span className="text-white">{kycData.dob || 'Not provided'}</span>
                                      </div>
                                      <div className="flex justify-between border-b border-slate-800 pb-2">
                                          <span className="text-slate-500">Address</span>
                                          <span className="text-white truncate max-w-[200px]">{kycData.address || 'Not provided'}</span>
                                      </div>
                                      <div className="flex justify-between border-b border-slate-800 pb-2">
                                          <span className="text-slate-500">Document</span>
                                          <span className="text-green-400 font-bold flex items-center gap-1"><CheckCircle2 size={12} /> Uploaded</span>
                                      </div>
                                      <div className="flex justify-between border-b border-slate-800 pb-2">
                                          <span className="text-slate-500">Liveness</span>
                                          <span className="text-green-400 font-bold flex items-center gap-1"><CheckCircle2 size={12} /> Verified</span>
                                      </div>
                                  </div>
                                  <div className="bg-amber-900/20 p-3 rounded-lg border border-amber-500/30 text-xs text-amber-200 mt-4">
                                      By submitting, you consent to the processing of your biometric data for identity verification purposes in accordance with GDPR and local regulations.
                                  </div>
                              </div>
                          )}
                      </div>

                      {/* Navigation Buttons */}
                      <div className="flex gap-3">
                          {kycStep > 1 && (
                              <button onClick={() => setKycStep(prev => prev - 1)} className="px-6 py-3 bg-slate-800 text-slate-300 font-bold rounded-xl hover:bg-slate-700 transition-colors">
                                  Back
                              </button>
                          )}
                          <button 
                             onClick={kycStep === 4 ? handleKycSubmit : handleKycNext}
                             className="flex-1 py-3 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-500/20"
                          >
                              {kycStep === 4 ? 'Submit Verification' : 'Continue'}
                          </button>
                      </div>
                  </div>
              )}
          </div>
      )}

      {activeTab === 'directory' && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">Global Bank Directory</h3>
                  <div className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 flex items-center gap-2">
                      <Search size={14} className="text-slate-500" />
                      <input 
                         type="text" 
                         placeholder="Filter..." 
                         className="bg-transparent text-xs text-white outline-none w-24"
                         onChange={(e) => setFilterCountry(e.target.value || 'ALL')}
                      />
                  </div>
              </div>

              <div className="h-96 overflow-y-auto custom-scrollbar pr-2 space-y-2">
                  {filteredBanks.map((bank, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-black/20 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors group">
                          <div className="flex items-center gap-3">
                              <div className="text-2xl">{bank.flag}</div>
                              <div>
                                  <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{bank.name}</div>
                                  <div className="text-xs text-slate-500">{bank.desc}</div>
                              </div>
                          </div>
                          <div className="text-right">
                              <div className="text-xs font-mono font-bold text-indigo-400">{bank.currency}</div>
                              <div className="text-[10px] text-slate-600">{bank.swift.split(' ')[0]}</div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {activeTab === 'admin_registry' && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Database size={20} className="text-amber-500" /> Bank Entity Registry (Admin)
              </h3>
              
              <div className="bg-black/30 border border-slate-800 rounded-xl p-4 mb-6">
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Register New Entity</h4>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                      <input type="text" placeholder="Bank Name" className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none" value={newBank.name} onChange={e => setNewBank({...newBank, name: e.target.value})} />
                      <input type="text" placeholder="Country Code (e.g. US)" className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none" value={newBank.code} onChange={e => setNewBank({...newBank, code: e.target.value})} />
                      <input type="text" placeholder="Currency (e.g. USD)" className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none" value={newBank.currency} onChange={e => setNewBank({...newBank, currency: e.target.value})} />
                      <input type="text" placeholder="SWIFT Prefix" className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none" value={newBank.swift} onChange={e => setNewBank({...newBank, swift: e.target.value})} />
                  </div>
                  <button onClick={handleRegisterBank} className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                      <Plus size={14} /> Add to Ledger
                  </button>
              </div>

              <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Registered Entities</h4>
                  <div className="h-64 overflow-y-auto custom-scrollbar pr-2 space-y-2">
                      {bankList.map((bank, idx) => (
                          <div key={idx} className="flex justify-between items-center p-2 bg-black/20 rounded border border-slate-800/50">
                              <div className="flex items-center gap-2">
                                  <span className="text-lg">{bank.flag}</span>
                                  <span className="text-xs font-bold text-slate-300">{bank.name}</span>
                                  <span className="text-[10px] bg-slate-800 px-1 rounded text-slate-500">{bank.code}</span>
                              </div>
                              <button onClick={() => handleDeleteBank(bank.code)} className="text-slate-600 hover:text-red-400 transition-colors">
                                  <Trash2 size={14} />
                              </button>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; label: string; icon: React.ReactNode }> = ({ active, onClick, label, icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
    }`}
  >
    {icon}
    {label}
  </button>
);
