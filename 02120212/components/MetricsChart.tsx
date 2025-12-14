import React from 'react';

export const MetricsChart: React.FC = () => {
  // Simple SVG visualization of "Market Boost"
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
         <span className="text-xs font-bold text-slate-500 uppercase">Estimated Efficiency</span>
         <span className="text-xs text-green-400 font-mono">+12.7%</span>
      </div>
      <div className="h-24 w-full bg-slate-950 rounded border border-slate-800 relative overflow-hidden">
        <svg viewBox="0 0 100 25" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0.5)" />
              <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
            </linearGradient>
          </defs>
          <path 
            d="M0,25 L0,20 L10,18 L20,22 L30,15 L40,16 L50,10 L60,12 L70,5 L80,8 L90,2 L100,0 L100,25 Z" 
            fill="url(#grad)" 
          />
          <path 
            d="M0,20 L10,18 L20,22 L30,15 L40,16 L50,10 L60,12 L70,5 L80,8 L90,2 L100,0" 
            fill="none" 
            stroke="#22d3ee" 
            strokeWidth="0.5" 
          />
        </svg>
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_19px,#1e293b_20px)] bg-[size:20px_100%] opacity-20 pointer-events-none"></div>
      </div>
    </div>
  );
};