# PACMAN-Z

A modern, feature-rich Pacman game with power-ups, shooting mechanics, and 7 unique maze stages. Available as both a browser-based game and a Windows desktop application.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20Browser-lightgrey)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎮 Overview

PACMAN-Z is an enhanced version of the classic Pacman game featuring:
- **7 unique maze layouts** with progressive difficulty
- **5 powerful mushroom power-ups** with unique abilities
- **5 different ghost types** with intelligent AI behaviors
- **Shooting mechanics** with homing missiles, multi-shot, and more
- **Stage progression system** - advance through all 7 stages
- **High score persistence** - your best scores are saved
- **Dual platform support** - play in browser or as a desktop app

## 📥 Download & Play

### Windows Desktop Application (Recommended)

Download the latest release:

**[📦 Download PACMAN-Z v1.0.0](https://github.com/shahzaibcloudy7/PACMAN-Z/releases/latest)**

**Two options available:**
- **PACMAN3D-Z-1.0.0-win-x64.exe** (92 MB) - Full installer with shortcuts
- **PACMAN3D-Z-Portable.exe** (92 MB) - Portable version, no installation needed

**System Requirements:**
- Windows 10 or later (64-bit)
- 200 MB RAM minimum
- 180 MB disk space (installed), 92 MB (portable)

### Browser Version

1. Clone this repository:
   ```bash
   git clone https://github.com/shahzaibcloudy7/PACMAN-Z.git
   cd PACMAN-Z/browser
   ```

2. Start a local server:
   ```bash
   # Using Node.js
   node server.js

   # Or using npx
   npx http-server -p 3001 -c-1

   # Or using Python
   python -m http.server 3001
   ```

3. Open your browser to: `http://localhost:3001`

See [browser/README.md](browser/README.md) for more details.

## ✨ Features

### Power-Up System

Collect mushrooms to gain special abilities:

| Power-Up | Duration | Ability |
|----------|----------|---------|
| 🔴 **Red Mushroom** | 12s | **Homing Missiles** - Bullets auto-track nearest ghost |
| 🔵 **Blue Mushroom** | 18s | **Shield** - Complete invincibility with pulsing effect |
| 🟢 **Green Mushroom** | 20s | **Speed Boost** - 1.5x movement speed |
| 🟣 **Purple Mushroom** | 25s | **Multi-Shot** - Shoot in all 4 directions |
| 🟡 **Golden Mushroom** | 22s | **Super Bullet** - Piercing shots hit up to 3 ghosts |

### Ghost Types

Each ghost has unique AI and point values:

| Ghost | AI Behavior | Points |
|-------|-------------|--------|
| ⚪ **Circle Ghost** | 70% chance to continue direction | 100 |
| 🔺 **Triangle Ghost** | Random direction changes | 120 |
| 🟦 **Square Ghost** | Persistent movement | 150 |
| 🔶 **Diamond Ghost** | Alternates horizontal/vertical | 180 |
| ⭐ **Star Ghost** | Actively chases Pacman | 250 |

### Stage Progression

- **7 unique maze layouts** with increasing difficulty
- Collect all dots to advance to the next stage
- Score accumulates across all stages
- High scores saved using localStorage
- Restart always begins from Stage 1

### Scoring System

| Item | Points |
|------|--------|
| Dot | 10 |
| Mushroom | 50 |
| Circle Ghost | 100 |
| Triangle Ghost | 120 |
| Square Ghost | 150 |
| Diamond Ghost | 180 |
| Star Ghost | 250 |

## 🎯 Controls

| Key | Action |
|-----|--------|
| **W / ↑** | Move Up |
| **S / ↓** | Move Down |
| **A / ←** | Move Left |
| **D / →** | Move Right |
| **Space** | Shoot (when powered up) |
| **P** | Pause/Resume |
| **R** | Restart Game |
| **M** | Mute/Unmute |

## 🏗️ Project Structure

```
PACMAN-Z/
├── browser/              # Browser-based game
│   ├── index.html       # Main HTML entry point
│   ├── pacman.js        # Game logic (1943 lines)
│   ├── sounds.js        # Audio management (Web Audio API)
│   ├── effects.js       # Visual effects and particles
│   ├── style.css        # Game styling
│   ├── server.js        # Simple HTTP server
│   └── README.md        # Browser version documentation
│
├── desktop/             # Windows executables
│   ├── PACMAN3D-Z-1.0.0-win-x64.exe  # Installer (92 MB)
│   ├── PACMAN3D-Z-Portable.exe        # Portable (92 MB)
│   └── README.md        # Desktop version documentation
│
├── build/               # Build assets
│   └── icon.ico         # Custom Pacman icon (364 KB)
│
├── main.js              # Electron main process
├── game.js              # Terminal version (Node.js)
├── package.json         # Project configuration
├── CLAUDE.md            # Development documentation
└── README.md            # This file
```

## 🛠️ Development

### Prerequisites

- **Node.js** 18+ (for building desktop version)
- **npm** (comes with Node.js)
- **Git** (for version control)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/shahzaibcloudy7/PACMAN-Z.git
   cd PACMAN-Z
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run in development mode:
   ```bash
   npm start
   ```

### Building Desktop Version

Build Windows executables:

```bash
# Quick test build (unpacked)
npm run build:dir

# Full build (installer + portable)
npm run build
```

Output files will be in the `dist/` folder.

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Run desktop app in development mode |
| `npm run build` | Build Windows installer and portable .exe |
| `npm run build:dir` | Quick test build (unpacked) |
| `npm run dist` | Alternative build command |

## 🎨 Game Mechanics

### Movement
- Grid-based movement system (21x13 cells)
- Smooth 60 FPS animation
- Wrap-around edges for seamless navigation
- Precise collision detection

### Combat System
- Press **Space** to shoot when powered up
- Bullets travel in your facing direction
- Different bullet types based on power-up
- Ghosts respawn after being destroyed

### Visual Features
- Animated Pacman mouth with chomping effect
- Ghost eyes that follow movement direction
- Dead ghost eyes looking toward respawn point
- Power-up progress bars with timers
- Shield visual effects
- Particle effects for hits and collections

### Audio System
- Synthesized sounds using Web Audio API
- Unique sounds for each mushroom type
- Ghost-specific death sounds
- Bullet hit sound effects
- Dot eating sounds
- Win/lose music
- Mute/unmute toggle

## 📊 Technical Details

### Browser Version
- **Engine:** HTML5 Canvas API
- **Audio:** Web Audio API
- **Code:** Vanilla JavaScript (ES6)
- **Canvas Size:** 672x416 pixels (21x13 grid)
- **Cell Size:** 32x32 pixels
- **Frame Rate:** 60 FPS
- **No build process** - runs directly in browser
- **No external dependencies**

### Desktop Version
- **Framework:** Electron 39.2.7
- **Builder:** electron-builder 26.0.12
- **Window Size:** 800x700 (fixed)
- **Packaging:** NSIS installer + Portable .exe
- **Compression:** Maximum
- **Security:** Node integration disabled, context isolation enabled

### Browser Compatibility

Works in all modern browsers:
- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+

## 🧪 Testing

The project includes automated testing with Puppeteer:

```bash
node test-game.js
```

Test coverage includes:
- Game loading and initialization
- Movement controls (WASD/arrows)
- Power-up collection
- Shooting mechanics
- Pause/resume functionality
- Audio controls
- Screenshot capture

## 🎓 Customization

### Adjust Game Difficulty

Edit `browser/pacman.js`:

```javascript
// Pacman speed (line 16)
this.pacmanSpeed = 0.083;  // tiles per frame

// Ghost speeds (lines 29-33)
speed: 0.029  // Adjust individual ghost speeds

// Power-up duration (lines 482-486)
mushroom.duration = 12000;  // milliseconds
```

### Add New Power-Ups

1. Add mushroom type to `mushroomTypes` array
2. Handle collection in `checkMushroomCollection()`
3. Add shooting behavior in `shoot()` method
4. Add visual rendering in `render()` method

### Modify Ghost AI

Edit `chooseNewTargetForGhost()` (line 323) to customize AI behavior for each ghost shape.

## 🐛 Known Issues

### Windows SmartScreen Warning

When first running the .exe, Windows may show a warning because the app is not code-signed.

**Solution:**
1. Click "More info"
2. Click "Run anyway"

This is normal for unsigned applications.

### Large File Warning on GitHub

The .exe files (91+ MB each) exceed GitHub's 50 MB recommendation. They're still hosted but GitHub suggests using Git LFS for large files.

## 🚀 Future Enhancements

Potential features for future versions:
- [ ] macOS and Linux desktop builds
- [ ] Additional maze layouts
- [ ] Boss battles at end of stages
- [ ] Multiplayer mode
- [ ] Online leaderboards
- [ ] More power-up types
- [ ] Achievement system
- [ ] Mobile/touch controls
- [ ] Custom maze editor
- [ ] Difficulty levels

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Classic Pacman game for inspiration
- Electron framework for desktop packaging
- Modern web technologies (Canvas API, Web Audio API)
- Open source community

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/shahzaibcloudy7/PACMAN-Z/issues)
- **Releases:** [GitHub Releases](https://github.com/shahzaibcloudy7/PACMAN-Z/releases)

## 🔗 Links

- **Latest Release:** [v1.0.0](https://github.com/shahzaibcloudy7/PACMAN-Z/releases/latest)
- **Browser Version Guide:** [browser/README.md](browser/README.md)
- **Desktop Version Guide:** [desktop/README.md](desktop/README.md)
- **Development Guide:** [CLAUDE.md](CLAUDE.md)

---

**Made with ❤️ using HTML5 Canvas, Web Audio API, and Electron**

**Version:** 1.0.0
**Release Date:** December 2025
**Platform:** Windows 10+ / Modern Browsers
