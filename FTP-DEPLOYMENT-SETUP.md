# 🚀 FTP Deployment Setup for SiteGround

## ✅ Solution Implemented

The deployment workflow has been updated to use **FTP instead of SSH** to bypass SiteGround's firewall restrictions on GitHub Actions.

---

## 🔐 Required GitHub Secrets

You need to add **3 FTP credentials** to your GitHub repository secrets:

### Go to: https://github.com/VltrnOne/vltrn-games/settings/secrets/actions

### Add these secrets:

| Secret Name | Description | Example Value |
|------------|-------------|---------------|
| `FTP_SERVER` | Your FTP hostname | `ftp.vltrngames.com` |
| `FTP_USERNAME` | Your FTP username | `vltrngame` or `yourusername@vltrngames.com` |
| `FTP_PASSWORD` | Your FTP password | `your_ftp_password` |

---

## 📋 How to Get Your FTP Credentials

### Option 1: SiteGround Control Panel

1. Login to SiteGround: https://my.siteground.com/
2. Go to **Site Tools** → **Dev** → **FTP Accounts Manager**
3. Find or create an FTP account for `vltrngames.com`
4. Note the:
   - **FTP Server/Host** (e.g., `ftp.vltrngames.com`)
   - **Username** (e.g., `vltrngame` or `username@vltrngames.com`)
   - **Password** (if you don't have it, reset it)

### Option 2: Check Your Email

SiteGround sends FTP credentials when you first set up hosting. Search for:
- Subject: "Your SiteGround Account Information"
- Keywords: "FTP", "FTP credentials"

---

## 🎯 Setting Up the Secrets

### Step-by-Step:

1. **Navigate to GitHub Secrets:**
   ```
   https://github.com/VltrnOne/vltrn-games/settings/secrets/actions
   ```

2. **Click "New repository secret"**

3. **Add FTP_SERVER:**
   - Name: `FTP_SERVER`
   - Secret: Your FTP hostname (e.g., `ftp.vltrngames.com`)
   - Click **"Add secret"**

4. **Add FTP_USERNAME:**
   - Click **"New repository secret"** again
   - Name: `FTP_USERNAME`
   - Secret: Your FTP username
   - Click **"Add secret"**

5. **Add FTP_PASSWORD:**
   - Click **"New repository secret"** again
   - Name: `FTP_PASSWORD`
   - Secret: Your FTP password
   - Click **"Add secret"**

---

## ✅ After Adding Secrets

Once all 3 secrets are configured, you can deploy:

### Option 1: Automatic Deployment
Push any changes to the `main` or `master` branch:
```bash
cd "/Users/Morpheous/Kids Castle"
git add .
git commit -m "Enable FTP deployment"
git push origin master
```

### Option 2: Manual Trigger
```bash
cd "/Users/Morpheous/Kids Castle"
gh workflow run deploy-to-vltrngames.yml --repo VltrnOne/vltrn-games
```

### Option 3: Via GitHub Website
1. Go to: https://github.com/VltrnOne/vltrn-games/actions
2. Click **"Deploy to vltrngames.com"**
3. Click **"Run workflow"**
4. Click the green **"Run workflow"** button

---

## 🌐 Deployment Details

### What Gets Deployed:
- **Source:** `web-deploy/` directory from your repository
- **Destination:** `public_html/` on your SiteGround server
- **Method:** FTP via SamKirkland/FTP-Deploy-Action

### File Structure on Server:
```
public_html/
├── liljs-castle/
│   ├── index.html
│   └── game/
│       └── index.html
│
└── fibonacci-suite/
    ├── index.html (Suite hub page)
    └── 01-unicastle/
        ├── index.html
        └── game/
            └── index.html
```

### Accessible URLs:
- **Lil J's Castle:** https://vltrngames.com/liljs-castle/
- **Fibonacci Suite Hub:** https://vltrngames.com/fibonacci-suite/
- **UniCastle:** https://vltrngames.com/fibonacci-suite/01-unicastle/

---

## 🔧 Deployment Workflow Changes

### What Changed:
- ❌ Removed SSH/rsync deployment (was being blocked by firewall)
- ✅ Added FTP deployment using SamKirkland/FTP-Deploy-Action
- ✅ No more SSH connection timeouts
- ✅ Works with SiteGround's firewall restrictions

### Benefits:
- ✅ Bypasses GitHub Actions IP blocking
- ✅ Reliable deployment from CI/CD
- ✅ Automatic deployment on push
- ✅ No manual upload required

---

## 🆘 Troubleshooting

### If deployment fails with "FTP credentials missing":
1. Verify all 3 secrets are added in GitHub
2. Check for typos in secret names (must be exact: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`)
3. Refresh the Actions page and try again

### If FTP connection fails:
1. **Test FTP locally:**
   ```bash
   ftp ftp.vltrngames.com
   # Enter username and password when prompted
   ```
2. **Common issues:**
   - Wrong FTP hostname (check SiteGround settings)
   - Incorrect username format (try both `username` and `username@domain.com`)
   - Wrong password (reset in SiteGround if needed)
   - FTP account disabled (enable in SiteGround FTP Manager)

### If files don't appear on website:
1. Check deployment logs in GitHub Actions
2. Verify `server-dir: ./public_html/` matches your SiteGround setup
3. Some hosts use `/home/username/public_html/` instead of `./public_html/`
4. Contact SiteGround support to confirm web root directory

---

## 📊 Deployment Status Checklist

Before first deployment:
- [ ] Add `FTP_SERVER` secret to GitHub
- [ ] Add `FTP_USERNAME` secret to GitHub
- [ ] Add `FTP_PASSWORD` secret to GitHub
- [ ] Verify FTP credentials work (test locally)
- [ ] Push workflow changes to GitHub
- [ ] Trigger deployment (automatic or manual)
- [ ] Check deployment logs for success
- [ ] Verify games are accessible at vltrngames.com

---

## 📚 Additional Resources

- **SiteGround FTP Guide:** https://www.siteground.com/kb/ftp-accounts/
- **GitHub Actions Secrets:** https://docs.github.com/en/actions/security-guides/encrypted-secrets
- **FTP Deploy Action:** https://github.com/SamKirkland/FTP-Deploy-Action

---

## 🎮 Next Steps

1. **Add FTP secrets to GitHub** (see instructions above)
2. **Commit and push this workflow update**
3. **Watch deployment succeed** 🎉
4. **Visit your games:**
   - https://vltrngames.com/liljs-castle/
   - https://vltrngames.com/fibonacci-suite/

---

*Where Mathematics Meets Magic* ✨

φ = 1.618033988749894848204586834365638117720309179805762862135...
