
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, RefreshCw, Wallet, Zap, Copy, ExternalLink, Box, Crown, Sparkles, Loader2, ArrowDown, Settings2, History, Link, CheckCircle2, ShieldCheck } from 'lucide-react';
import { WalletState } from '../types';

interface CryptoViewProps {
  wallet: WalletState;
  onUpdateWallet: React.Dispatch<React.SetStateAction<WalletState>>;
}

type TokenSymbol = 'BTC' | 'ETH' | 'USDT' | 'TKG';

export const CryptoView: React.FC<CryptoViewProps> = ({ wallet, onUpdateWallet }) => {
  const [activeTab, setActiveTab] = useState<'tokens' | 'nfts' | 'defi' | 'swap'>('tokens');
  const [prices, setPrices] = useState({
    BTC: 65432.10,
    ETH: 3540.25,
    USDT: 1.00,
    TKG: 1500000.00,
    SOL: 145.80
  });

  // Loading States
  const [isLoading, setIsLoading] = useState(true);

  // Web3 State
  const [web3Account, setWeb3Account] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Swap State
  const [swapFrom, setSwapFrom] = useState<TokenSymbol>('ETH');
  const [swapTo, setSwapTo] = useState<TokenSymbol>('TKG');
  const [amountFrom, setAmountFrom] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapSuccess, setSwapSuccess] = useState(false);

  // Initial Load Simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Simulate Live Ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => ({
        BTC: prev.BTC + (Math.random() * 100 - 40),
        ETH: prev.ETH + (Math.random() * 20 - 8),
        USDT: 1.00,
        TKG: prev.TKG + (Math.random() * 500 - 100),
        SOL: prev.SOL + (Math.random() * 2 - 0.8)
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const connectWeb3 = async () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      setIsConnecting(true);
      try {
        // Request account access
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        
        // Simulate "Full API Backend" Sync
        setTimeout(() => {
           setWeb3Account(accounts[0]);
           setIsConnecting(false);
           // Re-trigger loading state for data refresh effect
           setIsLoading(true);
           setTimeout(() => setIsLoading(false), 800);
        }, 1500); 
      } catch (err) {
        setIsConnecting(false);
        console.error(err);
      }
    } else {
      alert("MetaMask or compatible Web3 wallet not detected.");
    }
  };

  // Helpers
  const parseBalance = (val: string) => parseFloat(val.replace(/,/g, '')) || 0;
  const formatBalance = (val: number, decimals: number = 2) => val.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  const getPrice = (symbol: TokenSymbol) => prices[symbol];

  const getEstimatedOutput = () => {
      const input = parseFloat(amountFrom);
      if (isNaN(input) || input <= 0) return 0;
      const rate = getPrice(swapFrom) / getPrice(swapTo);
      return input * rate;
  };

  const handleSwap = () => {
      if (!amountFrom || parseFloat(amountFrom) <= 0) return;
      setIsSwapping(true);

      setTimeout(() => {
          const inputAmt = parseFloat(amountFrom);
          const outputAmt = getEstimatedOutput();

          const fromKey = swapFrom.toLowerCase() as keyof WalletState;
          const toKey = swapTo === 'TKG' ? 'tk_coin' : swapTo.toLowerCase() as keyof WalletState; 
          
          onUpdateWallet(prev => {
              const prevFrom = parseBalance(prev[fromKey]);
              const prevTo = parseBalance(prev[toKey]);
              const newFrom = Math.max(0, prevFrom - inputAmt);
              const newTo = prevTo + outputAmt;

              return {
                  ...prev,
                  [fromKey]: formatBalance(newFrom, 2),
                  [toKey]: toKey === 'tk_coin' ? `∞` : formatBalance(newTo, 2)
              };
          });

          setIsSwapping(false);
          setSwapSuccess(true);
          
          setTimeout(() => {
              setSwapSuccess(false);
              setAmountFrom('');
          }, 3000);

      }, 1500);
  };

  const handleSwitchTokens = () => {
      setSwapFrom(swapTo);
      setSwapTo(swapFrom);
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-500">
      
      {/* Header with Web3 Connect */}
      <div className="flex justify-between items-end mb-2">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Zap className="text-amber-400" fill="currentColor" /> Crypto Wallet
          </h2>
          <div className="flex items-center gap-2 mt-1">
             <span className="text-xs text-slate-500 font-mono">Status:</span>
             {web3Account ? (
                <span className="text-xs font-bold text-green-400 bg-green-900/20 px-2 py-0.5 rounded border border-green-500/30 flex items-center gap-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                   Synced (Web3 API)
                </span>
             ) : (
                <span className="text-xs font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                   Local Mode
                </span>
             )}
          </div>
        </div>
        
        {!web3Account ? (
            <button 
                onClick={connectWeb3}
                disabled={isConnecting}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
                {isConnecting ? <Loader2 size={14} className="animate-spin" /> : <Wallet size={14} className="group-hover:scale-110 transition-transform" />}
                {isConnecting ? 'Syncing Backend...' : 'Connect Wallet'}
            </button>
        ) : (
            <div className="flex flex-col items-end gap-1">
                <button 
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-green-500/30 text-green-400 text-xs font-bold rounded-xl hover:bg-slate-700 transition-colors shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                    onClick={() => { if(confirm('Disconnect wallet?')) setWeb3Account(null); }}
                >
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    {web3Account.substring(0,6)}...{web3Account.substring(web3Account.length - 4)}
                </button>
            </div>
        )}
      </div>

      {/* Balance Hero - Only show on main tabs, hide on swap for focus */}
      {activeTab !== 'swap' && (
        isLoading ? (
            <SkeletonHero />
        ) : (
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-amber-950 via-[#1a0f00] to-black border border-amber-500/30 p-8 shadow-[0_0_40px_rgba(245,158,11,0.2)] group anim-enter-bottom">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                    <Wallet size={180} />
                </div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-amber-500 uppercase tracking-widest bg-amber-900/20 px-2 py-1 rounded border border-amber-500/20">
                        Total Valuation
                    </span>
                    {web3Account && <span className="text-[10px] text-green-400 border border-green-500/30 px-1.5 py-0.5 rounded">+ Web3 Assets</span>}
                    </div>
                    <div className="text-4xl sm:text-5xl font-mono font-bold text-white tracking-tight drop-shadow-lg mb-6">
                    $ {web3Account ? "945,842,110.52" : "845,291,004.52"}
                    </div>
                    <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-green-400 text-sm font-bold bg-green-900/20 px-3 py-1.5 rounded-lg border border-green-500/20">
                        <TrendingUp size={16} /> +{web3Account ? "14.2%" : "12.5%"} (24h)
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-sm bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                        <Copy size={14} /> {web3Account ? `${web3Account.substring(0,6)}...` : "0x71C...9A2F"}
                    </div>
                    </div>
                </div>
            </div>
        )
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-4 gap-3">
         <ActionButton icon={<ArrowUpRight size={24} />} label="Send" color="text-cyan-400" onClick={() => {}} />
         <ActionButton icon={<ArrowDownLeft size={24} />} label="Receive" color="text-green-400" onClick={() => {}} />
         <ActionButton 
            icon={<RefreshCw size={24} />} 
            label="Swap" 
            color="text-purple-400" 
            onClick={() => setActiveTab('swap')} 
            active={activeTab === 'swap'}
         />
         <ActionButton icon={<Zap size={24} />} label="Buy" color="text-amber-400" onClick={() => {}} />
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-slate-900/80 rounded-xl border border-slate-800">
         <TabButton active={activeTab === 'tokens'} onClick={() => setActiveTab('tokens')} label="Tokens" />
         <TabButton active={activeTab === 'nfts'} onClick={() => setActiveTab('nfts')} label="NFTs" />
         <TabButton active={activeTab === 'defi'} onClick={() => setActiveTab('defi')} label="DeFi" />
      </div>

      {/* SWAP UI */}
      {activeTab === 'swap' && (
          <div className="anim-enter-bottom max-w-lg mx-auto bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
             {/* Background Glow */}
             <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none"></div>
             
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Swap Tokens</h3>
                <button className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors"><Settings2 size={18} /></button>
             </div>

             {/* Swap Success Overlay */}
             {swapSuccess && (
                 <div className="absolute inset-0 z-20 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
                     <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4 ring-2 ring-green-500/50">
                         <TrendingUp size={32} className="text-green-500" />
                     </div>
                     <h3 className="text-xl font-bold text-white mb-1">Swap Completed</h3>
                     <p className="text-sm text-slate-400 mb-6">Your assets have been exchanged successfully.</p>
                     <button 
                        onClick={() => { setSwapSuccess(false); setActiveTab('tokens'); }}
                        className="px-6 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-bold hover:bg-slate-700 transition-colors"
                     >
                         Done
                     </button>
                 </div>
             )}

             <div className="space-y-2 relative">
                {/* FROM */}
                <div className="bg-black/40 border border-slate-800 rounded-2xl p-4 hover:border-slate-700 transition-colors">
                    <div className="flex justify-between mb-2 text-xs text-slate-500 font-bold">
                        <span>Sell</span>
                        <span>Balance: {wallet[swapFrom.toLowerCase() as keyof WalletState] || '0.00'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <input 
                            type="number" 
                            value={amountFrom}
                            onChange={(e) => setAmountFrom(e.target.value)}
                            placeholder="0.00"
                            className="bg-transparent text-2xl font-bold text-white focus:outline-none w-1/2 placeholder-slate-700"
                        />
                        <div className="flex items-center gap-2 bg-slate-800 rounded-xl px-3 py-1.5 cursor-pointer hover:bg-slate-700 transition-colors">
                             <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${swapFrom === 'TKG' ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white' : 'bg-slate-600 text-white'}`}>
                                 {swapFrom[0]}
                             </div>
                             <span className="font-bold text-white">{swapFrom}</span>
                             <ArrowDown size={14} className="text-slate-400" />
                        </div>
                    </div>
                    <div className="text-xs text-slate-500 mt-2">
                        ≈ $ {(parseFloat(amountFrom || '0') * prices[swapFrom]).toLocaleString()}
                    </div>
                </div>

                {/* Switcher */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <button 
                        onClick={handleSwitchTokens}
                        className="p-2 bg-slate-900 border border-slate-700 rounded-xl text-indigo-400 hover:text-white hover:border-indigo-500 transition-all shadow-lg hover:rotate-180 duration-300"
                    >
                        <ArrowDown size={20} />
                    </button>
                </div>

                {/* TO */}
                <div className="bg-black/40 border border-slate-800 rounded-2xl p-4 pt-6 hover:border-slate-700 transition-colors">
                    <div className="flex justify-between mb-2 text-xs text-slate-500 font-bold">
                        <span>Buy</span>
                        <span>Balance: {wallet[swapTo === 'TKG' ? 'tk_coin' : swapTo.toLowerCase() as keyof WalletState] || '0.00'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <input 
                            type="text" 
                            readOnly
                            value={formatBalance(getEstimatedOutput())}
                            className="bg-transparent text-2xl font-bold text-white focus:outline-none w-1/2 placeholder-slate-700"
                        />
                         <div className="flex items-center gap-2 bg-slate-800 rounded-xl px-3 py-1.5 cursor-pointer hover:bg-slate-700 transition-colors">
                             <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${swapTo === 'TKG' ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white' : 'bg-slate-600 text-white'}`}>
                                 {swapTo[0]}
                             </div>
                             <span className="font-bold text-white">{swapTo}</span>
                             <ArrowDown size={14} className="text-slate-400" />
                        </div>
                    </div>
                     <div className="text-xs text-slate-500 mt-2">
                        1 {swapFrom} = {(prices[swapFrom] / prices[swapTo]).toFixed(6)} {swapTo}
                    </div>
                </div>
             </div>

             {/* Info */}
             <div className="mt-4 p-3 rounded-lg bg-indigo-900/10 border border-indigo-500/10 text-xs text-indigo-300 space-y-1">
                 <div className="flex justify-between">
                     <span>Slippage Tolerance</span>
                     <span className="font-bold">0.5%</span>
                 </div>
                 <div className="flex justify-between">
                     <span>Network Fee</span>
                     <span className="font-bold">Free (Godmode)</span>
                 </div>
             </div>

             <button 
                disabled={isSwapping || !amountFrom || parseFloat(amountFrom) <= 0}
                onClick={handleSwap}
                className="w-full mt-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
             >
                 {isSwapping ? <Loader2 size={20} className="animate-spin" /> : <RefreshCw size={20} />}
                 {isSwapping ? 'Swapping...' : 'Swap Tokens'}
             </button>
          </div>
      )}

      {/* TOKENS VIEW */}
      {activeTab === 'tokens' && (
         <div className="space-y-3">
            {isLoading ? (
                <>
                  <SkeletonTokenRow />
                  <SkeletonTokenRow />
                  <SkeletonTokenRow />
                  <SkeletonTokenRow />
                  <SkeletonTokenRow />
                </>
            ) : (
                <div className="space-y-3 anim-enter-bottom">
                    <TokenRow 
                    symbol="TKG" 
                    name="TK Global Coin" 
                    amount={wallet.tk_coin} 
                    value={`$ ${(1500000 * 999999).toLocaleString()}`} 
                    price={prices.TKG} 
                    change={+15.4} 
                    icon={<Crown size={20} className="text-white" />} 
                    color="bg-gradient-to-br from-amber-500 to-orange-600"
                    />
                    {web3Account && (
                        <TokenRow 
                            symbol="WETH" 
                            name="Wrapped Ether" 
                            amount="45.2" 
                            value="$ 156,780" 
                            price={3468.50} 
                            change={-1.2} 
                            icon={<span className="text-white font-bold text-sm">W</span>} 
                            color="bg-purple-600"
                            isWeb3
                        />
                    )}
                    <TokenRow 
                    symbol="BTC" 
                    name="Bitcoin" 
                    amount={wallet.btc} 
                    value={`$ ${(parseBalance(wallet.btc) * prices.BTC).toLocaleString(undefined, {maximumFractionDigits: 0})}`} 
                    price={prices.BTC} 
                    change={+2.4} 
                    icon={<span className="text-white font-bold text-lg">₿</span>} 
                    color="bg-[#F7931A]"
                    />
                    <TokenRow 
                    symbol="ETH" 
                    name="Ethereum" 
                    amount={wallet.eth} 
                    value={`$ ${(parseBalance(wallet.eth) * prices.ETH).toLocaleString(undefined, {maximumFractionDigits: 0})}`} 
                    price={prices.ETH} 
                    change={-0.5} 
                    icon={<span className="text-white font-bold text-lg">Ξ</span>} 
                    color="bg-[#627EEA]"
                    />
                    <TokenRow 
                    symbol="USDT" 
                    name="Tether USD" 
                    amount={wallet.usdt} 
                    value={`$ ${wallet.usdt}`} 
                    price={1.00} 
                    change={0.01} 
                    icon={<span className="text-white font-bold text-sm">T</span>} 
                    color="bg-[#26A17B]"
                    />
                </div>
            )}
         </div>
      )}

      {/* NFTs VIEW */}
      {activeTab === 'nfts' && (
         <div className="grid grid-cols-2 gap-4 anim-enter-bottom">
            <NFTCard name="Godmode Access Key #001" collection="Genesis Prime" value="150 ETH" image="https://www.transparenttextures.com/patterns/cubes.png" color="from-cyan-500 to-blue-600" />
            <NFTCard name="Cyber Samurai #888" collection="Neo Tokyo" value="45 ETH" image="https://www.transparenttextures.com/patterns/carbon-fibre.png" color="from-red-500 to-rose-600" />
            {web3Account && (
                <NFTCard name="Bored Ape #9999" collection="BAYC" value="88 ETH" image="https://www.transparenttextures.com/patterns/diagmonds-light.png" color="from-yellow-600 to-orange-700" />
            )}
            <NFTCard name="Golden Vault" collection="TKG Assets" value="∞ TKG" image="https://www.transparenttextures.com/patterns/wood-pattern.png" color="from-amber-400 to-yellow-600" />
            <NFTCard name="Void Walker" collection="Unknown" value="???" image="https://www.transparenttextures.com/patterns/black-scales.png" color="from-purple-500 to-indigo-900" />
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

              {web3Account && (
                 <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-900/40 to-slate-900 border border-purple-500/30 border-dashed">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                              <Link size={20} />
                          </div>
                          <div>
                              <div className="text-white font-bold">Curve.fi Pool</div>
                              <div className="text-xs text-purple-300">External Web3 Protocol</div>
                          </div>
                      </div>
                      <span className="text-2xl font-bold text-slate-300 font-mono">15% APR</span>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 flex justify-between items-center">
                      <span className="text-xs text-slate-400">Liquidity Provided</span>
                      <span className="text-sm font-mono font-bold text-white">$ 125,000</span>
                  </div>
                 </div>
              )}

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

    </div>
  );
};

// Skeletons
const SkeletonHero: React.FC = () => (
    <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 border border-slate-800 p-8 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-[shimmer_2s_infinite]"></div>
        <div className="flex flex-col gap-4">
            <div className="w-32 h-6 bg-slate-800 rounded-md"></div>
            <div className="w-64 h-12 bg-slate-800 rounded-lg"></div>
            <div className="flex gap-4">
                <div className="w-24 h-8 bg-slate-800 rounded-md"></div>
                <div className="w-32 h-8 bg-slate-800 rounded-md"></div>
            </div>
        </div>
    </div>
);

const SkeletonTokenRow: React.FC = () => (
    <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-800 animate-pulse"></div>
            <div className="space-y-2">
                <div className="w-24 h-4 bg-slate-800 rounded animate-pulse"></div>
                <div className="w-16 h-3 bg-slate-800 rounded animate-pulse"></div>
            </div>
        </div>
        <div className="space-y-2 flex flex-col items-end">
            <div className="w-20 h-4 bg-slate-800 rounded animate-pulse"></div>
            <div className="w-12 h-3 bg-slate-800 rounded animate-pulse"></div>
        </div>
    </div>
);

const ActionButton: React.FC<{ icon: React.ReactNode, label: string, color: string, onClick?: () => void, active?: boolean }> = ({ icon, label, color, onClick, active }) => (
    <button 
        onClick={onClick}
        className={`flex flex-col items-center gap-2 p-3 bg-slate-900 border rounded-2xl transition-all active:scale-95 group ${active ? 'border-indigo-500 bg-indigo-900/20' : 'border-slate-800 hover:bg-slate-800'}`}
    >
        <div className={`p-3 rounded-full shadow-inner group-hover:scale-110 transition-transform ${active ? 'bg-indigo-500 text-white' : `bg-slate-950 ${color}`}`}>
            {icon}
        </div>
        <span className={`text-xs font-bold ${active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>{label}</span>
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

const TokenRow: React.FC<{ symbol: string, name: string, amount: string, value: string, price: number, change: number, icon: React.ReactNode, color: string, isWeb3?: boolean }> = ({ symbol, name, amount, value, price, change, icon, color, isWeb3 }) => (
    <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-slate-600 transition-colors relative overflow-hidden">
        {isWeb3 && <div className="absolute top-0 right-0 bg-green-900/40 text-green-400 text-[9px] px-1.5 py-0.5 rounded-bl font-bold">WEB3</div>}
        <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${color}`}>
                {icon}
            </div>
            <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">{name}</div>
                <div className="text-xs text-slate-500 font-mono">{price.toLocaleString(undefined, {style: 'currency', currency: 'USD'})}</div>
            </div>
        </div>
        <div className="text-right">
            <div className="text-sm font-bold text-white font-mono">{amount}</div>
            <div className={`text-xs font-mono flex items-center justify-end gap-1 ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {change >= 0 ? '+' : ''}{change.toFixed(2)}%
            </div>
        </div>
    </div>
);

const NFTCard: React.FC<{ name: string, collection: string, value: string, image: string, color: string }> = ({ name, collection, value, image, color }) => {
    const [loaded, setLoaded] = useState(false);
    
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-slate-600 transition-all relative hover:shadow-[0_0_20px_rgba(79,70,229,0.15)]">
            <div className={`h-40 w-full bg-gradient-to-br ${color} relative flex items-center justify-center overflow-hidden`}>
                
                {/* Loading Placeholder */}
                <div className={`absolute inset-0 flex items-center justify-center bg-slate-800 z-10 transition-opacity duration-500 ${loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
                    <Loader2 size={24} className="text-indigo-400 animate-spin" />
                </div>

                {/* Actual Image */}
                <img 
                    src={image} 
                    alt={name}
                    className={`w-full h-full object-cover relative z-0 transition-all duration-700 transform ${loaded ? 'opacity-100 scale-100 group-hover:scale-110' : 'opacity-0 scale-105'}`}
                    onLoad={() => setLoaded(true)}
                />
                
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[10px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                   ERC-721
                </div>
            </div>
            
            <div className="p-4 relative z-10 bg-slate-900">
                <div className="flex justify-between items-start mb-1">
                    <div className="text-[10px] text-indigo-400 uppercase font-bold tracking-wider">{collection}</div>
                    <div className="text-[10px] text-slate-500 font-mono">#{Math.floor(Math.random()*9999)}</div>
                </div>
                <div className="text-sm font-bold text-white truncate mb-3">{name}</div>
                
                <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500">Floor Price</span>
                        <span className="text-xs font-mono font-bold text-slate-300">{value}</span>
                    </div>
                    <button className="px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-bold rounded-lg transition-colors">
                        Bid
                    </button>
                </div>
            </div>
        </div>
    );
};
