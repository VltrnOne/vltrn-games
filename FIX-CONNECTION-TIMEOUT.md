# 🔧 Fix Connection Timeout Error

## The Problem

Deployment failed with:
```
ssh: connect to host *** port ***: Connection timed out
rsync: connection unexpectedly closed
```

## Possible Causes

### 1. DEPLOY_PORT Secret Not Set
The workflow uses port 18765 (SiteGround), but if `DEPLOY_PORT` secret isn't set, it defaults to port 22.

**Fix:** Add `DEPLOY_PORT` secret:
- Go to: https://github.com/VltrnOne/vltrn-games/settings/secrets/actions
- Click "New repository secret"
- Name: `DEPLOY_PORT`
- Value: `18765` (or your actual SSH port)

### 2. Wrong SSH Port
If your server uses a different port than 18765, set `DEPLOY_PORT` to the correct port.

**How to find your SSH port:**
- Check your hosting control panel
- Look for "SSH Access" or "SSH Details"
- Or check your hosting provider's documentation

### 3. Firewall Blocking Connection
Some hosting providers block SSH from GitHub Actions IPs.

**Fix:** Contact your hosting provider and ask:
> "I need to allow SSH connections from GitHub Actions IPs for automated deployment. Can you whitelist GitHub's IP ranges?"

### 4. GitHub Pages Instead of SSH Server
If vltrngames.com is hosted on GitHub Pages, SSH deployment won't work.

**Check:** Visit https://github.com/VltrnOne/vltrn-games/settings/pages
- If GitHub Pages is enabled, you need a different deployment method

## Quick Fix Steps

1. **Add DEPLOY_PORT secret:**
   - Value: `18765` (or your actual port)

2. **Verify all secrets are set:**
   - ✅ `DEPLOY_SSH_KEY`
   - ✅ `DEPLOY_HOST`
   - ✅ `DEPLOY_USER`
   - ✅ `DEPLOY_PATH`
   - ✅ `DEPLOY_PORT` ← **Add this one!**

3. **Test deployment again:**
   - Push a commit or manually trigger the workflow
   - Watch: https://github.com/VltrnOne/vltrn-games/actions

## If Still Failing

If connection still times out after setting `DEPLOY_PORT`:

1. **Test SSH manually:**
   ```bash
   ssh -p 18765 your_username@vltrngames.com
   ```
   (Replace with your actual values)

2. **Check hosting provider:**
   - Some hosts require IP whitelisting
   - Some hosts have different SSH ports
   - Some hosts don't allow automated deployments

3. **Alternative: Use GitHub Pages**
   - If vltrngames.com is on GitHub Pages, we need to change the deployment method
   - Files would need to be in `docs/` folder or `gh-pages` branch

---

**Next Step:** Add the `DEPLOY_PORT` secret and try again!

