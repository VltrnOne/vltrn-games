#!/bin/bash
# Manual deployment script for Lil J's Castle
# This script helps you deploy directly without GitHub Actions

set -e

echo "🚀 Manual Deployment Script"
echo "============================"
echo ""

# Check if files exist
if [ ! -d "web-deploy/liljs-castle" ]; then
    echo "❌ Error: web-deploy/liljs-castle directory not found"
    exit 1
fi

echo "📁 Files ready for deployment:"
ls -la web-deploy/liljs-castle/
echo ""

# Get server details
read -p "Enter SSH username (e.g., deploy, root, or your username): " SSH_USER
read -p "Enter server hostname/IP (e.g., vltrngames.com): " SSH_HOST
read -p "Enter deployment path (e.g., /var/www/vltrngames.com): " DEPLOY_PATH

if [ -z "$SSH_USER" ] || [ -z "$SSH_HOST" ] || [ -z "$DEPLOY_PATH" ]; then
    echo "❌ Error: All fields are required"
    exit 1
fi

echo ""
echo "📤 Deploying to $SSH_USER@$SSH_HOST:$DEPLOY_PATH/liljs-castle/..."
echo ""

# Deploy files
rsync -avz --progress \
    --exclude '.git' \
    --exclude 'node_modules' \
    web-deploy/liljs-castle/ \
    $SSH_USER@$SSH_HOST:$DEPLOY_PATH/liljs-castle/

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Test these URLs:"
echo "   - https://vltrngames.com/liljs-castle/"
echo "   - https://vltrngames.com/liljs-castle/game/index.html"
echo ""
echo "💡 If you want to add it to your main landing page,"
echo "   see: web-deploy/liljs-castle/integrate.html"

