

import React from 'react';
import { ShieldCheck, Scale, Banknote, Server, CheckCircle2, AlertTriangle, FileText, Lock } from 'lucide-react';

export const BusinessChecklist: React.FC = () => {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="text-green-500" /> 本番稼働準備プロトコル
        </h3>
        <span className="text-xs font-mono text-yellow-500 border border-yellow-900/50 bg-yellow-900/20 px-2 py-1 rounded">
          ステータス: 最終確認中
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Legal & Compliance */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Scale size={16} className="text-indigo-400" /> 法務・コンプライアンス
          </h4>
          <CheckItem label="利用規約・プライバシーポリシー策定" status="done" />
          <CheckItem label="EMI / 銀行ライセンス取得 (リトアニア/SG)" status="pending" />
          <CheckItem label="KYC/AML 自動審査システム導入" status="warning" />
          <CheckItem label="GDPR対応・データ保護責任者選任" status="pending" />
        </div>

        {/* Security Infrastructure */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Lock size={16} className="text-indigo-400" /> セキュリティ・コア
          </h4>
          <CheckItem label="第三者機関による侵入テスト (ペネトレーションテスト)" status="pending" />
          <CheckItem label="バグバウンティ・プログラム (報奨金制度) 設立" status="pending" />
          <CheckItem label="2要素認証 (2FA/MFA) の強制適用 (Auth0)" status="done" />
          <CheckItem label="HSM (ハードウェアセキュリティモジュール) 鍵管理" status="warning" />
        </div>

        {/* Finance & Liquidity */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Banknote size={16} className="text-indigo-400" /> 財務・運用
          </h4>
          <CheckItem label="法人口座連携・API接続" status="done" />
          <CheckItem label="流動性提供契約 (DEX)" status="done" />
          <CheckItem label="グローバル税務レポートエンジン" status="warning" />
          <CheckItem label="資本準備金監査" status="done" />
        </div>

        {/* System Infrastructure */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Server size={16} className="text-indigo-400" /> インフラストラクチャ
          </h4>
          <CheckItem label="マルチリージョン・フェイルオーバー (AWS/GCP)" status="done" />
          <CheckItem label="DDoS保護 (Cloudflare Enterprise)" status="done" />
          <CheckItem label="リアルタイム監視・アラートシステム" status="done" />
          <CheckItem label="災害復旧訓練 (DRドリル)" status="pending" />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800 text-xs text-slate-500 font-mono">
        ※ パブリックメインネット公開前に、すべての項目でコンプライアンス遵守率100%が必要です。
      </div>
    </div>
  );
};

const CheckItem: React.FC<{ label: string; status: 'done' | 'pending' | 'warning' }> = ({ label, status }) => {
  const icon = status === 'done' ? <CheckCircle2 size={14} className="text-green-500" /> : 
               status === 'warning' ? <AlertTriangle size={14} className="text-yellow-500" /> : 
               <FileText size={14} className="text-slate-600" />;
  
  const textColor = status === 'done' ? 'text-slate-300' : 
                    status === 'warning' ? 'text-yellow-200/80' : 
                    'text-slate-500';
  
  const statusText = status === 'done' ? '完了' : 
                     status === 'warning' ? '注意' : 
                     '準備中';

  return (
    <div className="flex items-center gap-3 p-2 rounded bg-slate-900/50 border border-slate-800/50">
      {icon}
      <span className={`flex-1 text-xs ${textColor}`}>{label}</span>
      <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
        status === 'done' ? 'bg-green-900/20 text-green-500' : 
        status === 'warning' ? 'bg-yellow-900/20 text-yellow-500' : 
        'bg-slate-800 text-slate-600'
      }`}>
        {statusText}
      </span>
    </div>
  );
};