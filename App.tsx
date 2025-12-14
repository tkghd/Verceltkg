
import React, { useState, useEffect } from 'react';
import { Wallet, Send, QrCode, CreditCard, Settings, User, Globe, Wifi, Zap, Bot, Crown, Palette, BarChart2, Heart, Building, Scale, ClipboardList, FileText, Smartphone, Grid, X, Coins, Landmark, Menu } from 'lucide-react';
import { LoginScreen } from './components/LoginScreen';
import { AssetsView } from './components/AssetsView';
import { TransferView } from './components/TransferView';
import { ATMView } from './components/ATMView';
import { CardView } from './components/CardView';
import { CryptoView } from './components/CryptoView';
import { CorporateView } from './components/CorporateView';
import { BankServicesView } from './components/BankServicesView';
import { AIStudioHUD } from './components/AIStudioHUD';
import { SettingsView } from './components/SettingsView';
import { Dashboard } from './components/Dashboard';
import { ProdBadge } from './components/ProdBadge';
import { RevenueCounter } from './components/RevenueCounter';
import { ModuleLinker } from './components/ModuleLinker';
import { AppMenu } from './components/AppMenu';
import { NotificationSystem } from './components/NotificationSystem';
import { SystemModule, WalletState, QueueState, ActiveTab, OwnerAccount } from './types';
import { INITIAL_MODULES, STARTUP_LOGS, INITIAL_WALLET, INITIAL_QUEUES, OWNER_ACCOUNTS } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [modules, setModules] = useState<SystemModule[]>(INITIAL_MODULES);
  const [logs, setLogs] = useState<string[]>(STARTUP_LOGS);
  const [booted, setBooted] = useState(true);
  const [wallet, setWallet] = useState<WalletState>(INITIAL_WALLET);
  const [queues, setQueues] = useState<QueueState>(INITIAL_QUEUES);
  const [ownerAccounts] = useState<OwnerAccount[]>(OWNER_ACCOUNTS);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
        setModules(prev => prev.map(m => ({ ...m, status: 'online' })));
    }
  }, [isLoggedIn]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const updateModuleStatus = (id: string, status: SystemModule['status']) => {
      setModules(prev => prev.map(m => m.id === id ? { ...m, status } : m));
  };

  const handleRestartModule = async (id: string) => {
    updateModuleStatus(id, 'online');
    addLog(`MODULE ${id} REFRESHED INSTANTLY.`);
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex h-screen flex-col bg-[#05050a] text-slate-100 font-sans overflow-hidden shadow-[inset_0_0_100px_rgba(6,182,212,0.1)]">
      
      {/* Real-time Notification Overlay */}
      <NotificationSystem />

      {/* Redesigned Minimal Header */}
      <header className="flex-none flex items-center justify-between bg-[#080812]/80 backdrop-blur-md px-5 py-4 z-30 border-b border-white/5 relative">
        <div className="flex items-center gap-3">
           <div className="relative group cursor-pointer" onClick={() => setActiveTab('settings')}>
             <div className="absolute inset-0 bg-cyan-500 blur-md opacity-20 rounded-full animate-pulse"></div>
             <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-900 to-indigo-950 flex items-center justify-center text-lg text-cyan-400 border border-cyan-500/30 relative z-10 shadow-lg">
               💠
             </div>
           </div>
           <div className="flex flex-col">
             <h1 className="text-lg font-bold text-white tracking-tight leading-none">
               TK globalBank
             </h1>
             <div className="flex items-center gap-2 mt-1">
               <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
               </span>
               <span className="text-[10px] text-amber-400 font-mono tracking-wider font-bold">ΩβαMAX ULTIMATE</span>
             </div>
           </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
             <RevenueCounter apiUrl="https://www.tkglobalbank.com/api/revenue" />
          </div>
          <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-white transition-all relative overflow-hidden">
             <User size={18} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
         
         <div className="h-full overflow-y-auto custom-scrollbar p-4 pb-24 sm:p-6 sm:pb-6 scroll-smooth">
            <div key={activeTab} className="max-w-7xl mx-auto anim-enter-right">
               {activeTab === 'dashboard' && <Dashboard modules={modules} booted={true} wallet={wallet} queues={queues} onNavigate={handleTabChange} />}
               {activeTab === 'assets' && <AssetsView wallet={wallet} ownerAccounts={ownerAccounts} onNavigate={handleTabChange} />}
               {activeTab === 'transfer' && <TransferView wallet={wallet} ownerAccounts={ownerAccounts} />}
               {activeTab === 'atm' && <ATMView wallet={wallet} />}
               {activeTab === 'card' && <CardView />}
               {activeTab === 'crypto' && <CryptoView wallet={wallet} onUpdateWallet={setWallet} onNavigate={handleTabChange} />}
               {activeTab === 'bank_services' && <BankServicesView onNavigate={handleTabChange} />}
               {activeTab === 'corporate' && <CorporateView wallet={wallet} />}
               {activeTab === 'ai_hud' && <AIStudioHUD modules={modules} />}
               
               {/* Modules */}
               {activeTab === 'pwa' && <ModuleLinker modulePath="pwa" label="PWA Module" icon={<Smartphone size={48} />} />}
               {activeTab === 'web' && <ModuleLinker modulePath="web" label="Web Module" icon={<Globe size={48} />} />}
               {activeTab === 'uiux' && <ModuleLinker modulePath="uiux" label="UI/UX Module" icon={<Palette size={48} />} />}
               {activeTab === 'health' && <ModuleLinker modulePath="health" label="Health Module" icon={<Heart size={48} />} />}
               {activeTab === 'real' && <ModuleLinker modulePath="real" label="Real API Module" icon={<Building size={48} />} />}
               {activeTab === 'compliance' && <ModuleLinker modulePath="compliance" label="Compliance Module" icon={<Scale size={48} />} />}
               {activeTab === 'audit' && <ModuleLinker modulePath="audit" label="Audit Module" icon={<ClipboardList size={48} />} />}
               {activeTab === 'license' && <ModuleLinker modulePath="license" label="License Module" icon={<FileText size={48} />} />}
               
               {activeTab === 'settings' && (
                 <>
                   <div className="mt-8">
                      <SettingsView modules={modules} logs={logs} queues={queues} onRestart={handleRestartModule} />
                   </div>
                 </>
               )}
            </div>
         </div>
      </main>

      {/* Collapsible App Menu (Drawer) */}
      <AppMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        activeTab={activeTab} 
        onNavigate={handleTabChange} 
      />

      {/* Modern Bottom Navigation */}
      <nav className="flex-none bg-[#080812]/90 backdrop-blur-xl border-t border-white/5 px-4 pb-safe z-40 relative">
        <div className="flex justify-between items-end h-[70px] max-w-7xl mx-auto pb-2 relative">
           
           <NavButton active={activeTab === 'dashboard'} onClick={() => handleTabChange('dashboard')} icon={<Globe size={24} />} label="World" />
           <NavButton active={activeTab === 'assets'} onClick={() => handleTabChange('assets')} icon={<Wallet size={24} />} label="Vault" />
           
           {/* Center FAB */}
           <div className="relative -top-8 mx-2">
              <button 
                onClick={() => handleTabChange('bank_services')}
                className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-[0_10px_30px_rgba(6,182,212,0.4)] hover:scale-105 hover:-translate-y-1 transition-all duration-300 border-[4px] border-[#05050a] group rotate-3 hover:rotate-0"
              >
                <Landmark size={28} className="group-hover:scale-110 transition-transform duration-300" />
              </button>
           </div>
           
           <NavButton active={activeTab === 'ai_hud'} onClick={() => handleTabChange('ai_hud')} icon={<Bot size={24} />} label="AI HUD" />
           
           {/* Apps Trigger */}
           <button 
             onClick={() => setIsMenuOpen(!isMenuOpen)}
             className={`flex flex-col items-center justify-center gap-1 w-16 h-14 transition-all duration-300 active:scale-95 ${isMenuOpen ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
           >
              <div className={`p-1 transition-all duration-300 ${isMenuOpen ? 'scale-110' : ''}`}>
                 {isMenuOpen ? <X size={24} /> : <Grid size={24} />}
              </div>
              <span className="text-xs font-medium tracking-tight">Apps</span>
           </button>

        </div>
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 w-16 h-14 transition-all duration-300 active:scale-95 ${active ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
  >
    <div className={`p-1 transition-all duration-300 ${active ? 'scale-110 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]' : ''}`}>
      {icon}
    </div>
    <span className="text-xs font-medium tracking-tight">{label}</span>
  </button>
);

export default App;
