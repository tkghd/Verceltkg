export const GlobalBankHUD = ({ list }) => (
  <div className="p-6 text-white">
    <h2 className="text-xl font-bold">🌍 Global Bank Candidates</h2>
    {list.map((b,i)=>(
      <div key={i} className="p-3 bg-white/5 mt-2 rounded">
        <p>{b.bank}</p>
        <p className="text-sm text-slate-400">{b.country}</p>
        <p className="text-cyan-400">${b.est_price_usd.toLocaleString()}</p>
      </div>
    ))}
  </div>
);
