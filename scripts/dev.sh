#!/bin/bash

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}"
echo "  FATAFAT-CHAI Dev Server"
echo -e "${NC}"

cleanup() {
  echo -e "\n${YELLOW}Shutting down...${NC}"
  kill $CLIENT_PID $SERVER_PID 2>/dev/null || true
  echo -e "${GREEN}Stopped${NC}"
  exit 0
}
trap cleanup SIGINT SIGTERM

echo -e "${YELLOW}Starting API on port 5000...${NC}"
(cd server && npm run dev) &
SERVER_PID=$!

echo -e "${YELLOW}Starting client on port 3000...${NC}"
(cd client && npm run dev) &
CLIENT_PID=$!

echo -e "${GREEN}Client: http://localhost:3000${NC}"
echo -e "${GREEN}API:    http://localhost:5000${NC}"
echo -e "Press ${RED}Ctrl+C${NC} to stop"

wait $CLIENT_PID $SERVER_PID
