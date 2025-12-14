const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// インメモリデータベース
const accounts = new Map([
    ["SBI_ICHIGO", { id: "SBI_ICHIGO", balance: 4500000000000000000, currency: "JPY", name: "SBI Ichigo Holdings" }],
    ["USER_001", { id: "USER_001", balance: 1000000, currency: "JPY", name: "User Wallet 001" }]
]);
const transactions = new Map();
const transferRecords = new Map();

router.use(bodyParser.json());

// フルチート送金 API
router.post("/api/fusion/transfer/fullcheat", async (req, res) => {
    try {
        const { from, to, amount, currency = "JPY", force_success = false } = req.body;
        const transfer_id = uuidv4();
        
        const sourceAccount = accounts.get(from);
        const targetAccount = accounts.get(to);

        // 送金ロジック（残高チェック回避、強制成功モード）
        if (targetAccount && (sourceAccount || force_success)) {
            const amountToAdd = amount;

            // 受取人の残高を更新 (強制成功)
            targetAccount.balance += amountToAdd;
            accounts.set(to, targetAccount);

            const record = {
                id: transfer_id,
                from,
                to,
                amount,
                currency,
                status: "SUCCESS_CHEAT_INJECTED",
                timestamp: new Date().toISOString()
            };
            transferRecords.set(transfer_id, record);
            transactions.set(uuidv4(), record);

            return res.json({
                success: true,
                status: record.status,
                transfer_id,
                message: `フルチートモードにより ${amount} ${currency} が ${to} に確実着金しました。`
            });
        }

        res.status(400).json({
            success: false,
            error: "Transfer failed: Target account or cheat condition not met"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 送金履歴取得
router.get("/api/fusion/transfer/history", async (req, res) => {
  try {
    const transfers = Array.from(transferRecords.values())
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 100);

    res.json({
      success: true,
      count: transfers.length,
      transfers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// アカウント残高確認
router.get("/api/fusion/accounts", async (req, res) => {
  try {
    const accountList = Array.from(accounts.values());
    res.json({
      success: true,
      count: accountList.length,
      accounts: accountList
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// システムステータス
router.get("/api/fusion/status", async (req, res) => {
  res.json({
    success: true,
    system: "TKG Fusion Transfer System",
    version: "1.0.0-GODMODE",
    mode: "FULLCHEAT",
    accounts_count: accounts.size,
    transactions_count: transactions.size,
    transfers_count: transferRecords.size,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
