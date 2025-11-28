# Web Deployment Directory

This directory contains files ready for deployment to vltrngames.com.

## Structure

```
web-deploy/
├── liljs-castle/
│   ├── index.html          # Iframe wrapper page
│   └── game/               # Game files (built from projects/liljs-castle)
│       ├── index.html      # Castle Engine generated HTML
│       ├── liljs-castle.js # JavaScript code
│       ├── liljs-castle.wasm # WebAssembly binary
│       └── data/            # Game data files
└── README.md               # This file
```

## Deployment

The `game/` directory will be automatically populated when you build the project:

```bash
cd projects/liljs-castle
castle-engine compile --target=web --mode=release
```

Then copy the built files:

```bash
cp -r castle-engine-output/web/dist/* ../../web-deploy/liljs-castle/game/
```

## Access

Once deployed, the game will be accessible at:
- **Iframe wrapper**: `https://vltrngames.com/liljs-castle/`
- **Direct game**: `https://vltrngames.com/liljs-castle/game/`

## Integration

To embed in your website, use:

```html
<iframe 
    src="https://vltrngames.com/liljs-castle/game/index.html"
    width="1280" 
    height="720"
    allowfullscreen
    style="border: none;">
</iframe>
```

