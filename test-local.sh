#!/bin/bash
# Quick test script to verify the iframe setup locally

echo "🧪 Testing Lil J's Castle iframe locally..."
echo "============================================"

cd "$(dirname "$0")"

if [ ! -d "web-deploy/liljs-castle" ]; then
    echo "❌ Error: web-deploy/liljs-castle directory not found"
    exit 1
fi

cd web-deploy/liljs-castle

echo ""
echo "📁 Files in deployment directory:"
ls -la

echo ""
echo "📁 Files in game directory:"
ls -la game/ 2>/dev/null || echo "   (game directory exists but is empty)"

echo ""
echo "🌐 Starting local web server..."
echo "   Open your browser and go to: http://localhost:8000"
echo ""
echo "   Press Ctrl+C to stop the server"
echo ""

# Try Python 3 first, then Python 2, then suggest alternatives
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer 8000
else
    echo "❌ Python not found. Please install Python or use:"
    echo "   npx http-server -p 8000"
    echo "   or"
    echo "   php -S localhost:8000"
    exit 1
fi

