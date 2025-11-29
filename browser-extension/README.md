# VLTRN Game Code Assistant - Browser Extension

AI-powered code injection for microStudio, Game Builder, and Castle game engines.

## 🚀 Features

- **Screen Awareness**: Automatically detects which game engine is active
- **Code Injection**: Inserts code directly into game engine editors
- **Auto-Execution**: Optionally runs code after injection
- **Multi-Engine Support**: Works with microStudio, Game Builder, and Castle
- **Smart Fallback**: Shows guided instructions when direct injection isn't possible

## 📦 Installation

### Chrome/Edge (Developer Mode)

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (top right)
3. Click **Load unpacked**
4. Select the `browser-extension` folder
5. Extension is now installed!

### Icons (Required)

Create icon images (16x16, 48x48, 128x128 pixels) and place them in the `icons/` folder:
- `icon16.png`
- `icon48.png`
- `icon128.png`

You can use any image editor or generate them online. Suggested: Purple gradient with game controller icon.

## 🎮 Usage

1. **Navigate** to https://vltrngames.com
2. **Open** any game engine (microStudio, Game Builder, or Castle)
3. **Click** the AI Assistant button (🤖)
4. **Request** code like: "make me a snake game"
5. **Watch** as code is injected and runs automatically!

## 🔧 How It Works

### Content Script (`content.js`)
- Runs on vltrngames.com pages
- Detects active game engine (microStudio, Game Builder, Castle)
- Listens for code injection requests from AI chat
- Attempts direct injection or shows guided instructions

### Background Worker (`background.js`)
- Manages extension lifecycle
- Routes messages between components
- Handles extension installation

### Popup (`popup.html`)
- Shows extension status
- Displays detected engine
- Provides quick access to VLTRN Games

## 🎯 Supported Engines

| Engine | Status | Injection Method |
|--------|--------|------------------|
| microStudio V | ✅ Supported | Clipboard + Instructions |
| Game Builder | ✅ Supported | Direct DOM injection |
| Lil J's Castle | 🚧 Partial | Clipboard + Instructions |

## 🔐 Permissions

- **activeTab**: Access current tab
- **scripting**: Inject content scripts
- **storage**: Save user preferences
- **host_permissions**: Access vltrngames.com and microstudio.dev

## 📝 Development

### File Structure
```
browser-extension/
├── manifest.json      # Extension configuration
├── content.js         # Main injection logic
├── background.js      # Service worker
├── popup.html         # Extension popup UI
├── popup.js           # Popup functionality
├── icons/             # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md          # This file
```

### Testing

1. Make code changes
2. Go to `chrome://extensions/`
3. Click **Reload** on the VLTRN extension
4. Test on https://vltrngames.com

### Debugging

- Open DevTools on vltrngames.com to see content script logs
- Check `chrome://extensions/` → Click extension details → Inspect views: service worker

## 🚀 Roadmap

- [ ] Create extension icons
- [ ] Direct Monaco editor integration for microStudio
- [ ] Real-time code preview
- [ ] Code templates library
- [ ] Multi-language support
- [ ] Publish to Chrome Web Store

## 📄 License

Part of VLTRN Games - φ = 1.618...
