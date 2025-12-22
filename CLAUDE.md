# PACMAN-Z Game

A modern, feature-rich Pacman game built with vanilla JavaScript, featuring power-ups, multiple ghost AI behaviors, and shooting mechanics.

## 🎮 Game Overview

This is a browser-based Pacman game with enhanced gameplay mechanics including collectible mushroom power-ups that grant special abilities like homing missiles, shields, speed boosts, and multi-directional shooting.

## 🚀 Features

### Core Gameplay
- **Classic Pacman mechanics** with smooth 60 FPS gameplay
- **5 unique ghosts** with different AI behaviors and point values
- **Dot collection** system for scoring
- **Wrap-around edges** for seamless movement
- **Collision detection** with precise hitboxes
- **Game timer** tracking elapsed play time
- **Score tracking** with real-time updates

### Power-Up System
The game features 5 different mushroom power-ups that respawn every 15 seconds:

1. **Red Mushroom - Homing Missiles** (12s duration)
   - Bullets automatically track and chase the nearest ghost
   - Smart targeting system that retargets if ghost is destroyed

2. **Blue Mushroom - Shield** (8s duration)
   - Grants complete invincibility to ghost collisions
   - Visual pulsing shield effect around Pacman

3. **Green Mushroom - Speed Boost** (10s duration)
   - Increases movement speed by 1.5x
   - Allows for faster dot collection and ghost evasion

4. **Purple Mushroom - Multi-Shot** (15s duration)
   - Fires bullets in all 4 directions simultaneously
   - Excellent for crowd control

5. **Golden Mushroom - Super Bullet** (12s duration)
   - Large piercing bullets that can hit up to 3 ghosts
   - Passes through ghosts without being destroyed

### Ghost AI Behaviors
Each ghost has unique movement patterns:
- **Circle Ghost (Red)** - 70% chance to continue current direction
- **Square Ghost (Pink)** - Persistent in one direction
- **Triangle Ghost (Cyan)** - 60% chance to randomly change direction
- **Diamond Ghost (Orange)** - Alternates between horizontal and vertical movement
- **Star Ghost (Green)** - Actively chases Pacman (250 points!)

### Visual Features
- **Arcade-style graphics** with classic Pacman aesthetics
- **Animated Pacman mouth** with smooth chomping animation
- **Ghost eye movement** that follows their direction
- **Dead ghost eyes** that look toward respawn point
- **Power-up visual indicators** with progress bars
- **Shield effect** with pulsing animation
- **Detailed missile graphics** with different designs per power type

### Audio System
- Mute/Unmute toggle (M key or button)
- Mushroom collection sounds (unique per type)
- Ghost death sounds (unique per ghost type)
- Bullet hit sounds (varies by bullet type)
- Dot eating sound
- Win/lose sounds

## 🎯 Controls

| Key | Action |
|-----|--------|
| **W / ↑** | Move Up |
| **S / ↓** | Move Down |
| **A / ←** | Move Left |
| **D / →** | Move Right |
| **Space** | Shoot (when powered) |
| **P** | Pause/Resume |
| **R** | Restart Game |
| **M** | Mute/Unmute |

## 📁 Project Structure

```
PACMAN-Z/
├── index.html          # Main HTML file
├── pacman.js           # Game logic and mechanics
├── sounds.js           # Audio management system
├── game.js             # Terminal version (Node.js)
├── server.js           # Simple HTTP server
├── style.css           # Game styling
├── test-game.js        # Puppeteer automated tests
├── package.json        # NPM dependencies
└── CLAUDE.md          # This file
```

## 🛠️ Technical Details

### Game Constants
- **Canvas Size**: 672x416 pixels (21x13 grid)
- **Cell Size**: 32x32 pixels
- **Frame Rate**: 60 FPS (~16.67ms per frame)
- **Pacman Speed**: 5 tiles/second (0.083 tiles/frame)
- **Ghost Speeds**: Range from 0.029 to 0.042 tiles/frame

### Starting Positions
- **Pacman**: (1, 1) - Top left area
- **Ghosts**: Clustered in center-top area (rows 5-6, columns 8-12)
- **Ghost Respawn Point**: (10, 6)

### Power-Up Mechanics
- **Mushroom Count**: 8 mushrooms placed randomly in open spaces
- **Respawn Time**: 15 seconds after collection
- **Score Value**: 50 points per mushroom
- **Power Duration**: 8-15 seconds depending on type
- **Timer Display**: Shows remaining time with visual progress bar

### Bullet System
- **Homing Bullets**: Track nearest ghost with smart retargeting
- **Multi-Shot**: Fires in all 4 cardinal directions
- **Super Bullets**: Pierce up to 3 ghosts before disappearing
- **Wall Collision**: Bullets destroyed on wall impact
- **Speed**: 0.3-0.45 tiles/frame depending on type

## 🧪 Testing

The project includes comprehensive Puppeteer automated testing:

```bash
npm install
node test-game.js
```

### Test Coverage
- Game loading and initialization
- Movement in all 4 directions
- Timer functionality
- Score tracking
- Mushroom power-up collection
- Shooting mechanics
- Pause/Resume
- Mute/Unmute
- Screenshot capture for visual verification

## 🚀 Running the Game

### Browser Version (Recommended)
1. Start the HTTP server:
   ```bash
   # Using http-server (if installed)
   npx http-server -p 3001 -c-1

   # Or using Python
   python -m http.server 3001
   ```

2. Open browser to: `http://localhost:3001`

### Terminal Version
```bash
node game.js
```
- Uses keyboard input for movement
- Text-based rendering
- Simplified mechanics

## 💾 Save Data

The game currently does not persist scores or progress. Each session is independent.

## 🎨 Customization

### Adjusting Difficulty
In `pacman.js`, modify:
- `this.pacmanSpeed` (line 16) - Pacman movement speed
- Ghost `speed` values (lines 29-33) - Individual ghost speeds
- `mushroom.duration` (lines 482-486) - Power-up durations

### Adding New Power-Ups
1. Add new mushroom type to `mushroomTypes` array (line 481)
2. Add power handling in `checkMushroomCollection()` (line 521)
3. Add shooting behavior in `shoot()` method (line 588)
4. Add visual rendering in `render()` method

### Changing Ghost Behavior
Modify `chooseNewTargetForGhost()` (line 323) to adjust AI logic for each ghost shape.

## 🐛 Known Issues & Fixes Applied

### Fixed Issues
1. ✅ **Pacman stuck on spawn** - Changed starting position from (10,10) to (1,1)
2. ✅ **Edge wrapping collision** - Added proper coordinate wrapping for wall checks
3. ✅ **Power timer not visible** - Already implemented with progress bar
4. ✅ **Mushrooms don't respawn** - Added 15-second respawn timer

### Current Limitations
- No high score persistence
- No difficulty levels
- No level progression
- Single maze layout

## 📊 Scoring System

| Item | Points |
|------|--------|
| Dot | 10 |
| Mushroom | 50 |
| Circle Ghost | 100 |
| Triangle Ghost | 120 |
| Square Ghost | 150 |
| Diamond Ghost | 180 |
| Star Ghost | 250 |

## 🎓 Learning Resources

This project demonstrates:
- **Canvas API** for 2D rendering
- **Game loop** implementation with setTimeout
- **Collision detection** algorithms
- **Pathfinding** for homing missiles
- **State management** for game objects
- **Event handling** for keyboard input
- **Audio API** integration
- **Puppeteer** browser automation for testing

## 📝 Development Notes

### Performance Considerations
- 60 FPS game loop using setTimeout instead of requestAnimationFrame for better control
- Efficient collision detection with distance calculations
- Minimal DOM manipulation for better performance
- Canvas clearing and redrawing each frame

### Code Organization
- Object-oriented design with PacmanGame class
- Separate audio manager for sound effects
- Modular methods for each game mechanic
- Clear separation of update and render logic

## 🔮 Future Enhancements

Potential features for future development:
- [ ] Multiple maze layouts
- [ ] High score persistence (localStorage)
- [ ] Difficulty levels
- [ ] Level progression system
- [ ] More ghost types
- [ ] Additional power-up types
- [ ] Multiplayer support
- [ ] Mobile touch controls
- [ ] Game statistics tracking
- [ ] Achievement system

## 👨‍💻 Development Timeline

### Initial Implementation
- Core Pacman movement and maze rendering
- Ghost AI with unique behaviors
- Collision detection system
- Scoring mechanism

### Power-Up System
- Mushroom placement algorithm
- 5 different power types
- Shooting mechanics with various bullet types
- Power status display with timer

### Enhancements
- Speed reduction for better gameplay (50% slower)
- Game timer added next to score
- Mushroom respawning (15 seconds)
- Comprehensive Puppeteer testing

### Bug Fixes
- Starting position corrected
- Edge wrapping collision fixed
- Timer reset on restart
- Power display improvements

## 📄 License

This project was created as a learning exercise and demonstration project. Feel free to use, modify, and distribute as needed.

## 🙏 Acknowledgments

- Classic Pacman game for inspiration
- Modern web technologies for implementation
- Puppeteer for automated testing capabilities

---

**Version**: 1.0.0
**Last Updated**: 2025
**Built with**: Vanilla JavaScript, HTML5 Canvas, Web Audio API
**Tested with**: Puppeteer automated browser testing
