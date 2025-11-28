# Quick Fix - Iframe Not Showing

## Immediate Solution

The iframe should now work! Here's what was fixed:

1. ✅ Created placeholder `game/index.html` - so the iframe has something to load
2. ✅ Updated deployment path - files go directly to `/liljs-castle/` on server
3. ✅ Added `.htaccess` for proper web server configuration
4. ✅ Added iframe sandbox attributes for security

## Test Locally First

Before deploying, test locally:

```bash
./test-local.sh
```

This will start a local server. Open `http://localhost:8000` in your browser.

## Deploy to Website

### Option 1: Auto-Deploy (Recommended)
```bash
git add .
git commit -m "Fix iframe deployment"
git push origin main
```

GitHub Actions will automatically deploy to vltrngames.com.

### Option 2: Manual Deploy
```bash
# Deploy directly
rsync -avz web-deploy/liljs-castle/ user@vltrngames.com:/var/www/vltrngames.com/liljs-castle/
```

## Verify It Works

After deployment, check:

1. **Direct access**: `https://vltrngames.com/liljs-castle/`
2. **Game page**: `https://vltrngames.com/liljs-castle/game/index.html`
3. **Browser console**: Open DevTools (F12) and check for errors

## What You Should See

- **Before building game**: A nice placeholder page with castle icon
- **After building game**: The actual Castle Engine game running

## Next Step: Build the Game

Once the iframe is working, build the actual game:

```bash
./build-web.sh
```

Then deploy again to replace the placeholder with the real game.

---

**Still not working?** Check `TROUBLESHOOTING.md` for detailed help.

