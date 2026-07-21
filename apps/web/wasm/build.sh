#!/bin/bash
# Build the Go WASM interpreter for Tryngo playground
# Requires: Go 1.21+, github.com/traefik/yaegi

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "=== Building Tryngo Go WASM Interpreter ==="

# Initialize Go module if needed
if [ ! -f "$SCRIPT_DIR/go.mod" ]; then
    cd "$SCRIPT_DIR"
    go mod init tryngo-wasm
    go get github.com/traefik/yaegi@latest
    go mod tidy
fi

# Copy wasm_exec.js from Go distribution
WASM_EXEC_SRC="$(go env GOROOT)/misc/wasm/wasm_exec.js"
if [ -f "$WASM_EXEC_SRC" ]; then
    cp "$WASM_EXEC_SRC" "$SCRIPT_DIR/wasm_exec.js"
    echo "Copied wasm_exec.js from Go $ (go version | grep -oP 'go\d+\.\d+')"
else
    echo "Error: wasm_exec.js not found at $WASM_EXEC_SRC"
    exit 1
fi

# Build WASM binary
cd "$SCRIPT_DIR"
GOOS=js GOARCH=wasm go build -o tryngo.wasm -ldflags="-s -w" .

# Check size
WASM_SIZE=$(stat -c%s "tryngo.wasm" 2>/dev/null || stat -f%z "tryngo.wasm")
echo "WASM binary size: $((WASM_SIZE / 1024)) KB"

echo ""
echo "=== Build complete ==="
echo "Files created:"
echo "  - $SCRIPT_DIR/tryngo.wasm"
echo "  - $SCRIPT_DIR/wasm_exec.js"
echo ""
echo "To serve locally, make sure these files are in the static directory."
echo "The playground will load them automatically."
