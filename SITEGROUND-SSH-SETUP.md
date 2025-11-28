# 🔐 SiteGround SSH Port Configuration

## Issue Found

The deployment is failing because SiteGround uses a **custom SSH port** instead of the standard port 22.

---

## ✅ Solution: Add DEPLOY_PORT Secret

### Step 1: Find Your SSH Port

SiteGround typically uses port **18765** for SSH connections.

To verify, check your SiteGround hosting dashboard:
1. Go to **Site Tools** → **Dev** → **SSH Keys Manager**
2. Look for the SSH port number (usually 18765)

### Step 2: Add DEPLOY_PORT to GitHub Secrets

1. Go to: https://github.com/VltrnOne/vltrn-games/settings/secrets/actions
2. Click **"New repository secret"**
3. Name: `DEPLOY_PORT`
4. Value: `18765` (or your specific port)
5. Click **"Add secret"**

---

## 📋 Complete Secrets Checklist

Make sure you have ALL these secrets configured:

- ✅ `DEPLOY_SSH_KEY` - Your SSH private key
- ✅ `DEPLOY_HOST` - vltrngames.com (or your domain)
- ✅ `DEPLOY_USER` - Your SSH username
- ✅ `DEPLOY_PATH` - /home/username/public_html (or your path)
- ⚠️ `DEPLOY_PORT` - **18765** (ADD THIS ONE!)

---

## 🧪 Test Your SSH Connection Locally

Before deploying, test your connection:

```bash
# Test with SiteGround's port 18765
ssh -p 18765 YOUR_USERNAME@vltrngames.com

# If that works, you're all set!
```

---

## 🚀 After Adding DEPLOY_PORT

Once you add the `DEPLOY_PORT` secret, the workflow will automatically:

1. Use port 18765 for all SSH connections
2. Try both port 22 and 18765 for host key scanning
3. Successfully deploy your games!

---

## 📝 Workflow Updates Made

The deployment workflow now:
- ✅ Supports custom SSH ports via `DEPLOY_PORT` secret
- ✅ Falls back to port 22 if `DEPLOY_PORT` not set
- ✅ Tries multiple ports for host key scanning
- ✅ Uses `StrictHostKeyChecking=accept-new` for first connections
- ✅ Better error messages and diagnostics

---

## 🔄 Trigger New Deployment

After adding `DEPLOY_PORT`:

### Option 1: Wait for Auto-Deployment
The workflow should auto-trigger from the latest push

### Option 2: Manual Trigger
```bash
gh workflow run deploy-to-vltrngames.yml --repo VltrnOne/vltrn-games
```

### Option 3: Check Status
```bash
gh run list --repo VltrnOne/vltrn-games --limit 5
gh run watch --repo VltrnOne/vltrn-games
```

---

## 🎯 Expected Result

Once `DEPLOY_PORT` is added and workflow runs:

```
✅ Host added successfully on port 18765
✅ Deploying to vltrngames.com...
✅ Using SSH port: 18765
✅ Deployment completed successfully!
🌐 Games deployed:
   - https://vltrngames.com/liljs-castle/
   - https://vltrngames.com/fibonacci-suite/ (🏰 NEW!)
   - https://vltrngames.com/fibonacci-suite/01-unicastle/
```

---

## 🆘 Still Having Issues?

If deployment still fails after adding `DEPLOY_PORT`:

1. **Verify SSH Key**: Make sure the private key matches the public key on SiteGround
2. **Check Username**: Ensure `DEPLOY_USER` is correct (not root, use your SiteGround username)
3. **Verify Path**: Check `DEPLOY_PATH` points to your public_html directory
4. **Test Manually**: Try SSH connection manually first: `ssh -p 18765 user@vltrngames.com`

---

**Next Step**: Add `DEPLOY_PORT` secret with value `18765` to GitHub!

https://github.com/VltrnOne/vltrn-games/settings/secrets/actions
