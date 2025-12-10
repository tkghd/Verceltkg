
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, RefreshCw, Wallet, Zap, Copy, ExternalLink, Box, Crown, Sparkles, ArrowUp, ArrowDown, Filter, X, Maximize2, Tag, Share2, Info } from 'lucide-react';
import { WalletState } from '../types';

interface CryptoViewProps {
  wallet: WalletState;
}

type SortKey = 'name' | 'amount' | 'value' | 'change';
type SortDirection = 'asc' | 'desc';

// NFT Data Structure
interface NFTItem {
  id: string;
  name: string;
  collection: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'God';
  value: string;
  image: string; // CSS pattern or URL
  color: string;
  description: string;
}

const NFT_DATA: NFTItem[] = [
  { 
    id: '1', 
    name: "Godmode Access Key #001", 
    collection: "Genesis Prime", 
    rarity: "God", 
    value: "150 ETH", 
    image: "https://www.transparenttextures.com/patterns/cubes.png", 
    color: "from-cyan-500 to-blue-600",
    description: "The original key to the Omega Vault. Grants absolute administrative privileges across the TKG ecosystem."
  },
  { 
    id: '2', 
    name: "Cyber Samurai #888", 
    collection: "Neo Tokyo", 
    rarity: "Legendary", 
    value: "45 ETH", 
    image: "https://www.transparenttextures.com/patterns/carbon-fibre.png", 
    color: "from-red-500 to-rose-600",
    description: "Elite protector unit. Features complete stealth coating and dual-wield plasma Katanas."
  },
  { 
    id: '3', 
    name: "Golden Vault", 
    collection: "TKG Assets", 
    rarity: "Epic", 
    value: "∞ TKG", 
    image: "https://www.transparenttextures.com/patterns/wood-pattern.png", 
    color: "from-amber-400 to-yellow-600",
    description: "Visual representation of the infinite liquidity pool. Holding this grants yield farming boosts."
  },
  { 
    id: '4', 
    name: "Void Walker", 
    collection: "Unknown", 
    rarity: "Rare", 
    value: "???", 
    image: "https://www.transparenttextures.com/patterns/black-scales.png", 
    color: "from-purple-500 to-indigo-900",
    description: "An entity from the null sector. Properties are currently unanalyzable by standard scanners."
  },
  { 
    id: '5', 
    name: "Neon District Deed", 
    collection: "Neo Tokyo", 
    rarity: "Epic", 
    value: "80 ETH", 
    image: "https://www.transparenttextures.com/patterns/diagmonds-light.png", 
    color: "from-pink-500 to-fuchsia-600",
    description: "Land ownership deed for the prime entertainment district of Neo Tokyo."
  },
  { 
    id: '6', 
    name: "Genesis Cube", 
    collection: "Genesis Prime", 
    rarity: "Legendary", 
    value: "120 ETH", 
    image: "https://www.transparenttextures.com/patterns/hexellence.png", 
    color: "from-emerald-400 to-teal-600",
    description: "A tesseract containing the source code of the first banking algorithm."
  }
];

export const CryptoView: React.FC<CryptoViewProps> = ({ wallet }) => {
  const [activeTab, setActiveTab] = useState<'tokens' | 'nfts' | 'defi'>('tokens');
  const [prices, setPrices] = useState({
    BTC: 65432.10,
    ETH: 3540.25,
    SOL: 145.80,
    TKG: 1500000.00
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({ key: 'value', direction: 'desc' });
  
  // NFT States
  const [nftFilter, setNftFilter] = useState<string>('All');
  const [selectedNft, setSelectedNft] = useState<NFTItem | null>(null);

  const updatePrices = useCallback(() => {
    setPrices(prev => ({
      BTC: prev.BTC + (Math.random() * 100 - 40),
      ETH: prev.ETH + (Math.random() * 20 - 8),
      SOL: prev.SOL + (Math.random() * 2 - 0.8),
      TKG: prev.TKG + (Math.random() * 500 - 100)
    }));
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    updatePrices();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const handleSort = (key: SortKey) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  // Simulate Live Ticker
  useEffect(() => {
    const interval = setInterval(updatePrices, 2000);
    return () => clearInterval(interval);
  }, [updatePrices]);

  // Construct Token Data
  const tokens = useMemo(() => {
    const parseVal = (s: string) => {
      if (!s) return 0;
      if (s.includes('∞') || s.includes('INFINITE')) return Number.MAX_VALUE;
      return parseFloat(s.replace(/,/g, ''));
    };

    return [
      {
        id: 'tkg',
        symbol: "TKG",
        name: "TK Global Coin",
        amountStr: wallet.tk_coin,
        amountNum: parseVal(wallet.tk_coin),
        price: prices.TKG,
        change: 15.4,
        icon: <Crown size={20} className="text-white" />,
        color: "bg-gradient-to-br from-amber-500 to-orange-600"
      },
      {
        id: 'btc',
        symbol: "BTC",
        name: "Bitcoin",
        amountStr: wallet.btc,
        amountNum: parseVal(wallet.btc),
        price: prices.BTC,
        change: 2.4,
        icon: <span className="text-white font-bold text-lg">₿</span>,
        color: "bg-[#F7931A]"
      },
      {
        id: 'eth',
        symbol: "ETH",
        name: "Ethereum",
        amountStr: wallet.eth,
        amountNum: parseVal(wallet.eth),
        price: prices.ETH,
        change: -0.5,
        icon: <span className="text-white font-bold text-lg">Ξ</span>,
        color: "bg-[#627EEA]"
      },
      {
        id: 'usdt',
        symbol: "USDT",
        name: "Tether USD",
        amountStr: wallet.usdt,
        amountNum: parseVal(wallet.usdt),
        price: 1.00,
        change: 0.01,
        icon: <span className="text-white font-bold text-sm">T</span>,
        color: "bg-[#26A17B]"
      }
    ];
  }, [wallet, prices]);

  // Sort Tokens
  const sortedTokens = useMemo(() => {
    const sorted = [...tokens];
    sorted.sort((a, b) => {
      let valA: number | string = 0;
      let valB: number | string = 0;

      switch (sortConfig.key) {
        case 'name':
          valA = a.name;
          valB = b.name;
          break;
        case 'amount':
          valA = a.amountNum;
          valB = b.amountNum;
          break;
        case 'value':
          valA = a.amountNum * a.price;
          valB = b.amountNum * b.price;
          break;
        case 'change':
          valA = a.change;
          valB = b.change;
          break;
      }

      if (valA === valB) return 0;
      
      const comparison = valA < valB ? -1 : 1;
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
    return sorted;
  }, [tokens, sortConfig]);

  // Filter NFTs
  const filteredNFTs = useMemo(() => {
    if (nftFilter === 'All') return NFT_DATA;
    // Check if filter matches collection or rarity
    return NFT_DATA.filter(nft => nft.collection === nftFilter || nft.rarity === nftFilter);
  }, [nftFilter]);

  const nftFilters = ['All', 'Genesis Prime', 'Neo Tokyo', 'TKG Assets', 'God', 'Legendary', 'Epic', 'Rare'];

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-500 relative">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-2">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Zap className="text-amber-400" fill="currentColor" /> Crypto Wallet
          </h2>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Connected: <span className="text-green-400">ΩMAX Chain (Mainnet)</span>
          </p>
        </div>
        <div className="flex gap-2">
            <button 
                onClick={handleManualRefresh}
                className={`p-2 bg-slate-800/50 rounded-lg text-slate-400 border border-slate-700 hover:text-white transition-colors ${isRefreshing ? 'animate-spin text-amber-400 border-amber-500/50' : ''}`}
                title="Refresh Prices"
            >
                <RefreshCw size={18} />
            </button>
            <button className="p-2 bg-slate-800/50 rounded-lg text-slate-400 border border-slate-700 hover:text-white transition-colors">
                <ExternalLink size={18} />
            </button>
        </div>
      </div>

      {/* Balance Hero */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-amber-950 via-[#1a0f00] to-black border border-amber-500/30 p-8 shadow-[0_0_40px_rgba(245,158,11,0.2)] group">
         <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
            <Wallet size={180} />
         </div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
         
         <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
               <span className="text-xs font-bold text-amber-500 uppercase tracking-widest bg-amber-900/20 px-2 py-1 rounded border border-amber-500/20">
                  Total Valuation
               </span>
            </div>
            <div className="text-4xl sm:text-5xl font-mono font-bold text-white tracking-tight drop-shadow-lg mb-6">
               $ 845,291,004.52
            </div>
            <div className="flex gap-4">
               <div className="flex items-center gap-2 text-green-400 text-sm font-bold bg-green-900/20 px-3 py-1.5 rounded-lg border border-green-500/20">
                  <TrendingUp size={16} /> +12.5% (24h)
               </div>
               <div className="flex items-center gap-2 text-slate-400 text-sm bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                  <Copy size={14} /> 0x71...9A2F
               </div>
            </div>
         </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-4 gap-3">
         <ActionButton icon={<ArrowUpRight size={24} />} label="Send" color="text-cyan-400" />
         <ActionButton icon={<ArrowDownLeft size={24} />} label="Receive" color="text-green-400" />
         <ActionButton icon={<RefreshCw size={24} />} label="Swap" color="text-purple-400" />
         <ActionButton icon={<Zap size={24} />} label="Buy" color="text-amber-400" />
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-slate-900/80 rounded-xl border border-slate-800">
         <TabButton active={activeTab === 'tokens'} onClick={() => setActiveTab('tokens')} label="Tokens" />
         <TabButton active={activeTab === 'nfts'} onClick={() => setActiveTab('nfts')} label="NFTs" />
         <TabButton active={activeTab === 'defi'} onClick={() => setActiveTab('defi')} label="DeFi Yield" />
      </div>

      {/* TOKENS VIEW */}
      {activeTab === 'tokens' && (
         <div className="space-y-3 anim-enter-bottom">
            {/* Sort Controls */}
            <div className="flex items-center justify-between px-2 pb-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
               <div className="flex gap-4">
                  <SortButton label="Name" active={sortConfig.key === 'name'} direction={sortConfig.direction} onClick={() => handleSort('name')} />
               </div>
               <div className="flex gap-4">
                  <SortButton label="Balance" active={sortConfig.key === 'amount'} direction={sortConfig.direction} onClick={() => handleSort('amount')} />
                  <SortButton label="Value" active={sortConfig.key === 'value'} direction={sortConfig.direction} onClick={() => handleSort('value')} />
                  <SortButton label="24h" active={sortConfig.key === 'change'} direction={sortConfig.direction} onClick={() => handleSort('change')} />
               </div>
            </div>

            {sortedTokens.map(token => {
               // Calculate display value handling infinite
               const displayValue = token.amountNum === Number.MAX_VALUE 
                  ? `$ ${(1500000 * 999999).toLocaleString()}` // Mock calculation for display consistency
                  : `$ ${(token.amountNum * token.price).toLocaleString(undefined, {maximumFractionDigits: 0})}`;

               return (
                  <TokenRow 
                     key={token.id}
                     symbol={token.symbol}
                     name={token.name} 
                     amount={token.amountStr} 
                     value={displayValue} 
                     price={token.price} 
                     change={token.change} 
                     icon={token.icon} 
                     color={token.color}
                  />
               );
            })}
         </div>
      )}

      {/* NFTs VIEW */}
      {activeTab === 'nfts' && (
         <div className="space-y-4 anim-enter-bottom">
            
            {/* Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
               <div className="flex items-center gap-2 px-2 py-1 text-slate-500">
                  <Filter size={14} />
               </div>
               {nftFilters.map(filter => (
                  <button
                     key={filter}
                     onClick={() => setNftFilter(filter)}
                     className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                        nftFilter === filter 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                     }`}
                  >
                     {filter}
                  </button>
               ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-4">
               {filteredNFTs.map(nft => (
                  <NFTCard 
                     key={nft.id} 
                     nft={nft} 
                     onClick={() => setSelectedNft(nft)} 
                  />
               ))}
               {filteredNFTs.length === 0 && (
                  <div className="col-span-2 text-center py-12 text-slate-500 text-sm">
                     No assets found in this category.
                  </div>
               )}
            </div>
         </div>
      )}

      {/* DeFi VIEW */}
      {activeTab === 'defi' && (
          <div className="space-y-4 anim-enter-bottom">
              <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-900/40 to-slate-900 border border-indigo-500/30">
                  <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                              <Sparkles size={20} />
                          </div>
                          <div>
                              <div className="text-white font-bold">Godmode Staking Pool</div>
                              <div className="text-xs text-indigo-300">Auto-Compounding</div>
                          </div>
                      </div>
                      <span className="text-2xl font-bold text-green-400 font-mono">9,999% APY</span>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 flex justify-between items-center mb-3">
                      <span className="text-xs text-slate-400">Staked Amount</span>
                      <span className="text-sm font-mono font-bold text-white">500,000 TKG</span>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 flex justify-between items-center">
                      <span className="text-xs text-slate-400">Pending Rewards</span>
                      <span className="text-sm font-mono font-bold text-amber-400 flex items-center gap-1">
                          <Zap size={12} fill="currentColor" /> 12,450 TKG
                      </span>
                  </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-900/40 to-slate-900 border border-cyan-500/30">
                  <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                              <RefreshCw size={20} />
                          </div>
                          <div>
                              <div className="text-white font-bold">ETH / TKG Liquidity</div>
                              <div className="text-xs text-cyan-300">Uniswap V3 (Godmode)</div>
                          </div>
                      </div>
                      <span className="text-2xl font-bold text-green-400 font-mono">450% APR</span>
                  </div>
                  <button className="w-full py-3 bg-cyan-500/10 border border-cyan-500/50 rounded-xl text-cyan-400 font-bold hover:bg-cyan-500/20 transition-colors">
                      Manage Position
                  </button>
              </div>
          </div>
      )}

      {/* NFT Preview Modal */}
      {selectedNft && (
         <NFTPreviewModal nft={selectedNft} onClose={() => setSelectedNft(null)} />
      )}

    </div>
  );
};

const SortButton: React.FC<{ label: string, active: boolean, direction: SortDirection, onClick: () => void }> = ({ label, active, direction, onClick }) => (
   <button onClick={onClick} className={`flex items-center gap-1 hover:text-white transition-colors ${active ? 'text-amber-400' : 'text-slate-500'}`}>
      {label}
      {active && (direction === 'asc' ? <ArrowUp size={10} /> : <ArrowDown size={10} />)}
   </button>
);

const ActionButton: React.FC<{ icon: React.ReactNode, label: string, color: string }> = ({ icon, label, color }) => (
    <button className="flex flex-col items-center gap-2 p-3 bg-slate-900 border border-slate-800 rounded-2xl hover:bg-slate-800 transition-all active:scale-95 group">
        <div className={`p-3 rounded-full bg-slate-950 shadow-inner group-hover:scale-110 transition-transform ${color}`}>
            {icon}
        </div>
        <span className="text-xs font-bold text-slate-400 group-hover:text-white">{label}</span>
    </button>
);

const TabButton: React.FC<{ active: boolean, onClick: () => void, label: string }> = ({ active, onClick, label }) => (
    <button 
        onClick={onClick}
        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${active ? 'bg-slate-700 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
    >
        {label}
    </button>
);

const TokenRow: React.FC<{ symbol: string, name: string, amount: string, value: string, price: number, change: number, icon: React.ReactNode, color: string }> = ({ symbol, name, amount, value, price, change, icon, color }) => (
    <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-slate-600 transition-colors">
        <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${color}`}>
                {icon}
            </div>
            <div>
                <div className="text-sm font-bold text-white">{name}</div>
                <div className="text-xs text-slate-500 font-mono">{price.toLocaleString(undefined, {style: 'currency', currency: 'USD'})}</div>
            </div>
        </div>
        <div className="text-right">
            <div className="text-sm font-bold text-white font-mono">{value}</div>
            <div className={`text-xs font-mono flex items-center justify-end gap-1 ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {change >= 0 ? '+' : ''}{change.toFixed(2)}%
            </div>
        </div>
    </div>
);

const NFTCard: React.FC<{ nft: NFTItem; onClick: () => void }> = ({ nft, onClick }) => (
    <div 
       onClick={onClick}
       className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-indigo-500/50 transition-all cursor-pointer relative shadow-lg hover:shadow-indigo-500/10 active:scale-95"
    >
        <div className={`h-32 w-full bg-gradient-to-br ${nft.color} relative p-4 flex items-center justify-center overflow-hidden`}>
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
            <Box size={40} className="text-white/50 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 relative z-10" />
            
            {/* Rarity Tag */}
            <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/50 backdrop-blur-sm text-[8px] font-bold text-white uppercase tracking-wider border border-white/10">
               {nft.rarity}
            </div>
        </div>
        <div className="p-3">
            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider truncate">{nft.collection}</div>
            <div className="text-sm font-bold text-white truncate">{nft.name}</div>
            <div className="mt-2 pt-2 border-t border-slate-800 flex justify-between items-center">
                <span className="text-[10px] text-slate-400">Floor</span>
                <span className="text-xs font-mono font-bold text-white">{nft.value}</span>
            </div>
        </div>
    </div>
);

const NFTPreviewModal: React.FC<{ nft: NFTItem; onClose: () => void }> = ({ nft, onClose }) => {
   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
         {/* Backdrop */}
         <div 
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300"
            onClick={onClose}
         />
         
         {/* Modal Content */}
         <div className="relative z-10 w-full max-w-sm bg-[#0a0a15] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="absolute top-4 right-4 z-20">
               <button onClick={onClose} className="p-2 bg-black/50 text-white rounded-full hover:bg-white/20 backdrop-blur-md transition-colors">
                  <X size={20} />
               </button>
            </div>

            {/* Large Image Area */}
            <div className={`h-72 w-full bg-gradient-to-br ${nft.color} relative flex items-center justify-center`}>
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a15] to-transparent opacity-80"></div>
               <Box size={80} className="text-white/80 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] animate-float" />
               
               <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-white backdrop-blur-md`}>
                         {nft.rarity}
                      </span>
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{nft.collection}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white leading-tight">{nft.name}</h2>
               </div>
            </div>

            {/* Details */}
            <div className="p-6 space-y-6">
               <div className="flex gap-4 text-sm">
                  <div className="flex-1 bg-slate-900/50 p-3 rounded-xl border border-slate-800 text-center">
                     <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Estimated Value</div>
                     <div className="font-mono font-bold text-white">{nft.value}</div>
                  </div>
                  <div className="flex-1 bg-slate-900/50 p-3 rounded-xl border border-slate-800 text-center">
                     <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Token ID</div>
                     <div className="font-mono font-bold text-white">#{nft.id.padStart(4, '0')}</div>
                  </div>
               </div>

               <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-2">
                     <Info size={12} /> Description
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                     {nft.description}
                  </p>
               </div>

               {/* Actions */}
               <div className="flex gap-3 pt-2">
                  <button className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-transform flex items-center justify-center gap-2">
                     <Tag size={18} /> List for Sale
                  </button>
                  <button className="p-3 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 transition-colors">
                     <Share2 size={20} />
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};
