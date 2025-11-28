# VLTRN Games - Castle Engine Setup Guide

## 🎯 Quick Start

### 1. Connect to Your GitHub Repository

First, create a new repository on GitHub, then:

```bash
# Remove the original Castle Engine remote
git remote remove origin

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Verify the remote
git remote -v

# Push to your repository
git push -u origin main
```

### 2. Configure GitHub Secrets

Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**

Add these secrets for auto-deployment:

| Secret Name | Description | Example |
|------------|-------------|---------|
| `DEPLOY_SSH_KEY` | SSH private key for server access | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `DEPLOY_HOST` | Server hostname or IP | `vltrngames.com` or `123.456.789.0` |
| `DEPLOY_USER` | SSH username | `deploy`, `root`, or your username |
| `DEPLOY_PATH` | Path on server where files deploy | `/var/www/vltrngames.com` |

### 3. Enable GitHub Actions

1. Go to repository **Settings** → **Actions** → **General**
2. Under "Workflow permissions", select **Read and write permissions**
3. Check **Allow GitHub Actions to create and approve pull requests**

### 4. Set Up Auto-Push (Optional)

To enable automatic pushing after commits:

```bash
# Make hooks executable
chmod +x .githooks/post-commit

# Configure git to use our hooks
git config core.hooksPath .githooks

# Test it
git commit --allow-empty -m "Test auto-push"
```

### 5. Test Deployment

1. Make a small change to any file
2. Commit and push:
   ```bash
   git add .
   git commit -m "Test deployment"
   git push origin main
   ```
3. Go to **Actions** tab on GitHub
4. Watch the "Deploy to vltrngames.com" workflow run
5. Check vltrngames.com to verify deployment

## 🔧 Server Setup (One-Time)

### SSH Key Generation

```bash
# Generate SSH key pair
ssh-keygen -t ed25519 -C "deploy@vltrngames.com"

# Copy public key to server
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@vltrngames.com

# Test connection
ssh user@vltrngames.com
```

### Server Directory Setup

```bash
# SSH into your server
ssh user@vltrngames.com

# Create deployment directory
sudo mkdir -p /var/www/vltrngames.com
sudo chown -R $USER:$USER /var/www/vltrngames.com

# Set permissions
chmod -R 755 /var/www/vltrngames.com
```

## 📋 Deployment Configuration

### Customize Deployment Script

Edit `.github/workflows/deploy-to-vltrngames.yml` to add:

- Build commands (if needed)
- Post-deployment scripts
- Service restarts
- Cache clearing

Example additions:
```yaml
- name: Build project
  run: |
    make build
    # or
    ./build.sh

- name: Restart services
  run: |
    ssh user@vltrngames.com "sudo systemctl restart nginx"
```

## 🚀 Workflow Overview

```
Developer → Git Commit → GitHub Push → GitHub Actions → Deploy to vltrngames.com
```

1. **Developer** makes changes locally
2. **Commits** changes with `git commit`
3. **Pushes** to GitHub with `git push`
4. **GitHub Actions** automatically triggers
5. **Deployment** happens to vltrngames.com
6. **Website** updates automatically

## 🔍 Troubleshooting

### Deployment Fails

1. Check GitHub Actions logs
2. Verify SSH key is correct
3. Check server permissions
4. Verify deployment path exists

### Auto-Push Not Working

```bash
# Check if hooks are enabled
git config core.hooksPath

# Re-enable hooks
git config core.hooksPath .githooks
chmod +x .githooks/post-commit
```

### Can't Connect to Server

```bash
# Test SSH connection
ssh -v user@vltrngames.com

# Check SSH key
ssh-add -l

# Add SSH key to agent
ssh-add ~/.ssh/id_ed25519
```

## 📚 Next Steps

1. Read `BACKUP.md` for collaboration guidelines
2. Set up your development environment
3. Start customizing the Castle Engine
4. Invite team members to the repository

## 🆘 Need Help?

- Check `BACKUP.md` for detailed collaboration guide
- Review GitHub Actions logs for deployment issues
- Consult Castle Engine docs: https://castle-engine.io/manual_intro.php

---

**Ready to start?** Follow the Quick Start steps above! 🚀

