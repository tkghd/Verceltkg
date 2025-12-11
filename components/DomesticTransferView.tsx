
import React, { useState } from 'react';
import { Smartphone, Building2, RefreshCw, ArrowRight, CheckCircle2, QrCode, Mail, Phone, User } from 'lucide-react';

type DomesticMethod = 'bank' | 'paypay' | 'cotra';

export const DomesticTransferView: React.FC = () => {
  const [method, setMethod] = useState<DomesticMethod>('paypay');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const handleTransfer = () => {
    setStatus('processing');
    setTimeout(() => setStatus('success'), 1500);
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-slate-900/50 border border-green-500/30 rounded-2xl text-center animate-in zoom-in-95">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 ring-1 ring-green-500/50">
          <CheckCircle2 size={32} className="text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-1">Transfer Successful</h3>
        <p className="text-slate-400 text-sm mb-6">
          {method === 'paypay' ? 'PayPay Balance Sent' : method === 'cotra' ? 'Cotra Instant Settle' : 'Domestic Wire Sent'}
        </p>
        <button 
          onClick={() => { setStatus('idle'); setAmount(''); setRecipient(''); }}
          className="px-6 py-2 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        Domestic Instant Transfer
        <span className="text-[10px] bg-green-900/20 text-green-400 px-2 py-0.5 rounded border border-green-500/30">
          LIVE
        </span>
      </h3>

      {/* Method Select */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <button 
          onClick={() => setMethod('paypay')}
          className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${method === 'paypay' ? 'bg-red-900/20 border-red-500/50 text-red-400' : 'bg-slate-950 border-slate-800 text-slate-500 hover:bg-slate-900'}`}
        >
          <Smartphone size={20} />
          <span className="text-xs font-bold">PayPay</span>
        </button>
        <button 
          onClick={() => setMethod('cotra')}
          className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${method === 'cotra' ? 'bg-green-900/20 border-green-500/50 text-green-400' : 'bg-slate-950 border-slate-800 text-slate-500 hover:bg-slate-900'}`}
        >
          <RefreshCw size={20} />
          <span className="text-xs font-bold">Cotra</span>
        </button>
        <button 
          onClick={() => setMethod('bank')}
          className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${method === 'bank' ? 'bg-indigo-900/20 border-indigo-500/50 text-indigo-400' : 'bg-slate-950 border-slate-800 text-slate-500 hover:bg-slate-900'}`}
        >
          <Building2 size={20} />
          <span className="text-xs font-bold">Bank</span>
        </button>
      </div>

      {/* Input Form */}
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-400 mb-2 block">
            {method === 'paypay' ? 'PayPay ID / Phone' : method === 'cotra' ? 'Mobile / Email' : 'Account Number'}
          </label>
          <div className="relative">
            <input 
              type="text" 
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder={method === 'paypay' ? '090-xxxx-xxxx' : 'Recipient info...'}
              className="w-full bg-black/40 border border-slate-700 rounded-xl px-4 py-3 text-white pl-10"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
              {method === 'paypay' ? <QrCode size={18} /> : method === 'cotra' ? <Phone size={18} /> : <User size={18} />}
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-400 mb-2 block">Amount (JPY)</label>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="w-full bg-black/40 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono font-bold text-lg"
          />
          {method === 'cotra' && <p className="text-[10px] text-slate-500 mt-1">Max 100,000 JPY for Cotra</p>}
        </div>

        <button 
          disabled={!amount || !recipient || status === 'processing'}
          onClick={handleTransfer}
          className="w-full py-4 mt-2 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'processing' ? (
            <span className="animate-pulse">Processing...</span>
          ) : (
            <>Send {method === 'paypay' ? 'PayPay' : method === 'cotra' ? 'Cotra' : 'Wire'} <ArrowRight size={18} /></>
          )}
        </button>
      </div>
    </div>
  );
};
