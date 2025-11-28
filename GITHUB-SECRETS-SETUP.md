# 🔐 GitHub Secrets Setup Guide

## Quick Access

**Direct link to Secrets page:**
👉 https://github.com/VltrnOne/vltrn-games/settings/secrets/actions

## Step-by-Step Instructions

### 1. Navigate to Secrets Page

**Option A: Via Repository**
1. Go to: https://github.com/VltrnOne/vltrn-games
2. Click **"Settings"** (top menu bar, next to "Insights")
3. In left sidebar, click **"Secrets and variables"**
4. Click **"Actions"**

**Option B: Direct Link**
👉 https://github.com/VltrnOne/vltrn-games/settings/secrets/actions

### 2. Add Secrets

Click **"New repository secret"** button for each secret:

#### Secret 1: `DEPLOY_SSH_KEY`
- **Name:** `DEPLOY_SSH_KEY`
- **Value:** Your SSH private key (for server access)
- **How to get it:**
  ```bash
  # If you have an SSH key:
  cat ~/.ssh/id_rsa
  # or
  cat ~/.ssh/id_ed25519
  
  # If you don't have one, generate it:
  ssh-keygen -t ed25519 -C "deploy@vltrngames.com"
  ```
- **Important:** Copy the ENTIRE key including `-----BEGIN` and `-----END` lines

#### Secret 2: `DEPLOY_HOST`
- **Name:** `DEPLOY_HOST`
- **Value:** `vltrngames.com`
- **Or:** Your server IP address if different

#### Secret 3: `DEPLOY_USER`
- **Name:** `DEPLOY_USER`
- **Value:** Your SSH username
- **Common values:** `deploy`, `root`, `ubuntu`, `www-data`, or your username

#### Secret 4: `DEPLOY_PATH`
- **Name:** `DEPLOY_PATH`
- **Value:** `/var/www/vltrngames.com`
- **Or:** Your actual web root path
- **Common paths:**
  - `/var/www/vltrngames.com`
  - `/var/www/html`
  - `/home/username/public_html`
  - `/usr/share/nginx/html`

### 3. Verify Secrets

After adding all 4 secrets, you should see:
- ✅ DEPLOY_SSH_KEY
- ✅ DEPLOY_HOST
- ✅ DEPLOY_USER
- ✅ DEPLOY_PATH

## Testing Your Secrets

### Test SSH Connection

```bash
# Test SSH connection
ssh $DEPLOY_USER@$DEPLOY_HOST

# Test if you can access the deployment path
ssh $DEPLOY_USER@$DEPLOY_HOST "ls -la $DEPLOY_PATH"
```

### Test Deployment

After adding secrets, trigger a deployment:
1. Go to: https://github.com/VltrnOne/vltrn-games/actions
2. Click **"Deploy to vltrngames.com"** workflow
3. Click **"Run workflow"** button (if available)
4. Or make a small change and push to trigger it

## Troubleshooting

### Can't find Secrets page?
- Make sure you're logged into GitHub
- Make sure you have admin access to the repository
- Try the direct link: https://github.com/VltrnOne/vltrn-games/settings/secrets/actions

### SSH Key Issues?
- Make sure the key has no extra spaces or line breaks
- Include the BEGIN and END lines
- Make sure the public key is on your server:
  ```bash
  ssh-copy-id $DEPLOY_USER@$DEPLOY_HOST
  ```

### Permission Issues?
- Make sure your SSH user can write to DEPLOY_PATH
- Check permissions:
  ```bash
  ssh $DEPLOY_USER@$DEPLOY_HOST "ls -ld $DEPLOY_PATH"
  ```

## Security Notes

⚠️ **Important:**
- Never commit secrets to your repository
- Secrets are encrypted by GitHub
- Only repository admins can see/edit secrets
- Use different keys for different environments if possible

## Quick Reference

| Secret Name | Example Value | Description |
|------------|---------------|-------------|
| `DEPLOY_SSH_KEY` | `-----BEGIN OPENSSH...` | SSH private key |
| `DEPLOY_HOST` | `vltrngames.com` | Server hostname |
| `DEPLOY_USER` | `deploy` | SSH username |
| `DEPLOY_PATH` | `/var/www/vltrngames.com` | Web root path |

---

**Once secrets are set up, your next push will automatically deploy!** 🚀

