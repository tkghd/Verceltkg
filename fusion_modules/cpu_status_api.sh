#!/usr/bin/env bash
set -euo pipefail
CPU=$(top -bn1 | grep "Cpu(s)" | awk '{print $2 + $4}')
STATUS="green"
if (( $(echo "$CPU > 70" | bc -l) )); then STATUS="yellow"; fi
if (( $(echo "$CPU > 90" | bc -l) )); then STATUS="red"; fi
echo "{\"cpu_usage\":$CPU,\"status\":\"$STATUS\"}"
