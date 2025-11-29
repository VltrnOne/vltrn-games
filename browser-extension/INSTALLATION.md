# 🚀 Installation Guide - VLTRN Game Code Assistant

## Quick Install (5 minutes)

### Step 1: Create Extension Icons

You need 3 icon files. Use any of these methods:

**Option A: Use Online Icon Generator**
1. Go to https://www.favicon-generator.org/
2. Upload any game-related image (or use VLTRN logo)
3. Download the generated icons
4. Rename them to:
   - `icon16.png` (16x16)
   - `icon48.png` (48x48)
   - `icon128.png` (128x128)
5. Place in `/Users/Morpheous/Kids Castle/browser-extension/icons/`

**Option B: Use Emoji as Icon (Fastest)**
1. Open https://favicon.io/emoji-favicons/robot/
2. Download the robot emoji favicon
3. Extract and rename the sizes as above
4. Place in the icons folder

**Option C: Create Simple Colored Squares (For Testing)**
```bash
cd "/Users/Morpheous/Kids Castle/browser-extension/icons"

# Create 16x16 purple square
convert -size 16x16 xc:'#667eea' icon16.png

# Create 48x48 purple square
convert -size 48x48 xc:'#667eea' icon48.png

# Create 128x128 purple square
convert -size 128x128 xc:'#667eea' icon128.png
```

### Step 2: Install Extension in Chrome

1. **Open Chrome Extensions Page**
   - Navigate to: `chrome://extensions/`
   - Or: Menu → More Tools → Extensions

2. **Enable Developer Mode**
   - Toggle **Developer mode** switch (top right corner)

3. **Load Extension**
   - Click **Load unpacked** button
   - Select folder: `/Users/Morpheous/Kids Castle/browser-extension/`
   - Click **Select**

4. **Verify Installation**
   - You should see "VLTRN Game Code Assistant" in your extensions list
   - Purple icon should appear in Chrome toolbar
   - Status should show as "Active"

### Step 3: Test the Extension

1. **Navigate** to https://vltrngames.com/microstudio
2. **Click** the 🤖 AI Assistant button
3. **Type**: "make me a snake game"
4. **Send** the message
5. **Click** the 📋 Copy button on the code
6. **Follow** the injection instructions

## 🎯 Expected Behavior

### When Extension is Working:
- ✅ Extension icon appears in Chrome toolbar
- ✅ Extension detects microStudio is active
- ✅ Code auto-copies to clipboard
- ✅ Beautiful instruction modal appears
- ✅ Step-by-step guide shows where to paste

### Troubleshooting:

**Extension not showing up?**
- Make sure all icon files exist in `/icons/` folder
- Check Chrome DevTools console for errors
- Try clicking "Reload" on the extension in chrome://extensions/

**Code not injecting automatically?**
- This is expected! Due to cross-origin restrictions
- The extension shows guided instructions instead
- Simply follow the 4-step visual guide

**Want direct injection?**
- Requires hosting microStudio locally
- Or modifying microStudio's CSP headers
- Future enhancement planned

## 🔄 Reload Extension After Changes

Whenever you modify extension files:
1. Go to `chrome://extensions/`
2. Find "VLTRN Game Code Assistant"
3. Click the **Reload** ↻ button

## 🎨 Customize Icons (Optional)

Create custom icons with game controller + AI theme:
- Use Figma, Canva, or Photoshop
- Suggested colors: Purple gradient (#667eea to #764ba2)
- Add game controller emoji or AI robot
- Export as PNG at 16x16, 48x48, 128x128

## 📊 Extension Permissions Explained

| Permission | Why Needed |
|------------|------------|
| `activeTab` | Read current tab URL to detect game engine |
| `scripting` | Inject code injection helpers |
| `storage` | Save user preferences (future feature) |
| `vltrngames.com` | Access VLTRN Games site to inject code |

All permissions are minimal and required for core functionality.

## ✅ You're Done!

The VLTRN Game Code Assistant is now installed and ready to use.

Go to https://vltrngames.com/microstudio and try:
- "make me a snake game"
- "create a platformer"
- "add player movement"

Code will be generated, copied, and ready to paste! 🚀

---

φ = 1.618... | Built with Claude Code
