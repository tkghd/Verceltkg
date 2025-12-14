import React, { useEffect, useState } from "react";
import { TrendingUp, AlertCircle } from "lucide-react";

interface RevenueCounterProps {
  apiUrl: string;
}

export const RevenueCounter: React.FC<RevenueCounterProps> = ({ apiUrl }) => {
  // Initial revenue base (approx 145M JPY)
  const [revenue, setRevenue] = useState<number>(145280000); 
  const [highlight, setHighlight] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        // Simulation logic: In a real app, this would fetch from apiUrl.
        // For the Godmode demo, we simulate live transaction revenue.
        const randomIncrease = Math.floor(Math.random() * 15000) + 500; // +500 to +15500 JPY
        
        setRevenue(prev => {
            const next = prev + randomIncrease;
            setHighlight(true);
            setTimeout(() => setHighlight(false), 800); // Highlight duration
            return next;
        });
        setError(false);
      } catch (err) {
        setError(true);
      }
    };

    // Poll every 3 seconds for dynamic effect
    const interval = setInterval(fetchRevenue, 3000);
    return () => clearInterval(interval);
  }, [apiUrl]);

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-500 backdrop-blur-md ${
        highlight 
          ? "bg-amber-500/10 border-amber-500/50 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)] scale-105 z-10" 
          : "bg-slate-900/30 border-slate-800 text-slate-300"
      }`}
    >
      {error ? (
        <span className="text-red-400 text-[10px] flex items-center gap-1"><AlertCircle size={10} /> ERR</span>
      ) : (
        <>
          <TrendingUp size={12} className={highlight ? "text-amber-400" : "text-slate-500"} />
          <span className="font-mono text-xs font-bold tracking-tight">
             ¥ {revenue.toLocaleString()}
          </span>
        </>
      )}
    </div>
  );
};