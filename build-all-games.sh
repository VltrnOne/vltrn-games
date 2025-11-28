#!/bin/bash
# Build all VLTRN Games projects for web deployment
# This builds games from the repo, just like other games on vltrngames.com

set -e

echo "🎮 Building All VLTRN Games for Web"
echo "===================================="
echo ""

# Check if castle-engine is available
if ! command -v castle-engine &> /dev/null; then
    echo "❌ Error: castle-engine not found in PATH"
    echo "   Please install Castle Game Engine build tool"
    echo "   See: https://castle-engine.io/build_tool"
    exit 1
fi

# Function to build a game
build_game() {
    local GAME_DIR="$1"
    local GAME_NAME="$2"
    
    if [ ! -d "$GAME_DIR" ]; then
        echo "⚠️  Skipping $GAME_NAME - directory not found: $GAME_DIR"
        return
    fi
    
    echo ""
    echo "🔨 Building $GAME_NAME..."
    echo "   Directory: $GAME_DIR"
    
    cd "$GAME_DIR"
    
    # Clean previous build
    castle-engine clean 2>/dev/null || true
    
    # Build for web
    if castle-engine compile --target=web --mode=release; then
        echo "✅ $GAME_NAME built successfully"
        
        # Copy to web-deploy if dist exists
        if [ -d "castle-engine-output/web/dist" ]; then
            DEPLOY_DIR="../../web-deploy/${GAME_NAME,,}"
            mkdir -p "$DEPLOY_DIR/game"
            cp -r castle-engine-output/web/dist/* "$DEPLOY_DIR/game/"
            echo "   📁 Copied to web-deploy/${GAME_NAME,,}/game/"
        fi
    else
        echo "❌ Failed to build $GAME_NAME"
    fi
    
    cd - > /dev/null
}

# Build all games
echo "📋 Games to build:"
echo "   1. Lil J's Castle"
echo "   2. UniCastle"
echo ""

# Build Lil J's Castle
build_game "projects/liljs-castle" "liljs-castle"

# Build UniCastle
build_game "projects/01-unicastle" "unicastle"

echo ""
echo "✅ Build process complete!"
echo ""
echo "📂 Built games are in: web-deploy/"
echo ""
echo "🚀 To deploy:"
echo "   git add ."
echo "   git commit -m 'Build games for web'"
echo "   git push origin main"
echo ""
echo "🌐 Games will auto-deploy to vltrngames.com"

