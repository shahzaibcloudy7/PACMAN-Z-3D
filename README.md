# PACMAN3D-Z

A modern Pacman game with a real 3D view, smart ghost AI, power pellets, mushroom power-ups, shooting mechanics and 14 maze stages. Play it in the browser or as a Windows desktop app.

![Version](https://img.shields.io/badge/version-1.1.0-blue)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20Browser-lightgrey)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎮 Overview

- **Three views** - flat 2D, tilted 2D, and **full 3D** (Three.js / WebGL), switchable any time with **V**
- **Smart ghosts** - each ghost hunts with its own strategy, in scatter/chase waves like the arcade
- **Power pellets** - turn the ghosts blue and eat them for 200 / 400 / 800 / 1600 points
- **Lives** - with a death animation, a READY! restart, and an extra life every 10,000 points
- **Bonus fruit** - appears twice per stage, worth more on later stages
- **Difficulty levels** - Easy, Normal and Hard
- **5 mushroom power-ups** - homing missiles, shield, speed boost, multi-shot, super bullet
- **14 maze stages** that loop with faster ghosts on every lap
- **Background music** and a READY! jingle, all synthesized live
- **Controller support** - Xbox / PlayStation pads
- **Fullscreen and resizable window** - the board scales to fit and stays sharp
- **High score persistence**

## 📥 Download & Play

### Windows Desktop Application (Recommended)

**[📦 Download PACMAN3D-Z from the Releases page](https://github.com/shahzaibcloudy7/PACMAN3D-Z/releases/latest)**

Two options:
- **PACMAN3D-Z-1.1.0-win-x64.exe** (~92 MB) - Installer with desktop and Start menu shortcuts
- **PACMAN3D-Z-Portable.exe** (~92 MB) - Portable version, no installation needed

**System Requirements:** Windows 10 or later (64-bit), 200 MB RAM, ~180 MB disk space when installed. The 3D view needs WebGL, which any graphics card from the last decade supports.

### Browser Version

1. Clone this repository:
   ```bash
   git clone https://github.com/shahzaibcloudy7/PACMAN3D-Z.git
   cd PACMAN3D-Z/browser
   ```

2. Start a local server:
   ```bash
   # Using Node.js (serves on port 3000)
   node server.js

   # Or using npx / Python (port 3001)
   npx http-server -p 3001 -c-1
   python -m http.server 3001
   ```

3. Open `http://localhost:3000` (or `:3001` for the other servers).

See [browser/README.md](browser/README.md) for more details.

## 🎯 Controls

| Key | Controller | Action |
|-----|------------|--------|
| **W A S D / Arrows** | D-pad / Left stick | Move |
| **Space** | A / RT | Shoot (when powered up) |
| **P** | Start | Pause / Resume |
| **R** | Start (after game over) | Restart |
| **V** | Y | Switch view: Flat → Tilted → 3D |
| **F** / **F11** | | Fullscreen |
| **M** | | Mute all sound |
| **N** | X | Music on / off |

Difficulty is picked from the dropdown in the header (changing it starts a new game).

## ✨ Features

### Ghost AI

Ghosts alternate between **scatter** (retreat to their corner) and **chase** waves, never reverse on their own, and pick the exit that gets them closest to their target at every junction.

| Ghost | Strategy | Points (shot) |
|-------|----------|---------------|
| 🔴 **Circle** | Chases Pac-Man's tile directly | 100 |
| 🩷 **Square** | Ambushes 4 tiles ahead of Pac-Man | 150 |
| 🩵 **Triangle** | Flanks - uses the red ghost's position to pincer you | 120 |
| 🟠 **Diamond** | Chases from afar, retreats when within 8 tiles | 180 |
| 🟢 **Star** | Never scatters - follows the true shortest path to you | 250 |

### Power Pellets

Four big pellets per stage (near the corners). Eating one makes all ghosts **frightened**: they turn blue, slow down and flee. Eat them for 200, 400, 800 then 1600 points. They blink white just before they recover. Fright time depends on difficulty and shrinks on later laps.

### Mushroom Power-Ups

| Power-Up | Duration | Ability |
|----------|----------|---------|
| 🔴 **Red Mushroom** | 22s | **Homing Missiles** - Bullets auto-track the nearest ghost |
| 🔵 **Blue Mushroom** | 18s | **Shield** - Invincible to ghosts |
| 🟢 **Green Mushroom** | 20s | **Speed Boost** - 1.5x movement speed |
| 🟣 **Purple Mushroom** | 25s | **Multi-Shot** - Shoot in all 4 directions |
| 🟡 **Golden Mushroom** | 22s | **Super Bullet** - Piercing shots hit up to 3 ghosts |

Mushrooms respawn 15 seconds after being collected.

### Difficulty

| Level | Pac-Man speed | Ghost speed | Lives | Fright time |
|-------|---------------|-------------|-------|-------------|
| Easy | 1.0x | 1.0x | 5 | 10s |
| Normal | 1.15x | 1.35x | 3 | 7s |
| Hard | 1.25x | 1.75x | 2 | 4s |

### Stages

- 14 maze layouts; clear every dot and pellet to advance
- After Stage 14 the game loops back to Stage 1 with ghosts 12% faster per lap (and a new wall colour in 3D)
- Score accumulates across stages; the high score is saved in localStorage

### Scoring

| Item | Points |
|------|--------|
| Dot | 10 |
| Power pellet | 50 |
| Mushroom | 50 |
| Frightened ghost (eaten) | 200 / 400 / 800 / 1600 |
| Ghost destroyed by a bullet | 100 - 250 (by ghost type) |
| Bonus fruit | 100 (Cherry) → 5000 (Key) |
| Extra life | every 10,000 points |

## 🏗️ Project Structure

```
PACMAN3D-Z/
├── browser/               # The game (shared by browser and desktop versions)
│   ├── index.html         # Entry point
│   ├── pacman.js          # Game logic, AI, 2D rendering
│   ├── renderer3d.js      # Real 3D view (Three.js)
│   ├── sounds.js          # Sound effects and music (Web Audio API)
│   ├── effects.js         # Particles, screen shake, flashes
│   ├── style.css          # Styling
│   ├── vendor/three.min.js# Three.js r159 (bundled so the desktop app works offline)
│   ├── server.js          # Simple HTTP server
│   └── README.md
├── desktop/README.md      # Desktop version documentation (executables are on the Releases page)
├── build/
│   ├── icon.ico           # App icon
│   └── afterPack.js       # Stamps product name / version / icon onto the built .exe
├── main.js                # Electron main process
├── game.js                # Terminal version (Node.js)
├── package.json
├── CLAUDE.md              # Development notes
└── README.md
```

## 🛠️ Development

**Prerequisites:** Node.js 18+ and npm.

```bash
git clone https://github.com/shahzaibcloudy7/PACMAN3D-Z.git
cd PACMAN3D-Z
npm install
npm start          # run the desktop app in development mode
```

### Building the desktop version

```bash
npm run build:dir  # quick unpacked test build
npm run build      # installer + portable .exe in dist/
```

| Script | Description |
|--------|-------------|
| `npm start` | Run the desktop app in development mode |
| `npm run build` | Build the Windows installer and portable .exe |
| `npm run build:dir` | Quick test build (unpacked) |
| `npm run dist` | Alternative build command |

Built executables are published on the [Releases page](https://github.com/shahzaibcloudy7/PACMAN3D-Z/releases) rather than committed to the repository.

## 📊 Technical Details

- **Rendering:** HTML5 Canvas 2D, plus Three.js (WebGL) for the 3D view
- **Game loop:** `requestAnimationFrame` for drawing, with fixed 1/60s logic steps so game speed is identical on every machine and refresh rate
- **Board:** 21x13 tiles, 32px per tile (672x416 logical pixels), scaled to fit the window
- **Audio:** Web Audio API - every sound and the music are synthesized, no audio files
- **Desktop:** Electron 39, electron-builder (NSIS installer + portable), resizable window, node integration disabled, context isolation enabled

## 🐛 Known Issues

### Windows SmartScreen Warning

The .exe is not code-signed, so Windows may show a warning the first time. Click **More info** → **Run anyway**.

## 🚀 Future Enhancements

- [ ] macOS and Linux desktop builds
- [ ] Online leaderboards
- [ ] Mobile/touch controls
- [ ] Custom maze editor
- [ ] Achievement system

## 📄 License

MIT License.

## 🔗 Links

- **Releases:** [github.com/shahzaibcloudy7/PACMAN3D-Z/releases](https://github.com/shahzaibcloudy7/PACMAN3D-Z/releases)
- **Issues:** [github.com/shahzaibcloudy7/PACMAN3D-Z/issues](https://github.com/shahzaibcloudy7/PACMAN3D-Z/issues)
- **Browser Version Guide:** [browser/README.md](browser/README.md)
- **Desktop Version Guide:** [desktop/README.md](desktop/README.md)
- **Development Guide:** [CLAUDE.md](CLAUDE.md)

---

**Version:** 1.1.0 · **Platform:** Windows 10+ / Modern Browsers · Made with HTML5 Canvas, Three.js, Web Audio API and Electron
