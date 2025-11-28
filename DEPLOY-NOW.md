# 🚀 Deploy "Lil J's Castle" Right Now!

## The Problem
The files are created locally but haven't been deployed to vltrngames.com yet.

## Quick Deploy (Choose One)

### Option 1: Auto-Deploy via GitHub (Recommended)

```bash
# 1. Add all files
git add .

# 2. Commit
git commit -m "Add Lil J's Castle project and deployment files"

# 3. Push to GitHub
git push origin main
```

GitHub Actions will automatically deploy to vltrngames.com.

**Wait 2-3 minutes**, then check:
- `https://vltrngames.com/liljs-castle/`

### Option 2: Manual Deploy via SSH

```bash
# Deploy directly to server
rsync -avz web-deploy/liljs-castle/ \
  YOUR_USERNAME@vltrngames.com:/var/www/vltrngames.com/liljs-castle/
```

Replace `YOUR_USERNAME` with your SSH username.

### Option 3: Add to Main Landing Page

If you want "Lil J's Castle" to appear on your main landing page (like the other game cards):

1. **Add as a game card:**
   - Open your main website's HTML file
   - Add the code from `web-deploy/liljs-castle/integrate.html` (first div)
   - Place it with your other game cards

2. **Or embed iframe directly:**
   - Add the second code block from `integrate.html`
   - Place it where you want the game to appear

## Verify Deployment

After deploying, test these URLs:

1. **Standalone page**: `https://vltrngames.com/liljs-castle/`
2. **Direct game**: `https://vltrngames.com/liljs-castle/game/index.html`

## If Still Not Working

1. **Check file permissions:**
   ```bash
   ssh YOUR_USERNAME@vltrngames.com
   ls -la /var/www/vltrngames.com/liljs-castle/
   ```

2. **Check web server config:**
   - Make sure your web server (Apache/Nginx) is serving files from that directory
   - Check if there's a `.htaccess` file blocking access

3. **Check browser console:**
   - Open DevTools (F12)
   - Look for 404 errors or CORS issues

4. **Test locally first:**
   ```bash
   ./test-local.sh
   ```
   Then visit `http://localhost:8000`

## Next Steps

Once deployed and visible:
1. Build the actual game: `./build-web.sh`
2. Deploy again to replace placeholder with real game

---

**Need help?** Check `TROUBLESHOOTING.md`

