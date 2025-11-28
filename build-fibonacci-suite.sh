#!/bin/bash
#
# Fibonacci Castle Suite - Build Script
# Builds all games in the suite for web deployment
#
# Copyright 2024 VLTRN Games
#

set -e  # Exit on error

echo "🏰 Building Fibonacci Castle Suite..."
echo "φ = 1.618033988749..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Build configuration
BUILD_MODE="release"
TARGET="web"
REPO_ROOT=$(pwd)

# Games to build (in Fibonacci order!)
GAMES=(
    "01-unicastle"
    # "02-duocastle"     # Coming soon
    # "03-tricastle"     # Coming soon
    # "05-pentacastle"   # Coming soon
    # "08-octacastle"    # Coming soon
    # "13-fiboquest"     # Coming soon
    # "21-spiralcitadel" # Coming soon
)

# Function to build a single game
build_game() {
    local game_dir=$1
    local game_name=$(basename $game_dir)

    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}Building: ${game_name}${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

    cd "${REPO_ROOT}/projects/${game_dir}"

    # Check if manifest exists
    if [ ! -f "CastleEngineManifest.xml" ]; then
        echo -e "${YELLOW}⚠ Warning: No manifest found for ${game_name}, skipping...${NC}"
        return
    fi

    # Clean previous build
    if [ -d "castle-engine-output" ]; then
        rm -rf castle-engine-output
    fi

    # Build the game
    echo "Compiling ${game_name} for ${TARGET}..."
    castle-engine compile --target=${TARGET} --mode=${BUILD_MODE}

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ ${game_name} built successfully${NC}"

        # Create deployment directory
        DEPLOY_DIR="${REPO_ROOT}/web-deploy/fibonacci-suite/${game_dir}"
        mkdir -p "${DEPLOY_DIR}/game"

        # Copy built files
        if [ -d "castle-engine-output/${TARGET}/dist" ]; then
            echo "Copying files to deployment directory..."
            cp -r castle-engine-output/${TARGET}/dist/* "${DEPLOY_DIR}/game/"

            # Create iframe wrapper
            create_wrapper "${game_dir}" "${DEPLOY_DIR}"

            echo -e "${GREEN}✓ Deployed to: ${DEPLOY_DIR}${NC}"
        else
            echo -e "${YELLOW}⚠ Warning: Build output not found${NC}"
        fi
    else
        echo -e "${YELLOW}⚠ Warning: Failed to build ${game_name}${NC}"
    fi

    echo ""
}

# Function to create HTML wrapper for iframe embedding
create_wrapper() {
    local game_dir=$1
    local deploy_dir=$2
    local game_name=$(echo $game_dir | sed 's/[0-9]*-//' | sed 's/\b\(.\)/\u\1/g')

    cat > "${deploy_dir}/index.html" << 'WRAPPER_EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GAME_TITLE_PLACEHOLDER - Fibonacci Castle Suite</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1a1510 0%, #2d1f15 100%);
            color: #ffd700;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .header h1 {
            font-size: 3em;
            text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
            margin-bottom: 10px;
        }

        .header p {
            color: #c9a959;
            font-size: 1.2em;
        }

        .game-container {
            background: rgba(0, 0, 0, 0.3);
            border: 3px solid #ffd700;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 0 50px rgba(255, 215, 0, 0.3);
            max-width: 1340px;
            width: 100%;
        }

        .game-frame {
            width: 100%;
            height: 760px;
            border: none;
            border-radius: 8px;
            background: #000;
        }

        .fibonacci-info {
            margin-top: 20px;
            padding: 15px;
            background: rgba(255, 215, 0, 0.1);
            border-radius: 8px;
            text-align: center;
            font-size: 0.9em;
        }

        .fib-sequence {
            color: #ffd700;
            font-weight: bold;
            margin-top: 10px;
        }

        @media (max-width: 768px) {
            .header h1 {
                font-size: 2em;
            }
            .game-frame {
                height: 500px;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🏰 GAME_TITLE_PLACEHOLDER</h1>
        <p>Part of the Fibonacci Castle Suite</p>
    </div>

    <div class="game-container">
        <iframe
            class="game-frame"
            src="game/index.html"
            allowfullscreen
            title="GAME_TITLE_PLACEHOLDER Game">
        </iframe>

        <div class="fibonacci-info">
            <p>Where Mathematics Meets Magic ✨</p>
            <div class="fib-sequence">1 • 1 • 2 • 3 • 5 • 8 • 13 • 21 • φ=1.618...</div>
        </div>
    </div>
</body>
</html>
WRAPPER_EOF

    # Replace placeholder with actual game name
    sed -i '' "s/GAME_TITLE_PLACEHOLDER/${game_name}/g" "${deploy_dir}/index.html"
}

# Main build process
echo "Starting build process..."
echo "Build mode: ${BUILD_MODE}"
echo "Target: ${TARGET}"
echo ""

# Create web-deploy directory structure
mkdir -p "${REPO_ROOT}/web-deploy/fibonacci-suite"

# Build each game
for game in "${GAMES[@]}"; do
    build_game "$game"
done

# Create suite hub page
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}Creating Suite Hub Page${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

cat > "${REPO_ROOT}/web-deploy/fibonacci-suite/index.html" << 'HUB_EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fibonacci Castle Suite - VLTRN Games</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #0a0806 0%, #1a1510 100%);
            color: #ffd700;
            min-height: 100vh;
            padding: 40px 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .header {
            text-align: center;
            margin-bottom: 60px;
        }

        .header h1 {
            font-size: 4em;
            text-shadow: 0 0 30px rgba(255, 215, 0, 0.6);
            margin-bottom: 15px;
        }

        .header p {
            font-size: 1.5em;
            color: #c9a959;
            font-style: italic;
        }

        .fibonacci-sequence {
            text-align: center;
            font-size: 2em;
            margin: 30px 0;
            color: #ffd700;
            text-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
        }

        .games-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 50px;
        }

        .game-card {
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05));
            border: 2px solid #ffd700;
            border-radius: 15px;
            padding: 30px;
            text-decoration: none;
            color: #ffd700;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .game-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 40px rgba(255, 215, 0, 0.4);
            border-color: #fff;
        }

        .game-card .fib-number {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 3em;
            opacity: 0.2;
            font-weight: bold;
        }

        .game-card h2 {
            font-size: 2em;
            margin-bottom: 15px;
        }

        .game-card p {
            color: #c9a959;
            line-height: 1.6;
        }

        .game-card.available {
            cursor: pointer;
        }

        .game-card.coming-soon {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .game-card.coming-soon::after {
            content: "Coming Soon";
            position: absolute;
            bottom: 15px;
            right: 15px;
            background: rgba(255, 215, 0, 0.2);
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.8em;
        }

        .phi-info {
            text-align: center;
            margin-top: 60px;
            padding: 30px;
            background: rgba(255, 215, 0, 0.05);
            border-radius: 15px;
        }

        .phi-info h3 {
            font-size: 1.5em;
            margin-bottom: 15px;
        }

        .phi-value {
            font-size: 2em;
            color: #fff;
            text-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏰 The Fibonacci Castle Suite</h1>
            <p>"Where Mathematics Meets Magic"</p>
        </div>

        <div class="fibonacci-sequence">
            1 • 1 • 2 • 3 • 5 • 8 • 13 • 21 • 34 • 55 • 89 • 144...
        </div>

        <div class="games-grid">
            <a href="01-unicastle/" class="game-card available">
                <div class="fib-number">1</div>
                <h2>UniCastle</h2>
                <p>"One Tower Rises"</p>
                <p>The beginning. Learn Fibonacci through simple jumping mechanics.</p>
            </a>

            <div class="game-card coming-soon">
                <div class="fib-number">1</div>
                <h2>DuoCastle</h2>
                <p>"The Mirror"</p>
                <p>Two paths diverge. Choose wisely between mirrored towers.</p>
            </div>

            <div class="game-card coming-soon">
                <div class="fib-number">2</div>
                <h2>TriCastle</h2>
                <p>"The Triangle"</p>
                <p>Three towers unite. Discover the power of pattern recognition.</p>
            </div>

            <div class="game-card coming-soon">
                <div class="fib-number">3</div>
                <h2>PentaCastle</h2>
                <p>"The Hand"</p>
                <p>Five towers, five powers. Master the pentagon of abilities.</p>
            </div>

            <div class="game-card coming-soon">
                <div class="fib-number">5</div>
                <h2>OctaCastle</h2>
                <p>"The Spider's Web"</p>
                <p>Eight towers in octagonal harmony. Navigate the golden web.</p>
            </div>

            <div class="game-card coming-soon">
                <div class="fib-number">8</div>
                <h2>FiboQuest</h2>
                <p>"The Grand Journey"</p>
                <p>All games unite. Every number tells a story.</p>
            </div>

            <div class="game-card coming-soon">
                <div class="fib-number">13</div>
                <h2>Spiral Citadel</h2>
                <p>"The Ultimate Challenge"</p>
                <p>The golden spiral awaits. Mathematics becomes pure magic.</p>
            </div>
        </div>

        <div class="phi-info">
            <h3>The Golden Ratio</h3>
            <div class="phi-value">φ = 1.618033988749894...</div>
            <p>Every game in this suite is designed using the golden ratio and Fibonacci sequence.<br>
            From the colors you see to the mechanics you play, mathematics shapes your experience.</p>
        </div>
    </div>
</body>
</html>
HUB_EOF

echo -e "${GREEN}✓ Suite hub page created${NC}"
echo ""

# Build complete
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✨ Build Complete! ✨${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Built games:"
for game in "${GAMES[@]}"; do
    echo "  • ${game}"
done
echo ""
echo "Deployment ready at: ${REPO_ROOT}/web-deploy/fibonacci-suite/"
echo ""
echo "φ = 1.618033988749894848204586834365638117720309179805762862135..."
echo "Where Mathematics Meets Magic ✨"
