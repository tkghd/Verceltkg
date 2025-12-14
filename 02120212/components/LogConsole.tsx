import React, { useEffect, useRef } from 'react';

interface LogConsoleProps {
  logs: string[];
}

export const LogConsole: React.FC<LogConsoleProps> = ({ logs }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="h-full bg-slate-950 rounded-lg border border-slate-800 p-4 font-mono text-sm overflow-hidden flex flex-col shadow-inner">
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-800 text-slate-500 text-xs uppercase tracking-widest">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2">root@godmode_ultra:~</span>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1">
        {logs.map((log, i) => (
          <div key={i} className="break-words">
            <span className="text-slate-600 mr-2">{log.split(']')[0]}]</span>
            <span className={log.includes('ERROR') || log.includes('FAIL') ? 'text-red-400' : log.includes('ACTIVE') || log.includes('SUCCESS') ? 'text-green-400 font-bold' : 'text-slate-300'}>
              {log.split(']').slice(1).join(']')}
            </span>
          </div>
        ))}
        <div className="animate-pulse text-cyan-500">_</div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};