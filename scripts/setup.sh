#!/bin/bash

# BugSage - Quick Start (Linux/Mac)

set -e

echo ""
echo "========================================"
echo "   BugSage - Quick Start (Linux/Mac)"
echo "========================================"
echo ""

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

# 1. Check Node.js
echo "[1/5] Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "  [ERROR] Node.js not found!"
    echo "  Please install Node.js 20+ from: https://nodejs.org/"
    exit 1
fi
NODE_VER=$(node -v)
echo "  [OK] Node.js installed ($NODE_VER)"

# 2. Check npm
echo "[2/5] Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "  [ERROR] npm not found!"
    exit 1
fi
echo "  [OK] npm installed"

# 3. Check .env file
echo "[3/5] Checking .env file..."
ROOT_ENV="$PROJECT_ROOT/.env"
BACKEND_ENV="$PROJECT_ROOT/backend/.env"

if [ -f "$ROOT_ENV" ]; then
    echo "  [OK] .env file exists in project root"
    if [ ! -f "$BACKEND_ENV" ]; then
        cp "$ROOT_ENV" "$BACKEND_ENV"
        echo "  [OK] Copied .env to backend folder"
    fi
elif [ -f "$BACKEND_ENV" ]; then
    echo "  [OK] .env file exists in backend folder"
    cp "$BACKEND_ENV" "$ROOT_ENV"
    echo "  [OK] Copied .env to project root"
else
    echo "  [INFO] Creating .env file..."
    read -p "Enter your Gemini API Key (press Enter to skip): " API_KEY
    if [ -z "$API_KEY" ]; then
        echo "GEMINI_API_KEY=your_gemini_api_key_here" > "$ROOT_ENV"
        echo "GEMINI_API_KEY=your_gemini_api_key_here" > "$BACKEND_ENV"
        echo "  [WARNING] No key provided. Update .env later."
    else
        echo "GEMINI_API_KEY=$API_KEY" > "$ROOT_ENV"
        echo "GEMINI_API_KEY=$API_KEY" > "$BACKEND_ENV"
        echo "  [OK] .env file created"
    fi
fi

# 4. Install Backend
echo "[4/5] Installing Backend dependencies..."
cd "$PROJECT_ROOT/backend"
npm install
echo "  [OK] Backend ready"

# 5. Install Frontend
echo "[5/5] Installing Frontend dependencies..."
cd "$PROJECT_ROOT/frontend"
npm install
echo "  [OK] Frontend ready"

echo ""
echo "========================================"
echo "   Starting BugSage Services..."
echo "========================================"
echo ""

# Use a tool like concurrently or just background processes?
# For a simple script, we can run them in background or tell user to use docker.
# The Windows script opened new windows. In terminal, that's harder without 'gnome-terminal' etc.
# Best practice: Inform user to run 'npm run dev' in two terminals OR use docker.
# But I will try to support basic concurrency if possible, or just exit with instructions.

echo "Ready to start!"
echo "Option 1 (Docker - Recommended):"
echo "  docker-compose up -d --build"
echo ""
echo "Option 2 (Manual):"
echo "  1. Open a terminal: cd backend && npm run dev"
echo "  2. Open a terminal: cd frontend && npm run dev"
echo ""

read -p "Do you want to start services using Docker now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    cd "$PROJECT_ROOT"
    docker-compose up -d --build
    echo ""
    echo "Services started!"
    echo "Frontend: http://localhost:3000"
    echo "Backend:  http://localhost:4000"
fi
