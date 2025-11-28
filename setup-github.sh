#!/bin/bash
# Setup script to connect this repository to your GitHub

echo "🚀 VLTRN Games - GitHub Setup Script"
echo "======================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Error: This directory is not a git repository"
    exit 1
fi

# Get current remote
CURRENT_REMOTE=$(git remote get-url origin 2>/dev/null || echo "")

if [ -n "$CURRENT_REMOTE" ]; then
    echo "Current remote: $CURRENT_REMOTE"
    echo ""
    read -p "Do you want to replace it with your GitHub repository? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Setup cancelled."
        exit 0
    fi
    git remote remove origin
fi

# Get GitHub repository URL
echo ""
echo "Enter your GitHub repository URL:"
echo "Example: https://github.com/username/repo-name.git"
read -p "GitHub URL: " GITHUB_URL

if [ -z "$GITHUB_URL" ]; then
    echo "❌ Error: GitHub URL is required"
    exit 1
fi

# Add new remote
git remote add origin "$GITHUB_URL"

# Verify
echo ""
echo "✅ Remote configured:"
git remote -v

# Ask about initial push
echo ""
read -p "Do you want to push to GitHub now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    CURRENT_BRANCH=$(git branch --show-current)
    echo "Pushing to origin/$CURRENT_BRANCH..."
    git push -u origin "$CURRENT_BRANCH"
    echo "✅ Push complete!"
fi

# Setup git hooks
echo ""
read -p "Do you want to enable auto-push hooks? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    chmod +x .githooks/post-commit
    git config core.hooksPath .githooks
    echo "✅ Auto-push hooks enabled!"
    echo "   Commits will automatically push to GitHub"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Go to your GitHub repository → Settings → Secrets"
echo "2. Add deployment secrets (see SETUP.md for details)"
echo "3. Start developing!"
echo ""
echo "📖 Read SETUP.md and BACKUP.md for more information"

