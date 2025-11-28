# VLTRN Games - Castle Engine Project Backup & Collaboration Guide

## 📋 Project Overview
This is the VLTRN Games customized version of Castle Game Engine, deployed to **vltrngames.com**.

## 🔧 Setup Instructions

### Initial Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   ```

2. **Configure Git Remote:**
   ```bash
   # Remove original remote
   git remote remove origin
   
   # Add your GitHub repository
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   
   # Verify
   git remote -v
   ```

3. **Set up GitHub Secrets** (Required for auto-deployment):
   - Go to your GitHub repository → Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `DEPLOY_SSH_KEY`: Your SSH private key for server access
     - `DEPLOY_HOST`: Your server hostname/IP (e.g., `vltrngames.com`)
     - `DEPLOY_USER`: SSH username (e.g., `deploy` or `root`)
     - `DEPLOY_PATH`: Deployment path on server (e.g., `/var/www/vltrngames.com`)

## 🚀 Development Workflow

### Daily Development
```bash
# 1. Pull latest changes
git pull origin main

# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Make your changes
# ... edit files ...

# 4. Stage and commit
git add .
git commit -m "Description of your changes"

# 5. Push to GitHub
git push origin feature/your-feature-name

# 6. Create Pull Request on GitHub
# Then merge to main branch
```

### Collaboration via Terminal

#### For Team Members:
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

# Create your branch
git checkout -b dev/your-name

# Work on your changes
# ... make edits ...

# Commit regularly
git add .
git commit -m "Your commit message"

# Push your branch
git push origin dev/your-name

# When ready, merge to main
git checkout main
git pull origin main
git merge dev/your-name
git push origin main
```

#### Sync with Team:
```bash
# Always pull before starting work
git pull origin main

# If conflicts occur
git pull origin main
# Resolve conflicts, then:
git add .
git commit -m "Resolved merge conflicts"
git push origin main
```

## 🔄 Auto-Deployment

### How It Works
- **Automatic**: Every push to `main` branch triggers deployment to vltrngames.com
- **Manual**: Go to Actions tab → "Deploy to vltrngames.com" → Run workflow

### Deployment Process
1. Code is pushed to GitHub
2. GitHub Actions workflow runs automatically
3. Project is built (if needed)
4. Files are synced to vltrngames.com via SSH/RSYNC
5. Server is updated with latest changes

### Check Deployment Status
- Go to GitHub → Actions tab
- View "Deploy to vltrngames.com" workflow runs
- Green checkmark = successful deployment
- Red X = deployment failed (check logs)

## 📦 Backup Strategy

### Manual Backup
```bash
# Create a backup branch
git checkout -b backup/$(date +%Y%m%d-%H%M%S)
git push origin backup/$(date +%Y%m%d-%H%M%S)

# Or create a backup archive
git archive --format=tar.gz --output=backup-$(date +%Y%m%d).tar.gz HEAD
```

### Automated Backups
- GitHub automatically keeps all commits and branches
- Use GitHub Releases for major version backups
- Consider setting up automated daily backups to external storage

## 🛠️ Common Commands

### Git Basics
```bash
# Check status
git status

# View commit history
git log --oneline --graph --all

# View changes
git diff

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Stash changes temporarily
git stash
git stash pop
```

### Branch Management
```bash
# List all branches
git branch -a

# Switch branches
git checkout branch-name

# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name
```

### Troubleshooting
```bash
# If you're behind remote
git fetch origin
git pull origin main

# If you have conflicts
git status  # See conflicted files
# Edit files to resolve conflicts
git add .
git commit -m "Resolved conflicts"

# Reset to remote state (DANGER: loses local changes)
git fetch origin
git reset --hard origin/main
```

## 👥 Team Collaboration Guidelines

### Branch Naming Convention
- `main` or `master`: Production-ready code
- `develop`: Development branch
- `feature/feature-name`: New features
- `bugfix/bug-name`: Bug fixes
- `hotfix/issue-name`: Urgent fixes
- `dev/developer-name`: Personal development branches

### Commit Message Format
```
Type: Brief description

Detailed explanation if needed

Examples:
- Feature: Add new character controller
- Bugfix: Fix memory leak in renderer
- Refactor: Optimize asset loading
- Docs: Update README with setup instructions
```

### Code Review Process
1. Create feature branch
2. Make changes and commit
3. Push to GitHub
4. Create Pull Request
5. Team reviews and approves
6. Merge to main
7. Auto-deployment triggers

## 🔐 Security Notes

### SSH Key Setup
```bash
# Generate SSH key (if you don't have one)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key to server
ssh-copy-id user@vltrngames.com

# Test connection
ssh user@vltrngames.com
```

### Environment Variables
- Never commit sensitive data (API keys, passwords)
- Use GitHub Secrets for deployment credentials
- Use `.env` files (add to `.gitignore`) for local development

## 📞 Support & Resources

### Useful Links
- Castle Engine Docs: https://castle-engine.io/manual_intro.php
- GitHub Repository: https://github.com/YOUR_USERNAME/YOUR_REPO_NAME
- Deployment URL: https://vltrngames.com

### Team Contacts
- Add your team contact information here

## 📝 Changelog Template
```markdown
## [Version] - YYYY-MM-DD

### Added
- New feature 1
- New feature 2

### Changed
- Updated feature X

### Fixed
- Bug fix 1
- Bug fix 2

### Removed
- Deprecated feature
```

---

**Last Updated**: $(date +'%Y-%m-%d')
**Maintained by**: VLTRN Games Development Team

