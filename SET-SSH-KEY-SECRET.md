# 🔐 How to Set DEPLOY_SSH_KEY Secret

## Quick Steps

### Step 1: Get Your SSH Private Key

**Option A: If you already have an SSH key**

```bash
# Check if you have an SSH key
ls -la ~/.ssh/

# Display your SSH private key (to copy it)
cat ~/.ssh/id_rsa
# or
cat ~/.ssh/id_ed25519

# Copy to clipboard (Mac)
cat ~/.ssh/id_rsa | pbcopy
cat ~/.ssh/id_ed25519 | pbcopy
```

**Option B: Generate a new SSH key**

```bash
# Generate a new SSH key
ssh-keygen -t ed25519 -C "deploy@vltrngames.com"

# When prompted:
# - Press Enter to accept default location (~/.ssh/id_ed25519)
# - Enter a passphrase (or leave empty for automation)

# Display the key
cat ~/.ssh/id_ed25519

# Copy to clipboard
cat ~/.ssh/id_ed25519 | pbcopy
```

**Important:** Copy the ENTIRE key including:
- `-----BEGIN OPENSSH PRIVATE KEY-----` (first line)
- All the content in between
- `-----END OPENSSH PRIVATE KEY-----` (last line)

### Step 2: Add Secret to GitHub

1. **Go to Secrets page:**
   👉 https://github.com/VltrnOne/vltrn-games/settings/secrets/actions

2. **Click "New repository secret"** (or edit existing `DEPLOY_SSH_KEY`)

3. **Fill in the form:**
   - **Name:** `DEPLOY_SSH_KEY`
   - **Secret:** Paste your entire SSH private key
   - **Click "Add secret"**

4. **Verify:**
   - You should see `DEPLOY_SSH_KEY` in the list
   - It should show as "Updated X minutes ago"

### Step 3: Add Public Key to Server

Your server needs the matching public key:

```bash
# Copy public key to server
ssh-copy-id your_username@vltrngames.com

# Or manually add to ~/.ssh/authorized_keys on server
cat ~/.ssh/id_ed25519.pub | ssh your_username@vltrngames.com "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

### Step 4: Test Deployment

After setting the secret:

1. **Trigger a new deployment:**
   - Go to: https://github.com/VltrnOne/vltrn-games/actions
   - Click "Deploy to vltrngames.com"
   - Click "Run workflow" (if available)
   - Or make a small change and push

2. **Check the logs:**
   - If it succeeds: ✅ Deployment worked!
   - If it fails: Check the error message

## Troubleshooting

### "Permission denied (publickey)"
- Your public key isn't on the server
- Run: `ssh-copy-id your_username@vltrngames.com`

### "The ssh-private-key argument is empty"
- Secret wasn't saved properly
- Go back and re-add it
- Make sure you copied the ENTIRE key

### "Host key verification failed"
- Server host key needs to be added
- The workflow should handle this automatically
- Check `DEPLOY_HOST` secret is correct

## Quick Reference

| What | Where |
|------|-------|
| **Secret Name** | `DEPLOY_SSH_KEY` |
| **Secret Value** | Your SSH private key (entire file) |
| **Secrets Page** | https://github.com/VltrnOne/vltrn-games/settings/secrets/actions |
| **Key Location** | `~/.ssh/id_rsa` or `~/.ssh/id_ed25519` |

---

**Need help?** Let me know if you need help generating a key or finding your existing one!

