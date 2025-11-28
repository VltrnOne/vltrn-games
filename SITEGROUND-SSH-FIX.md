# 🔧 SiteGround SSH Connection Timeout - SOLUTION

## ❌ Current Issue

```
ssh: connect to host vltrngames.com port 18765: Connection timed out
rsync error: unexplained error (code 255)
```

The GitHub Actions workflow cannot connect to your SiteGround server via SSH.

---

## 🔍 Root Cause

**SiteGround blocks SSH connections from non-whitelisted IP addresses.**

GitHub Actions uses dynamic IP addresses that change with each run, so they get blocked by SiteGround's firewall.

---

## ✅ SOLUTION OPTIONS

### Option 1: Use SiteGround's Git Deployment (RECOMMENDED)

SiteGround has built-in Git deployment that bypasses SSH restrictions:

1. **Enable Git in SiteGround:**
   - Go to **Site Tools** → **Dev** → **Git**
   - Create a new repository
   - Use the repository URL provided

2. **Set up deployment:**
   - SiteGround will auto-pull from your GitHub repo
   - No SSH needed!
   - Automatic deployment on push

**Steps:**
- Go to: https://my.siteground.com/
- Navigate to: **Site Tools** → **Dev** → **Git**
- Click "Create Repository"
- Point it to: `https://github.com/VltrnOne/vltrn-games.git`
- Set deploy path to your public_html directory

---

### Option 2: Use FTP/SFTP Deployment

Replace SSH/rsync with SFTP in the GitHub workflow:

```yaml
- name: Deploy via SFTP
  uses: SamKirkland/FTP-Deploy-Action@4.3.3
  with:
    server: ${{ secrets.FTP_SERVER }}
    username: ${{ secrets.FTP_USERNAME }}
    password: ${{ secrets.FTP_PASSWORD }}
    local-dir: ./web-deploy/
    server-dir: /public_html/
```

**Required Secrets:**
- `FTP_SERVER` - Your SiteGround FTP hostname
- `FTP_USERNAME` - Your FTP username
- `FTP_PASSWORD` - Your FTP password

---

### Option 3: Whitelist GitHub Actions IPs (NOT RECOMMENDED)

GitHub Actions uses hundreds of dynamic IPs. This is impractical for SiteGround.

---

### Option 4: Manual Deployment (TEMPORARY)

For now, deploy manually using your local machine:

```bash
cd "/Users/Morpheous/Kids Castle"

# Deploy via rsync from your local machine
rsync -avz --delete \
  -e "ssh -p 18765" \
  web-deploy/ YOUR_USERNAME@vltrngames.com:/home/username/public_html/
```

Or via FTP client like FileZilla.

---

## 🎯 RECOMMENDED: Switch to SiteGround Git

This is the easiest and most secure solution:

### Step-by-Step:

1. **Login to SiteGround:**
   https://my.siteground.com/

2. **Navigate to Git:**
   Site Tools → Dev → Git

3. **Create Repository:**
   - Click "Create Repository"
   - Repository URL: `https://github.com/VltrnOne/vltrn-games.git`
   - Branch: `master`
   - Repository Path: `/home/username/public_html/`
   - Click "Confirm"

4. **Set Auto-Deploy:**
   - Enable "Deploy on Push"
   - SiteGround will watch your GitHub repo
   - Automatic deployment when you push

5. **Webhook (Optional):**
   - SiteGround provides a webhook URL
   - Add it to GitHub repo settings → Webhooks
   - Instant deployment on push

---

## 🔄 Alternative: Update GitHub Workflow for FTP

If you prefer GitHub Actions, switch to FTP deployment:

1. **Get FTP Credentials from SiteGround:**
   - Site Tools → Dev → FTP Accounts Manager
   - Note your FTP hostname, username, and password

2. **Add GitHub Secrets:**
   - `FTP_SERVER` = ftp.yourdomain.com
   - `FTP_USERNAME` = your_ftp_user
   - `FTP_PASSWORD` = your_ftp_password

3. **Update Workflow:**
   I can create an FTP-based deployment workflow for you.

---

## 📊 Comparison

| Method | Pros | Cons |
|--------|------|------|
| **SiteGround Git** | ✅ Built-in<br>✅ No secrets needed<br>✅ Auto-deploys | ⚠️ Deploys entire repo |
| **FTP Deploy** | ✅ Works with GitHub Actions<br>✅ Selective deployment | ⚠️ Slower than SSH<br>⚠️ Needs FTP credentials |
| **Manual Deploy** | ✅ Works immediately | ❌ Manual process |
| **SSH (current)** | ✅ Fastest | ❌ Blocked by SiteGround |

---

## 🚀 Next Steps

**Choose your deployment method:**

### A) SiteGround Git (Easiest)
- Go to Site Tools → Dev → Git
- Set up automatic Git deployment
- No GitHub Actions workflow needed

### B) FTP via GitHub Actions
- Let me know, and I'll create an FTP deployment workflow
- Requires FTP credentials as GitHub secrets

### C) Manual Deployment (For Now)
- Use rsync or FileZilla from your local machine
- Deploy the `web-deploy/` folder contents

---

## 💡 My Recommendation

**Use SiteGround's built-in Git deployment!**

It's:
- ✅ Designed specifically for SiteGround hosting
- ✅ No SSH/firewall issues
- ✅ Automatic deployment on push
- ✅ No complex GitHub Actions setup

Just connect your GitHub repo in SiteGround's control panel, and you're done!

---

**Which option would you like to proceed with?**
