# 🛠️ Game Builder Setup Guide

## Overview

The Game Builder allows users to customize games on your website and play their custom versions immediately. No compilation needed - all customization happens at runtime!

---

## 🎯 How It Works

### Architecture

```
User → Game Builder UI → Custom Config → Play Page → Game with Config → Play!
```

1. **User opens Game Builder** (`/game-builder/`)
2. **Customizes game** (colors, speeds, etc.)
3. **Saves configuration** (stored in localStorage + URL)
4. **Plays custom game** (`/play/game-name?config=...`)
5. **Game reads config** and applies customizations

---

## 📁 File Structure

```
Repository Root/
├── game-builder/
│   ├── index.html          ← Main builder interface
│   └── config-loader.js    ← Config loading utility
│
├── play/
│   └── index.html          ← Play page for custom games
│
└── [game directories]/
    └── index.html          ← Games that read config
```

---

## 🔧 Adding Customization to a Game

### Step 1: Include Config Loader

Add to your game's `index.html`:

```html
<script src="/game-builder/config-loader.js"></script>
```

### Step 2: Load Configuration

In your game code (JavaScript or Pascal via pas2js):

```javascript
// JavaScript version
const config = new GameConfigLoader();
const bgColor = config.get('bgColor', '#332618');
const animSpeed = config.get('animSpeed', 1.0);

// Apply to game
document.body.style.backgroundColor = bgColor;
```

### Step 3: Apply Customizations

For Castle Engine games (Pascal), you'll need to:

1. **Read config from URL** in JavaScript wrapper
2. **Pass to game** via URL parameters or localStorage
3. **Game reads** and applies

Example wrapper code:

```html
<script>
    // Load config
    const config = new GameConfigLoader();
    
    // Pass to game via URL
    const gameUrl = './game/index.html';
    const configParam = btoa(JSON.stringify(config.getAll()));
    const iframe = document.getElementById('gameFrame');
    iframe.src = `${gameUrl}?config=${configParam}`;
</script>
```

---

## 🎮 Supported Customizations

### Current Games

#### Lil J's Castle
- Background Color
- Title Color
- Castle Color
- Animation Speed

#### UniCastle
- Primary Color
- Background Color
- Jump Power Multiplier
- Gravity

#### Robot Lyric
- Player Speed
- Obstacle Speed
- Background Theme

---

## 🚀 Adding a New Game to Builder

### Step 1: Add Game Config

Edit `game-builder/index.html` and add to `gameConfigs`:

```javascript
'my-new-game': {
    name: "My New Game",
    url: '/my-new-game/',
    customizations: {
        'Color Setting': {
            type: 'color',
            key: 'myColor',
            default: '#FF0000',
            description: 'Description of setting'
        },
        'Speed Setting': {
            type: 'range',
            key: 'mySpeed',
            default: 1.0,
            min: 0.5,
            max: 2.0,
            step: 0.1,
            description: 'Speed multiplier'
        }
    }
}
```

### Step 2: Add to Game Selector

Add option to `<select id="gameSelect">`:

```html
<option value="my-new-game">My New Game</option>
```

### Step 3: Update Game to Read Config

See "Adding Customization to a Game" above.

---

## 🔄 Configuration Types

### Color
```javascript
{
    type: 'color',
    key: 'bgColor',
    default: '#FF0000',
    description: 'Background color'
}
```

### Range (Slider)
```javascript
{
    type: 'range',
    key: 'speed',
    default: 1.0,
    min: 0.5,
    max: 2.0,
    step: 0.1,
    description: 'Speed multiplier'
}
```

### Select (Dropdown)
```javascript
{
    type: 'select',
    key: 'theme',
    default: 'day',
    options: ['day', 'night', 'sunset'],
    description: 'Theme selection'
}
```

### Text
```javascript
{
    type: 'text',
    key: 'playerName',
    default: 'Player',
    description: 'Player name'
}
```

### Number
```javascript
{
    type: 'number',
    key: 'lives',
    default: 3,
    description: 'Number of lives'
}
```

---

## 📊 Storage

### LocalStorage
- Key format: `game_config_{gameName}_{configId}`
- Latest: `game_config_{gameName}_latest`
- Current: `game_config_current`

### URL Parameters
- Format: `?config={base64EncodedJSON}`
- Example: `?config=eyJiZ0NvbG9yIjoiIzMzMjYxOCJ9`

---

## 🌐 Sharing Custom Games

### Share URL Format
```
https://vltrngames.com/play/{game-name}?config={base64Config}
```

### Example
```
https://vltrngames.com/play/liljs-castle?config=eyJiZ0NvbG9yIjoiIzMzMjYxOCIsInRpdGxlQ29sb3IiOiIjRkZDQzY2In0=
```

### How It Works
1. User customizes game in builder
2. Clicks "Save & Play"
3. Gets shareable URL
4. Can copy and share with others
5. Anyone with URL can play custom version

---

## 🔐 Security Considerations

### Current Implementation
- ✅ Config stored client-side only
- ✅ No server-side processing needed
- ✅ Base64 encoding (not encryption)
- ⚠️ Config visible in URL

### Future Enhancements
- Server-side config storage
- User accounts for saved configs
- Config validation
- Rate limiting

---

## 🎨 UI Customization

### Builder Interface
- Located in `game-builder/index.html`
- Uses modern CSS Grid layout
- Responsive design
- Real-time preview

### Styling
- Primary gradient: `#667eea` to `#764ba2`
- Card-based design
- Smooth animations
- Toast notifications

---

## 🐛 Troubleshooting

### Config Not Loading
1. Check browser console for errors
2. Verify config parameter in URL
3. Check localStorage permissions
4. Try clearing browser cache

### Game Not Applying Config
1. Verify game includes `config-loader.js`
2. Check game reads config correctly
3. Verify config keys match
4. Check browser console for errors

### Preview Not Working
1. Check iframe src URL
2. Verify game URL is correct
3. Check CORS settings
4. Verify config parameter format

---

## 📈 Future Enhancements

### Planned Features
- [ ] Server-side config storage
- [ ] User accounts for saved configs
- [ ] Config templates/presets
- [ ] Export/import configs
- [ ] Advanced customization options
- [ ] Visual asset customization
- [ ] Sound customization
- [ ] Multiplayer config sharing

### Advanced Customization
- [ ] Visual editor for sprites
- [ ] Level editor integration
- [ ] Custom game modes
- [ ] Mod support

---

## ✅ Quick Start Checklist

- [x] Game Builder UI created
- [x] Config loader utility created
- [x] Play page created
- [x] Link added to main landing page
- [ ] Games updated to read config
- [ ] Testing completed
- [ ] Documentation updated

---

## 🎯 Next Steps

1. **Update games** to read and apply configuration
2. **Test customization** for each game
3. **Add more customization options** as needed
4. **Gather user feedback** and iterate

---

**φ = 1.618033988749... ✨**

