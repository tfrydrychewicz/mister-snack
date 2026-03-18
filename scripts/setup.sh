#!/usr/bin/env bash
# Mister Snack — fresh environment setup
# Run from project root: ./scripts/setup.sh

set -e

REQUIRED_NODE=18
RECOMMENDED_NODE=20

red() { echo -e "\033[31m$*\033[0m"; }
green() { echo -e "\033[32m$*\033[0m"; }
yellow() { echo -e "\033[33m$*\033[0m"; }
info() { echo -e "\033[36m$*\033[0m"; }

info "Mister Snack — environment setup"
echo

# --- Node.js ---
if ! command -v node &>/dev/null; then
  red "Node.js is required but not installed."
  echo "Install Node.js $RECOMMENDED_NODE or later: https://nodejs.org/"
  exit 1
fi

NODE_VER=$(node -v | sed 's/^v//' | cut -d. -f1)
if [ "$NODE_VER" -lt "$REQUIRED_NODE" ]; then
  red "Node.js $NODE_VER is too old. Required: v$REQUIRED_NODE+, recommended: v$RECOMMENDED_NODE."
  exit 1
fi

if [ "$NODE_VER" -lt "$RECOMMENDED_NODE" ]; then
  yellow "Node.js v$NODE_VER detected. Recommended: v$RECOMMENDED_NODE (matches CI)."
fi

green "✓ Node.js $(node -v)"
echo

# --- npm ---
if ! command -v npm &>/dev/null; then
  red "npm is required but not found (usually bundled with Node.js)."
  exit 1
fi

green "✓ npm $(npm -v)"
echo

# --- Project root ---
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"

if [ ! -f package.json ]; then
  red "No package.json in $PROJECT_ROOT. Run from project root."
  exit 1
fi

info "Project root: $PROJECT_ROOT"
echo

# --- Install dependencies ---
info "Installing dependencies..."
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi
green "✓ Dependencies installed"
echo

# --- Playwright browsers (for E2E) ---
info "Installing Playwright browsers (chromium)..."
npm exec playwright install --with-deps chromium
green "✓ Playwright browsers installed"
echo

# --- Verification ---
info "Running quick verification (format, lint, typecheck, unit tests)..."
npx prettier --check .
npx eslint .
npx vue-tsc --noEmit && npx tsc -p tsconfig.node.json --noEmit
npx vitest run
green "✓ Verification passed"
echo

green "Setup complete. You can run:"
echo "  npm run dev        — start the app"
echo "  npm run storybook  — component stories"
echo "  npm run ci         — full CI (format, lint, typecheck, unit, build, E2E)"
echo
