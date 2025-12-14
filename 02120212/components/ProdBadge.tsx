import React from "react";

interface ProdBadgeProps {
  status: "online" | "offline" | "unknown";
}

export const ProdBadge: React.FC<ProdBadgeProps> = ({ status }) => {
  const getColorClasses = () => {
    switch (status) {
      case "online":
        return "bg-green-950/30 text-green-400 border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.2)]";
      case "offline":
        return "bg-red-950/30 text-red-400 border-red-500/50";
      default:
        return "bg-slate-800/50 text-slate-400 border-slate-700";
    }
  };

  return (
    <div
      className={`inline-flex items-center px-3 py-1.5 rounded-lg border text-[10px] font-bold font-mono tracking-wider transition-all duration-300 backdrop-blur-md ${getColorClasses()}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-current'}`}></span>
      PROD: {status.toUpperCase()}
    </div>
  );
};