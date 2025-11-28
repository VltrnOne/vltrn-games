# 🔧 How to Set GitHub Secrets - Step by Step

## Step 1: Open GitHub Secrets Page

1. Go to your repository: https://github.com/VltrnOne/vltrn-games
2. Click on **"Settings"** (top menu bar)
3. In the left sidebar, click **"Secrets and variables"** → **"Actions"**

**Direct link:** https://github.com/VltrnOne/vltrn-games/settings/secrets/actions

---

## Step 2: Add Each Secret

You'll see a list of existing secrets. Click **"New repository secret"** for each one:

### Secret 1: DEPLOY_HOST

1. Click **"New repository secret"**
2. **Name:** Type exactly: `DEPLOY_HOST`
3. **Secret:** Type your server address:
   - If you know it: `vltrngames.com` (or your server IP like `123.45.67.89`)
   - If unsure: Ask your hosting provider or check your hosting control panel
4. Click **"Add secret"**

### Secret 2: DEPLOY_USER

1. Click **"New repository secret"** again
2. **Name:** Type exactly: `DEPLOY_USER`
3. **Secret:** Type your SSH username:
   - This is usually your hosting account username
   - Check your hosting control panel (cPanel, SiteGround, etc.)
   - Or ask your hosting provider
4. Click **"Add secret"**

### Secret 3: DEPLOY_PATH

1. Click **"New repository secret"** again
2. **Name:** Type exactly: `DEPLOY_PATH`
3. **Secret:** Type the path where your website files are:
   - **Common paths:**
     - `/home/yourusername/public_html` (cPanel)
     - `/var/www/vltrngames.com` (VPS/server)
     - `/home/yourusername/www` (some hosts)
   - **How to find it:**
     - Check your hosting control panel
     - Look for "File Manager" → see the path
     - Or ask your hosting provider: "What is my web root directory path?"
4. Click **"Add secret"**

---

## Step 3: Verify All Secrets Are Set

After adding all secrets, you should see:

- ✅ `DEPLOY_SSH_KEY` (you already have this)
- ✅ `DEPLOY_HOST` (just added)
- ✅ `DEPLOY_USER` (just added)
- ✅ `DEPLOY_PATH` (just added)

**Total: 4 secrets**

---

## Step 4: Test the Deployment

After setting all secrets:

1. Go back to your repository
2. Make a small change (or just push the workflow fix)
3. Go to **"Actions"** tab
4. Watch the deployment run
5. It should now succeed!

---

## ❓ Don't Know Your Values?

### Find DEPLOY_HOST:
- Check your hosting control panel
- Look for "Server Information" or "SSH Details"
- Or use: `vltrngames.com` (if that's your domain)

### Find DEPLOY_USER:
- Check your hosting control panel
- Look for "SSH Username" or "Account Username"
- Usually the same as your hosting account login

### Find DEPLOY_PATH:
- Open your hosting File Manager
- Navigate to where your website files are (usually `public_html` or `www`)
- The full path shown is your DEPLOY_PATH
- Common examples:
  - `/home/username/public_html`
  - `/home/username/www`
  - `/var/www/html`

---

## 🆘 Still Need Help?

If you're not sure about any values, contact your hosting provider and ask:

> "I need to set up automated deployment via SSH. Can you provide:
> 1. My SSH hostname/IP
> 2. My SSH username
> 3. My web root directory path"

---

## ✅ Quick Checklist

- [ ] Opened GitHub Secrets page
- [ ] Added `DEPLOY_HOST` secret
- [ ] Added `DEPLOY_USER` secret  
- [ ] Added `DEPLOY_PATH` secret
- [ ] Verified all 4 secrets are listed
- [ ] Pushed code to trigger deployment
- [ ] Checked Actions tab to see deployment status

