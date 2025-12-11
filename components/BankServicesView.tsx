import React, { useState } from 'react';
import { Landmark, Globe, CreditCard, Plus, ArrowRight, ShieldCheck, Banknote, Building2, CheckCircle2, AlertCircle, RefreshCw, Zap, Cpu, Scan, ArrowDownToLine, Settings } from 'lucide-react';
import { ActiveTab } from '../types';

type ServiceTab = 'accounts' | 'transfer_intl' | 'loans';

interface BankServicesViewProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const BankServicesView: React.FC<BankServicesViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<ServiceTab>('accounts');
  const [loanProcessing, setLoanProcessing] = useState(false);
  const [loanApproved, setLoanApproved] = useState(false);
  const [aiAction, setAiAction] = useState<string>('');

  const simulateAiAction = (action: string) => {
    setAiAction(action);
    setTimeout(() => setAiAction(''), 3000);
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
        <div className="flex gap-2">
            <TabButton active={activeTab === 'accounts'} onClick={() => setActiveTab('accounts')} label="Accounts" icon={<Plus size={14} />} />
            <TabButton active={activeTab === 'transfer_intl'} onClick={() => setActiveTab('transfer_intl')} label="Intl. Wire" icon={<Globe size={14} />} />
            <TabButton active={activeTab === 'loans'} onClick={() => setActiveTab('loans')} label="Lending" icon={<Banknote size={14} />} />
        </div>
      </div>

      {/* AI Command Nexus (New Feature) */}
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400">Jurisdiction</label>
                          <select className="w-full bg-black/40 border border-slate-700 rounded-xl px-4 py-3 text-white">
                              <option>🇪🇺 European Union (IBAN)</option>
                              <option>🇺🇸 United States (ACH/FedWire)</option>
                              <option>🇸🇬 Singapore (FAST)</option>
                              <option>🇭🇰 Hong Kong (Clearing)</option>
                          </select>
                      </div>
                      <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400">Currency</label>
                          <select className="w-full bg-black/40 border border-slate-700 rounded-xl px-4 py-3 text-white">
                              <option>EUR - Euro</option>
                              <option>USD - US Dollar</option>
                              <option>SGD - Singapore Dollar</option>
                              <option>HKD - HK Dollar</option>
                          </select>
                      </div>
                  </div>

                  <button className="w-full py-4 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform">
                      Generate IBAN / Account Number
                  </button>
              </div>

              {/* Active Accounts List */}
              <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-500 uppercase">Your Global Accounts</h4>
                  <AccountCard region="EU" iban="LT45 7300 0099 1234 5678" currency="EUR" balance="€ 4,500,000" bank="TK Global Bank (Lithuania)" />
                  <AccountCard region="US" iban="Routing: 021000021 / Acc: 987654321" currency="USD" balance="$ 12,250,000" bank="TK Global Bank (NY Branch)" />
                  <AccountCard region="SG" iban="DBS-Link-888-999-000" currency="SGD" balance="S$ 8,888,888" bank="DBS / TK Trust" />
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
                  <input type="text" placeholder="SWIFT / BIC Code" className="w-full bg-black/40 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono" />
                  <input type="text" placeholder="IBAN / Account Number" className="w-full bg-black/40 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono" />
                  <input type="text" placeholder="Beneficiary Name" className="w-full bg-black/40 border border-slate-700 rounded-xl px-4 py-3 text-white" />
                  
                  <div className="pt-4 border-t border-slate-800">
                      <div className="flex justify-between items-end mb-2">
                          <label className="text-xs font-bold text-slate-400">Amount</label>
                          <span className="text-xs text-indigo-400 font-mono">Fee: Waived (Godmode)</span>
                      </div>
                      <input type="text" placeholder="0.00" className="w-full bg-black/40 border border-slate-700 rounded-xl px-4 py-4 text-2xl font-bold text-white text-right" />
                  </div>

                  <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 mt-4">
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