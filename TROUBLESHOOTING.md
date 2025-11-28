# Troubleshooting - Lil J's Castle Iframe

## Issue: Can't see the iframe on vltrngames.com

### Quick Checks

1. **Check if files are deployed:**
   ```bash
   # SSH into your server
   ssh user@vltrngames.com
   ls -la /var/www/vltrngames.com/liljs-castle/
   ```

2. **Check browser console:**
   - Open browser DevTools (F12)
   - Check Console tab for errors
   - Check Network tab to see if files are loading

3. **Verify URL:**
   - Try: `https://vltrngames.com/liljs-castle/`
   - Try: `https://vltrngames.com/liljs-castle/index.html`

### Common Issues & Solutions

#### Issue 1: Game directory doesn't exist
**Symptom:** Iframe shows "Loading game..." forever or 404 error

**Solution:**
```bash
# Build the game first
./build-web.sh

# Or create placeholder manually
mkdir -p web-deploy/liljs-castle/game
# (Placeholder index.html is already created)
```

#### Issue 2: Files not deployed to server
**Symptom:** Local files exist but website shows 404

**Solution:**
```bash
# Deploy manually
rsync -avz web-deploy/ user@vltrngames.com:/var/www/vltrngames.com/web-deploy/

# Or push to GitHub and let auto-deployment handle it
git add .
git commit -m "Add Lil J's Castle"
git push origin main
```

#### Issue 3: Path mismatch
**Symptom:** Files exist but wrong path

**Check deployment path:**
- If deployed to `/var/www/vltrngames.com/web-deploy/liljs-castle/`
- But website expects `/var/www/vltrngames.com/liljs-castle/`

**Solution:**
```bash
# Create symlink or copy files
ssh user@vltrngames.com
ln -s /var/www/vltrngames.com/web-deploy/liljs-castle /var/www/vltrngames.com/liljs-castle
```

#### Issue 4: CORS or iframe restrictions
**Symptom:** Iframe blocked by browser

**Solution:**
- Check if server has proper CORS headers (see `.htaccess`)
- Check if website has X-Frame-Options header blocking iframes
- Try accessing game directly: `https://vltrngames.com/liljs-castle/game/index.html`

#### Issue 5: Game not built yet
**Symptom:** Placeholder page shows instead of game

**Solution:**
```bash
# Build the game
cd projects/liljs-castle
castle-engine compile --target=web --mode=release

# Copy built files
cp -r castle-engine-output/web/dist/* ../../web-deploy/liljs-castle/game/
```

### Testing Locally

Before deploying, test locally:

```bash
# Start a simple HTTP server
cd web-deploy/liljs-castle
python3 -m http.server 8000

# Or with Node.js
npx http-server -p 8000

# Then visit: http://localhost:8000
```

### Deployment Checklist

- [ ] Game is built (`./build-web.sh` completed successfully)
- [ ] `web-deploy/liljs-castle/game/` directory contains files
- [ ] Files are pushed to GitHub
- [ ] GitHub Actions deployment succeeded
- [ ] Files exist on server at correct path
- [ ] Web server is configured correctly
- [ ] `.htaccess` is in place (if using Apache)
- [ ] Browser console shows no errors

### Debug Commands

```bash
# Check local files
ls -la web-deploy/liljs-castle/
ls -la web-deploy/liljs-castle/game/

# Check server files (after SSH)
ls -la /var/www/vltrngames.com/liljs-castle/
ls -la /var/www/vltrngames.com/liljs-castle/game/

# Test HTTP response
curl -I https://vltrngames.com/liljs-castle/
curl -I https://vltrngames.com/liljs-castle/game/index.html

# Check web server logs
tail -f /var/log/nginx/error.log  # For Nginx
tail -f /var/log/apache2/error.log  # For Apache
```

### Still Not Working?

1. Check GitHub Actions logs for deployment errors
2. Verify SSH keys and server access
3. Check web server configuration
4. Verify DNS and SSL certificate
5. Check firewall rules

---

**Need more help?** Check the main documentation:
- `SETUP.md` - Initial setup
- `BACKUP.md` - Collaboration guide
- `LILJS-CASTLE-SETUP.md` - Project setup

