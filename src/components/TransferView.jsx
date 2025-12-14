import React, { useState, useEffect } from 'react';
import GlobalEmpire from '../services/global_empire'; 

const empire = new GlobalEmpire(); // グローバル金融システムを初期化

export default function TransferView() {
    const [executed, setExecuted] = useState(false);
    const [txResult, setTxResult] = useState(null);
    const [banks, setBanks] = useState([]);
    const [form, setForm] = useState({
        from_bank: 'JPM_US', 
        to_bank: 'MUFG_JP', 
        amount: 10000,
        currency: 'USD',
        transfer_type: 'SWIFT' 
    });

    useEffect(() => {
        // 全銀行データを取得し、ドロップダウン用に設定
        setBanks(empire.getAllBanks());
        // `empire`クラスはコンストラクタで初期化されるため、依存配列は空でOK
    }, []);

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleTransfer = async () => {
        // ⚡ Lightning 対応力 (電光石火対応力) をシミュレート
        const params = {
            from_bank: form.from_bank,
            to_bank: form.to_bank,
            amount: parseFloat(form.amount),
            currency: form.currency,
            iban: "DE89370400440532013000", // サンプルIBAN
            swift_code: banks.find(b => b.id === form.to_bank)?.swift || 'N/A'
        };

        try {
            let result;
            if (form.transfer_type === 'INSTANT') {
                result = await empire.instantTransfer(params);
            } else {
                result = await empire.swiftTransfer(params);
            }
            
            setTxResult(result);
            setExecuted(true);

        } catch (error) {
            console.error("Transfer failed:", error);
            setTxResult({ success: false, status: "FAILED", error: error.message });
            setExecuted(true);
        }
    };

    const StatusBadge = ({ status }) => {
        let className = 'badge';
        if (status === 'COMPLETED') className += ' success';
        else if (status === 'PROCESSING') className += ' processing';
        else if (status === 'FAILED') className += ' failure';
        return <span className={className}>{status}</span>;
    };

    return (
        <div className="hud-panel">
            <div className="hud-header">
                <h2>🔄 Transfer Oracle System</h2>
                <div className="status-badges">
                    <span className="badge oracle">🔮 Oracle</span>
                    <span className="badge lightning">⚡ Lightning</span>
                </div>
            </div>

            <div className="transfer-form">
                <div className="field-group">
                    <label>送金元アカウント:</label>
                    <p><strong>TK Global Account ***1234</strong> ({banks.find(b => b.id === form.from_bank)?.name})</p>
                </div>

                <div className="field-group">
                    <label htmlFor="to_bank">送金先銀行 (受取人):</label>
                    <select id="to_bank" name="to_bank" value={form.to_bank} onChange={handleInputChange} className="input-select">
                        {banks.map((bank) => (
                            <option key={bank.id} value={bank.id}>
                                {bank.name} ({bank.country})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="field-group half-width">
                    <label htmlFor="amount">金額:</label>
                    <input type="number" id="amount" name="amount" value={form.amount} onChange={handleInputChange} className="input-text" />
                </div>

                <div className="field-group half-width">
                    <label htmlFor="currency">通貨:</label>
                    <select id="currency" name="currency" value={form.currency} onChange={handleInputChange} className="input-select">
                        <option value="USD">USD</option>
                        <option value="JPY">JPY</option>
                        <option value="EUR">EUR</option>
                        <option value="SGD">SGD</option>
                    </select>
                </div>

                <div className="field-group">
                    <label htmlFor="transfer_type">転送スピード:</label>
                    <select id="transfer_type" name="transfer_type" value={form.transfer_type} onChange={handleInputChange} className="input-select">
                        <option value="SWIFT">SWIFT (1-3 Business Days)</option>
                        <option value="INSTANT">INSTANT (⚡ Lightning Speed)</option>
                    </select>
                </div>
                
                <button 
                    className="action-button primary" 
                    onClick={handleTransfer}
                    disabled={executed}
                >
                    {executed ? '転送済み' : '⚡ 実行 (EXECUTE)'}
                </button>
            </div>

            {executed && txResult && (
                <div className="receipt-details executed">
                    <div className="hud-subheader">
                        <h3>✅ 転送完了 (Transfer Executed)</h3>
                        <StatusBadge status={txResult.status} />
                    </div>
                    
                    <div className="field-group">
                        <p><strong>To:</strong> {txResult.to || banks.find(b => b.id === form.to_bank)?.name || form.to_bank}</p>
                        <p><strong>Amount:</strong> <span className="amount">{new Intl.NumberFormat('en-US').format(txResult.amount)} {txResult.currency}</span></p>
                        <p><strong>Method:</strong> {txResult.speed || 'SWIFT'}</p>
                        <p><strong>TX ID:</strong> <code>{txResult.tx_id}</code></p>
                        {txResult.fee > 0 && <p><strong>Fee:</strong> {txResult.fee} {txResult.currency}</p>}
                        {txResult.estimated_arrival && <p><strong>Estimated Arrival:</strong> {txResult.estimated_arrival}</p>}
                    </div>
                    
                    <div className="field-group audit">
                        <p><strong>Audit Trail:</strong> {txResult.audit_trail || 'Crystal Auditing Completed'}</p>
                    </div>
                    
                    <button className="action-button secondary" onClick={() => { setExecuted(false); setTxResult(null); }}>
                        新規転送を開始
                    </button>
                </div>
            )}
            
        </div>
    );
}
