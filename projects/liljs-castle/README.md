# 🏰 Lil J's Castle

VLTRN Games project built with Castle Game Engine, deployed to vltrngames.com.

## Project Structure

```
liljs-castle/
├── CastleEngineManifest.xml    # Project configuration
├── liljs_castle_standalone.dpr  # Standalone program entry point
├── code/
│   ├── gameinitialize.pas       # Game initialization
│   └── gameviewmain.pas         # Main game view
├── data/                        # Game data (images, sounds, etc.)
└── README.md                    # This file
```

## Building

### Web Build (for vltrngames.com)

From the repository root:

```bash
./build-web.sh
```

Or manually:

```bash
cd projects/liljs-castle
castle-engine compile --target=web --mode=release
```

The built files will be in `castle-engine-output/web/dist/` and automatically copied to `web-deploy/liljs-castle/game/`.

### Desktop Build

```bash
cd projects/liljs-castle
castle-engine compile
castle-engine run
```

### Using Castle Editor

1. Open Castle Editor
2. Open this project directory
3. Use "Compile" or "Compile And Run" from the menu

## Deployment

The web version is automatically deployed to vltrngames.com when you push to the main branch.

The game will be accessible at:
- **Iframe wrapper**: `https://vltrngames.com/liljs-castle/`
- **Direct game**: `https://vltrngames.com/liljs-castle/game/`

## Development

### Adding Assets

Place game assets (images, sounds, models) in the `data/` directory and reference them using `castle-data:/` URLs.

### Customizing

- Edit `code/gameviewmain.pas` for main game logic
- Edit `code/gameinitialize.pas` for initialization code
- Modify `CastleEngineManifest.xml` for project settings

## Requirements

- Castle Game Engine (build tool)
- Free Pascal Compiler (FPC) for desktop builds
- pas2js for web builds

See [Castle Engine Installation](https://castle-engine.io/install) for details.

## License

Part of VLTRN Games project. Built with Castle Game Engine.

