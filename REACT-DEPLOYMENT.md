# 🚀 React Deployment to vltrngames.com

## Current Setup

The React app is configured to deploy to **vltrngames.com** via GitHub Pages.

## Build Process

### Local Build (for testing)

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview build locally
npm run preview
```

The build output goes to `dist/` directory.

### Deploy to vltrngames.com

**Option 1: Automatic (GitHub Actions)**
- Push to `main` branch
- GitHub Actions automatically builds and deploys
- Site updates at `https://vltrngames.com` within 1-2 minutes

**Option 2: Manual Build & Deploy**
```bash
# Build React app
npm run build

# Copy dist/ contents to repository root (for GitHub Pages)
# Or use the existing deployment workflow
```

## GitHub Pages Configuration

- **Repository**: Your GitHub repo
- **Branch**: `main` (or `gh-pages` for GitHub Actions)
- **Directory**: `dist/` (React build output)
- **Custom Domain**: `vltrngames.com` (via CNAME file)

## Important Notes

1. **React Router**: Make sure all routes work with GitHub Pages
   - Use `HashRouter` for GitHub Pages, or
   - Configure `base` path in Vite config

2. **Asset Paths**: All assets should use relative paths
   - Vite handles this automatically in build

3. **CNAME File**: Should be in `dist/` after build
   - Or copied during deployment

## Next Steps

1. **Test build locally**: `npm run build`
2. **Check dist/ folder**: Verify all files are there
3. **Push to GitHub**: Let GitHub Actions deploy
4. **Visit**: https://vltrngames.com

## Troubleshooting

### Routes not working?
- GitHub Pages needs `404.html` for React Router
- Or use HashRouter instead of BrowserRouter

### Assets not loading?
- Check `base` path in vite.config.js
- Verify asset paths are relative

### Build fails?
- Check Node.js version (needs 18+)
- Clear `node_modules` and reinstall

