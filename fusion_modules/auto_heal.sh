#!/usr/bin/env bash
set -euo pipefail
LOG="$HOME/fusion_modules/auto_heal.log"; touch "$LOG"
echo "[AUTO-HEAL] $(date)" >> "$LOG"
sudo nginx -t && sudo systemctl is-active --quiet nginx || sudo systemctl restart nginx || true
sudo systemctl enable fail2ban >/dev/null 2>&1 || true; sudo systemctl start fail2ban || true
sudo ufw allow "Nginx Full" >/dev/null 2>&1 || true; sudo ufw allow ssh >/dev/null 2>&1 || true; sudo ufw --force enable >/dev/null 2>&1 || true
