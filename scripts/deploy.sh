#!/bin/bash
# Make executable (one-time): chmod +x scripts/*.sh
# Idempotent local/EC2 deploy helper (safe to run multiple times).

set -e

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

mkdir -p logs uploads server/logs client/logs

npm ci --prefix server
npm ci --prefix client
npm run build --prefix client

if command -v pm2 >/dev/null 2>&1; then
  if pm2 describe fatafat-api >/dev/null 2>&1; then
    pm2 restart fatafat-api
  else
    pm2 start server/server.js --name fatafat-api
  fi
  pm2 save
else
  echo "pm2 not found; skipping process manager (install: npm i -g pm2)"
fi

echo "✅ Deploy script finished"
