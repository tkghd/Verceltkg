
import React, { useState, useEffect, Suspense } from 'react';
import { Wallet, Send, QrCode, CreditCard, Settings, User, Globe, Wifi, Zap, Bot, Crown, Palette, BarChart2, Heart, Building, Scale, ClipboardList, FileText, Smartphone, Grid, X, Coins, Landmark, Menu, Rocket } from 'lucide-react';
import { LoginScreen } from './components/LoginScreen';
import { ProdBadge } from './components/ProdBadge';
import { RevenueCounter } from './components/RevenueCounter';
import { AppMenu } from './components/AppMenu';
import { NotificationSystem } from './components/NotificationSystem';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { SystemModule, WalletState, QueueState, ActiveTab, OwnerAccount, ApiHealth, ApiTransaction } from './types';
import { INITIAL_MODULES, STARTUP_LOGS, INITIAL_WALLET, INITIAL_QUEUES, OWNER_ACCOUNTS } from './constants';

// Lazy Load View Components
const Dashboard = React.lazy(() => import('./components/Dashboard').then(m => ({ default: m.Dashboard })));
const AssetsView = React.lazy(() => import('./components/AssetsView').then(m => ({ default: m.AssetsView })));
const TransferView = React.lazy(() => import('./components/TransferView').then(m => ({ default: m.TransferView })));
const ATMView = React.lazy(() => import('./components/ATMView').then(m => ({ default: m.ATMView })));
const CardView = React.lazy(() => import('./components/CardView').then(m => ({ default: m.CardView })));
const CryptoView = React.lazy(() => import('./components/CryptoView').then(m => ({ default: m.CryptoView })));
const CorporateView = React.lazy(() => import('./components/CorporateView').then(m => ({ default: m.CorporateView })));
const BankServicesView = React.lazy(() => import('./components/BankServicesView').then(m => ({ default: m.BankServicesView })));
const AIStudioHUD = React.lazy(() => import('./components/AIStudioHUD').then(m => ({ default: m.AIStudioHUD })));
const SettingsView = React.lazy(() => import('./components/SettingsView').then(m => ({ default: m.SettingsView })));
const ModuleView = React.lazy(() => import('./components/ModuleView').then(m => ({ default: m.ModuleView })));

const LoadingFallback = () => (
  <div className="h-full flex flex-col items-center justify-center space-y-4 animate-in fade-in">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-t-cyan-500 rounded-full animate-spin"></div>
    </div>
    <span className="text-xs font-mono text-cyan-500 animate-pulse">LOADING MODULE...</span>
  </div>
);

const API_BASE = 'http://localhost:3100';

const AppContent: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [modules, setModules] = useState<SystemModule[]>(INITIAL_MODULES);
  const [logs, setLogs] = useState<string[]>(STARTUP_LOGS);
  const [booted, setBooted] = useState(true);
  const [wallet, setWallet] = useState<WalletState>(INITIAL_WALLET);
  const [queues, setQueues] = useState<QueueState>(INITIAL_QUEUES);
  const [ownerAccounts] = useState<OwnerAccount[]>(OWNER_ACCOUNTS);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // API Data States
  const [health, setHealth] = useState<ApiHealth | null>(null);
  const [transactions, setTransactions] = useState<ApiTransaction[]>([]);

  const { theme } = useTheme();

  useEffect(() => {
    if (isLoggedIn) {
        setModules(prev => prev.map(m => ({ ...m, status: 'online' })));
        
        // Fetch Real-time Data
        const fetchData = async () => {
            try {
                // Health Check
                const healthRes = await fetch(`${API_BASE}/api/health`);
                if (healthRes.ok) setHealth(await healthRes.json());

                // Balance Sync
                const balanceRes = await fetch(`${API_BASE}/api/balance/demoUser`);
                if (balanceRes.ok) {
                    const data = await balanceRes.json();
                    const accounts = data.accounts;
                    const jpy = accounts.find((a: any) => a.currency === 'JPY')?.balance;
                    const usd = accounts.find((a: any) => a.currency === 'USD')?.balance;
                    const btc = accounts.find((a: any) => a.currency === 'BTC')?.balance;
                    
                    if (jpy !== undefined) setWallet(prev => ({ ...prev, jpy: jpy.toLocaleString() }));
                    if (usd !== undefined) setWallet(prev => ({ ...prev, usd: usd.toLocaleString() }));
                    if (btc !== undefined) setWallet(prev => ({ ...prev, btc: btc.toString() }));
                }

                // Transaction Sync
                const txRes = await fetch(`${API_BASE}/api/transactions/demoUser`);
                if (txRes.ok) {
                    const data = await txRes.json();
                    setTransactions(data.transactions);
                }
            } catch (error) {
                console.error("API Sync Error:", error);
                addLog(`[ERROR] API SYNC FAILED: ${error}`);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 10000); // Polling every 10s
        return () => clearInterval(interval);
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
    <div className="flex h-screen flex-col bg-[#05050a] text-slate-100 font-sans overflow-hidden shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" style={{boxShadow: `inset 0 0 100px rgba(${theme.glow}, 0.1)`}}>
      
      {/* Real-time Notification Overlay */}
      <NotificationSystem />

      {/* Redesigned Minimal Header */}
      <header className="flex-none flex items-center justify-between bg-[#080812]/80 backdrop-blur-md px-5 py-4 z-30 border-b border-white/5 relative">
        <div className="flex items-center gap-3">
           <div className="relative group cursor-pointer" onClick={() => setActiveTab('settings')}>
             <div className={`absolute inset-0 bg-${theme.primary}-500 blur-md opacity-20 rounded-full animate-pulse`}></div>
             <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr from-${theme.primary}-900 to-${theme.secondary}-950 flex items-center justify-center text-lg text-${theme.primary}-400 border border-${theme.primary}-500/30 relative z-10 shadow-lg`}>
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
               <span className="text-[10px] text-amber-400 font-mono tracking-wider font-bold">ALL SYSTEMS ONLINE</span>
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
            <div key={activeTab} className="max-w-7xl mx-auto anim-enter-right h-full">
               <Suspense fallback={<LoadingFallback />}>
                 {activeTab === 'dashboard' && <Dashboard modules={modules} booted={true} wallet={wallet} queues={queues} onNavigate={handleTabChange} health={health} transactions={transactions} />}
                 {activeTab === 'assets' && <AssetsView wallet={wallet} ownerAccounts={ownerAccounts} onNavigate={handleTabChange} />}
                 {activeTab === 'transfer' && <TransferView wallet={wallet} ownerAccounts={ownerAccounts} apiBase={API_BASE} />}
                 {activeTab === 'atm' && <ATMView wallet={wallet} />}
                 {activeTab === 'card' && <CardView />}
                 {activeTab === 'crypto' && <CryptoView wallet={wallet} onUpdateWallet={setWallet} onNavigate={handleTabChange} />}
                 {activeTab === 'bank_services' && <BankServicesView onNavigate={handleTabChange} />}
                 {activeTab === 'corporate' && <CorporateView wallet={wallet} />}
                 {activeTab === 'ai_hud' && <AIStudioHUD modules={modules} />}
                 
                 {/* Generated UI Modules */}
                 {activeTab === 'pwa' && <ModuleView id="pwa" title="PWA Mobile Core" icon={<Smartphone size={24} />} variant="app" />}
                 {activeTab === 'web' && <ModuleView id="web" title="Web Platform Host" icon={<Globe size={24} />} variant="dev" />}
                 {activeTab === 'uiux' && <ModuleView id="uiux" title="Design System Studio" icon={<Palette size={24} />} variant="design" />}
                 {activeTab === 'health' && <ModuleView id="health" title="System Health Monitor" icon={<Heart size={24} />} variant="admin" />}
                 {activeTab === 'real' && <ModuleView id="real" title="Real-Time API Stream" icon={<Building size={24} />} variant="dev" />}
                 {activeTab === 'compliance' && <ModuleView id="compliance" title="Compliance Officer" icon={<Scale size={24} />} variant="admin" />}
                 {activeTab === 'audit' && <ModuleView id="audit" title="Audit Log Viewer" icon={<ClipboardList size={24} />} variant="admin" />}
                 {activeTab === 'license' && <ModuleView id="license" title="License Manager" icon={<FileText size={24} />} variant="admin" />}
                 {activeTab === 'prod_app' && <ModuleView id="prod" title="Production App (Consumer)" icon={<Rocket size={24} />} variant="app" />}
                 
                 {activeTab === 'settings' && (
                   <div className="mt-8">
                      <SettingsView modules={modules} logs={logs} queues={queues} onRestart={handleRestartModule} />
                   </div>
                 )}
               </Suspense>
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
           
           <NavButton 
                active={activeTab === 'dashboard'} 
                onClick={() => handleTabChange('dashboard')} 
                icon={<Globe size={24} />} 
                label="World"
                color={`text-${theme.primary}-400`} 
           />
           <NavButton 
                active={activeTab === 'assets'} 
                onClick={() => handleTabChange('assets')} 
                icon={<Wallet size={24} />} 
                label="Vault" 
                color={`text-${theme.primary}-400`}
           />
           
           {/* Center FAB */}
           <div className="relative -top-8 mx-2">
              <button 
                onClick={() => handleTabChange('bank_services')}
                className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${theme.gradient} flex items-center justify-center text-white shadow-[0_10px_30px_rgba(${theme.glow},0.4)] hover:scale-105 hover:-translate-y-1 transition-all duration-300 border-[4px] border-[#05050a] group rotate-3 hover:rotate-0`}
              >
                <Landmark size={28} className="group-hover:scale-110 transition-transform duration-300" />
              </button>
           </div>
           
           <NavButton 
                active={activeTab === 'ai_hud'} 
                onClick={() => handleTabChange('ai_hud')} 
                icon={<Bot size={24} />} 
                label="AI HUD" 
                color={`text-${theme.primary}-400`}
           />
           
           {/* Apps Trigger */}
           <button 
             onClick={() => setIsMenuOpen(!isMenuOpen)}
             className={`flex flex-col items-center justify-center gap-1 w-16 h-14 transition-all duration-300 active:scale-95 ${isMenuOpen ? `text-${theme.primary}-400` : 'text-slate-500 hover:text-slate-300'}`}
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

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string; color: string }> = ({ active, onClick, icon, label, color }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 w-16 h-14 transition-all duration-300 active:scale-95 ${active ? color : 'text-slate-500 hover:text-slate-300'}`}
  >
    <div className={`p-1 transition-all duration-300 ${active ? 'scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]' : ''}`}>
      {icon}
    </div>
    <span className="text-xs font-medium tracking-tight">{label}</span>
  </button>
);

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
