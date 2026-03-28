#!/bin/bash

# ============================================
# FATAFAT-CHAI - Production Build Script
# Creates production-ready builds
# ============================================

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}"
echo "  📦 FATAFAT-CHAI Production Build"
echo "  ================================="
echo -e "${NC}"

# ── Clean previous builds ──
echo -e "${YELLOW}▸ Cleaning previous builds...${NC}"
rm -rf client/dist
rm -rf dist
echo -e "${GREEN}✓ Cleaned${NC}"

# ── Install dependencies ──
echo -e "\n${YELLOW}▸ Installing dependencies...${NC}"
cd client
npm ci
cd ..
echo -e "${GREEN}✓ Dependencies installed${NC}"

# ── Build client ──
echo -e "\n${YELLOW}▸ Building client for production...${NC}"
cd client
npm run build
cd ..
echo -e "${GREEN}✓ Client built successfully${NC}"

# ── Show build info ──
BUILD_SIZE=$(du -sh client/dist 2>/dev/null | cut -f1 || echo "N/A")
FILE_COUNT=$(find client/dist -type f 2>/dev/null | wc -l | tr -d ' ' || echo "N/A")

echo -e "\n${BLUE}=====================================${NC}"
echo -e "  ${GREEN}✓ Production build complete!${NC}"
echo -e ""
echo -e "  Output:     ${YELLOW}client/dist/${NC}"
echo -e "  Build size: ${YELLOW}${BUILD_SIZE}${NC}"
echo -e "  Files:      ${YELLOW}${FILE_COUNT}${NC}"
echo -e "${BLUE}=====================================${NC}"
