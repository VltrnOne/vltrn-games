# 🎯 Iframe Setup Guide - Games from GitHub

## Quick Answer

**Q: Are "Robot Lyric" and "Aria Pac" in the same project?**
- **No** - They are **separate games** that are already live on vltrngames.com
- They are **NOT** in this Castle Engine repository
- They are deployed separately (likely from their own repositories or manually)

**Q: How do I point this project to an iframe on a URL pushed from GitHub?**
- Games in **this repository** (like Lil J's Castle, UniCastle) auto-deploy from GitHub
- Each game gets its own iframe wrapper page
- When you push to GitHub, the website auto-updates!

---

## 🎮 Current Games Status

### Games in This Repository (Auto-Deploy via GitHub Pages)
- 🤖 **Robot Lyric** - `robot-lyric/` (copied from separate repo)
- 🏰 **Lil J's Castle** - `projects/liljs-castle/` → `liljs-castle/`
- 🦄 **UniCastle** - `projects/01-unicastle/` → `fibonacci-suite/01-unicastle/`
- ✨ **Fibonacci Suite Hub** - `fibonacci-suite/`
- 🎯 **Future games** - Add to `projects/` directory

### Games NOT in This Repository (Separate Projects)
- ✅ **ARIAPAC** - Deployed separately (can be added later)
- ✅ **POKEMON RED & BLUE** - Deployed separately (can be added later)

---

## 📋 How Iframe Integration Works

### Pattern for Games in This Repository

Each game follows this structure:

```
web-deploy/
├── game-name/
│   ├── index.html          ← Iframe wrapper page (what users see)
│   ├── game/
│   │   └── index.html      ← Actual game (built from source)
│   └── .htaccess          ← Web server config
```

### Example: Lil J's Castle

**1. Source Code** (in repository):
```
projects/liljs-castle/
├── code/
│   ├── gameinitialize.pas
│   └── gameviewmain.pas
└── CastleEngineManifest.xml
```

**2. Built Game** (auto-generated on deploy):
```
web-deploy/liljs-castle/game/
├── index.html              ← Built game files
├── game.js
└── ... (other game assets)
```

**3. Iframe Wrapper** (in repository):
```
web-deploy/liljs-castle/index.html  ← Wrapper page with iframe
```

**4. Final URL Structure**:
- **Wrapper page**: `https://vltrngames.com/liljs-castle/`
- **Game iframe**: `https://vltrngames.com/liljs-castle/game/index.html`

---

## 🔧 Setting Up Iframe for a New Game

### Step 1: Create Game Project

```bash
# Create new game directory
mkdir -p projects/my-new-game/code
mkdir -p projects/my-new-game/data

# Add game code files
# ... (your game code)
```

### Step 2: Create Iframe Wrapper

Create `web-deploy/my-new-game/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My New Game - VLTRN Games</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }
        
        .iframe-container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            padding: 20px;
            max-width: 1400px;
            width: 100%;
        }
        
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        
        .header h1 {
            color: #333;
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        
        .game-frame {
            width: 100%;
            height: 0;
            padding-bottom: 56.25%; /* 16:9 aspect ratio */
            position: relative;
            border: 3px solid #667eea;
            border-radius: 8px;
            overflow: hidden;
            background: #000;
        }
        
        .game-frame iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
        }
    </style>
</head>
<body>
    <div class="iframe-container">
        <div class="header">
            <h1>🎮 My New Game</h1>
            <p>Powered by Castle Game Engine | VLTRN Games</p>
        </div>
        
        <div class="game-frame">
            <iframe 
                src="./game/index.html"
                allow="fullscreen"
                allowfullscreen
                title="My New Game"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
            ></iframe>
        </div>
    </div>
</body>
</html>
```

### Step 3: Create Placeholder Game Directory

```bash
mkdir -p web-deploy/my-new-game/game
echo '<!DOCTYPE html><html><body><h1>Game loading...</h1></body></html>' > web-deploy/my-new-game/game/index.html
```

### Step 4: Update Build Script

Add your game to `build-all-games.sh`:

```bash
# Build My New Game
echo "Building My New Game..."
cd projects/my-new-game
castle-engine compile --target=web --mode=release
cp -r castle-engine-output/web/dist/* ../../web-deploy/my-new-game/game/
cd ../..
```

### Step 5: GitHub Pages Auto-Deployment

**No workflow needed!** GitHub Pages automatically:
- Serves files from your repository root
- Updates when you push to GitHub
- Handles HTTPS via CNAME file (`vltrngames.com`)

**File Structure for GitHub Pages:**
```
Repository Root/
├── CNAME                    ← Points to vltrngames.com
├── .nojekyll                ← Disables Jekyll processing
├── index.html               ← Landing page
├── robot-lyric/             ← Game directory
├── liljs-castle/            ← Game directory
└── fibonacci-suite/         ← Game suite directory
```

### Step 6: Push to GitHub

```bash
git add .
git commit -m "Add My New Game"
git push origin main
```

**That's it!** The game will:
1. Be available immediately after push
2. Auto-deploy via GitHub Pages
3. Be accessible at `https://vltrngames.com/my-new-game/`

**Note**: For Castle Engine games, you'll need to build them locally first, then commit the built files to the repository. GitHub Pages serves static files only.

---

## 🔗 Adding Game to Main Landing Page

To add your game as a card on the main vltrngames.com page:

### Option 1: Game Card (Links to Game Page)

```html
<div class="game-card" 
     style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            border-radius: 15px; 
            padding: 20px; 
            text-align: center; 
            cursor: pointer; 
            transition: transform 0.3s;" 
     onclick="window.location.href='/my-new-game/'">
    <div style="font-size: 4em; margin-bottom: 10px;">🎮</div>
    <h3 style="color: white; margin: 10px 0; font-size: 1.5em;">MY NEW GAME</h3>
    <p style="color: rgba(255,255,255,0.9); margin: 5px 0; font-size: 0.9em;">by VLTRN Games</p>
    <p style="color: rgba(255,255,255,0.8); margin-top: 10px; font-size: 0.85em;">
        Description of your game!
    </p>
</div>
```

### Option 2: Direct Iframe Embed

```html
<div style="margin: 40px 0;">
    <h2 style="text-align: center; color: white; margin-bottom: 20px;">🎮 My New Game</h2>
    <div style="max-width: 1280px; margin: 0 auto; background: white; border-radius: 12px; padding: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
        <iframe 
            src="/my-new-game/game/index.html"
            width="100%" 
            height="720"
            style="border: none; border-radius: 8px; min-height: 720px;"
            allowfullscreen
            title="My New Game">
        </iframe>
    </div>
</div>
```

---

## 🚀 Auto-Deployment Flow (GitHub Pages)

```
┌─────────────────┐
│  Your Code      │
│  (projects/)    │
└────────┬────────┘
         │
         │ git push
         ▼
┌─────────────────┐
│  GitHub Repo    │
└────────┬────────┘
         │
         │ Auto-triggers
         ▼
┌─────────────────┐
│ GitHub Pages    │
│ 1. Builds site  │
│ 2. Serves files │
│    from repo    │
└────────┬────────┘
         │
         │ Auto-deploys
         ▼
┌─────────────────┐
│ vltrngames.com  │
│  Auto-updates!  │
│  (via CNAME)    │
└─────────────────┘
```

**Note**: This repository uses **GitHub Pages** for deployment, not SSH/rsync. When you push to GitHub, GitHub Pages automatically rebuilds and deploys your site!

---

## 📍 Current Game URLs

### Games in This Repository (GitHub Pages):
- **Main Portal**: `https://vltrngames.com/` (Landing page with game cards)
- **Robot Lyric**: `https://vltrngames.com/robot-lyric/`
- **Lil J's Castle**: `https://vltrngames.com/liljs-castle/`
- **Fibonacci Suite Hub**: `https://vltrngames.com/fibonacci-suite/`
- **UniCastle**: `https://vltrngames.com/fibonacci-suite/01-unicastle/`

### Games NOT in This Repository (Can be added):
- **ARIAPAC**: Can be copied from separate repo
- **Pokemon R&B**: Can be copied from separate repo

---

## ✅ Quick Checklist

To add a new game with iframe integration:

- [ ] Create game in `projects/my-game/`
- [ ] Create iframe wrapper in `web-deploy/my-game/index.html`
- [ ] Create placeholder in `web-deploy/my-game/game/index.html`
- [ ] Add build step to `build-all-games.sh`
- [ ] Test locally: `./build-all-games.sh`
- [ ] Commit and push: `git push origin main`
- [ ] Verify deployment: Check GitHub Actions
- [ ] Test URL: `https://vltrngames.com/my-game/`
- [ ] Add to main landing page (optional)

---

## 🎯 Summary

**Robot Lyric & Aria Pac**: Separate projects, not in this repo

**Games in This Repo**: Auto-deploy via GitHub Actions when you push

**Iframe Setup**: Each game gets a wrapper page that loads the game in an iframe

**Auto-Update**: Push to GitHub → Auto-build → Auto-deploy → Website updates!

---

Need help? Check:
- `AUTO-DEPLOY-SETUP.md` - How auto-deployment works
- `GET-IFRAME-ON-SITE.md` - Adding games to main page
- `build-all-games.sh` - Build script examples

