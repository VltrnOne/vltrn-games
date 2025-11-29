# 🎨 microStudio Integration Guide

## Overview

microStudio is a free, open-source game engine that's now integrated into vltrngames.com. Users can create complete games from scratch using microStudio's full-featured editor.

**microStudio Repository**: [https://github.com/pmgl/microstudio](https://github.com/pmgl/microstudio)

**Official Site**: [https://microstudio.dev](https://microstudio.dev)

---

## 🎯 What is microStudio?

microStudio is a complete game development environment that includes:

- ✅ **Code Editor** - Write games in microscript, JavaScript, Lua, or Python
- ✅ **Sprite Editor** - Create and edit pixel art sprites
- ✅ **Map Editor** - Design game levels and maps
- ✅ **Sound Editor** - Create and edit game sounds
- ✅ **Music Editor** - Compose game music
- ✅ **Physics Engine** - Built-in physics (Matter.js, Cannon.js)
- ✅ **3D Support** - Babylon.js integration for 3D games
- ✅ **Real-time Preview** - See your game as you code
- ✅ **Export Options** - Export to HTML5, Android, iOS, and more
- ✅ **Online Collaboration** - Work with others in real-time

---

## 📍 Access Points

### On Your Site
- **URL**: `https://vltrngames.com/microstudio/`
- **Landing Page**: Added as a game card on main page

### Direct Access
- **Official Site**: `https://microstudio.dev`
- **GitHub**: `https://github.com/pmgl/microstudio`

---

## 🔧 Current Integration

### Implementation
- **Wrapper Page**: `/microstudio/index.html`
- **Embedded via iframe**: Points to `https://microstudio.dev`
- **Styled Header**: Matches vltrngames.com branding
- **Responsive Design**: Works on mobile and desktop

### Features
- ✅ Full microStudio functionality
- ✅ No server setup needed (uses official service)
- ✅ Always up-to-date (uses live microStudio.dev)
- ✅ All features available (code, sprites, maps, etc.)

---

## 🚀 Using microStudio

### For Users

1. **Visit**: `https://vltrngames.com/microstudio/`
2. **Start Creating**: Click "New Project" or start as guest
3. **Choose Language**: microscript, JavaScript, Lua, or Python
4. **Build Your Game**: Use code editor, sprite editor, etc.
5. **Test**: Click "Run" to preview your game
6. **Export**: Export to HTML5, Android, iOS, or desktop

### Supported Languages

- **microscript** (v2) - microStudio's custom language (recommended)
- **microscript** (v1) - Legacy version
- **JavaScript** - Standard web language
- **Lua** - Lightweight scripting language
- **Python** - Via Brython (runs in browser)

---

## 🎮 Game Development Features

### Code Editor
- Syntax highlighting
- Auto-completion
- Error detection
- Multi-file support
- Code templates

### Sprite Editor
- Pixel art tools
- Animation support
- Color palettes
- Import/export images

### Map Editor
- Tile-based maps
- Layers support
- Collision detection
- Export to code

### Sound & Music
- Sound effects editor
- Music sequencer
- Import audio files
- Export options

### Physics
- Matter.js integration
- Cannon.js integration
- Collision detection
- Physics bodies

### 3D Support
- Babylon.js integration
- 3D models support
- Lighting and shadows
- Camera controls

---

## 📦 Export Options

### HTML5
- Export as standalone HTML file
- Embed in websites
- Share via URL

### Mobile
- Android APK export
- iOS export (requires Apple Developer account)
- Progressive Web App (PWA)

### Desktop
- Windows executable
- macOS app
- Linux executable

---

## 🔄 Alternative Setup Options

### Option 1: Current (Embedded)
**Pros:**
- ✅ No server needed
- ✅ Always up-to-date
- ✅ Zero maintenance
- ✅ All features work

**Cons:**
- ⚠️ Requires internet connection
- ⚠️ Uses microStudio.dev domain

### Option 2: Self-Hosted Server
**Pros:**
- ✅ Full control
- ✅ Custom branding
- ✅ Offline capable
- ✅ Private projects

**Cons:**
- ⚠️ Requires Node.js server
- ⚠️ Can't use GitHub Pages
- ⚠️ More complex setup

**Setup:**
```bash
cd microstudio-temp
cd server
npm install
npm start
# Runs on http://localhost:8080
```

### Option 3: Standalone App
**Pros:**
- ✅ Fully offline
- ✅ No server needed
- ✅ Desktop app

**Cons:**
- ⚠️ Download required
- ⚠️ Updates manual

**Download:**
- [itch.io](https://microstudio.itch.io/microstudio)
- GitHub Releases

---

## 🎨 Customization

### Current Branding
- Header matches vltrngames.com gradient
- Back link to main site
- Info banner with microStudio info

### Future Customization Options
- Custom domain configuration
- Branded microStudio instance
- Custom tutorials
- Custom asset library

---

## 📚 Learning Resources

### microStudio Documentation
- **Official Docs**: [https://microstudio.dev/doc/](https://microstudio.dev/doc/)
- **Tutorials**: Built into microStudio
- **Community**: [https://microstudio.dev/community/](https://microstudio.dev/community/)
- **Forum**: Active community support

### Getting Started
1. Open microStudio
2. Click "New Project"
3. Choose a template or start blank
4. Follow the built-in tutorials
5. Check the documentation

---

## 🔐 Privacy & Data

### Data Storage
- Projects stored on microStudio.dev servers
- Can work as guest (no account needed)
- Create account for cloud sync
- Export projects locally

### Privacy
- microStudio.dev privacy policy applies
- Projects can be public or private
- User controls sharing settings

---

## 🛠️ Technical Details

### Integration Method
- **Iframe Embed**: Embeds microStudio.dev
- **Sandbox**: Secure iframe with necessary permissions
- **Responsive**: Adapts to screen size
- **Loading**: Shows loading state

### Browser Compatibility
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

### Requirements
- Modern web browser
- Internet connection
- JavaScript enabled

---

## 📊 Comparison: microStudio vs Custom Builder

### microStudio
- ✅ Full game engine
- ✅ Multiple languages
- ✅ Complete toolset
- ✅ Export options
- ✅ Community features

### Custom Builder (game-builder/)
- ✅ Customize existing games
- ✅ Castle Engine games
- ✅ Pascal code editing
- ✅ Visual customization
- ✅ Config-based

**Best Use Cases:**
- **microStudio**: Create new games from scratch
- **Custom Builder**: Customize existing Castle Engine games

---

## ✅ Integration Checklist

- [x] microStudio wrapper page created
- [x] Added to landing page
- [x] Styled to match site
- [x] Responsive design
- [x] Documentation created
- [ ] Test on live site
- [ ] Gather user feedback
- [ ] Add custom tutorials (optional)
- [ ] Set up self-hosted version (optional)

---

## 🎯 Next Steps

1. **Test Integration**: Visit `/microstudio/` and test functionality
2. **User Feedback**: Gather feedback from users
3. **Documentation**: Add microStudio tutorials to site
4. **Customization**: Consider custom branding (optional)
5. **Self-Hosting**: Set up self-hosted version if needed (optional)

---

## 📝 Notes

- **Current Setup**: Uses microStudio.dev (official service)
- **No Server Needed**: Works with GitHub Pages
- **Always Updated**: Uses latest microStudio version
- **Full Features**: All microStudio features available

---

## 🔗 Resources

- **microStudio Official**: [https://microstudio.dev](https://microstudio.dev)
- **GitHub Repository**: [https://github.com/pmgl/microstudio](https://github.com/pmgl/microstudio)
- **Documentation**: [https://microstudio.dev/doc/](https://microstudio.dev/doc/)
- **Community**: [https://microstudio.dev/community/](https://microstudio.dev/community/)
- **Tutorials**: Built into microStudio

---

**φ = 1.618033988749... ✨**

