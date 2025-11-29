# 🌐 GitHub Pages Deployment Setup

## Current Status: ✅ GitHub Pages Active

Your site is now deployed via **GitHub Pages** instead of SSH/FTP. This is simpler and more reliable!

---

## 📋 How It Works

### GitHub Pages Flow

```
Your Code → git push → GitHub → GitHub Pages → vltrngames.com
```

1. **You push code** to GitHub
2. **GitHub Pages** automatically builds and deploys
3. **Site updates** within 1-2 minutes
4. **No SSH/FTP needed!**

---

## 🔧 Repository Structure

### Required Files

- **`CNAME`** - Points `vltrngames.com` to this repository
- **`.nojekyll`** - Disables Jekyll processing (needed for Castle Engine games)
- **`index.html`** - Landing page with game cards

### Game Directories

```
Repository Root/
├── CNAME                    ← Custom domain config
├── .nojekyll                ← Disable Jekyll
├── index.html               ← Landing page
│
├── robot-lyric/             ← Robot Lyric game
│   └── index.html
│
├── liljs-castle/            ← Lil J's Castle game
│   ├── index.html           ← Iframe wrapper
│   └── game/                ← Built game files
│       └── index.html
│
└── fibonacci-suite/         ← Fibonacci Suite
    ├── index.html           ← Suite hub page
    └── 01-unicastle/        ← UniCastle game
        ├── index.html       ← Iframe wrapper
        └── game/            ← Built game files
            └── index.html
```

---

## 🎮 Adding a New Game

### Step 1: Create Game Directory

```bash
mkdir -p my-new-game/game
```

### Step 2: Create Iframe Wrapper

Create `my-new-game/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My New Game - VLTRN Games</title>
    <style>
        /* Your styles here */
    </style>
</head>
<body>
    <div class="iframe-container">
        <iframe 
            src="./game/index.html"
            allowfullscreen
            title="My New Game">
        </iframe>
    </div>
</body>
</html>
```

### Step 3: Build Game (if Castle Engine)

```bash
cd projects/my-new-game
castle-engine compile --target=web --mode=release
cp -r castle-engine-output/web/dist/* ../../my-new-game/game/
```

### Step 4: Add to Landing Page

Edit `index.html` and add a game card:

```html
<a href="/my-new-game/" class="game-card">
    <div class="game-icon">🎮</div>
    <div class="game-title">My New Game</div>
    <div class="game-desc">Description here</div>
</a>
```

### Step 5: Push to GitHub

```bash
git add .
git commit -m "Add My New Game"
git push origin main
```

**That's it!** The game will be live at `https://vltrngames.com/my-new-game/` within 1-2 minutes.

---

## 🔄 Updating Games

### For Static Games (like Robot Lyric)

Just edit the files and push:

```bash
# Edit files
vim robot-lyric/index.html

# Commit and push
git add robot-lyric/
git commit -m "Update Robot Lyric"
git push origin main
```

### For Castle Engine Games

1. **Build locally:**
   ```bash
   cd projects/liljs-castle
   castle-engine compile --target=web --mode=release
   ```

2. **Copy built files:**
   ```bash
   cp -r castle-engine-output/web/dist/* ../../liljs-castle/game/
   ```

3. **Commit and push:**
   ```bash
   git add liljs-castle/
   git commit -m "Update Lil J's Castle"
   git push origin main
   ```

---

## ✅ Benefits of GitHub Pages

- ✅ **No SSH/FTP setup** - Just push to GitHub
- ✅ **Automatic HTTPS** - Free SSL certificate
- ✅ **Fast deployment** - Updates in 1-2 minutes
- ✅ **Free hosting** - No server costs
- ✅ **Version control** - Full Git history
- ✅ **Easy rollback** - Revert to any commit

---

## 🚨 Important Notes

### Castle Engine Games

GitHub Pages serves **static files only**. For Castle Engine games:

1. **Build locally** before committing
2. **Commit the built files** (`game/` directory)
3. **Don't commit** `castle-engine-output/` (add to `.gitignore`)

### File Size Limits

- **Repository size**: 1GB soft limit
- **Individual files**: 100MB limit
- **Large games**: Consider using Git LFS

### Build Process

Since GitHub Pages can't build Castle Engine games, you have two options:

**Option 1: Build Locally** (Current)
- Build games on your computer
- Commit built files
- Push to GitHub

**Option 2: GitHub Actions** (Future)
- Use GitHub Actions to build games
- Actions build → commit built files → Pages deploys
- More automated but requires setup

---

## 🔍 Troubleshooting

### Site Not Updating?

1. **Check GitHub Pages status:**
   - Go to: `https://github.com/VltrnOne/vltrn-games/settings/pages`
   - Check build status

2. **Wait 1-2 minutes** after push
   - GitHub Pages takes time to rebuild

3. **Clear browser cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### CNAME Not Working?

1. **Verify CNAME file** exists in repository root
2. **Check DNS settings** - Should point to GitHub Pages IPs
3. **Wait for DNS propagation** - Can take up to 24 hours

### Game Not Loading?

1. **Check file paths** - Use relative paths (`./game/index.html`)
2. **Verify files exist** - Check `game/` directory has files
3. **Check browser console** - Look for 404 errors

---

## 📊 Current URLs

- **Main Portal**: https://vltrngames.com/
- **Robot Lyric**: https://vltrngames.com/robot-lyric/
- **Lil J's Castle**: https://vltrngames.com/liljs-castle/
- **Fibonacci Suite**: https://vltrngames.com/fibonacci-suite/
- **UniCastle**: https://vltrngames.com/fibonacci-suite/01-unicastle/

---

## 🎯 Summary

**Deployment Method**: GitHub Pages (not SSH/FTP)

**How to Deploy**: Just `git push` - that's it!

**Build Process**: Build locally, commit built files

**Update Time**: 1-2 minutes after push

**No Secrets Needed**: GitHub Pages handles everything automatically!

---

**φ = 1.618033988749... ✨**

