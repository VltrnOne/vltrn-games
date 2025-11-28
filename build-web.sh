#!/bin/bash
# Build script for "Lil J's Castle" web version
# This builds the game and prepares it for deployment

set -e

PROJECT_DIR="projects/liljs-castle"
WEB_DEPLOY_DIR="web-deploy/liljs-castle"

echo "🏰 Building Lil J's Castle for Web..."
echo "======================================"

# Check if we're in the right directory
if [ ! -d "$PROJECT_DIR" ]; then
    echo "❌ Error: Project directory not found: $PROJECT_DIR"
    echo "   Please run this script from the repository root"
    exit 1
fi

# Check if castle-engine is available
if ! command -v castle-engine &> /dev/null; then
    echo "❌ Error: castle-engine not found in PATH"
    echo "   Please install Castle Game Engine build tool"
    echo "   See: https://castle-engine.io/build_tool"
    exit 1
fi

cd "$PROJECT_DIR"

echo ""
echo "📦 Cleaning previous build..."
castle-engine clean

echo ""
echo "🔨 Compiling for web (release mode)..."
castle-engine compile --target=web --mode=release

if [ ! -d "castle-engine-output/web/dist" ]; then
    echo "❌ Error: Build output not found"
    exit 1
fi

echo ""
echo "📁 Copying files to web-deploy directory..."
cd ../..

# Create directories
mkdir -p "$WEB_DEPLOY_DIR/game"

# Copy built game files
cp -r "$PROJECT_DIR/castle-engine-output/web/dist/"* "$WEB_DEPLOY_DIR/game/"

echo ""
echo "✅ Build complete!"
echo ""
echo "📂 Files are ready in: $WEB_DEPLOY_DIR/"
echo "   - $WEB_DEPLOY_DIR/index.html (iframe wrapper)"
echo "   - $WEB_DEPLOY_DIR/game/ (game files)"
echo ""
echo "🚀 To deploy:"
echo "   1. Push to GitHub (auto-deploys)"
echo "   2. Or manually copy to vltrngames.com"
echo ""
echo "🌐 Access at: https://vltrngames.com/liljs-castle/"

