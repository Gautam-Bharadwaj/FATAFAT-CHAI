#!/bin/bash
# Make executable (one-time): chmod +x scripts/*.sh

set -e

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

if ! command -v node &>/dev/null; then
  echo "Node.js is not installed. Install Node.js 18+ (https://nodejs.org/) and retry."
  exit 1
fi

echo "Node $(node -v)"

mkdir -p logs uploads server/logs client/logs

npm ci --prefix server
npm ci --prefix client

if [ ! -f server/.env ]; then
  if [ -f server/.env.example ]; then
    cp server/.env.example server/.env
    echo "Created server/.env from server/.env.example"
  fi
fi

if [ ! -f client/.env ]; then
  if [ -f client/.env.example ]; then
    cp client/.env.example client/.env
    echo "Created client/.env from client/.env.example"
  fi
fi

echo "✅ Setup complete"
