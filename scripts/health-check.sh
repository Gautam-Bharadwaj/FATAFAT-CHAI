#!/bin/bash
# Make executable (one-time): chmod +x scripts/*.sh

set -e

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

API_PORT="${API_PORT:-5000}"
FRONTEND_URL="${FRONTEND_URL:-http://localhost:3000}"

BACKEND_OK=0
if curl -sf "http://127.0.0.1:${API_PORT}/api/health" >/dev/null; then
  echo "✅ Backend healthy"
  BACKEND_OK=1
else
  echo "❌ Backend down"
fi

FRONTEND_OK=0
if curl -sf -o /dev/null "$FRONTEND_URL"; then
  echo "✅ Frontend reachable at ${FRONTEND_URL}"
  FRONTEND_OK=1
else
  echo "⚠️ Frontend not reachable at ${FRONTEND_URL} (start Vite: npm run dev --prefix client)"
fi

if [ "$BACKEND_OK" -eq 1 ] && [ "$FRONTEND_OK" -eq 1 ]; then
  echo "Overall: ✅ System up"
  exit 0
fi

if [ "$BACKEND_OK" -eq 0 ]; then
  exit 1
fi

echo "Overall: ⚠️ Backend up, frontend check failed"
exit 0
