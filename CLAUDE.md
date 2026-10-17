# PACMAN-Z-3D Game

A modern Pacman game built with vanilla JavaScript: arcade-style ghost AI, power pellets, lives, bonus fruit, mushroom power-ups with shooting, 14 looping stages, and three views (flat 2D, tilted 2D, real 3D with Three.js). Ships as a browser game and a Windows desktop app (Electron).

## 📁 Project Structure

```
PACMAN-Z-3D/
├── browser/                # The game - shared by the browser and desktop versions
│   ├── index.html          # Entry point (loads vendor/three.min.js, sounds, effects, renderer3d, pacman)
│   ├── pacman.js           # PacmanGame class: logic, AI, 2D rendering, input, layout
│   ├── renderer3d.js       # Renderer3D class: real 3D view (reads game state, no game logic)
│   ├── sounds.js           # SoundManager: synthesized SFX + music loop (Web Audio API)
│   ├── effects.js          # EffectsManager: particles, text popups, shake, flash
│   ├── style.css
│   ├── vendor/three.min.js # Three.js r159 UMD build (last version with build/three.min.js)
│   └── server.js           # Static server on port 3000
├── desktop/README.md       # Desktop docs; the .exe files are published on GitHub Releases, not committed
├── build/icon.ico          # App icon
├── build/afterPack.js      # electron-builder hook: rcedit stamps name/version/icon onto the exe
├── main.js                 # Electron main process
├── game.js                 # Terminal version (Node.js)
└── package.json            # Scripts + electron-builder config
```

## 🚀 Running

```bash
cd browser && node server.js     # http://localhost:3000
npm start                        # desktop app (Electron) in dev mode
npm run build                    # dist/PACMAN-Z-3D-<version>-win-x64.exe + dist/PACMAN-Z-3D-Portable.exe
```

## 🎯 Controls

| Key | Controller | Action |
|-----|------------|--------|
| W A S D / Arrows | D-pad / left stick | Move |
| Space | A / RT | Shoot (when powered) |
| P | Start | Pause / Resume |
| R | Start / Back after game over | Restart |
| V | Y | View: flat → tilted → 3D |
| F / F11 | | Fullscreen |
| M | | Mute all |
| N | X | Music on/off |
| - / + | | Volume down / up (slider in the header) |

Difficulty dropdown (Easy / Normal / Hard) restarts the game.

## 🛠️ Architecture

### Game loop (`gameLoop` / `update` in pacman.js)
- `requestAnimationFrame` drives drawing; logic runs in **fixed 1/60s steps** via an accumulator (capped at 250ms per frame). All speeds and timers are "per step", so game speed is identical regardless of frame rate. Don't convert speeds to per-frame values.
- `update()` order: effects → timer → death animation (`dying`) or READY pause (`readyTimer`) short-circuit → ghost mode clock → Pac-Man → ghosts → bullets → power timers → fruit → collisions.
- Drawing uses logical 672x416 coordinates; `fitToWindow()` sizes the canvas CSS and sets `renderScale` (CSS scale x devicePixelRatio) for a sharp backing store. Use `viewWidth/viewHeight`, not `canvas.width/height`, in drawing code.

### Pac-Man movement (`movePacman`)
- A turn key is queued in `nextDirection` until the next junction in that direction. An early press runs straight to the junction centre then turns; a press up to half a tile late turns at once and eases back into the lane (no snapping). Reversing is always allowed.
- Wall stop: Pac-Man never passes the centre of the last open tile, so he doesn't sink into walls. Don't use `Math.round` of the next position alone as the wall test.

### Views
- `viewMode` is `'flat' | 'tilt' | '3d'` (saved in localStorage `pacmanViewMode`). Tilt is a CSS transform on the 2D canvas.
- In 3D, `Renderer3D.render(game)` draws to `#gameCanvas3d`; the 2D canvas is cleared and becomes a transparent overlay for particles/text, with `effectsManager.projector` mapping maze pixels through the 3D camera. Overlay text (READY!, PAUSED, GAME OVER) comes from `drawOverlayText()`.
- Renderer3D is created lazily; if WebGL/Three.js is unavailable, 3D is skipped.

### Ghost AI (`chooseNewTargetForGhost`)
- At each tile a ghost never reverses (unless at a dead end) and picks the exit closest (Euclidean) to its target tile; ties prefer up, left, down, right.
- `GHOST_MODE_SCHEDULE` alternates scatter/chase (7/20/7/20/5s then chase forever); mode switches reverse all ghosts. The clock pauses while frightened.
- Chase targets (`getChaseTarget`): circle = Pac-Man; square = 4 tiles ahead; triangle = red ghost mirrored around 2 tiles ahead; diamond = Pac-Man if > 8 tiles away else its scatter corner. Star never scatters and uses a BFS distance field (`getPacmanDistanceField`, cached per Pac-Man tile + `mazeVersion`).
- Frightened ghosts move at 55% speed and choose randomly. Ghost speed = `baseSpeed x difficulty.ghostSpeed x difficultyMultiplier(lap)`, capped at 0.12 (`getGhostSpeed`).
- Dead ghosts (eyes) fly straight to `ghostHome`, wait `respawnTimer`, then respawn at their home tile.

### Stage setup (`loadStage`)
Copies `MAZE_LAYOUTS[n]`, bumps `mazeVersion`, converts the dot nearest each corner into a power pellet `'o'`, resets positions via `resetPositions()` (spawns use `findNearestOpen` because fixed spawn tiles land in walls on some layouts), clears powers, places 8 mushrooms, resets fruit counters. A stage is complete when no `'.'` or `'o'` remains (`countDots`).

### Maze data rules
- Every row must be exactly 21 characters and every open tile must be reachable from (1,1); stages 1-7 previously had short rows and sealed areas that made them impossible to finish. Check new layouts for both.
- `'#'` wall, `'.'` dot, `'o'` power pellet (added at load), `' '` eaten.

## 🎮 Game Rules

### Difficulty (`DIFFICULTY_SETTINGS`)
| Level | Pac-Man speed | Ghost speed | Lives | Fright time |
|-------|---------------|-------------|-------|-------------|
| Easy | 1.0x | 1.0x | 5 | 10s |
| Normal | 1.15x | 1.35x | 3 | 7s |
| Hard | 1.25x | 1.75x | 2 | 4s |

Base Pac-Man speed is 5 tiles/s; base ghost speeds 0.029-0.042 tiles/step. Each completed 14-stage lap multiplies ghost speed by 1.12 (max 2.5x) and shortens fright time.

### Lives
Touching a non-frightened ghost (without a shield) starts a 1.5s death animation, then a READY! pause with positions reset (dots stay). No lives left → game over, high score saved. Extra life every 10,000 points (`addScore` - always use it to change the score).

### Power-ups
- **Power pellet:** 50 pts, ghosts frightened; eating them scores 200/400/800/1600.
- **Mushrooms** (8 per stage, respawn 15s after collection, 50 pts): Red = homing missiles (22s), Blue = shield (18s), Green = speed boost 1.5x (20s), Purple = multi-shot (25s), Golden = piercing super bullet (22s).
- **Fruit:** spawns near (10,9) at 30% and 70% of dots eaten, lasts 9.5s. Cherry 100 → Strawberry 300 → Orange 500 → Apple 700 → Melon 1000 → Galaxian 2000 → Bell 3000 → Key 5000 by overall stage.

### Scoring
| Item | Points |
|------|--------|
| Dot | 10 |
| Power pellet / Mushroom | 50 |
| Eaten frightened ghost | 200 / 400 / 800 / 1600 |
| Shot ghost | Circle 100, Triangle 120, Square 150, Diamond 180, Star 250 |
| Fruit | 100 - 5000 |

## 🔊 Audio
All sounds are synthesized in `sounds.js`. Music is an original Am-F-C-G chiptune loop scheduled ~250ms ahead on the audio clock (`scheduleMusic`), with a tenser pattern while ghosts are frightened. Music stops during READY!, death, pause and stage transitions. `musicEnabled` persists in localStorage `pacmanMusic`.

## 💾 Persistence (localStorage)
`pacmanHighScore`, `pacmanDifficulty`, `pacmanViewMode`, `pacmanMusic`, `pacmanVolume` (master volume 0-1), `pacmanProgress` (checkpoint saved at each stage start: stage, lap, score, lives; restored on launch, cleared on game over or R). Always wrap access in try/catch (helpers: `loadSetting` / `saveSetting`).

## 🖥️ Desktop Packaging
- Electron window is resizable (default 1000x820, min 800x700); F11 handled in `main.js`, F via the Fullscreen API in the page.
- `signAndEditExecutable` must stay `false`: electron-builder's winCodeSign extraction needs symlink privileges this machine doesn't have. `build/afterPack.js` uses `rcedit` instead to set ProductName/FileDescription/version/icon.
- `files` includes `browser/**/*` minus `server.js`, `README.md` and `*.png`.
- Releases: upload `dist/*.exe` to GitHub Releases on the `public` remote (`shahzaibcloudy7/PACMAN-Z-3D`); `desktop/*.exe` is gitignored.

## 🧪 Testing
No automated test suite is checked in. Verify changes by running `browser/server.js` and driving `window.game` from the browser console or Playwright (e.g. `game.activateFrightened()`, `game.spawnFruit()`, `game.setViewMode('3d')`). Note that a backgrounded automated browser window can throttle `requestAnimationFrame` to ~1 fps, which looks like a slow game but isn't.

---

**Version**: 1.1.2 · **Built with**: Vanilla JavaScript, HTML5 Canvas, Three.js, Web Audio API, Electron
