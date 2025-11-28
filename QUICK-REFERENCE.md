# 🚀 Quick Reference Card - VLTRN Games

## Essential Commands

### Git Basics
```bash
# Pull latest changes
git pull origin main

# Create feature branch
git checkout -b feature/my-feature

# Commit changes
git add .
git commit -m "Your message"
git push origin feature/my-feature

# Switch branches
git checkout main
```

### Deployment
```bash
# Push to main (triggers auto-deployment)
git checkout main
git pull origin main
git merge feature/my-feature
git push origin main
# ✅ Auto-deploys to vltrngames.com
```

### Setup (First Time Only)
```bash
# Run setup script
./setup-github.sh

# Or manually:
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Workflow

```
1. git pull origin main          # Get latest
2. git checkout -b feature/xxx   # Create branch
3. # Make changes
4. git add .                     # Stage
5. git commit -m "message"        # Commit
6. git push origin feature/xxx   # Push
7. # Create PR on GitHub
8. # Merge to main → Auto-deploys!
```

## GitHub Secrets Needed

Go to: **Settings → Secrets → Actions**

- `DEPLOY_SSH_KEY` - SSH private key
- `DEPLOY_HOST` - vltrngames.com
- `DEPLOY_USER` - SSH username
- `DEPLOY_PATH` - /var/www/vltrngames.com

## Files

- `SETUP.md` - Full setup guide
- `BACKUP.md` - Collaboration guide
- `.github/workflows/` - Auto-deployment configs

## Troubleshooting

```bash
# Can't push?
git pull origin main --rebase

# Conflicts?
git status                    # See conflicts
# Edit files, then:
git add .
git commit -m "Fixed conflicts"

# Reset to remote?
git fetch origin
git reset --hard origin/main
```

## Building "Lil J's Castle" for Web

```bash
# Build web version
./build-web.sh

# Or manually:
cd projects/liljs-castle
castle-engine compile --target=web --mode=release
```

## Links

- **Website**: https://vltrngames.com
- **Lil J's Castle**: https://vltrngames.com/liljs-castle/
- **GitHub**: https://github.com/YOUR_USERNAME/YOUR_REPO
- **Actions**: Check deployment status here

---

**Need help?** Check `BACKUP.md` for detailed guide!

