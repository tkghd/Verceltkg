#!/usr/bin/env bash
set -euo pipefail
TS="$(date -Iseconds)"; LOG="logs/repair-$TS.log"; mkdir -p logs
echo "[repair] start $TS" | tee -a "$LOG"
[ -f ".env" ] || { echo "[repair] .env missing" | tee -a "$LOG"; exit 1; }
[ -d node_modules ] || { echo "[repair] reinstall deps" | tee -a "$LOG"; npm ci || npm install; }
echo "[repair] build" | tee -a "$LOG"; npm run build 2>&1 | tee -a "$LOG"
echo "[repair] start (internal)" | tee -a "$LOG"; nohup npm run start >> logs/runtime.log 2>&1 &
echo "[repair] done" | tee -a "$LOG"
