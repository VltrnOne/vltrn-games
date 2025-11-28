# 🎯 Get "Lil J's Castle" on vltrngames.com RIGHT NOW

## The Issue
Files are created locally but not deployed to your website yet.

## Solution: Choose Your Method

### Method 1: Quick Manual Deploy (Fastest - 2 minutes)

```bash
# Run the deployment script
./deploy-manual.sh
```

It will ask for:
- SSH username (your server username)
- Server hostname (vltrngames.com)
- Deployment path (usually `/var/www/vltrngames.com` or `/var/www/html`)

### Method 2: Add to Your Main Landing Page

Since your website shows game cards, add "Lil J's Castle" as a card:

1. **Open your main website HTML file** (the one showing ROBOT LYRIC, ARIAPAC, etc.)

2. **Add this HTML code** where you want the game card to appear:

```html
<div class="game-card" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px; padding: 20px; text-align: center; cursor: pointer; transition: transform 0.3s;" onclick="window.location.href='/liljs-castle/'">
    <div style="font-size: 4em; margin-bottom: 10px;">🏰</div>
    <h3 style="color: white; margin: 10px 0; font-size: 1.5em;">LIL J'S CASTLE</h3>
    <p style="color: rgba(255,255,255,0.9); margin: 5px 0; font-size: 0.9em;">by VLTRN Games</p>
    <p style="color: rgba(255,255,255,0.8); margin-top: 10px; font-size: 0.85em;">Explore a magical castle adventure! Built with Castle Game Engine.</p>
</div>
```

3. **Or embed the iframe directly on the page:**

```html
<div style="margin: 40px 0; padding: 20px;">
    <h2 style="text-align: center; color: white; margin-bottom: 20px; font-size: 2em;">🏰 Lil J's Castle</h2>
    <div style="max-width: 1280px; margin: 0 auto; background: white; border-radius: 12px; padding: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
        <iframe 
            src="/liljs-castle/game/index.html"
            width="100%" 
            height="720"
            style="border: none; border-radius: 8px; min-height: 720px; display: block;"
            allowfullscreen
            title="Lil J's Castle Game">
        </iframe>
    </div>
</div>
```

### Method 3: Deploy via GitHub (If you have GitHub repo set up)

```bash
# First, set up your GitHub repo (if not done)
./setup-github.sh

# Then commit and push
git add .
git commit -m "Add Lil J's Castle"
git push origin main
```

## After Deploying

1. **Test the URL**: `https://vltrngames.com/liljs-castle/`
2. **Check browser console** (F12) for any errors
3. **Verify files exist** on server:
   ```bash
   ssh YOUR_USERNAME@vltrngames.com
   ls -la /var/www/vltrngames.com/liljs-castle/
   ```

## What You'll See

- **Right now**: A placeholder page (until you build the game)
- **After building**: The actual Castle Engine game

## Build the Real Game Later

Once the iframe is working, build the actual game:

```bash
./build-web.sh
```

Then deploy again to replace the placeholder.

---

**Quick Test Locally First:**
```bash
./test-local.sh
```
Visit `http://localhost:8000` to see if it works before deploying.

