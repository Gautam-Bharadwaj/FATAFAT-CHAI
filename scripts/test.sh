#!/bin/bash

# ============================================
# FATAFAT-CHAI - Test Runner Script
# Runs all tests for the project
# ============================================

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}"
echo "  🧪 FATAFAT-CHAI Test Runner"
echo "  ============================"
echo -e "${NC}"

EXIT_CODE=0

# ── Run Server Tests ──
echo -e "${YELLOW}▸ Running server tests...${NC}"
cd server

if npx jest --passWithNoTests --forceExit 2>&1; then
    echo -e "${GREEN}✓ Server tests passed${NC}"
else
    echo -e "${RED}✗ Server tests failed${NC}"
    EXIT_CODE=1
fi
cd ..

# ── Run Client Build Check ──
echo -e "\n${YELLOW}▸ Running client build check...${NC}"
cd client

if npm run build 2>&1; then
    echo -e "${GREEN}✓ Client build successful${NC}"
else
    echo -e "${RED}✗ Client build failed${NC}"
    EXIT_CODE=1
fi
cd ..

# ── Summary ──
echo -e "\n${BLUE}=====================================${NC}"
if [ $EXIT_CODE -eq 0 ]; then
    echo -e "  ${GREEN}✓ All checks passed!${NC}"
else
    echo -e "  ${RED}✗ Some checks failed!${NC}"
fi
echo -e "${BLUE}=====================================${NC}"

exit $EXIT_CODE
