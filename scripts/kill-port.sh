#!/usr/bin/env bash
set -euo pipefail

if ! command -v lsof >/dev/null 2>&1; then
  echo "kill-port: lsof command is required but was not found." >&2
  exit 1
fi

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <port>" >&2
  exit 1
fi

port="$1"

if ! [[ "$port" =~ ^[0-9]+$ ]]; then
  echo "kill-port: port must be a number." >&2
  exit 1
fi

pids="$(lsof -t -i :"$port" -sTCP:LISTEN 2>/dev/null | sort -u || true)"

if [[ -z "$pids" ]]; then
  echo "Port $port is already free."
  exit 0
fi

for pid in $pids; do
  echo "Stopping PID $pid on port $port."
  if kill "$pid" 2>/dev/null; then
    echo "Stopped PID $pid."
  else
    echo "Failed to stop PID $pid with SIGTERM. Retrying with SIGKILL..."
    if kill -9 "$pid" 2>/dev/null; then
      echo "Force killed PID $pid."
    else
      echo "Failed to force kill PID $pid."
    fi
  fi
done
