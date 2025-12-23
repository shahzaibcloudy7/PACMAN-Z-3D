# PACMAN-Z Browser Version

This folder contains the browser-based version of PACMAN-Z.

## Files

- **index.html** - Main HTML file (entry point)
- **pacman.js** - Game logic and mechanics (1943 lines)
- **sounds.js** - Audio management (Web Audio API)
- **effects.js** - Visual effects and particles
- **style.css** - Game styling and animations
- **server.js** - Simple HTTP server for local hosting

## How to Run

### Method 1: Using Node.js HTTP Server (Recommended)

```bash
# Make sure you're in the browser folder
cd browser

# Start the server
node server.js
```

Then open your browser to: **http://localhost:3001**

### Method 2: Using npx http-server

```bash
cd browser
npx http-server -p 3001 -c-1
```

Then open your browser to: **http://localhost:3001**

### Method 3: Using Python

```bash
cd browser
python -m http.server 3001
```

Then open your browser to: **http://localhost:3001**

### Method 4: Direct File Open (Limited)

You can try opening `index.html` directly in your browser, but some features may not work due to CORS restrictions.

## Requirements

- **Node.js** (for Method 1 & 2) OR **Python** (for Method 3)
- **Modern web browser** (Chrome, Firefox, Edge, Safari)
- **Supported browsers:**
  - Chrome 90+
  - Firefox 88+
  - Edge 90+
  - Safari 14+

## Features

- 7 unique maze stages with progressive difficulty
- 5 different mushroom power-ups:
  - Red: Homing Missiles (12s)
  - Blue: Shield (18s)
  - Green: Speed Boost (20s)
  - Purple: Multi-Shot (25s)
  - Golden: Super Bullet (22s)
- 5 unique ghosts with different AI behaviors
- Real-time score and timer tracking
- High score persistence (localStorage)
- Keyboard controls:
  - **WASD / Arrow Keys** - Move Pacman
  - **Space** - Shoot (when powered)
  - **P** - Pause/Resume
  - **R** - Restart
  - **M** - Mute/Unmute

## Technical Details

- **Canvas Size:** 672x416 pixels (21x13 grid)
- **Frame Rate:** 60 FPS
- **Cell Size:** 32x32 pixels
- **No external dependencies** - Pure vanilla JavaScript
- **No build process required** - Works as-is

## Game Mechanics

### Scoring
- Dot: 10 points
- Mushroom: 50 points
- Circle Ghost: 100 points
- Triangle Ghost: 120 points
- Square Ghost: 150 points
- Diamond Ghost: 180 points
- Star Ghost: 250 points

### Stage Progression
- Complete all dots to advance to next stage
- Score accumulates across all 7 stages
- High score saved to localStorage
- Restart (R key) always starts from Stage 1

## Customization

You can modify the game by editing:
- `pacman.js` - Game logic, speeds, difficulty
- `style.css` - Colors, layout, animations
- `sounds.js` - Audio tones and effects

## Browser Compatibility

Works in all modern browsers that support:
- HTML5 Canvas API
- Web Audio API
- ECMAScript 6 (ES6)
- localStorage

## Troubleshooting

**Sounds not playing:**
- Check browser audio permissions
- Unmute with M key
- Check system volume

**Game running slow:**
- Close other browser tabs
- Try a different browser
- Check browser hardware acceleration settings

**Controls not working:**
- Make sure the game canvas is focused (click on it)
- Check for conflicting browser extensions

---

**Game Version:** 1.0.0
**Technology:** HTML5 Canvas, Web Audio API, Vanilla JavaScript
