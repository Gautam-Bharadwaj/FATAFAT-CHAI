#!/bin/bash
# Make executable (one-time): chmod +x scripts/*.sh

set -e

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT/server"

if [ -f .env ]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

export MONGO_URI="${MONGO_URI:-mongodb://localhost:27017/fatafat-chai}"

node seed.js
