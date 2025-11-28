# 🔍 Debug Connection Timeout Issue

## Status: All Secrets Are Set ✅

You have all 5 secrets configured:
- ✅ `DEPLOY_SSH_KEY`
- ✅ `DEPLOY_HOST`
- ✅ `DEPLOY_USER`
- ✅ `DEPLOY_PATH`
- ✅ `DEPLOY_PORT`

But deployment still times out. Here's how to debug:

## Possible Issues

### 1. Verify DEPLOY_PORT Value

The port might be set incorrectly. Check:

1. Go to: https://github.com/VltrnOne/vltrn-games/settings/secrets/actions
2. Click the edit (pencil) icon next to `DEPLOY_PORT`
3. Verify the value is exactly `18765` (no spaces, no quotes)
4. If it's different, update it

### 2. Firewall Blocking GitHub Actions

Some hosting providers block connections from GitHub Actions IPs.

**Solution:** Contact your hosting provider and ask:
> "I need to allow SSH connections from GitHub Actions for automated deployment. Can you whitelist GitHub's IP ranges or allow connections from any IP?"

**GitHub Actions IP ranges:** https://api.github.com/meta

### 3. Wrong DEPLOY_HOST Value

Check if `DEPLOY_HOST` is set correctly:

- Should be: `vltrngames.com` (domain name)
- OR: Your server IP address (e.g., `123.45.67.89`)
- NOT: `https://vltrngames.com` (no https://)
- NOT: `vltrngames.com:18765` (port goes in DEPLOY_PORT, not DEPLOY_HOST)

### 4. GitHub Pages vs SSH Server

The 404 page showed "GitHub Pages" branding. If vltrngames.com is hosted on GitHub Pages, SSH deployment won't work.

**Check:** Visit https://github.com/VltrnOne/vltrn-games/settings/pages

- If GitHub Pages is enabled → Need different deployment method
- If not enabled → Continue with SSH deployment

### 5. Test SSH Connection Manually

Test if you can connect from your local machine:

```bash
# Test SSH connection
ssh -p 18765 your_username@vltrngames.com

# If that works, test rsync
rsync -avz --dry-run test.txt your_username@vltrngames.com:/path/to/test/
```

Replace with your actual values from secrets.

## Quick Fixes to Try

### Fix 1: Add Connection Timeout

The workflow might need a longer timeout. Let me update it to add timeout settings.

### Fix 2: Verify Secret Values

Double-check each secret value:
- No extra spaces
- No quotes around values
- Correct format (domain vs IP)

### Fix 3: Check Hosting Provider Settings

Some hosts require:
- IP whitelisting
- SSH key to be added to authorized_keys
- Specific SSH configuration

## Next Steps

1. **Verify secret values** (especially DEPLOY_PORT and DEPLOY_HOST)
2. **Check if site is GitHub Pages** (if yes, we need different approach)
3. **Contact hosting provider** about firewall/IP restrictions
4. **Test SSH manually** from your computer

---

**Most Likely Issue:** Firewall blocking GitHub Actions IPs or wrong port value.

Let me know what you find and I can help fix it!

