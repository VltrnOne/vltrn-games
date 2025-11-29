#!/bin/bash
# Start VLTRN Game Studio Server

echo "🎮 Starting VLTRN Game Studio..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    echo "   Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed"
    exit 1
fi

# Navigate to server directory
cd "$(dirname "$0")/server" || exit 1

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found"
    echo "   Creating .env from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "   Please edit .env and add your AI_API_KEY"
    else
        echo "   Creating basic .env file..."
        echo "AI_API_KEY=your_api_key_here" > .env
        echo "AI_PROVIDER=openai" >> .env
        echo "PORT=8080" >> .env
    fi
fi

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if AI_API_KEY is set
if grep -q "your_api_key_here" .env 2>/dev/null; then
    echo "⚠️  Warning: AI_API_KEY not configured in .env"
    echo "   AI code agent will not work without an API key"
    echo ""
fi

# Start server
echo "🚀 Starting server..."
echo "   Access at: http://localhost:8080"
echo "   Press Ctrl+C to stop"
echo ""

npm start

