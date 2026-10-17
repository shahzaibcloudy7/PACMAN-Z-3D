# PACMAN3D-Z Browser Version

This folder contains the game itself. The desktop app packages these same files.

## Files

- **index.html** - Entry point
- **pacman.js** - Game logic, ghost AI and 2D rendering
- **renderer3d.js** - Real 3D view (Three.js / WebGL)
- **sounds.js** - Sound effects and background music (Web Audio API)
- **effects.js** - Particles, screen shake and flashes
- **style.css** - Styling and layout
- **vendor/three.min.js** - Three.js r159, bundled so the game works offline
- **server.js** - Simple HTTP server for local hosting

## How to Run

### Method 1: Node.js server (Recommended)

```bash
cd browser
node server.js
```

Then open **http://localhost:3000**

### Method 2: npx http-server

```bash
cd browser
npx http-server -p 3001 -c-1
```

Then open **http://localhost:3001**

### Method 3: Python

```bash
cd browser
python -m http.server 3001
```

Then open **http://localhost:3001**

## Requirements

- A modern browser (Chrome, Edge, Firefox, Safari) with Canvas, Web Audio and localStorage
- WebGL for the 3D view (the game falls back to the 2D views without it)

## Features

- Flat, tilted and full 3D views (press **V**)
- Arcade-style ghost AI with scatter/chase waves
- Power pellets, frightened ghosts and score chains
- Lives, death animation, extra life every 10,000 points
- Bonus fruit, Easy / Normal / Hard difficulty
- 14 stages that loop with faster ghosts
- Background music (**N**), mute (**M**), fullscreen (**F**)
- Gamepad support
- 5 mushroom power-ups and shooting

See the [main README](../README.md) for the full feature list, controls and scoring.

## Customization

- `pacman.js` - `DIFFICULTY_SETTINGS`, `GHOST_DEFS`, `GHOST_MODE_SCHEDULE`, `FRUITS` and `MAZE_LAYOUTS` at the top of the file
- `renderer3d.js` - 3D camera, lights and models
- `sounds.js` - sound effects and the music loop
- `style.css` - colors and layout

## Troubleshooting

**No sound at first:** browsers block audio until you press a key or click - it starts on the first input.

**3D view missing:** the browser has WebGL disabled; enable hardware acceleration in its settings.

**Arrow keys change the difficulty dropdown:** click the game area first (the dropdown releases focus after a change).

---

**Game Version:** 1.1.0
