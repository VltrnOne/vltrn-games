# 🔨 Game Code Building System

## Overview

This system allows users to edit the actual Pascal game code and build custom playable versions. Since Castle Engine games compile to WebAssembly/JavaScript via pas2js, we need a build system.

---

## 🎯 Architecture Options

### Option 1: Client-Side Compilation (pas2js in Browser)
**Pros:**
- Instant feedback
- No server needed
- Works with GitHub Pages

**Cons:**
- Large pas2js library (~5MB)
- Limited Castle Engine support
- Complex setup

### Option 2: GitHub Actions Build System (Recommended)
**Pros:**
- Full Castle Engine support
- Proper compilation
- Can store builds

**Cons:**
- Requires GitHub Actions
- Build time (2-5 minutes)
- More complex setup

### Option 3: Hybrid Approach (Current Implementation)
**Pros:**
- Code editing works immediately
- Can save code locally
- Can integrate with build system later

**Cons:**
- Requires server-side build for actual compilation
- Code saved but not compiled yet

---

## 🔧 Current Implementation

### Code Editor Features
- ✅ Syntax highlighting (Pascal)
- ✅ Multi-file editing
- ✅ Tab-based interface
- ✅ Local storage for code
- ✅ File tree navigation

### What's Missing
- ⏳ Actual compilation (pas2js)
- ⏳ Server-side build endpoint
- ⏳ Custom build storage
- ⏳ Build status tracking

---

## 🚀 Implementation Plan

### Phase 1: Code Editor (✅ Complete)
- Web-based code editor
- File management
- Local storage

### Phase 2: Build Integration
- GitHub Actions workflow for custom builds
- API endpoint for build requests
- Build queue system

### Phase 3: Play Custom Builds
- Custom build URLs
- Build storage
- Version management

---

## 📋 GitHub Actions Build Workflow

### Workflow File: `.github/workflows/build-custom-game.yml`

```yaml
name: Build Custom Game

on:
  repository_dispatch:
    types: [build-custom-game]
  workflow_dispatch:
    inputs:
      game_name:
        description: 'Game name'
        required: true
      build_id:
        description: 'Build ID'
        required: true
      code_files:
        description: 'Code files JSON'
        required: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup FPC
        uses: pascalgn/fpc-setup-action@v1
        
      - name: Setup pas2js
        run: |
          npm install -g pas2js
          
      - name: Restore custom code
        run: |
          echo "${{ github.event.inputs.code_files }}" > custom-code.json
          
      - name: Build game
        run: |
          # Copy custom code to project
          # Build using pas2js
          # Output to custom-builds/
          
      - name: Deploy build
        run: |
          # Copy to web-deploy/custom-builds/{build_id}/
```

---

## 🔌 API Endpoint (Future)

### Build Request Endpoint

```javascript
POST /api/build-custom-game
{
  "game": "liljs-castle",
  "files": {
    "code/gameviewmain.pas": "...",
    "code/gameinitialize.pas": "..."
  },
  "buildId": "abc123"
}

Response:
{
  "status": "queued",
  "buildId": "abc123",
  "estimatedTime": 180
}
```

### Build Status Endpoint

```javascript
GET /api/build-status/{buildId}

Response:
{
  "status": "building|complete|failed",
  "buildId": "abc123",
  "url": "/play/custom/abc123/",
  "logs": "..."
}
```

---

## 💾 Storage Strategy

### Option 1: GitHub Repository
- Store custom builds in `custom-builds/` directory
- Commit via GitHub Actions
- Accessible via GitHub Pages

### Option 2: External Storage
- AWS S3 / CloudFlare R2
- CDN for fast access
- Automatic cleanup

### Option 3: Database + File Storage
- Store metadata in database
- Store files in object storage
- Better management

---

## 🎮 User Flow

1. **User opens code editor** (`/game-builder/code-editor.html`)
2. **Edits game code** (Pascal files)
3. **Clicks "Build & Play"**
4. **Code sent to build system**
5. **Build queued** (GitHub Actions)
6. **User waits** (2-5 minutes)
7. **Build completes**
8. **User gets custom URL** (`/play/custom/{buildId}/`)
9. **Plays custom game**

---

## 🔐 Security Considerations

### Code Validation
- Validate Pascal syntax
- Check for dangerous code
- Limit file access
- Sandbox execution

### Rate Limiting
- Limit builds per user
- Queue system
- Timeout handling

### Resource Limits
- Build time limits
- File size limits
- Memory limits

---

## 📊 Build System Components

### 1. Code Editor
- ✅ Web-based editor (CodeMirror)
- ✅ Syntax highlighting
- ✅ File management

### 2. Build Queue
- ⏳ Queue management
- ⏳ Status tracking
- ⏳ Notification system

### 3. Compilation Service
- ⏳ pas2js integration
- ⏳ Castle Engine support
- ⏳ Error handling

### 4. Storage System
- ⏳ Build storage
- ⏳ Version management
- ⏳ Cleanup policies

### 5. Play System
- ⏳ Custom build URLs
- ⏳ Iframe integration
- ⏳ Sharing system

---

## 🛠️ Technical Details

### pas2js Compilation

```bash
# Compile Pascal to JavaScript
pas2js -Tbrowser -Jirtl.js -Jc -Jminify \
  -Fu../../src \
  -Fu../../tools/build-tool/data \
  projects/liljs-castle/code/gameviewmain.pas \
  -o custom-builds/{buildId}/game.js
```

### Castle Engine Integration

```pascal
// Games need Castle Engine runtime
uses CastleWindow, CastleVectors, CastleUIControls;
```

### Web Output

```html
<!-- Custom build HTML -->
<script src="game.js"></script>
<script>
  // Initialize game with custom code
</script>
```

---

## ✅ Next Steps

1. **Set up GitHub Actions workflow** for building
2. **Create API endpoints** for build requests
3. **Implement build queue** system
4. **Add build status** tracking
5. **Create custom build** play pages
6. **Add sharing** functionality

---

## 📝 Notes

- **Current limitation**: Code editor works, but compilation requires server-side setup
- **Workaround**: Users can edit code and save locally, but need server for compilation
- **Future**: Full client-side compilation possible with pas2js WASM port

---

**φ = 1.618033988749... ✨**

