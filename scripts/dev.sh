#!/bin/bash

# ============================================
# FATAFAT-CHAI - Development Server Script
# Starts both client and server concurrently
# ============================================

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}"
echo "  ☕ FATAFAT-CHAI Dev Server"
echo "  =========================="
echo -e "${NC}"

# ── Trap to clean up background processes on exit ──
cleanup() {
    echo -e "\n${YELLOW}▸ Shutting down servers...${NC}"
    kill $CLIENT_PID $SERVER_PID 2>/dev/null
    echo -e "${GREEN}✓ Servers stopped${NC}"
    exit 0
}
trap cleanup SIGINT SIGTERM

# ── Start Server ──
echo -e "${YELLOW}▸ Starting server on port 5000...${NC}"
cd server
npm run dev &
SERVER_PID=$!
cd ..
echo -e "${GREEN}✓ Server started (PID: $SERVER_PID)${NC}"

# ── Start Client ──
echo -e "${YELLOW}▸ Starting client on port 5173...${NC}"
cd client
npm run dev &
CLIENT_PID=$!
cd ..
echo -e "${GREEN}✓ Client started (PID: $CLIENT_PID)${NC}"

echo -e "\n${BLUE}=====================================${NC}"
echo -e "  ${GREEN}☕ FATAFAT-CHAI is running!${NC}"
echo -e ""
echo -e "  Client: ${YELLOW}http://localhost:5173${NC}"
echo -e "  Server: ${YELLOW}http://localhost:5000${NC}"
echo -e ""
echo -e "  Press ${RED}Ctrl+C${NC} to stop"
echo -e "${BLUE}=====================================${NC}"

# ── Wait for both processes ──
wait $CLIENT_PID $SERVER_PID
