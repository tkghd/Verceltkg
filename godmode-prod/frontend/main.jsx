import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [locale, setLocale] = useState('ja');
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('home');
  const [balance, setBalance] = useState({
    total: 12847563.89,
    owner: 8234521.45,
    corporate: 3456789.12,
    web3: 1156253.32
  });

  const translations = {
    ja: {
      home: 'ホーム', transfer: '送金', cards: 'カード', analytics: '収支', settings: '設定',
      totalAssets: '総資産', owner: 'オーナー', corporate: '法人', web3Wallet: 'Web3ウォレット',
      bankTransfer: '銀行送金', paypay: 'PayPay', kotora: 'Kotora', atmWithdraw: 'ATM出金',
      virtualCard: 'バーチャルカード', physicalCard: '物理カード',
      dailyProfit: '日利益', monthlyProfit: '月利益', yearlyProfit: '年利益',
      systemManagement: 'システム管理', uiTheme: 'UIテーマ', language: '言語'
    },
    en: {
      home: 'Home', transfer: 'Transfer', cards: 'Cards', analytics: 'Analytics', settings: 'Settings',
      totalAssets: 'Total Assets', owner: 'Owner', corporate: 'Corporate', web3Wallet: 'Web3 Wallet',
      bankTransfer: 'Bank Transfer', paypay: 'PayPay', kotora: 'Kotora', atmWithdraw: 'ATM Withdraw',
      virtualCard: 'Virtual Card', physicalCard: 'Physical Card',
      dailyProfit: 'Daily P&L', monthlyProfit: 'Monthly P&L', yearlyProfit: 'Yearly P&L',
      systemManagement: 'System', uiTheme: 'UI Theme', language: 'Language'
    },
    zh: {
      home: '首页', transfer: '转账', cards: '卡片', analytics: '收支', settings: '设置',
      totalAssets: '总资产', owner: '所有者', corporate: '法人', web3Wallet: 'Web3钱包',
      bankTransfer: '银行转账', paypay: 'PayPay', kotora: 'Kotora', atmWithdraw: 'ATM取款',
      virtualCard: '虚拟卡', physicalCard: '实体卡',
      dailyProfit: '日收益', monthlyProfit: '月收益', yearlyProfit: '年收益',
      systemManagement: '系统管理', uiTheme: 'UI主题', language: '语言'
    },
    ko: {
      home: '홈', transfer: '송금', cards: '카드', analytics: '수지', settings: '설정',
      totalAssets: '총자산', owner: '소유자', corporate: '법인', web3Wallet: 'Web3 지갑',
      bankTransfer: '은행 송금', paypay: 'PayPay', kotora: 'Kotora', atmWithdraw: 'ATM 출금',
      virtualCard: '가상 카드', physicalCard: '실물 카드',
      dailyProfit: '일일 수익', monthlyProfit: '월간 수익', yearlyProfit: '연간 수익',
      systemManagement: '시스템 관리', uiTheme: 'UI 테마', language: '언어'
    },
    es: {
      home: 'Inicio', transfer: 'Transferir', cards: 'Tarjetas', analytics: 'Análisis', settings: 'Ajustes',
      totalAssets: 'Activos Totales', owner: 'Propietario', corporate: 'Corporativo', web3Wallet: 'Billetera Web3',
      bankTransfer: 'Transferencia', paypay: 'PayPay', kotora: 'Kotora', atmWithdraw: 'Retiro ATM',
      virtualCard: 'Tarjeta Virtual', physicalCard: 'Tarjeta Física',
      dailyProfit: 'P&L Diario', monthlyProfit: 'P&L Mensual', yearlyProfit: 'P&L Anual',
      systemManagement: 'Sistema', uiTheme: 'Tema UI', language: 'Idioma'
    }
  };

  const t = translations[locale];

  const themes = {
    dark: { bg: '#0a0e27', card: 'rgba(255,255,255,0.05)', text: '#fff', accent: '#667eea' },
    blue: { bg: '#1e3a8a', card: 'rgba(255,255,255,0.1)', text: '#fff', accent: '#60a5fa' },
    purple: { bg: '#4c1d95', card: 'rgba(255,255,255,0.1)', text: '#fff', accent: '#a78bfa' }
  };

  const currentTheme = themes[theme];

  return (
    <div style={{
      minHeight: '100vh',
      background: currentTheme.bg,
      color: currentTheme.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      transition: 'background 0.3s ease'
    }}>
      {/* Header */}
      <header style={{
        padding: '16px 24px',
        background: 'rgba(0,0,0,0.2)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.accent}dd)`,
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px'
          }}>🏦</div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>TKG Global Bank</h1>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setLocale(locale === 'ja' ? 'en' : locale === 'en' ? 'zh' : locale === 'zh' ? 'ko' : locale === 'ko' ? 'es' : 'ja')} style={{
            padding: '8px 16px',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '8px',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '14px'
          }}>🌐 {locale.toUpperCase()}</button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
        {activeTab === 'home' && <HomeView balance={balance} t={t} theme={currentTheme} />}
        {activeTab === 'transfer' && <TransferView t={t} theme={currentTheme} />}
        {activeTab === 'cards' && <CardsView t={t} theme={currentTheme} />}
        {activeTab === 'analytics' && <AnalyticsView t={t} theme={currentTheme} />}
        {activeTab === 'settings' && <SettingsView t={t} theme={currentTheme} themeState={[theme, setTheme]} />}
      </main>

      {/* Bottom Navigation */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '12px 0'
      }}>
        {[
          { id: 'home', icon: '🏠', label: t.home },
          { id: 'transfer', icon: '💸', label: t.transfer },
          { id: 'cards', icon: '💳', label: t.cards },
          { id: 'analytics', icon: '📊', label: t.analytics },
          { id: 'settings', icon: '⚙️', label: t.settings }
        ].map(item => (
          <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
            background: activeTab === item.id ? 'rgba(255,255,255,0.15)' : 'transparent',
            border: 'none',
            borderRadius: '12px',
            padding: '8px 16px',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            transition: 'all 0.3s'
          }}>
            <span style={{ fontSize: '20px' }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

function HomeView({ balance, t, theme }) {
  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* Total Balance Card */}
      <div style={{
        background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}cc)`,
        borderRadius: '24px',
        padding: '32px',
        marginBottom: '24px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>{t.totalAssets}</div>
        <div style={{ fontSize: '48px', fontWeight: '800', marginBottom: '16px' }}>
          ¥{balance.total.toLocaleString('ja-JP', { minimumFractionDigits: 2 })}
        </div>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '120px' }}>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>{t.owner}</div>
            <div style={{ fontSize: '18px', fontWeight: '700' }}>¥{(balance.owner / 1000000).toFixed(2)}M</div>
          </div>
          <div style={{ flex: 1, minWidth: '120px' }}>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>{t.corporate}</div>
            <div style={{ fontSize: '18px', fontWeight: '700' }}>¥{(balance.corporate / 1000000).toFixed(2)}M</div>
          </div>
          <div style={{ flex: 1, minWidth: '120px' }}>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>{t.web3Wallet}</div>
            <div style={{ fontSize: '18px', fontWeight: '700' }}>¥{(balance.web3 / 1000000).toFixed(2)}M</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {[
          { icon: '🏦', label: t.bankTransfer, color: '#10b981' },
          { icon: '📱', label: t.paypay, color: '#ef4444' },
          { icon: '🔄', label: t.kotora, color: '#f59e0b' },
          { icon: '🏧', label: t.atmWithdraw, color: '#8b5cf6' }
        ].map((action, i) => (
          <div key={i} style={{
            background: theme.card,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{action.icon}</div>
            <div style={{ fontSize: '13px', fontWeight: '600' }}>{action.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div style={{
        background: theme.card,
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>最近の取引</h3>
        {[
          { name: 'Amazon Japan', amount: -12450, date: '2025-12-13', type: '購入' },
          { name: '給与振込', amount: 458000, date: '2025-12-10', type: '入金' },
          { name: 'Starbucks', amount: -680, date: '2025-12-12', type: '購入' }
        ].map((tx, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none'
          }}>
            <div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>{tx.name}</div>
              <div style={{ fontSize: '12px', opacity: 0.6 }}>{tx.date} • {tx.type}</div>
            </div>
            <div style={{
              fontSize: '18px',
              fontWeight: '700',
              color: tx.amount > 0 ? '#10b981' : '#fff'
            }}>
              {tx.amount > 0 ? '+' : ''}¥{tx.amount.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TransferView({ t, theme }) {
  return (
    <div style={{ paddingBottom: '100px' }}>
      <h2 style={{ marginBottom: '24px' }}>💸 {t.transfer}</h2>
      <div style={{
        background: theme.card,
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        padding: '24px'
      }}>
        <input placeholder="送金先を入力" style={{
          width: '100%',
          padding: '16px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          color: '#fff',
          fontSize: '16px',
          marginBottom: '16px'
        }} />
        <input placeholder="金額を入力" type="number" style={{
          width: '100%',
          padding: '16px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          color: '#fff',
          fontSize: '16px',
          marginBottom: '16px'
        }} />
        <button style={{
          width: '100%',
          padding: '16px',
          background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}dd)`,
          border: 'none',
          borderRadius: '12px',
          color: '#fff',
          fontSize: '16px',
          fontWeight: '700',
          cursor: 'pointer'
        }}>送金する</button>
      </div>
    </div>
  );
}

function CardsView({ t, theme }) {
  const cards = [
    { type: 'Platinum', number: '****  ****  ****  1234', balance: 450000, limit: 5000000 },
    { type: 'Gold', number: '****  ****  ****  5678', balance: 120000, limit: 1000000 },
    { type: 'Virtual', number: '****  ****  ****  9012', balance: 50000, limit: 500000 },
    { type: 'Business', number: '****  ****  ****  3456', balance: 2300000, limit: 10000000 },
    { type: 'Debit', number: '****  ****  ****  7890', balance: 150000, limit: 300000 }
  ];

  return (
    <div style={{ paddingBottom: '100px' }}>
      <h2 style={{ marginBottom: '24px' }}>💳 {t.cards}</h2>
      <div style={{ display: 'grid', gap: '16px' }}>
        {cards.map((card, i) => (
          <div key={i} style={{
            background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}aa)`,
            borderRadius: '16px',
            padding: '24px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>{card.type} Card</div>
            <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', letterSpacing: '2px' }}>{card.number}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>利用可能額</div>
                <div style={{ fontSize: '18px', fontWeight: '700' }}>¥{card.balance.toLocaleString()}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>限度額</div>
                <div style={{ fontSize: '18px', fontWeight: '700' }}>¥{(card.limit / 10000).toFixed(0)}万</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsView({ t, theme }) {
  return (
    <div style={{ paddingBottom: '100px' }}>
      <h2 style={{ marginBottom: '24px' }}>📊 {t.analytics}</h2>
      <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div style={{
          background: theme.card,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '20px'
        }}>
          <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '8px' }}>{t.dailyProfit}</div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#10b981' }}>+¥42,350</div>
          <div style={{ fontSize: '12px', opacity: 0.6, marginTop: '4px' }}>+2.3% vs 昨日</div>
        </div>
        <div style={{
          background: theme.card,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '20px'
        }}>
          <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '8px' }}>{t.monthlyProfit}</div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#10b981' }}>+¥1,234,567</div>
          <div style={{ fontSize: '12px', opacity: 0.6, marginTop: '4px' }}>+15.7% vs 先月</div>
        </div>
        <div style={{
          background: theme.card,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '20px'
        }}>
          <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '8px' }}>{t.yearlyProfit}</div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#10b981' }}>+¥8,945,231</div>
          <div style={{ fontSize: '12px', opacity: 0.6, marginTop: '4px' }}>+34.2% vs 昨年</div>
        </div>
      </div>
    </div>
  );
}

function SettingsView({ t, theme, themeState }) {
  const [currentTheme, setTheme] = themeState;
  return (
    <div style={{ paddingBottom: '100px' }}>
      <h2 style={{ marginBottom: '24px' }}>⚙️ {t.settings}</h2>
      <div style={{
        background: theme.card,
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        padding: '20px'
      }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '14px', marginBottom: '12px', fontWeight: '600' }}>{t.uiTheme}</div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['dark', 'blue', 'purple'].map(th => (
              <button key={th} onClick={() => setTheme(th)} style={{
                padding: '12px 24px',
                background: currentTheme === th ? theme.accent : 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}>{th}</button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '14px', marginBottom: '12px', fontWeight: '600' }}>{t.systemManagement}</div>
          <div style={{ fontSize: '13px', opacity: 0.7 }}>バージョン: 1.0.0</div>
          <div style={{ fontSize: '13px', opacity: 0.7 }}>API: http://35.225.221.90/api/</div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
