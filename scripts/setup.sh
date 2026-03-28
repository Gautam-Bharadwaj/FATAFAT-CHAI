#!/bin/bash

# ============================================
# FATAFAT-CHAI - Project Setup Script
# Installs all dependencies for client & server
# ============================================

set -e  # Exit immediately on error

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "  ☕ FATAFAT-CHAI Setup"
echo "  ====================="
echo -e "${NC}"

# ── Check Node.js ──
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed. Please install Node.js v22+${NC}"
    exit 1
fi

NODE_VER=$(node -v)
echo -e "${GREEN}✓ Node.js ${NODE_VER} detected${NC}"

# ── Check npm ──
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm is not installed.${NC}"
    exit 1
fi

NPM_VER=$(npm -v)
echo -e "${GREEN}✓ npm v${NPM_VER} detected${NC}"

# ── Install Root Dependencies ──
echo -e "\n${YELLOW}▸ Installing root dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Root dependencies installed${NC}"

# ── Install Client Dependencies ──
echo -e "\n${YELLOW}▸ Installing client dependencies...${NC}"
cd client
npm install
cd ..
echo -e "${GREEN}✓ Client dependencies installed${NC}"

# ── Install Server Dependencies ──
echo -e "\n${YELLOW}▸ Installing server dependencies...${NC}"
cd server
npm install
cd ..
echo -e "${GREEN}✓ Server dependencies installed${NC}"

# ── Create .env if not exists ──
if [ ! -f server/.env ]; then
    echo -e "\n${YELLOW}▸ Creating server .env file...${NC}"
    cat > server/.env <<EOF
PORT=5000
NODE_ENV=development
# Add your environment variables below
# MONGO_URI=mongodb://localhost:27017/fatafat-chai
# JWT_SECRET=your_secret_key
EOF
    echo -e "${GREEN}✓ server/.env created (update with your values)${NC}"
else
    echo -e "${GREEN}✓ server/.env already exists${NC}"
fi

echo -e "\n${BLUE}=====================================${NC}"
echo -e "${GREEN}  ✓ Setup complete!${NC}"
echo -e "${BLUE}=====================================${NC}"
echo -e ""
echo -e "  Run the project:"
echo -e "    ${YELLOW}bash scripts/dev.sh${NC}        - Start development servers"
echo -e "    ${YELLOW}bash scripts/docker-run.sh${NC} - Start with Docker"
echo -e "    ${YELLOW}bash scripts/test.sh${NC}       - Run tests"
echo -e ""
