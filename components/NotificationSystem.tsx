
import React, { useState, useEffect } from 'react';
import { ShieldAlert, Zap, Globe, Lock, Wallet, CheckCircle2, X, BellRing, Server } from 'lucide-react';

export type NotificationType = 'security' | 'finance' | 'system' | 'success' | 'module';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
}

const SAMPLE_EVENTS: Omit<Notification, 'id' | 'timestamp'>[] = [
  { type: 'finance', title: 'Whale Transaction', message: 'Inbound liquidity detected: ¥500,000,000' },
  { type: 'finance', title: 'Arbitrage Executed', message: 'DEX Delta neutral profit: +12.5%' },
  { type: 'security', title: 'Firewall Active', message: 'Unauthorized access attempt intercepted (IP: 192.168.x.x)' },
  { type: 'system', title: 'Module Sync', message: 'Global Node (EU-West) latency optimized to 12ms' },
  { type: 'system', title: 'AI Prediction', message: 'Market sentiment shift detected: BULLISH' },
  { type: 'success', title: 'Asset Secured', message: 'Cold storage backup completed successfully' },
  { type: 'finance', title: 'Dividend Payout', message: 'TKG Staking rewards distributed' },
  { type: 'security', title: 'Encryption Rotation', message: 'Quantum keys updated for Vault #7' },
  { type: 'module', title: 'Production App', message: 'New build deployed to global edge network.' },
];

export const NotificationSystem: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Function to add a notification
  const addNotification = (event: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNote: Notification = {
      ...event,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };

    setNotifications((prev) => [newNote, ...prev].slice(0, 3)); // Keep max 3 visible for subtlety

    // Auto dismiss
    setTimeout(() => {
      removeNotification(newNote.id);
    }, 6000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Simulate Random Godmode Events
  useEffect(() => {
    // Initial welcome notification
    setTimeout(() => {
        addNotification({ type: 'system', title: 'Godmode Active', message: 'Real-time monitoring systems engaged.' });
    }, 1000);

    const interval = setInterval(() => {
      // 25% chance to trigger an event every 5 seconds
      if (Math.random() > 0.75) {
        const randomEvent = SAMPLE_EVENTS[Math.floor(Math.random() * SAMPLE_EVENTS.length)];
        addNotification(randomEvent);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] flex flex-col gap-2 w-[90%] max-w-sm pointer-events-none">
      {notifications.map((note) => (
        <div 
          key={note.id}
          className={`pointer-events-auto relative overflow-hidden rounded-xl border p-3 shadow-2xl backdrop-blur-md transition-all duration-500 animate-in slide-in-from-top-5 fade-in ${
            note.type === 'security' ? 'bg-red-950/90 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]' :
            note.type === 'finance' ? 'bg-emerald-950/90 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]' :
            note.type === 'success' ? 'bg-indigo-950/90 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.3)]' :
            note.type === 'module' ? 'bg-amber-950/90 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.3)]' :
            'bg-slate-900/95 border-slate-700 shadow-slate-900/50'
          }`}
        >
            {/* Type Indicator Bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${
               note.type === 'security' ? 'bg-red-500' :
               note.type === 'finance' ? 'bg-emerald-500' :
               note.type === 'success' ? 'bg-indigo-500' :
               note.type === 'module' ? 'bg-amber-500' :
               'bg-slate-500'
            }`}></div>

            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 mb-0.5">
                    {note.type === 'security' && <ShieldAlert size={14} className="text-red-400 animate-pulse" />}
                    {note.type === 'finance' && <Zap size={14} className="text-emerald-400" />}
                    {note.type === 'success' && <CheckCircle2 size={14} className="text-indigo-400" />}
                    {note.type === 'system' && <Globe size={14} className="text-slate-400" />}
                    {note.type === 'module' && <Server size={14} className="text-amber-400" />}
                    
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        note.type === 'security' ? 'text-red-400' :
                        note.type === 'finance' ? 'text-emerald-400' :
                        note.type === 'success' ? 'text-indigo-400' :
                        note.type === 'module' ? 'text-amber-400' :
                        'text-slate-400'
                    }`}>
                        {note.title}
                    </span>
                </div>
                <button onClick={() => removeNotification(note.id)} className="text-slate-500 hover:text-white transition-colors">
                    <X size={12} />
                </button>
            </div>
            
            <p className="text-xs font-medium text-slate-200 pl-1 leading-snug opacity-90">
                {note.message}
            </p>
            
            <div className="mt-1.5 text-[8px] text-slate-500 font-mono text-right pl-1">
                {note.timestamp.toLocaleTimeString()} • GOD_NET
            </div>
        </div>
      ))}
    </div>
  );
};
