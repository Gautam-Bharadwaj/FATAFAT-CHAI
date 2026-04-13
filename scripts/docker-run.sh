#!/bin/bash

# ============================================
# FATAFAT-CHAI - Docker Run Script
# Builds and runs the app using Docker Compose
# ============================================

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}"
echo "  🐳 FATAFAT-CHAI Docker"
echo "  ======================"
echo -e "${NC}"

# ── Check Docker ──
if ! command -v docker &> /dev/null; then
    echo -e "${RED}✗ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker detected${NC}"

# ── Check Docker Compose ──
if ! docker compose version &> /dev/null; then
    echo -e "${RED}✗ Docker Compose is not available.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker Compose detected${NC}"

# ── Parse arguments ──
ACTION=${1:-"up"}

case $ACTION in
    "up"|"start")
        echo -e "\n${YELLOW}▸ Building and starting containers...${NC}"
        docker compose up --build -d
        echo -e "\n${GREEN}✓ Containers are running!${NC}"
        echo -e ""
        echo -e "  Client: ${YELLOW}http://localhost:3000${NC}"
        echo -e "  Server: ${YELLOW}http://localhost:5000${NC}"
        echo -e ""
        echo -e "  View logs:  ${BLUE}bash scripts/docker-run.sh logs${NC}"
        echo -e "  Stop:       ${BLUE}bash scripts/docker-run.sh stop${NC}"
        ;;
    "down"|"stop")
        echo -e "\n${YELLOW}▸ Stopping containers...${NC}"
        docker compose down
        echo -e "${GREEN}✓ Containers stopped${NC}"
        ;;
    "logs")
        echo -e "\n${YELLOW}▸ Showing container logs (Ctrl+C to exit)...${NC}"
        docker compose logs -f
        ;;
    "restart")
        echo -e "\n${YELLOW}▸ Restarting containers...${NC}"
        docker compose down
        docker compose up --build -d
        echo -e "${GREEN}✓ Containers restarted${NC}"
        ;;
    "status"|"ps")
        echo -e "\n${YELLOW}▸ Container status:${NC}"
        docker compose ps
        ;;
    "clean")
        echo -e "\n${RED}▸ Removing containers, images, and volumes...${NC}"
        docker compose down --rmi all --volumes --remove-orphans
        echo -e "${GREEN}✓ Cleaned up${NC}"
        ;;
    *)
        echo -e "${YELLOW}Usage:${NC} bash scripts/docker-run.sh [command]"
        echo -e ""
        echo -e "Commands:"
        echo -e "  ${GREEN}up/start${NC}   - Build and start containers (default)"
        echo -e "  ${GREEN}down/stop${NC}  - Stop containers"
        echo -e "  ${GREEN}restart${NC}    - Rebuild and restart containers"
        echo -e "  ${GREEN}logs${NC}       - View container logs"
        echo -e "  ${GREEN}status/ps${NC}  - Show container status"
        echo -e "  ${GREEN}clean${NC}      - Remove everything (containers, images, volumes)"
        ;;
esac
