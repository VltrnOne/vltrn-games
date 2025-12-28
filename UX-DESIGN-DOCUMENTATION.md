# 🎨 VLTRN Games - UX Design Documentation

## Platform Overview
**Mission**: "Where Mathematics Meets Magic"  
**Purpose**: All-in-one learning platform for playing, learning, and creating games with mathematical concepts.

**8 Main Cards on Landing Page:**
1. Robot Lyric - Game
2. Lil J's Castle - Game  
3. Golden Castle Suite - 7 games (golden ratio theme)
4. Game Builder - Customization tool
5. microStudio V - Code engine with AI
6. GDevelop Editor - No-code editor
7. VLTRN AI Agent - AI assistant
8. Vimm's Vault - Gaming engine/emulator

## Current Layout Structure

### Landing Page (`/`)
- **Background**: Purple gradient `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- **Container**: White card, max-width 800px, centered, 20px border-radius
- **Header**: "🎮 VLTRN Games" (3em gradient text), subtitle "Where Mathematics Meets Magic"
- **Grid**: CSS Grid `repeat(auto-fit, minmax(250px, 1fr))`, 20px gap
- **Cards**: 8 game/tool cards, white or gradient backgrounds, 80x80px icons, hover lift effect
- **Footer**: Phi constant (φ = 1.618033988749...) in monospace

### Iframe Pages Pattern
All iframe pages follow same structure:
- **Header**: White/dark bar, 60px height, title + Home/Back buttons
- **Info Banner**: Light background, centered text (optional)
- **Iframe**: Full width/height, black background, loading spinner
- **Pages**: `/gdevelop-editor/`, `/microstudio/`, `/vimm-vault/`

### Game Builder (`/game-builder/`)
- **Layout**: 2-column (350px sidebar + flexible preview)
- **Sidebar**: Game selector, customization controls, action buttons, share section
- **Preview**: Iframe with game preview, purple border
- **Fixed Nav**: Top-left, purple gradient buttons (Home/Back)

### GDevelop Examples (`/gdevelop/`)
- **Header**: Purple gradient, title + description
- **Filters**: Category dropdown, sort, search box
- **Grid**: `repeat(auto-fill, minmax(280px, 1fr))`, 25px gap
- **Cards**: Preview area (180px), title, description, tags, Play/Open buttons

## Design System

### Colors
**Primary**: `#667eea` (Purple), `#764ba2` (Deep Purple)  
**Gradient**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`  
**Card Gradients**: Game Builder (pink-red), microStudio (blue-cyan), GDevelop (cyan-purple), AI Agent (orange-red), Vimm's Vault (red-pink)  
**Neutrals**: White `#ffffff`, Light Gray `#f8f9fa`, Border `#e0e0e0`, Text Dark `#333`, Text Medium `#666`

### Typography
**Font**: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`  
**H1 Landing**: 3em (48px) gradient text  
**H1 Pages**: 1.5em-2.5em (24-40px)  
**Body**: 1em (16px)  
**Small**: 0.85em-0.9em (14-15px)

### Spacing
Container padding: 20-40px | Card padding: 25px | Gap: 20px | Button padding: 8-16px

### Components
**Cards**: 15-20px border-radius, white/gradient bg, 2px border, hover lift 5px + purple shadow  
**Buttons**: 6-8px border-radius, purple gradient (primary) or gray (secondary), hover transform  
**Icons**: 80x80px for game cards, emoji for headers/buttons

## Navigation
- **Landing**: Card-based only, no persistent nav
- **Sub-pages**: Header with Home button (always visible), Back button
- **Fixed Nav**: Game Builder has top-left fixed nav buttons
- **No footer** currently (only phi constant on landing)

## User Flows
1. **Play Game**: Landing → Click Card → Game Page → Play → Home/Back
2. **Game Builder**: Landing → Game Builder → Select Game → Customize → Preview → Save → Share
3. **microStudio**: Landing → microStudio → [Toggle AI] → Code Request → Copy Code → Test
4. **Browse Examples**: Landing → GDevelop Examples → Filter/Search → Play/Open
5. **Vimm's Vault**: Landing → Vimm's Vault → Browse → [Fullscreen] → Play

## Responsive Breakpoints
**Mobile (<768px)**: Single/2-column grid, stacked layouts, smaller fonts  
**Tablet (768-968px)**: 2-3 columns, sidebar stacks above preview  
**Desktop (>968px)**: 3-4 columns, side-by-side layouts

## Technical Constraints
- **Iframes**: Sandboxed, loading spinners, 5s auto-hide, error handling
- **Fullscreen**: Vimm's Vault has custom fullscreen (keeps header visible)
- **Browser**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Features**: CSS Grid, Flexbox, Gradients, Transforms

## Brand Identity
**Tagline**: "Where Mathematics Meets Magic"  
**Theme**: Purple gradients, golden ratio (φ), card-based, smooth animations  
**Personality**: Educational, creative, mathematical, accessible, modern

## Design Opportunities
**Gaps**: No persistent nav, no footer, no search, no breadcrumbs, no mobile menu  
**Enhancements**: Unified header, footer with links, search, user dashboard, category filters, featured section, dark mode

## Critical Requirements
- ✅ VLTRN Games branding always visible
- ✅ All 8 cards accessible from landing
- ✅ Home navigation on all pages
- ✅ Purple gradient theme maintained
- ✅ Responsive (mobile/tablet/desktop)
- ✅ Loading states for iframes
- ✅ Error handling

**φ = 1.618033988749...**
