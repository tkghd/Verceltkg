
import React, { useState, useEffect } from 'react';
import { Landmark, Globe, CreditCard, Plus, ArrowRight, ShieldCheck, Banknote, Building2, CheckCircle2, AlertCircle, RefreshCw, Zap, Cpu, Scan, ArrowDownToLine, Settings, Copy, Activity, Server, Radio, Network, Database, Save, Trash2, Hash, FileText } from 'lucide-react';

type ServiceTab = 'accounts' | 'transfer_intl' | 'loans' | 'admin_registry';

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

export const BankServicesView: React.FC = () => {
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
        setBankNetworkStatus(prev => ({ ...prev, status: 'SYNCING...' }));
        
        // Simulate async network fetch for bank details
        setTimeout(() => {
            setSelectedCountry(country);
            
            // Generate random network stats
            setBankNetworkStatus({
                clearing: country.desc.split(' / ')[0] + ' Network',
                latency: Math.floor(Math.random() * 40) + 5 + 'ms',
                status: 'OPERATIONAL',
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
    setTimeout(() => {
        // Use Mock Generator
        const isIBAN = ['EU','DE','FR','CH','GB','AE','IT','ES','NL','SE','TR','BE','PL','SA'].includes(selectedCountry.code);
        
        const accountNumber = isIBAN 
            ? MockBankGenerator.generateIBAN(selectedCountry.code)
            : MockBankGenerator.generateLocal(selectedCountry.code);

        const swiftCode = MockBankGenerator.generateSWIFT(selectedCountry.code);

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

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-4">
        <div>
           <h2 className="text-2xl font-bold text-white flex items-center gap-2">
             <Landmark className="text-cyan-500" /> Bank Module
           </h2>
           <p className="text-xs text-slate-400 font-mono mt-1">Global Banking Services & Credit Protocol</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 max-w-[50%] md:max-w-none">
            <TabButton active={activeTab === 'accounts'} onClick={() => setActiveTab('accounts')} label="Accounts" icon={<Plus size={14} />} />
            <TabButton active={activeTab === 'transfer_intl'} onClick={() => setActiveTab('transfer_intl')} label="Intl. Wire" icon={<Globe size={14} />} />
            <TabButton active={activeTab === 'loans'} onClick={() => setActiveTab('loans')} label="Lending" icon={<Banknote size={14} />} />
            <TabButton active={activeTab === 'admin_registry'} onClick={() => setActiveTab('admin_registry')} label="Registry" icon={<Database size={14} />} />
        </div>
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
                onClick={() => window.location.hash = '#/atm'} 
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
                                      <span className="text-xs text-cyan-400 font-mono tracking-widest">CONNECTING TO {selectedCountry.name.toUpperCase()}...</span>
                                  </div>
                              </div>
                          ) : (
                              <>
                                  <div className="flex justify-between items-start mb-3 relative z-10">
                                      <label className="text-xs font-bold text-slate-400 uppercase block flex items-center gap-2">
                                         <Network size={12} /> Banking Standards
                                      </label>
                                      <span className="flex items-center gap-1 text-[10px] text-green-400 font-mono bg-green-900/20 px-1.5 py-0.5 rounded border border-green-500/20">
                                          <Activity size={10} /> {bankNetworkStatus.latency}
                                      </span>
                                  </div>
                                  <div className="space-y-3 text-sm relative z-10">
                                      <div className="flex justify-between p-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
                                          <span className="text-slate-400 text-xs">SWIFT / BIC Code</span>
                                          <span className="font-mono text-cyan-400 font-bold">{selectedCountry.swift}</span>
                                      </div>
                                      <div className="flex justify-between p-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
                                          <span className="text-slate-400 text-xs">Format</span>
                                          <span className="font-mono text-white text-xs truncate max-w-[160px]">{selectedCountry.format}</span>
                                      </div>
                                      <div className="pt-2 border-t border-slate-800/50 flex justify-between items-center mt-1">
                                          <span className="text-[10px] text-slate-500 flex items-center gap-1"><Server size={10} /> {bankNetworkStatus.clearing}</span>
                                          <span className="text-[10px] text-green-400 font-bold tracking-wide">{bankNetworkStatus.status}</span>
                                      </div>
                                  </div>
                              </>
                          )}
                      </div>
                  </div>

                  {!generatedAccount ? (
                      <button 
                        onClick={generateAccountDetails}
                        disabled={isGenerating || isFetchingInfo}
                        className="w-full py-4 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                          {isGenerating ? <RefreshCw size={18} className="animate-spin" /> : <Zap size={18} fill="currentColor" />}
                          {isGenerating ? 'Connecting to Global Ledger...' : 'Generate New Account Credentials'}
                      </button>
                  ) : (
                      <div className="bg-[#05050a] border border-slate-800 rounded-xl p-5 anim-enter-bottom shadow-2xl relative overflow-hidden">
                          {/* Decorative Elements */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full"></div>
                          <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full"></div>

                          <div className="flex justify-between items-start mb-6 relative z-10">
                              <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                                      <CheckCircle2 size={24} />
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-white leading-tight">Account Generated</h4>
                                      <p className="text-[10px] text-cyan-400 font-mono">Status: ACTIVE • KYC: BYPASSED</p>
                                  </div>
                              </div>
                              <button 
                                onClick={() => setGeneratedAccount(null)}
                                className="text-xs text-slate-500 hover:text-white underline"
                              >
                                Close
                              </button>
                          </div>
                          
                          <div className="space-y-4 relative z-10">
                              {/* Account Number Block */}
                              <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-700/50 group cursor-pointer hover:border-cyan-500/30 transition-all" onClick={() => navigator.clipboard.writeText(generatedAccount.accountNumber)}>
                                  <div className="flex justify-between items-center mb-1">
                                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{generatedAccount.isIBAN ? 'IBAN Number' : 'Account Number'}</span>
                                      <Copy size={12} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
                                  </div>
                                  <div className="text-lg font-mono text-white font-bold tracking-wide break-all">
                                      {generatedAccount.accountNumber}
                                  </div>
                              </div>

                              {/* SWIFT Block */}
                              <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-700/50 group cursor-pointer hover:border-cyan-500/30 transition-all" onClick={() => navigator.clipboard.writeText(generatedAccount.swift)}>
                                  <div className="flex justify-between items-center mb-1">
                                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">SWIFT / BIC Code</span>
                                      <Copy size={12} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
                                  </div>
                                  <div className="text-lg font-mono text-cyan-400 font-bold tracking-widest">
                                      {generatedAccount.swift}
                                  </div>
                              </div>
                          </div>
                          
                          <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center relative z-10">
                              <div className="text-xs text-slate-500 flex items-center gap-2">
                                  <FileText size={12} /> {generatedAccount.country}
                              </div>
                              <div className="text-right">
                                  <span className="text-[10px] text-slate-500 block">Initial Limit</span>
                                  <span className="text-green-400 font-bold font-mono text-xs">UNLIMITED</span>
                              </div>
                          </div>
                      </div>
                  )}
              </div>

              {/* Active Accounts List */}
              <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-500 uppercase">Your Global Accounts</h4>
                  <AccountCard region="EU" iban="LT45 7300 0099 1234 5678" currency="EUR" balance="€ 4,500,000" bank="TK Global Bank (Lithuania)" />
                  <AccountCard region="US" iban="Routing: 021000021 / Acc: 987654321" currency="USD" balance="$ 12,250,000" bank="TK Global Bank (NY Branch)" />
                  <AccountCard region="SG" iban="DBS-Link-888-999-000" currency="SGD" balance="S$ 8,888,888" bank="DBS / TK Trust" />
                  <AccountCard region="KR" iban="082-20-999999" currency="KRW" balance="₩ 5,000,000,000" bank="TK Global Bank (Seoul)" />
              </div>
          </div>
      )}

      {activeTab === 'transfer_intl' && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                      <Globe size={24} />
                  </div>
                  <div>
                      <h3 className="text-lg font-bold text-white">SWIFT / SEPA Transfer</h3>
                      <p className="text-xs text-slate-400">International Wire Protocol</p>
                  </div>
              </div>

              <div className="space-y-4">
                  <div className="relative">
                      <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input type="text" placeholder="SWIFT / BIC Code" className="w-full bg-black/40 border border-slate-700 rounded-xl px-4 pl-12 py-3 text-white font-mono placeholder-slate-600 focus:border-indigo-500 focus:outline-none" />
                  </div>
                  <div className="relative">
                      <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input type="text" placeholder="IBAN / Account Number" className="w-full bg-black/40 border border-slate-700 rounded-xl px-4 pl-12 py-3 text-white font-mono placeholder-slate-600 focus:border-indigo-500 focus:outline-none" />
                  </div>
                  <input type="text" placeholder="Beneficiary Name" className="w-full bg-black/40 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none" />
                  
                  <div className="pt-4 border-t border-slate-800">
                      <div className="flex justify-between items-end mb-2">
                          <label className="text-xs font-bold text-slate-400">Amount</label>
                          <span className="text-xs text-indigo-400 font-mono">Fee: Waived (Godmode)</span>
                      </div>
                      <input type="text" placeholder="0.00" className="w-full bg-black/40 border border-slate-700 rounded-xl px-4 py-4 text-2xl font-bold text-white text-right placeholder-slate-700 focus:border-indigo-500 focus:outline-none" />
                  </div>

                  <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 mt-4 shadow-lg shadow-indigo-500/20">
                      Initiate Wire Transfer <ArrowRight size={18} />
                  </button>
              </div>
          </div>
      )}

      {activeTab === 'loans' && (
          <div className="space-y-6">
              {/* Loan AI Dashboard */}
              <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
                              <Building2 className="text-white" size={20} />
                          </div>
                          <div>
                              <h3 className="text-lg font-bold text-white">Lending AI Core</h3>
                              <p className="text-xs text-indigo-300">Instant Credit Protocol</p>
                          </div>
                      </div>
                      <div className="text-right">
                          <div className="text-xs text-slate-400 uppercase font-bold">Available Credit</div>
                          <div className="text-2xl font-mono font-bold text-green-400">¥ 500,000,000</div>
                      </div>
                  </div>

                  {!loanApproved ? (
                      <div className="space-y-4">
                          <div className="p-4 bg-black/30 rounded-xl border border-slate-700">
                              <div className="flex justify-between mb-2">
                                  <span className="text-sm text-slate-300">Requested Amount</span>
                                  <span className="text-sm font-bold text-white">¥ 100,000,000</span>
                              </div>
                              <input type="range" className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                          </div>
                          <button 
                              onClick={() => {
                                  setLoanProcessing(true);
                                  setTimeout(() => { setLoanProcessing(false); setLoanApproved(true); }, 2000);
                              }}
                              disabled={loanProcessing}
                              className="w-full py-4 bg-white text-indigo-900 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
                          >
                              {loanProcessing ? (
                                  <>
                                      <RefreshCw size={18} className="animate-spin" /> Analyzing Credit Score...
                                  </>
                              ) : (
                                  <>
                                      <Zap size={18} fill="currentColor" /> Instant Approval Request
                                  </>
                              )}
                          </button>
                      </div>
                  ) : (
                      <div className="text-center py-8 animate-in zoom-in-95">
                          <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/50">
                              <CheckCircle2 size={32} />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">Loan Approved</h3>
                          <p className="text-slate-400 text-sm mb-6">Funds have been disbursed to your main vault.</p>
                          <button onClick={() => setLoanApproved(false)} className="px-6 py-2 bg-slate-800 text-white rounded-lg text-sm font-bold">
                              Dismiss
                          </button>
                      </div>
                  )}
              </div>

              {/* Active Loans */}
              <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-500 uppercase">Active Credit Lines</h4>
                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex justify-between items-center">
                      <div>
                          <div className="font-bold text-white">Corporate Growth Fund</div>
                          <div className="text-xs text-slate-500">Interest: 1.2% APR (Fixed)</div>
                      </div>
                      <div className="text-right">
                          <div className="font-mono text-white">¥ 50,000,000</div>
                          <div className="text-xs text-green-400">Active</div>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {activeTab === 'admin_registry' && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 anim-enter-right">
             <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-400 border border-amber-500/20">
                      <Database size={24} />
                  </div>
                  <div>
                      <h3 className="text-lg font-bold text-white">Bank Registry</h3>
                      <p className="text-xs text-slate-400">Add & Manage Global Banking Entities</p>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                      <div className="flex gap-3">
                          <div className="space-y-2 flex-1">
                              <label className="text-xs font-bold text-slate-400">Bank Name</label>
                              <input 
                                 type="text" 
                                 className="w-full bg-black/40 border border-slate-700 rounded-xl px-4 py-2 text-white text-sm focus:border-amber-500 focus:outline-none"
                                 value={newBank.name}
                                 onChange={e => setNewBank({...newBank, name: e.target.value})}
                                 placeholder="e.g. Bank of Mars"
                              />
                          </div>
                          <div className="space-y-2 w-20">
                              <label className="text-xs font-bold text-slate-400">Flag</label>
                              <input 
                                 type="text" 
                                 className="w-full bg-black/40 border border-slate-700 rounded-xl px-4 py-2 text-white text-sm focus:border-amber-500 focus:outline-none text-center"
                                 value={newBank.flag}
                                 onChange={e => setNewBank({...newBank, flag: e.target.value})}
                                 placeholder="🏳️"
                              />
                          </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-400">Country Code</label>
                              <input 
                                type="text" 
                                className="w-full bg-black/40 border border-slate-700 rounded-xl px-4 py-2 text-white text-sm focus:border-amber-500 focus:outline-none font-mono uppercase"
                                value={newBank.code}
                                onChange={e => setNewBank({...newBank, code: e.target.value})}
                                placeholder="e.g. MA"
                                maxLength={2}
                              />
                          </div>
                          <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-400">Currency</label>
                              <input 
                                type="text" 
                                className="w-full bg-black/40 border border-slate-700 rounded-xl px-4 py-2 text-white text-sm focus:border-amber-500 focus:outline-none font-mono uppercase"
                                value={newBank.currency}
                                onChange={e => setNewBank({...newBank, currency: e.target.value})}
                                placeholder="e.g. MRD"
                                maxLength={3}
                              />
                          </div>
                      </div>
                  </div>
                  
                  <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-400">SWIFT Prefix</label>
                              <input 
                                 type="text" 
                                 className="w-full bg-black/40 border border-slate-700 rounded-xl px-4 py-2 text-white text-sm focus:border-amber-500 focus:outline-none font-mono uppercase"
                                 value={newBank.swift}
                                 onChange={e => setNewBank({...newBank, swift: e.target.value})}
                                 placeholder="e.g. TKGB MA"
                              />
                          </div>
                          <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-400">Format</label>
                              <input 
                                 type="text" 
                                 className="w-full bg-black/40 border border-slate-700 rounded-xl px-4 py-2 text-white text-sm focus:border-amber-500 focus:outline-none"
                                 value={newBank.format}
                                 onChange={e => setNewBank({...newBank, format: e.target.value})}
                                 placeholder="e.g. IBAN (XX)"
                              />
                          </div>
                      </div>

                      <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400">Network / Description</label>
                          <input 
                             type="text" 
                             className="w-full bg-black/40 border border-slate-700 rounded-xl px-4 py-2 text-white text-sm focus:border-amber-500 focus:outline-none"
                             value={newBank.desc}
                             onChange={e => setNewBank({...newBank, desc: e.target.value})}
                             placeholder="e.g. Interplanetary Transfer Protocol"
                          />
                      </div>
                  </div>
              </div>

              <div className="flex justify-end mb-8 pb-8 border-b border-slate-800">
                  <button 
                    onClick={handleRegisterBank}
                    className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
                  >
                      <Save size={18} /> Register Entity
                  </button>
              </div>

              <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">Registered Banking Entities</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                  {bankList.map((bank) => (
                      <div key={bank.code} className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-600 transition-colors">
                          <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-lg shadow-sm">
                                  {bank.flag}
                              </div>
                              <div>
                                  <div className="text-sm font-bold text-white">{bank.name}</div>
                                  <div className="text-[10px] text-slate-500 font-mono">{bank.code} • {bank.currency} • {bank.swift}</div>
                              </div>
                          </div>
                          <button 
                            onClick={() => handleDeleteBank(bank.code)}
                            className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                              <Trash2 size={16} />
                          </button>
                      </div>
                  ))}
              </div>
          </div>
      )}
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; label: string; icon: React.ReactNode }> = ({ active, onClick, label, icon }) => (
    <button 
        onClick={onClick}
        className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${active ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
    >
        {icon} {label}
    </button>
);

const AccountCard: React.FC<{ region: string; iban: string; currency: string; balance: string; bank: string }> = ({ region, iban, currency, balance, bank }) => (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between hover:border-cyan-500/30 transition-colors group">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center font-bold text-slate-400 border border-slate-700 group-hover:bg-cyan-900/20 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-colors">
                {region}
            </div>
            <div>
                <div className="font-bold text-white text-sm">{bank}</div>
                <div className="text-xs text-slate-500 font-mono">{iban}</div>
            </div>
        </div>
        <div className="text-right">
            <div className="font-mono font-bold text-white">{balance}</div>
            <div className="text-[10px] text-slate-500">{currency}</div>
        </div>
    </div>
);
