
import React, { useEffect, useRef } from 'react';
import { ExternalLink, CheckCircle2, Zap } from 'lucide-react';

interface ModuleLinkerProps {
  modulePath: string;
  label: string;
  icon: React.ReactNode;
}

export const ModuleLinker: React.FC<ModuleLinkerProps> = ({ modulePath, label, icon }) => {
  const windowRef = useRef<Window | null>(null);

  const openModule = () => {
    const url = `${window.location.protocol}//${window.location.hostname}/${modulePath}`;
    windowRef.current = window.open(url, `_blank_module_${modulePath}`);
  };

  useEffect(() => {
    openModule();
    return () => {
      if (windowRef.current && !windowRef.current.closed) {
        windowRef.current.close();
      }
    };
  }, [modulePath]);

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in zoom-in-95 duration-500 relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 to-transparent pointer-events-none"></div>
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse pointer-events-none"></div>

      <div className="relative z-10">
        <div className="w-24 h-24 bg-gradient-to-br from-[#0F0F1A] to-[#1a1a2e] rounded-[2rem] flex items-center justify-center mb-8 ring-1 ring-white/10 shadow-[0_0_60px_rgba(6,182,212,0.3)] relative mx-auto group">
            <div className="absolute inset-0 bg-cyan-500/20 rounded-[2rem] animate-ping opacity-20"></div>
            <div className="text-cyan-400 group-hover:scale-110 transition-transform duration-500">
                {icon}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-green-500 text-black p-1.5 rounded-full border-2 border-[#0F0F1A]">
                <Zap size={14} fill="currentColor" />
            </div>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
          Module Active
        </h2>
        <div className="text-lg text-cyan-400 font-medium mb-6 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            {label} Running
        </div>

        <p className="text-sm text-slate-400 mb-8 max-w-sm mx-auto leading-relaxed border-t border-b border-white/5 py-4">
          外部モジュールとのセキュアな接続が確立されました。<br/>
          ポップアップウィンドウで操作を続けてください。
        </p>
        
        <button
            onClick={openModule}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-cyan-600 font-lg rounded-xl hover:bg-cyan-500 focus:outline-none ring-offset-2 focus:ring-2 ring-cyan-400"
        >
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
            <span className="relative flex items-center gap-2">
                Re-Open Module <ExternalLink size={20} />
            </span>
        </button>
      </div>
    </div>
  );
};
