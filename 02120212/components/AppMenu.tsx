
import React from 'react';
import { Smartphone, Globe, Palette, BarChart2, Heart, Building, Scale, ClipboardList, FileText, CreditCard, Settings, Coins, Wallet, Briefcase, Send, Banknote, Rocket } from 'lucide-react';
import { ActiveTab } from '../types';
import { useTheme } from './ThemeContext';

interface AppMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
}

export const AppMenu: React.FC<AppMenuProps> = ({ isOpen, onClose, activeTab, onNavigate }) => {
  const { theme } = useTheme();

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[35] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed bottom-[90px] left-4 right-4 bg-[#0F0F1A]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 z-[36] transition-all duration-500 cubic-bezier(0.32, 0.72, 0, 1) shadow-[0_0_50px_rgba(0,0,0,0.5)] ${isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95 pointer-events-none'}`}>
        
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
               <span className={`w-1 h-6 bg-gradient-to-b from-${theme.primary}-500 to-${theme.secondary}-600 rounded-full`}></span>
               System Modules
            </h3>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700">
               ALL SYSTEMS ONLINE
            </span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 sm:gap-4">
            <MenuIcon onClick={() => onNavigate('corporate')} icon={<Briefcase size={22} />} label="Corp." color={`text-${theme.secondary}-400`} bg={`bg-${theme.secondary}-500/10`} active={activeTab === 'corporate'} />
            <MenuIcon onClick={() => onNavigate('transfer')} icon={<Send size={22} />} label="Send" color={`text-${theme.primary}-400`} bg={`bg-${theme.primary}-500/10`} active={activeTab === 'transfer'} />
            <MenuIcon onClick={() => onNavigate('atm')} icon={<Banknote size={22} />} label="ATM" color="text-emerald-400" bg="bg-emerald-500/10" active={activeTab === 'atm'} />
            <MenuIcon onClick={() => onNavigate('card')} icon={<CreditCard size={22} />} label="Cards" color={`text-${theme.accent}-400`} bg={`bg-${theme.accent}-500/10`} active={activeTab === 'card'} />
            <MenuIcon onClick={() => onNavigate('crypto')} icon={<Coins size={22} />} label="Crypto" color="text-amber-400" bg="bg-amber-500/10" active={activeTab === 'crypto'} />
            
            <MenuIcon onClick={() => onNavigate('pwa')} icon={<Smartphone size={22} />} label="PWA" color="text-blue-400" bg="bg-blue-500/10" active={activeTab === 'pwa'} />
            <MenuIcon onClick={() => onNavigate('web')} icon={<Globe size={22} />} label="Web" color="text-sky-400" bg="bg-sky-500/10" active={activeTab === 'web'} />
            <MenuIcon onClick={() => onNavigate('dashboard')} icon={<BarChart2 size={22} />} label="Data" color="text-green-400" bg="bg-green-500/10" active={activeTab === 'dashboard'} />
            <MenuIcon onClick={() => onNavigate('uiux')} icon={<Palette size={22} />} label="UI/UX" color="text-pink-400" bg="bg-pink-500/10" active={activeTab === 'uiux'} />
            <MenuIcon onClick={() => onNavigate('health')} icon={<Heart size={22} />} label="Health" color="text-red-400" bg="bg-red-500/10" active={activeTab === 'health'} />
            
            <MenuIcon onClick={() => onNavigate('real')} icon={<Building size={22} />} label="Real API" color="text-emerald-400" bg="bg-emerald-500/10" active={activeTab === 'real'} />
            <MenuIcon onClick={() => onNavigate('compliance')} icon={<Scale size={22} />} label="Legal" color="text-slate-300" bg="bg-slate-500/10" active={activeTab === 'compliance'} />
            <MenuIcon onClick={() => onNavigate('audit')} icon={<ClipboardList size={22} />} label="Audit" color={`text-${theme.secondary}-300`} bg={`bg-${theme.secondary}-500/10`} active={activeTab === 'audit'} />
            <MenuIcon onClick={() => onNavigate('license')} icon={<FileText size={22} />} label="License" color="text-orange-300" bg="bg-orange-500/10" active={activeTab === 'license'} />
            
            <MenuIcon onClick={() => onNavigate('prod_app')} icon={<Rocket size={22} />} label="本番アプリ" color="text-red-500" bg="bg-red-500/10" active={activeTab === 'prod_app'} />
            
            <MenuIcon onClick={() => onNavigate('settings')} icon={<Settings size={22} />} label="Admin" color="text-slate-400" bg="bg-slate-800" active={activeTab === 'settings'} />
        </div>

        {/* Decoration */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/20 rounded-full"></div>
      </div>
    </>
  );
};

const MenuIcon: React.FC<{ onClick: () => void; icon: React.ReactNode; label: string; color: string; bg: string; active?: boolean }> = ({ onClick, icon, label, color, bg, active }) => {
    const { theme } = useTheme();
    return (
        <button 
            onClick={onClick}
            className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl transition-all duration-200 active:scale-95 group ${active ? 'bg-white/10 ring-1 ring-white/20' : 'hover:bg-white/5'}`}
        >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 ${bg} ${color} ${active ? `ring-2 ring-${theme.primary}-500/50 shadow-${theme.primary}-500/20` : ''}`}>
                {icon}
            </div>
            <span className={`text-[10px] font-medium tracking-wide ${active ? 'text-white' : 'text-slate-400'}`}>{label}</span>
        </button>
    );
};
