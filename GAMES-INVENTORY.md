# 🎮 VLTRN Games - Complete Inventory

## Your Custom Games (in `projects/`)

### 1. 🏰 **Lil J's Castle**
- **Location**: `projects/liljs-castle/`
- **Status**: ✅ Created | 🔲 Built | 🔲 Deployed
- **Description**: Magical castle adventure game
- **Web-ready**: ✅ Yes
- **Deployment**: Auto-deploys from repo (same as other games)
- **URL**: `https://vltrngames.com/liljs-castle/`

### 2. 🦄 **UniCastle** 
- **Location**: `projects/01-unicastle/`
- **Status**: ✅ Exists in repo
- **Description**: "One Tower Rises" - First game in Fibonacci Castle Suite
- **Web-ready**: ✅ Yes (configured in manifest)
- **Deployment**: Ready for auto-deployment
- **Manifest**: Includes web canvas settings (1280x720)

## Games Currently on vltrngames.com

Based on your website, these are live:
- ✅ **ROBOT LYRIC** - by Lyric and Aria
- ✅ **ARIAPAC** - by VLTRN Games (2-player Pacman with Jurassic Park theme)
- ✅ **POKEMON RED & BLUE** - by Game Freak / VLTRN Games
- 🔲 **Lil J's Castle** - Ready to deploy

## Castle Engine Example Games (Available)

These come with Castle Engine and can be deployed:

### 2D Games
- **Platformer** (`examples/2d_games/platformer/`)
  - Side-scrolling platform game
  - Web-ready: ✅
  
- **Space Shooter** (`examples/2d_games/space_shooter/`)
  - Classic space shooter
  - Web-ready: ✅

### 3D Games  
- **Walking Adventure** (`examples/3d_games/walking_adventure/`)
  - 3D adventure game
  - Web-ready: ✅ (with some limitations)
  
- **Dungeons and Skeletons Fight** (`examples/3d_games/dungeons_and_skeletons_fight/`)
  - 3D dungeon crawler
  - Web-ready: ✅
  
- **Eye of Beholder** (`examples/3d_games/eye_of_beholder/`)
  - 3D exploration game
  - Web-ready: ✅

### Web Examples
- **Simplest** (`examples/web/simplest/`)
  - Basic web demo
  - Web-ready: ✅
  
- **Simplest Viewport** (`examples/web/simplest_viewport/`)
  - 3D viewport demo
  - Web-ready: ✅
  
- **Simplest Invaders** (`examples/web/simplest_invaders/`)
  - Space invaders clone
  - Web-ready: ✅

### Other Demos
- **Zombie Fighter** (`examples/user_interface/zombie_fighter/`)
  - UI-focused game demo
  - Web-ready: ✅
  
- **Isometric Game** (`examples/isometric_game/`)
  - Isometric view game
  - Web-ready: ✅
  
- **Component Gallery** (`examples/component_gallery/`)
  - UI components showcase
  - Web-ready: ✅

## Deployment Process

### How Games Are Deployed

All games follow the same pattern:
1. **Source code** lives in `projects/` or `examples/`
2. **Build process** compiles for web (`castle-engine compile --target=web`)
3. **Auto-deployment** via GitHub Actions on push
4. **Files deployed** from `web-deploy/` directory
5. **Website auto-updates** when repo is updated

### Build All Games

```bash
# Build all your games at once
./build-all-games.sh
```

This will:
- Build Lil J's Castle
- Build UniCastle
- Copy files to `web-deploy/`
- Ready for auto-deployment

### Deploy Individual Game

```bash
# Build specific game
cd projects/liljs-castle
castle-engine compile --target=web --mode=release

# Files automatically copied to web-deploy/liljs-castle/game/
```

### Auto-Deploy Process

1. **Make changes** to game code
2. **Commit and push** to GitHub:
   ```bash
   git add .
   git commit -m "Update game"
   git push origin main
   ```
3. **GitHub Actions** automatically:
   - Builds the game
   - Deploys to vltrngames.com
   - Updates website

## Game Status Summary

| Game | Status | Web-Ready | Deployed |
|------|--------|-----------|----------|
| Lil J's Castle | ✅ Created | ✅ Yes | 🔲 Ready |
| UniCastle | ✅ Exists | ✅ Yes | 🔲 Ready |
| Robot Lyric | ✅ Live | ✅ Yes | ✅ Yes |
| ARIAPAC | ✅ Live | ✅ Yes | ✅ Yes |
| Pokemon R&B | ✅ Live | ✅ Yes | ✅ Yes |

## Next Steps

1. **Deploy Lil J's Castle:**
   ```bash
   ./build-all-games.sh
   git add .
   git commit -m "Build games for deployment"
   git push origin main
   ```

2. **Add to website:**
   - Update main landing page HTML
   - Add game card for Lil J's Castle
   - Link to `/liljs-castle/`

3. **Build more games:**
   - Use `build-all-games.sh` to build all at once
   - Or build individually as needed

---

**Note**: All games deployed from the repo will auto-update when you push changes to GitHub, just like your other games!
