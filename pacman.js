// Maze layouts for all 7 stages
const MAZE_LAYOUTS = [
  // STAGE 1 - Beginner (current maze - open spaces)
  [
    "#####################",
    "#.........#.........#",
    "#.##.###.#.###.##.#",
    "#...................#",
    "#.##.#.#####.#.##.#",
    "#....#...#...#....#",
    "####.###.#.###.####",
    "#....#...#...#....#",
    "#.##.#.#####.#.##.#",
    "#...................#",
    "#.##.###.#.###.##.#",
    "#.........#.........#",
    "#####################"
  ],

  // STAGE 2 - Narrow Corridors
  [
    "#####################",
    "#.........#.........#",
    "#.###.###.###.###.#",
    "#.#.............#.#",
    "#.#.###########.#.#",
    "#.#.............#.#",
    "#.#.###.###.###.#.#",
    "#.#.............#.#",
    "#.#.###########.#.#",
    "#.#.............#.#",
    "#.###.###.###.###.#",
    "#.........#.........#",
    "#####################"
  ],

  // STAGE 3 - Central Chamber
  [
    "#####################",
    "#.#.#.#.....#.#.#.#",
    "#.#.#.#######.#.#.#",
    "#.#.#.........#.#.#",
    "#.#.#.#######.#.#.#",
    "#.....#.....#.....#",
    "#.###.#.....#.###.#",
    "#.....#.....#.....#",
    "#.#.#.#######.#.#.#",
    "#.#.#.........#.#.#",
    "#.#.#.#######.#.#.#",
    "#.#.#.#.....#.#.#.#",
    "#####################"
  ],

  // STAGE 4 - Complex Maze
  [
    "#####################",
    "#...#...#...#...#..#",
    "#.#.#.#.#.#.#.#.#.#",
    "#.#...#...#...#...#",
    "#.#####.#.#.#####.#",
    "#.......#.#.......#",
    "###.#####.#####.###",
    "#.......#.#.......#",
    "#.#####.#.#.#####.#",
    "#.#...#...#...#...#",
    "#.#.#.#.#.#.#.#.#.#",
    "#...#...#...#...#..#",
    "#####################"
  ],

  // STAGE 5 - Spiral Pattern
  [
    "#####################",
    "#...................#",
    "###.###########.###",
    "#.#.#.........#.#.#",
    "#.#.#.#######.#.#.#",
    "#.#.#.#.....#.#.#.#",
    "#.#.#.#.###.#.#.#.#",
    "#.#.#.#.....#.#.#.#",
    "#.#.#.#######.#.#.#",
    "#.#.#.........#.#.#",
    "###.###########.###",
    "#...................#",
    "#####################"
  ],

  // STAGE 6 - Four Quadrants
  [
    "#####################",
    "#.......###.......#",
    "#.####..###..####.#",
    "#.#..#.......#..#.#",
    "#.#..#.#####.#..#.#",
    "#......#...#......#",
    "####...#...#...####",
    "#......#...#......#",
    "#.#..#.#####.#..#.#",
    "#.#..#.......#..#.#",
    "#.####..###..####.#",
    "#.......###.......#",
    "#####################"
  ],

  // STAGE 7 - Expert Chaos
  [
    "#####################",
    "#.#.#.#.#.#.#.#.#.#",
    "#...#...#...#...#..#",
    "#.#####.#.#.#####.#",
    "#.#...#.#.#.#...#.#",
    "#.#.#...#.#...#.#.#",
    "#...#########...#.#",
    "#.#.#...#.#...#.#.#",
    "#.#...#.#.#.#...#.#",
    "#.#####.#.#.#####.#",
    "#...#...#...#...#..#",
    "#.#.#.#.#.#.#.#.#.#",
    "#####################"
  ]
];

class PacmanGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.currentStageElement = document.getElementById('currentStage');
        this.highScoreElement = document.getElementById('highScore');
        this.timerElement = document.getElementById('timer');
        this.statusElement = document.getElementById('gameStatus');
        this.headerPowerTimer = document.getElementById('headerPowerTimer');
        this.headerPowerName = document.getElementById('headerPowerName');
        this.headerPowerTime = document.getElementById('headerPowerTime');
        this.soundManager = new SoundManager();
        this.effectsManager = new EffectsManager(this.canvas, this.ctx);

        this.width = 21;
        this.height = 13;
        this.cellSize = 32;

        // Game timing constants (60 FPS)
        this.frameTime = 1000 / 60; // ~16.67ms per frame
        this.pacmanSpeed = 5 / 60; // 5 tiles per second = 0.083 tiles per frame at 60 FPS (reduced from 10)
        this.pacmanMoveCounter = 0;

        // Game timer
        this.gameTime = 0;
        this.gameStartTime = Date.now();

        this.pacman = { x: 1, y: 1, direction: 'right', nextDirection: 'right', mouthAnimation: 0, mouthOpen: true };

        // Ghost home position for respawning
        this.ghostHome = { x: 10, y: 6 };

        this.ghosts = [
            { x: 9, y: 5, targetX: 9, targetY: 5, direction: 'up', color: '#ff0000', shape: 'circle', speed: 0.033, points: 100, moveProgress: 0, stuckCounter: 0, lastPosition: { x: 9, y: 5 }, isDead: false, respawnTimer: 0, homeX: 9, homeY: 5 },
            { x: 10, y: 5, targetX: 10, targetY: 5, direction: 'down', color: '#ffb8ff', shape: 'square', speed: 0.029, points: 150, moveProgress: 0, stuckCounter: 0, lastPosition: { x: 10, y: 5 }, isDead: false, respawnTimer: 0, homeX: 10, homeY: 5 },
            { x: 11, y: 5, targetX: 11, targetY: 5, direction: 'left', color: '#00ffff', shape: 'triangle', speed: 0.038, points: 120, moveProgress: 0, stuckCounter: 0, lastPosition: { x: 11, y: 5 }, isDead: false, respawnTimer: 0, homeX: 11, homeY: 5 },
            { x: 8, y: 6, targetX: 8, targetY: 6, direction: 'right', color: '#ffa500', shape: 'diamond', speed: 0.032, points: 180, moveProgress: 0, stuckCounter: 0, lastPosition: { x: 8, y: 6 }, isDead: false, respawnTimer: 0, homeX: 8, homeY: 6 },
            { x: 12, y: 6, targetX: 12, targetY: 6, direction: 'up', color: '#00ff00', shape: 'star', speed: 0.042, points: 250, moveProgress: 0, stuckCounter: 0, lastPosition: { x: 12, y: 6 }, isDead: false, respawnTimer: 0, homeX: 12, homeY: 6 }
        ];
        this.score = 0;
        this.gameOver = false;
        this.gameWon = false;
        this.hasShootingPower = false;
        this.shootingPowerTimer = 0;
        this.bullets = [];
        this.mushrooms = [];
        this.currentPowerType = null;
        this.isPaused = false;
        this.hasShield = false;
        this.shieldTimer = 0;
        this.shieldDuration = 0;
        this.hasSpeedBoost = false;
        this.speedBoostTimer = 0;
        this.speedBoostDuration = 0;
        this.shootingPowerDuration = 0;

        // Level progression state
        this.currentLevel = 1;
        this.maxLevel = 7;
        this.levelJustCompleted = false;

        // High score persistence
        this.highScore = this.loadHighScore();

        // Start at Stage 1
        this.maze = MAZE_LAYOUTS[0].map(row => row);
        
        this.placeMushrooms();
        this.setupControls();
        this.setupSoundButton();

        this.gameLoop();
    }
    
    setupControls() {
        document.addEventListener('keydown', (event) => {
            // Handle mute toggle
            if (event.key.toLowerCase() === 'm') {
                this.toggleSound();
                event.preventDefault();
                return;
            }
            
            // Handle pause/resume
            if (event.key.toLowerCase() === 'p') {
                this.togglePause();
                event.preventDefault();
                return;
            }
            
            // Handle restart
            if (event.key.toLowerCase() === 'r') {
                if (this.gameOver || confirm('Are you sure you want to restart the game?')) {
                    this.restart();
                }
                event.preventDefault();
                return;
            }
            
            if (this.gameOver || this.isPaused) return;

            switch (event.key.toLowerCase()) {
                case 'w':
                case 'arrowup':
                    this.pacman.nextDirection = 'up';
                    event.preventDefault();
                    break;
                case 's':
                case 'arrowdown':
                    this.pacman.nextDirection = 'down';
                    event.preventDefault();
                    break;
                case 'a':
                case 'arrowleft':
                    this.pacman.nextDirection = 'left';
                    event.preventDefault();
                    break;
                case 'd':
                case 'arrowright':
                    this.pacman.nextDirection = 'right';
                    event.preventDefault();
                    break;
                case ' ':
                    if (this.hasShootingPower) {
                        this.shoot();
                        this.shoot(); // Allow shooting multiple bullets
                        this.shoot();
                    }
                    event.preventDefault();
                    break;
            }
        });
    }
    
    setupSoundButton() {
        const soundButton = document.getElementById('soundButton');
        if (soundButton) {
            soundButton.addEventListener('click', () => {
                this.toggleSound();
            });
        }
    }

    loadHighScore() {
        try {
            const saved = localStorage.getItem('pacmanHighScore');
            return saved ? parseInt(saved, 10) : 0;
        } catch (e) {
            console.warn('localStorage not available');
            return 0;
        }
    }

    saveHighScore() {
        try {
            if (this.score > this.highScore) {
                this.highScore = this.score;
                localStorage.setItem('pacmanHighScore', this.score.toString());
                return true; // New high score!
            }
        } catch (e) {
            console.warn('localStorage not available');
        }
        return false;
    }

    movePacman() {
        // CLASSIC GRID-BASED MOVEMENT WITH STRICT CORRIDOR ALIGNMENT

        // Calculate speed (boosted if speed power is active)
        const currentSpeed = this.hasSpeedBoost ? this.pacmanSpeed * 1.5 : this.pacmanSpeed;

        // Get current grid cell (the tile Pacman is in/near)
        const currentGridX = Math.round(this.pacman.x);
        const currentGridY = Math.round(this.pacman.y);

        // Calculate distance from grid center
        const distFromCenterX = this.pacman.x - currentGridX;
        const distFromCenterY = this.pacman.y - currentGridY;

        // TURN LOGIC: Only allow turns when reasonably centered in current tile
        if (this.pacman.nextDirection !== this.pacman.direction) {
            const isMovingHorizontal = (this.pacman.direction === 'left' || this.pacman.direction === 'right');
            const isMovingVertical = (this.pacman.direction === 'up' || this.pacman.direction === 'down');
            const isTurningToVertical = (this.pacman.nextDirection === 'up' || this.pacman.nextDirection === 'down');
            const isTurningToHorizontal = (this.pacman.nextDirection === 'left' || this.pacman.nextDirection === 'right');

            // Check if we're centered enough to turn (classic Pacman: must be near tile center)
            let canTurn = false;
            if (isMovingHorizontal && isTurningToVertical) {
                // Horizontal to vertical: check if Y is centered
                canTurn = Math.abs(distFromCenterY) < 0.3;
            } else if (isMovingVertical && isTurningToHorizontal) {
                // Vertical to horizontal: check if X is centered
                canTurn = Math.abs(distFromCenterX) < 0.3;
            } else {
                // Reversing direction (180 turn) - always allowed
                canTurn = true;
            }

            if (canTurn) {
                // Check if the turn leads to a valid path
                let nextGridX = currentGridX;
                let nextGridY = currentGridY;

                switch (this.pacman.nextDirection) {
                    case 'up': nextGridY--; break;
                    case 'down': nextGridY++; break;
                    case 'left': nextGridX--; break;
                    case 'right': nextGridX++; break;
                }

                // Wrap coordinates
                if (nextGridX < 0) nextGridX = this.width - 1;
                if (nextGridX >= this.width) nextGridX = 0;
                if (nextGridY < 0) nextGridY = this.height - 1;
                if (nextGridY >= this.height) nextGridY = 0;

                // Allow turn if path is clear
                if (this.maze[nextGridY][nextGridX] !== '#') {
                    this.pacman.direction = this.pacman.nextDirection;
                    // CLASSIC SNAP: Lock to corridor center when turning
                    if (isTurningToVertical) {
                        this.pacman.x = currentGridX; // Lock X to corridor center
                    } else if (isTurningToHorizontal) {
                        this.pacman.y = currentGridY; // Lock Y to corridor center
                    }
                }
            }
        }

        // MOVEMENT: Move in current direction with STRICT corridor locking
        let newX = this.pacman.x;
        let newY = this.pacman.y;

        switch (this.pacman.direction) {
            case 'up':
                newY -= currentSpeed;
                newX = currentGridX; // STRICT: Lock X to corridor center
                break;
            case 'down':
                newY += currentSpeed;
                newX = currentGridX; // STRICT: Lock X to corridor center
                break;
            case 'left':
                newX -= currentSpeed;
                newY = currentGridY; // STRICT: Lock Y to corridor center
                break;
            case 'right':
                newX += currentSpeed;
                newY = currentGridY; // STRICT: Lock Y to corridor center
                break;
        }

        // Wrap around edges
        if (newX < 0) newX = this.width - 1;
        if (newX >= this.width) newX = 0;
        if (newY < 0) newY = this.height - 1;
        if (newY >= this.height) newY = 0;

        // WALL COLLISION: Check if destination is clear
        let checkX = Math.round(newX);
        let checkY = Math.round(newY);

        // Wrap check coordinates
        if (checkX < 0) checkX = this.width - 1;
        if (checkX >= this.width) checkX = 0;
        if (checkY < 0) checkY = this.height - 1;
        if (checkY >= this.height) checkY = 0;

        // Only update position if destination is not a wall
        if (this.maze[checkY][checkX] !== '#') {
            this.pacman.x = newX;
            this.pacman.y = newY;
        }
        // If blocked by wall, position stays the same (no movement)

        // DOT COLLECTION
        const gridX = Math.round(this.pacman.x);
        const gridY = Math.round(this.pacman.y);

        // Wrap grid coordinates
        let collectX = gridX < 0 ? this.width - 1 : (gridX >= this.width ? 0 : gridX);
        let collectY = gridY < 0 ? this.height - 1 : (gridY >= this.height ? 0 : gridY);

        if (this.maze[collectY][collectX] === '.') {
            this.score += 10;
            this.scoreElement.textContent = this.score;
            let row = this.maze[collectY].split('');
            row[collectX] = ' ';
            this.maze[collectY] = row.join('');
            this.soundManager.playDotSound();

            // Add sparkle effect for dot collection
            const pixelX = collectX * this.cellSize + this.cellSize / 2;
            const pixelY = collectY * this.cellSize + this.cellSize / 2;
            this.effectsManager.sparkle(pixelX, pixelY, '#ffff00', 5);
        }

        // Animate mouth continuously
        this.pacman.mouthAnimation += 0.25;

        // Check for mushroom collection
        this.checkMushroomCollection();
    }
    
    moveGhosts() {
        for (let ghost of this.ghosts) {
            if (ghost.isDead) {
                // Dead ghost returns to home
                this.moveDeadGhost(ghost);
            } else {
                // Normal ghost movement
                this.updateGhostMovement(ghost);
            }
        }
    }

    moveDeadGhost(ghost) {
        // Move towards ghost home at faster speed
        const dx = this.ghostHome.x - ghost.x;
        const dy = this.ghostHome.y - ghost.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 0.5) {
            // Reached home, start respawn timer
            ghost.respawnTimer -= this.frameTime;
            if (ghost.respawnTimer <= 0) {
                // Respawn ghost
                ghost.isDead = false;
                ghost.respawnTimer = 0;
                ghost.x = ghost.homeX;
                ghost.y = ghost.homeY;
                ghost.targetX = ghost.homeX;
                ghost.targetY = ghost.homeY;
            }
        } else {
            // Move towards home at 2x speed
            const moveSpeed = ghost.speed * 2;
            ghost.x += (dx / distance) * moveSpeed;
            ghost.y += (dy / distance) * moveSpeed;
        }
    }
    
    updateGhostMovement(ghost) {
        // Get current grid position
        const currentGridX = Math.round(ghost.x);
        const currentGridY = Math.round(ghost.y);

        // Check if ghost is stuck (hasn't moved much in several frames)
        const distanceMoved = Math.abs(ghost.x - ghost.lastPosition.x) + Math.abs(ghost.y - ghost.lastPosition.y);
        if (distanceMoved < 0.01) {
            ghost.stuckCounter++;
        } else {
            ghost.stuckCounter = 0;
            ghost.lastPosition = { x: ghost.x, y: ghost.y };
        }

        // If stuck for too long, force new random direction
        if (ghost.stuckCounter > 15) {
            ghost.stuckCounter = 0;
            const directions = ['up', 'down', 'left', 'right'];
            ghost.direction = directions[Math.floor(Math.random() * directions.length)];
            this.chooseNewTargetForGhost(ghost);
        }

        // If ghost has reached its target, choose new target
        if (Math.abs(ghost.x - ghost.targetX) < 0.1 && Math.abs(ghost.y - ghost.targetY) < 0.1) {
            ghost.x = ghost.targetX;
            ghost.y = ghost.targetY;
            ghost.moveProgress = 0;
            this.chooseNewTargetForGhost(ghost);
        }

        // LANE DISCIPLINE: Move toward target while staying in lane
        if (ghost.targetX !== ghost.x || ghost.targetY !== ghost.y) {
            const dx = ghost.targetX - ghost.x;
            const dy = ghost.targetY - ghost.y;

            // Determine movement direction
            const isMovingHorizontal = Math.abs(dx) > Math.abs(dy);

            if (isMovingHorizontal) {
                // Moving left or right - keep Y aligned to grid center
                ghost.x += (dx > 0 ? 1 : -1) * Math.min(Math.abs(dx), ghost.speed);
                ghost.y = currentGridY; // LANE DISCIPLINE: Lock Y to grid
            } else {
                // Moving up or down - keep X aligned to grid center
                ghost.y += (dy > 0 ? 1 : -1) * Math.min(Math.abs(dy), ghost.speed);
                ghost.x = currentGridX; // LANE DISCIPLINE: Lock X to grid
            }
        }
    }
    
    chooseNewTargetForGhost(ghost) {
        const directions = ['up', 'down', 'left', 'right'];
        let newTargetX = Math.round(ghost.x);
        let newTargetY = Math.round(ghost.y);
        
        // First, get all valid directions from current position
        const validDirections = [];
        for (let dir of directions) {
            let testX = newTargetX;
            let testY = newTargetY;
            
            switch (dir) {
                case 'up': testY--; break;
                case 'down': testY++; break;
                case 'left': testX--; break;
                case 'right': testX++; break;
            }
            
            if (testX >= 0 && testX < this.width && testY >= 0 && testY < this.height && 
                this.maze[testY][testX] !== '#') {
                validDirections.push(dir);
            }
        }
        
        // If no valid directions, stay in place
        if (validDirections.length === 0) {
            ghost.targetX = newTargetX;
            ghost.targetY = newTargetY;
            return;
        }
        
        // Choose direction based on ghost behavior, but only from valid options
        let chosenDirection = ghost.direction;
        
        switch (ghost.shape) {
            case 'circle':
                // 70% chance to continue current direction if valid
                if (validDirections.includes(ghost.direction) && Math.random() < 0.7) {
                    chosenDirection = ghost.direction;
                } else {
                    chosenDirection = validDirections[Math.floor(Math.random() * validDirections.length)];
                }
                break;
                
            case 'square':
                // Continue in same direction if possible, otherwise choose randomly
                if (validDirections.includes(ghost.direction)) {
                    chosenDirection = ghost.direction;
                } else {
                    chosenDirection = validDirections[Math.floor(Math.random() * validDirections.length)];
                }
                break;
                
            case 'triangle':
                // 60% chance to change direction
                if (Math.random() < 0.6) {
                    chosenDirection = validDirections[Math.floor(Math.random() * validDirections.length)];
                } else if (validDirections.includes(ghost.direction)) {
                    chosenDirection = ghost.direction;
                } else {
                    chosenDirection = validDirections[Math.floor(Math.random() * validDirections.length)];
                }
                break;
                
            case 'diamond':
                // Alternates between horizontal and vertical
                const horizontalDirs = validDirections.filter(d => d === 'left' || d === 'right');
                const verticalDirs = validDirections.filter(d => d === 'up' || d === 'down');
                
                if (!ghost.lastMoveWasHorizontal && horizontalDirs.length > 0) {
                    chosenDirection = horizontalDirs[Math.floor(Math.random() * horizontalDirs.length)];
                    ghost.lastMoveWasHorizontal = true;
                } else if (ghost.lastMoveWasHorizontal && verticalDirs.length > 0) {
                    chosenDirection = verticalDirs[Math.floor(Math.random() * verticalDirs.length)];
                    ghost.lastMoveWasHorizontal = false;
                } else {
                    // Fallback to any valid direction
                    chosenDirection = validDirections[Math.floor(Math.random() * validDirections.length)];
                    ghost.lastMoveWasHorizontal = (chosenDirection === 'left' || chosenDirection === 'right');
                }
                break;
                
            case 'star':
                // Moves toward Pacman, but only if path is clear
                const dx = this.pacman.x - newTargetX;
                const dy = this.pacman.y - newTargetY;
                
                let preferredDir = null;
                if (Math.abs(dx) > Math.abs(dy)) {
                    preferredDir = dx > 0 ? 'right' : 'left';
                } else {
                    preferredDir = dy > 0 ? 'down' : 'up';
                }
                
                if (validDirections.includes(preferredDir)) {
                    chosenDirection = preferredDir;
                } else {
                    // If can't move toward Pacman, choose randomly
                    chosenDirection = validDirections[Math.floor(Math.random() * validDirections.length)];
                }
                break;
        }
        
        // Set new target based on chosen direction
        ghost.direction = chosenDirection;
        let testX = newTargetX;
        let testY = newTargetY;
        
        switch (chosenDirection) {
            case 'up': testY--; break;
            case 'down': testY++; break;
            case 'left': testX--; break;
            case 'right': testX++; break;
        }
        
        ghost.targetX = testX;
        ghost.targetY = testY;
    }
    
    checkCollisions() {
        // Check ghost collisions with tolerance for fractional positions (only living ghosts)
        if (!this.hasShield) {
            for (let ghost of this.ghosts) {
                if (ghost.isDead) continue; // Skip dead ghosts

                const dx = Math.abs(ghost.x - this.pacman.x);
                const dy = Math.abs(ghost.y - this.pacman.y);

                // Collision if within 0.7 units (about 70% of a cell)
                if (dx < 0.7 && dy < 0.7) {
                    this.gameOver = true;
                    this.statusElement.textContent = 'GAME OVER! Press R to restart';
                    this.statusElement.className = 'game-status lose';

                    // Add death effects
                    const pacmanPixelX = this.pacman.x * this.cellSize + this.cellSize / 2;
                    const pacmanPixelY = this.pacman.y * this.cellSize + this.cellSize / 2;
                    this.effectsManager.explosion(pacmanPixelX, pacmanPixelY, '#ffff00', 40, 4);
                    this.effectsManager.startScreenShake(8, 0.5);
                    this.effectsManager.startFlash('#ff0000', 0.4, 0.5);

                    // Play game over sound
                    this.soundManager.playGameOverSound();
                    return;
                }
            }
        }

        // Check win condition (only if game is not already over)
        if (!this.gameOver) {
            let dotsLeft = this.maze.join('').split('.').length - 1;
            if (dotsLeft === 0) {
                this.levelJustCompleted = true;

                if (this.currentLevel < this.maxLevel) {
                    // Advance to next stage
                    this.advanceToNextStage();
                } else {
                    // Final stage completed - VICTORY!
                    this.gameOver = true;
                    this.gameWon = true;
                    const newHighScore = this.saveHighScore();
                    const message = newHighScore ?
                        'GAME COMPLETE! NEW HIGH SCORE! Press R to restart' :
                        'GAME COMPLETE! Press R to restart';
                    this.statusElement.textContent = message;
                    this.statusElement.className = 'game-status win';

                    // Victory effects
                    const pacmanPixelX = this.pacman.x * this.cellSize + this.cellSize / 2;
                    const pacmanPixelY = this.pacman.y * this.cellSize + this.cellSize / 2;
                    this.effectsManager.ring(pacmanPixelX, pacmanPixelY, '#00ff00', 5);
                    this.effectsManager.sparkle(pacmanPixelX, pacmanPixelY, '#ffff00', 50);
                    this.effectsManager.startFlash('#00ff00', 0.3, 0.6);
                    this.soundManager.playWinSound();
                }
            }
        }
    }
    
    placeMushrooms() {
        // Define mushroom types with different properties
        const mushroomTypes = [
            { type: 'red', color: '#FF4444', duration: 22000, name: 'Homing Missiles' },
            { type: 'blue', color: '#4444FF', duration: 18000, name: 'Shield' },
            { type: 'green', color: '#44FF44', duration: 20000, name: 'Speed Boost' },
            { type: 'purple', color: '#FF44FF', duration: 25000, name: 'Multi-Shot' },
            { type: 'golden', color: '#FFD700', duration: 22000, name: 'Super Bullet' }
        ];
        
        // Place 8 mushrooms in open spaces
        const openSpaces = [];
        for (let y = 1; y < this.height - 1; y++) {
            for (let x = 1; x < this.width - 1; x++) {
                if (this.maze[y][x] === '.') {
                    openSpaces.push({ x, y });
                }
            }
        }
        
        // Randomly select 8 positions for mushrooms
        for (let i = 0; i < 8 && openSpaces.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * openSpaces.length);
            const pos = openSpaces.splice(randomIndex, 1)[0];
            const mushroomType = mushroomTypes[i % mushroomTypes.length];
            this.mushrooms.push({ 
                x: pos.x, 
                y: pos.y, 
                active: true, 
                type: mushroomType.type,
                color: mushroomType.color,
                duration: mushroomType.duration,
                name: mushroomType.name
            });
        }
    }
    
    checkMushroomCollection() {
        for (let mushroom of this.mushrooms) {
            const dx = Math.abs(mushroom.x - this.pacman.x);
            const dy = Math.abs(mushroom.y - this.pacman.y);
            if (mushroom.active && dx < 0.5 && dy < 0.5) {
                mushroom.active = false;
                this.score += 50;
                this.scoreElement.textContent = this.score;

                // Handle different power types
                if (mushroom.type === 'blue') {
                    // Shield power - grants invincibility
                    this.hasShield = true;
                    this.shieldTimer = mushroom.duration;
                    this.shieldDuration = mushroom.duration;
                } else if (mushroom.type === 'green') {
                    // Speed boost power
                    this.hasSpeedBoost = true;
                    this.speedBoostTimer = mushroom.duration;
                    this.speedBoostDuration = mushroom.duration;
                } else {
                    // Shooting powers
                    this.hasShootingPower = true;
                    this.currentPowerType = mushroom.type;
                    this.shootingPowerTimer = mushroom.duration;
                    this.shootingPowerDuration = mushroom.duration;
                }

                // Play mushroom-specific sound
                switch (mushroom.type) {
                    case 'red':
                        this.soundManager.playRedMushroomSound();
                        break;
                    case 'blue':
                        this.soundManager.playBlueMushroomSound();
                        break;
                    case 'green':
                        this.soundManager.playGreenMushroomSound();
                        break;
                    case 'purple':
                        this.soundManager.playPurpleMushroomSound();
                        break;
                    case 'golden':
                        this.soundManager.playGoldenMushroomSound();
                        break;
                }

                // Add visual effects for mushroom collection
                const pixelX = mushroom.x * this.cellSize + this.cellSize / 2;
                const pixelY = mushroom.y * this.cellSize + this.cellSize / 2;
                this.effectsManager.ring(pixelX, pixelY, mushroom.color, 3);
                this.effectsManager.sparkle(pixelX, pixelY, mushroom.color, 20);
                this.effectsManager.textPopup(pixelX, pixelY - 20, mushroom.name, mushroom.color, 18);
                this.effectsManager.startFlash(mushroom.color, 0.2, 0.3);

                // Show power-up message
                this.statusElement.textContent = `${mushroom.name} Power Activated!`;
                this.statusElement.className = 'game-status power-up';
                setTimeout(() => {
                    if (!this.gameOver) {
                        this.statusElement.textContent = '';
                        this.statusElement.className = 'game-status';
                    }
                }, 2000);

                // Respawn mushroom after 15 seconds
                setTimeout(() => {
                    if (!this.gameOver) {
                        mushroom.active = true;
                    }
                }, 15000);
            }
        }
    }
    
    shoot() {
        switch (this.currentPowerType) {
            case 'red':
                this.shootHoming();
                break;
            case 'purple':
                this.shootMultiShot();
                break;
            case 'golden':
                this.shootSuperBullet();
                break;
            default:
                this.shootHoming();
        }
    }
    
    shootStandard() {
        const bullet = {
            x: this.pacman.x,
            y: this.pacman.y,
            direction: this.pacman.direction,
            speed: 0.35, // Increased from 1.5/12 (0.125) to 0.35 - nearly 3x faster
            trail: [],
            type: 'standard'
        };
        this.bullets.push(bullet);
        this.soundManager.playMissileSound();
    }

    shootRapidFire() {
        // Fire 3 bullets in quick succession
        this.soundManager.playMissileSound();
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const bullet = {
                    x: this.pacman.x,
                    y: this.pacman.y,
                    direction: this.pacman.direction,
                    speed: 0.4, // Increased from 2.0/12 (0.167) to 0.4 - over 2x faster
                    trail: [],
                    type: 'rapid'
                };
                this.bullets.push(bullet);
            }, i * 100);
        }
    }

    shootSpreadShot() {
        const directions = ['up', 'down', 'left', 'right'];
        const currentIndex = directions.indexOf(this.pacman.direction);

        // Main bullet
        const mainBullet = {
            x: this.pacman.x,
            y: this.pacman.y,
            direction: this.pacman.direction,
            speed: 0.35, // Increased from 1.5/12 (0.125) to 0.35
            trail: [],
            type: 'spread'
        };
        this.bullets.push(mainBullet);

        // Side bullets (45 degree angles simulated by alternating directions)
        const leftDir = directions[(currentIndex + 3) % 4];
        const rightDir = directions[(currentIndex + 1) % 4];

        const leftBullet = {
            x: this.pacman.x,
            y: this.pacman.y,
            direction: leftDir,
            speed: 0.3, // Increased from 1.2/12 (0.1) to 0.3
            trail: [],
            type: 'spread'
        };

        const rightBullet = {
            x: this.pacman.x,
            y: this.pacman.y,
            direction: rightDir,
            speed: 0.3, // Increased from 1.2/12 (0.1) to 0.3
            trail: [],
            type: 'spread'
        };

        this.bullets.push(leftBullet, rightBullet);
        this.soundManager.playMissileSound();
    }

    shootPiercing() {
        const bullet = {
            x: this.pacman.x,
            y: this.pacman.y,
            direction: this.pacman.direction,
            speed: 0.45, // Increased from 1.8/12 (0.15) to 0.45 - 3x faster
            trail: [],
            type: 'piercing',
            pierced: 0
        };
        this.bullets.push(bullet);
        this.soundManager.playMissileSound();
    }

    shootHoming() {
        const bullet = {
            x: this.pacman.x,
            y: this.pacman.y,
            direction: this.pacman.direction,
            speed: 0.32,
            trail: [],
            type: 'homing',
            target: this.findNearestGhost()
        };
        this.bullets.push(bullet);
        this.soundManager.playMissileSound();
    }

    shootMultiShot() {
        // Fire bullets in all 4 directions
        const directions = ['up', 'down', 'left', 'right'];
        for (let dir of directions) {
            const bullet = {
                x: this.pacman.x,
                y: this.pacman.y,
                direction: dir,
                speed: 0.35,
                trail: [],
                type: 'multishot'
            };
            this.bullets.push(bullet);
        }
        this.soundManager.playMissileSound();
    }

    shootSuperBullet() {
        const bullet = {
            x: this.pacman.x,
            y: this.pacman.y,
            direction: this.pacman.direction,
            speed: 0.4,
            trail: [],
            type: 'super',
            pierced: 0 // Can pierce up to 3 ghosts
        };
        this.bullets.push(bullet);
        this.soundManager.playMissileSound();
    }

    findNearestGhost() {
        if (this.ghosts.length === 0) return null;
        
        let nearest = this.ghosts[0];
        let minDistance = Math.abs(this.pacman.x - nearest.x) + Math.abs(this.pacman.y - nearest.y);
        
        for (let ghost of this.ghosts) {
            const distance = Math.abs(this.pacman.x - ghost.x) + Math.abs(this.pacman.y - ghost.y);
            if (distance < minDistance) {
                minDistance = distance;
                nearest = ghost;
            }
        }
        return nearest;
    }
    
    updateBullets() {
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const bullet = this.bullets[i];
            
            // Add current position to trail
            bullet.trail.push({ x: bullet.x, y: bullet.y });
            if (bullet.trail.length > 5) {
                bullet.trail.shift();
            }

            // Add trail particle effects
            const pixelX = bullet.x * this.cellSize + this.cellSize / 2;
            const pixelY = bullet.y * this.cellSize + this.cellSize / 2;
            const bulletColor = bullet.type === 'super' ? '#FFD700' :
                               bullet.type === 'homing' ? '#FF4444' :
                               bullet.type === 'multishot' ? '#FF44FF' : '#FFFFFF';
            this.effectsManager.trail(pixelX, pixelY, bulletColor, 2);
            
            // Special movement for homing bullets
            if (bullet.type === 'homing' && bullet.target) {
                // Check if target still exists
                if (!this.ghosts.includes(bullet.target)) {
                    bullet.target = this.findNearestGhost();
                }

                if (bullet.target) {
                    // Move towards target
                    const dx = bullet.target.x - bullet.x;
                    const dy = bullet.target.y - bullet.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance > 0) {
                        bullet.x += (dx / distance) * bullet.speed;
                        bullet.y += (dy / distance) * bullet.speed;

                        // Update direction based on movement vector for proper rotation
                        const absDx = Math.abs(dx);
                        const absDy = Math.abs(dy);
                        if (absDx > absDy) {
                            bullet.direction = dx > 0 ? 'right' : 'left';
                        } else {
                            bullet.direction = dy > 0 ? 'down' : 'up';
                        }
                    }
                } else {
                    // No target, move normally
                    switch (bullet.direction) {
                        case 'up': bullet.y -= bullet.speed; break;
                        case 'down': bullet.y += bullet.speed; break;
                        case 'left': bullet.x -= bullet.speed; break;
                        case 'right': bullet.x += bullet.speed; break;
                    }
                }
            } else {
                // Normal movement
                switch (bullet.direction) {
                    case 'up':
                        bullet.y -= bullet.speed;
                        break;
                    case 'down':
                        bullet.y += bullet.speed;
                        break;
                    case 'left':
                        bullet.x -= bullet.speed;
                        break;
                    case 'right':
                        bullet.x += bullet.speed;
                        break;
                }
            }
            
            // Check bounds and walls
            const bulletX = Math.floor(bullet.x);
            const bulletY = Math.floor(bullet.y);

            if (bulletX < 0 || bulletX >= this.width || bulletY < 0 || bulletY >= this.height ||
                this.maze[bulletY][bulletX] === '#') {
                // Play wall hit sound
                this.soundManager.playWallHitSound();

                // Add wall hit explosion effect
                const wallPixelX = bullet.x * this.cellSize + this.cellSize / 2;
                const wallPixelY = bullet.y * this.cellSize + this.cellSize / 2;
                this.effectsManager.explosion(wallPixelX, wallPixelY, bulletColor, 10, 1.5);

                this.bullets.splice(i, 1);
                continue;
            }
            
            // Check ghost collisions
            for (let j = this.ghosts.length - 1; j >= 0; j--) {
                const ghost = this.ghosts[j];
                if (!ghost.isDead && Math.abs(ghost.x - bullet.x) < 0.5 && Math.abs(ghost.y - bullet.y) < 0.5) {
                    // Mark ghost as dead and award points
                    const points = ghost.points || 100;
                    ghost.isDead = true;
                    ghost.respawnTimer = 5000; // 5 seconds respawn time
                    this.score += points;
                    this.scoreElement.textContent = this.score;

                    // Add explosion effect for ghost death
                    const pixelX = ghost.x * this.cellSize + this.cellSize / 2;
                    const pixelY = ghost.y * this.cellSize + this.cellSize / 2;
                    this.effectsManager.explosion(pixelX, pixelY, ghost.color, 25, 3);
                    this.effectsManager.textPopup(pixelX, pixelY - 20, `+${points}`, '#00ff00', 16);
                    this.effectsManager.startScreenShake(3, 0.2);

                    // Play bullet-type specific hit sound
                    switch (bullet.type) {
                        case 'homing':
                            this.soundManager.playHomingHitSound();
                            break;
                        case 'multishot':
                            this.soundManager.playSpreadShotHitSound();
                            break;
                        case 'super':
                            this.soundManager.playPiercingHitSound();
                            break;
                        default:
                            this.soundManager.playStandardHitSound();
                    }

                    // Play ghost-specific death sound (softer, as secondary sound)
                    setTimeout(() => {
                        switch (ghost.shape) {
                            case 'circle':
                                this.soundManager.playCircleGhostDeathSound();
                                break;
                            case 'square':
                                this.soundManager.playSquareGhostDeathSound();
                                break;
                            case 'triangle':
                                this.soundManager.playTriangleGhostDeathSound();
                                break;
                            case 'diamond':
                                this.soundManager.playDiamondGhostDeathSound();
                                break;
                            case 'star':
                                this.soundManager.playStarGhostDeathSound();
                                break;
                            default:
                                this.soundManager.playGhostDeathSound();
                        }
                    }, 100); // Slight delay for layered sound effect

                    // Handle piercing bullets (super bullet)
                    if (bullet.type === 'super') {
                        bullet.pierced++;
                        if (bullet.pierced >= 3) {
                            // Remove bullet after piercing 3 ghosts
                            this.bullets.splice(i, 1);
                        }
                        break;
                    } else {
                        // Remove bullet for non-piercing types
                        this.bullets.splice(i, 1);
                        break;
                    }
                }
            }
        }
    }
    
    updateShootingPower() {
        if (this.hasShootingPower) {
            this.shootingPowerTimer -= this.frameTime;
            if (this.shootingPowerTimer <= 0) {
                this.hasShootingPower = false;
                this.shootingPowerTimer = 0;
                this.currentPowerType = null;

                // Show power expired message
                this.statusElement.textContent = 'Power Expired!';
                this.statusElement.className = 'game-status power-expired';
                setTimeout(() => {
                    if (!this.gameOver) {
                        this.statusElement.textContent = '';
                        this.statusElement.className = 'game-status';
                    }
                }, 1500);
            }
        }

        if (this.hasShield) {
            this.shieldTimer -= this.frameTime;
            if (this.shieldTimer <= 0) {
                this.hasShield = false;
                this.shieldTimer = 0;

                // Show shield expired message
                this.statusElement.textContent = 'Shield Expired!';
                this.statusElement.className = 'game-status power-expired';
                setTimeout(() => {
                    if (!this.gameOver) {
                        this.statusElement.textContent = '';
                        this.statusElement.className = 'game-status';
                    }
                }, 1500);
            }
        }

        if (this.hasSpeedBoost) {
            this.speedBoostTimer -= this.frameTime;
            if (this.speedBoostTimer <= 0) {
                this.hasSpeedBoost = false;
                this.speedBoostTimer = 0;

                // Show speed boost expired message
                this.statusElement.textContent = 'Speed Boost Expired!';
                this.statusElement.className = 'game-status power-expired';
                setTimeout(() => {
                    if (!this.gameOver) {
                        this.statusElement.textContent = '';
                        this.statusElement.className = 'game-status';
                    }
                }, 1500);
            }
        }
    }
    
    render() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw maze
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const cell = this.maze[y][x];
                const drawX = x * this.cellSize;
                const drawY = y * this.cellSize;
                
                if (cell === '#') {
                    // Wall - classic arcade blue with subtle border
                    this.ctx.fillStyle = '#2121DE';
                    this.ctx.fillRect(drawX, drawY, this.cellSize, this.cellSize);
                    // Add border for definition
                    this.ctx.strokeStyle = '#4848FF';
                    this.ctx.lineWidth = 1;
                    this.ctx.strokeRect(drawX, drawY, this.cellSize, this.cellSize);
                } else if (cell === '.') {
                    // Dot - arcade style pellet
                    this.ctx.fillStyle = '#FFB8AE';
                    this.ctx.beginPath();
                    this.ctx.arc(drawX + this.cellSize / 2, drawY + this.cellSize / 2, 2.5, 0, 2 * Math.PI);
                    this.ctx.fill();
                }
            }
        }
        
        // Draw ghosts with classic Pacman ghost shape
        for (let ghost of this.ghosts) {
            const drawX = ghost.x * this.cellSize;
            const drawY = ghost.y * this.cellSize;
            const centerX = drawX + this.cellSize / 2;
            const centerY = drawY + this.cellSize / 2;
            const size = this.cellSize / 2.5;

            if (ghost.isDead) {
                // Draw only eyes for dead ghosts
                this.ctx.fillStyle = '#fff';
                this.ctx.strokeStyle = '#000';
                this.ctx.lineWidth = 2;

                // Left eye
                this.ctx.beginPath();
                this.ctx.arc(centerX - size/3, centerY, size/5, 0, 2 * Math.PI);
                this.ctx.fill();
                this.ctx.stroke();

                // Right eye
                this.ctx.beginPath();
                this.ctx.arc(centerX + size/3, centerY, size/5, 0, 2 * Math.PI);
                this.ctx.fill();
                this.ctx.stroke();

                // Eye pupils (looking towards home)
                const eyeDx = this.ghostHome.x - ghost.x;
                const eyeDy = this.ghostHome.y - ghost.y;
                const eyeDistance = Math.sqrt(eyeDx * eyeDx + eyeDy * eyeDy);
                const pupilOffsetX = eyeDistance > 0 ? (eyeDx / eyeDistance) * (size/20) : 0;
                const pupilOffsetY = eyeDistance > 0 ? (eyeDy / eyeDistance) * (size/20) : 0;

                this.ctx.fillStyle = '#0000ff';
                this.ctx.beginPath();
                this.ctx.arc(centerX - size/3 + pupilOffsetX, centerY + pupilOffsetY, size/15, 0, 2 * Math.PI);
                this.ctx.fill();
                this.ctx.beginPath();
                this.ctx.arc(centerX + size/3 + pupilOffsetX, centerY + pupilOffsetY, size/15, 0, 2 * Math.PI);
                this.ctx.fill();
            } else {
                // Draw classic arcade ghost
                const ghostRadius = this.cellSize / 2.2;
                const ghostHeight = ghostRadius * 1.3;
                const topY = centerY - ghostHeight / 2 + ghostRadius;
                const bottomY = centerY + ghostHeight / 2;

                this.ctx.fillStyle = ghost.color;
                this.ctx.beginPath();

                // Rounded dome top (semicircle)
                this.ctx.arc(centerX, topY, ghostRadius, Math.PI, 0, false);

                // Right side down
                this.ctx.lineTo(centerX + ghostRadius, bottomY);

                // Scalloped bottom edge (4 rounded bumps like arcade)
                const scallops = 4;
                const scallopWidth = (ghostRadius * 2) / scallops;
                const scallopHeight = ghostRadius / 4;

                for (let i = scallops - 1; i >= 0; i--) {
                    const x1 = centerX + ghostRadius - (i * scallopWidth);
                    const x2 = centerX + ghostRadius - ((i + 1) * scallopWidth);
                    const ctrlX = (x1 + x2) / 2;
                    const ctrlY = bottomY + scallopHeight;

                    this.ctx.quadraticCurveTo(ctrlX, ctrlY, x2, bottomY);
                }

                this.ctx.closePath();
                this.ctx.fill();

                // Classic arcade ghost eyes - white ovals with blue pupils
                const eyeWidth = ghostRadius / 3.5;
                const eyeHeight = ghostRadius / 2.5;
                const eyeY = topY + ghostRadius / 4;
                const eyeSpacing = ghostRadius / 2;

                // Left eye white
                this.ctx.fillStyle = '#FFFFFF';
                this.ctx.beginPath();
                this.ctx.ellipse(centerX - eyeSpacing, eyeY, eyeWidth, eyeHeight, 0, 0, 2 * Math.PI);
                this.ctx.fill();

                // Right eye white
                this.ctx.beginPath();
                this.ctx.ellipse(centerX + eyeSpacing, eyeY, eyeWidth, eyeHeight, 0, 0, 2 * Math.PI);
                this.ctx.fill();

                // Determine pupil direction based on movement
                let pupilOffsetX = 0;
                let pupilOffsetY = 0;
                switch (ghost.direction) {
                    case 'right':
                        pupilOffsetX = eyeWidth / 3;
                        break;
                    case 'left':
                        pupilOffsetX = -eyeWidth / 3;
                        break;
                    case 'down':
                        pupilOffsetY = eyeHeight / 3;
                        break;
                    case 'up':
                        pupilOffsetY = -eyeHeight / 3;
                        break;
                }

                const pupilRadius = eyeWidth / 2;

                // Left pupil - blue like arcade
                this.ctx.fillStyle = '#0000FF';
                this.ctx.beginPath();
                this.ctx.arc(centerX - eyeSpacing + pupilOffsetX, eyeY + pupilOffsetY, pupilRadius, 0, 2 * Math.PI);
                this.ctx.fill();

                // Right pupil
                this.ctx.beginPath();
                this.ctx.arc(centerX + eyeSpacing + pupilOffsetX, eyeY + pupilOffsetY, pupilRadius, 0, 2 * Math.PI);
                this.ctx.fill();
            }
        }
        
        // Draw mushrooms
        for (let mushroom of this.mushrooms) {
            if (mushroom.active) {
                const drawX = mushroom.x * this.cellSize;
                const drawY = mushroom.y * this.cellSize;
                
                // Draw mushroom cap with unique color
                this.ctx.fillStyle = mushroom.color;
                this.ctx.beginPath();
                this.ctx.arc(drawX + this.cellSize / 2, drawY + this.cellSize / 2 - 3, this.cellSize / 4, 0, 2 * Math.PI);
                this.ctx.fill();
                
                // Add white spots for visual variety
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                this.ctx.beginPath();
                this.ctx.arc(drawX + this.cellSize / 2 - 3, drawY + this.cellSize / 2 - 5, 2, 0, 2 * Math.PI);
                this.ctx.fill();
                this.ctx.beginPath();
                this.ctx.arc(drawX + this.cellSize / 2 + 2, drawY + this.cellSize / 2 - 2, 1.5, 0, 2 * Math.PI);
                this.ctx.fill();
                
                // Mushroom stem
                this.ctx.fillStyle = '#F5DEB3';
                this.ctx.fillRect(drawX + this.cellSize / 2 - 2, drawY + this.cellSize / 2 + 2, 4, 8);
                
                // Special effects for golden mushroom
                if (mushroom.type === 'golden') {
                    this.ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
                    this.ctx.beginPath();
                    this.ctx.arc(drawX + this.cellSize / 2, drawY + this.cellSize / 2, this.cellSize / 2, 0, 2 * Math.PI);
                    this.ctx.fill();
                }
            }
        }
        
        // Draw missiles with realistic rocket appearance
        for (let bullet of this.bullets) {
            const drawX = bullet.x * this.cellSize + this.cellSize / 2;
            const drawY = bullet.y * this.cellSize + this.cellSize / 2;

            this.ctx.save();
            this.ctx.translate(drawX, drawY);

            // Rotate based on direction
            let angle = 0;
            switch (bullet.direction) {
                case 'right': angle = 0; break;
                case 'down': angle = Math.PI / 2; break;
                case 'left': angle = Math.PI; break;
                case 'up': angle = -Math.PI / 2; break;
            }
            this.ctx.rotate(angle);

            // Draw missile based on type
            switch (bullet.type) {
                case 'standard':
                    // Standard silver missile with fins and flame
                    // Body
                    this.ctx.fillStyle = '#D0D0D0';
                    this.ctx.fillRect(-6, -2, 12, 4);
                    // Nose cone
                    this.ctx.fillStyle = '#B0B0B0';
                    this.ctx.beginPath();
                    this.ctx.moveTo(6, 0);
                    this.ctx.lineTo(10, -2);
                    this.ctx.lineTo(10, 2);
                    this.ctx.closePath();
                    this.ctx.fill();
                    // Fins
                    this.ctx.fillStyle = '#909090';
                    this.ctx.beginPath();
                    this.ctx.moveTo(-6, -2);
                    this.ctx.lineTo(-8, -4);
                    this.ctx.lineTo(-4, -2);
                    this.ctx.closePath();
                    this.ctx.fill();
                    this.ctx.beginPath();
                    this.ctx.moveTo(-6, 2);
                    this.ctx.lineTo(-8, 4);
                    this.ctx.lineTo(-4, 2);
                    this.ctx.closePath();
                    this.ctx.fill();
                    // Flame trail
                    this.ctx.fillStyle = '#FF6600';
                    this.ctx.beginPath();
                    this.ctx.moveTo(-6, 0);
                    this.ctx.lineTo(-12, -3);
                    this.ctx.lineTo(-12, 3);
                    this.ctx.closePath();
                    this.ctx.fill();
                    this.ctx.fillStyle = '#FFAA00';
                    this.ctx.beginPath();
                    this.ctx.moveTo(-6, 0);
                    this.ctx.lineTo(-10, -2);
                    this.ctx.lineTo(-10, 2);
                    this.ctx.closePath();
                    this.ctx.fill();
                    break;

                case 'rapid':
                    // Blue rapid-fire sleek missile
                    this.ctx.fillStyle = '#4488FF';
                    this.ctx.fillRect(-5, -1.5, 10, 3);
                    this.ctx.fillStyle = '#6699FF';
                    this.ctx.beginPath();
                    this.ctx.moveTo(5, 0);
                    this.ctx.lineTo(8, -1.5);
                    this.ctx.lineTo(8, 1.5);
                    this.ctx.closePath();
                    this.ctx.fill();
                    // Fins
                    this.ctx.fillStyle = '#3366CC';
                    this.ctx.fillRect(-5, -3, 2, 1.5);
                    this.ctx.fillRect(-5, 1.5, 2, 1.5);
                    // Blue flame
                    this.ctx.fillStyle = '#00CCFF';
                    this.ctx.beginPath();
                    this.ctx.moveTo(-5, 0);
                    this.ctx.lineTo(-9, -2);
                    this.ctx.lineTo(-9, 2);
                    this.ctx.closePath();
                    this.ctx.fill();
                    break;

                case 'spread':
                    // Green spread-shot missile
                    this.ctx.fillStyle = '#44FF44';
                    this.ctx.fillRect(-7, -2.5, 14, 5);
                    this.ctx.fillStyle = '#66FF66';
                    this.ctx.beginPath();
                    this.ctx.moveTo(7, 0);
                    this.ctx.lineTo(11, -2.5);
                    this.ctx.lineTo(11, 2.5);
                    this.ctx.closePath();
                    this.ctx.fill();
                    // Wide fins
                    this.ctx.fillStyle = '#22CC22';
                    this.ctx.fillRect(-7, -5, 3, 2.5);
                    this.ctx.fillRect(-7, 2.5, 3, 2.5);
                    // Green flame
                    this.ctx.fillStyle = '#88FF00';
                    this.ctx.beginPath();
                    this.ctx.moveTo(-7, 0);
                    this.ctx.lineTo(-12, -3);
                    this.ctx.lineTo(-12, 3);
                    this.ctx.closePath();
                    this.ctx.fill();
                    break;

                case 'piercing':
                    // Purple piercing missile - long and thin
                    this.ctx.fillStyle = '#CC44FF';
                    this.ctx.fillRect(-8, -1.5, 16, 3);
                    this.ctx.fillStyle = '#DD66FF';
                    this.ctx.beginPath();
                    this.ctx.moveTo(8, 0);
                    this.ctx.lineTo(12, -1.5);
                    this.ctx.lineTo(12, 1.5);
                    this.ctx.closePath();
                    this.ctx.fill();
                    // Energy lines
                    this.ctx.strokeStyle = '#FFFFFF';
                    this.ctx.lineWidth = 1.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(-4, 0);
                    this.ctx.lineTo(8, 0);
                    this.ctx.stroke();
                    // Purple energy trail
                    this.ctx.fillStyle = '#FF00FF';
                    this.ctx.beginPath();
                    this.ctx.moveTo(-8, 0);
                    this.ctx.lineTo(-14, -2);
                    this.ctx.lineTo(-14, 2);
                    this.ctx.closePath();
                    this.ctx.fill();
                    break;

                case 'homing':
                    // Red homing missile with tracking indicators
                    this.ctx.fillStyle = '#FF4444';
                    this.ctx.fillRect(-6, -3, 12, 6);
                    this.ctx.fillStyle = '#FF6666';
                    this.ctx.beginPath();
                    this.ctx.moveTo(6, 0);
                    this.ctx.lineTo(10, -3);
                    this.ctx.lineTo(10, 3);
                    this.ctx.closePath();
                    this.ctx.fill();
                    // Advanced fins
                    this.ctx.fillStyle = '#CC3333';
                    this.ctx.fillRect(-6, -5, 4, 2);
                    this.ctx.fillRect(-6, 3, 4, 2);
                    // Targeting circles
                    this.ctx.strokeStyle = '#FF8888';
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.arc(0, 0, 8, 0, 2 * Math.PI);
                    this.ctx.stroke();
                    // Red flame
                    this.ctx.fillStyle = '#FF6600';
                    this.ctx.beginPath();
                    this.ctx.moveTo(-6, 0);
                    this.ctx.lineTo(-11, -3);
                    this.ctx.lineTo(-11, 3);
                    this.ctx.closePath();
                    this.ctx.fill();
                    this.ctx.fillStyle = '#FFAA00';
                    this.ctx.beginPath();
                    this.ctx.moveTo(-6, 0);
                    this.ctx.lineTo(-9, -2);
                    this.ctx.lineTo(-9, 2);
                    this.ctx.closePath();
                    this.ctx.fill();
                    break;

                case 'multishot':
                    // Purple multi-directional missile
                    this.ctx.fillStyle = '#FF44FF';
                    this.ctx.fillRect(-5, -2, 10, 4);
                    this.ctx.fillStyle = '#FF66FF';
                    this.ctx.beginPath();
                    this.ctx.moveTo(5, 0);
                    this.ctx.lineTo(8, -2);
                    this.ctx.lineTo(8, 2);
                    this.ctx.closePath();
                    this.ctx.fill();
                    // Cross-shaped fins for multi-directional
                    this.ctx.fillStyle = '#CC33CC';
                    this.ctx.fillRect(-5, -4, 2, 1.5);
                    this.ctx.fillRect(-5, 2.5, 2, 1.5);
                    this.ctx.fillRect(-3, -3, 1, 2);
                    this.ctx.fillRect(-3, 1, 1, 2);
                    // Purple flame
                    this.ctx.fillStyle = '#DD00DD';
                    this.ctx.beginPath();
                    this.ctx.moveTo(-5, 0);
                    this.ctx.lineTo(-10, -2.5);
                    this.ctx.lineTo(-10, 2.5);
                    this.ctx.closePath();
                    this.ctx.fill();
                    break;

                case 'super':
                    // Golden super bullet - large and powerful
                    this.ctx.fillStyle = '#FFD700';
                    this.ctx.fillRect(-8, -4, 16, 8);
                    this.ctx.fillStyle = '#FFEE44';
                    this.ctx.beginPath();
                    this.ctx.moveTo(8, 0);
                    this.ctx.lineTo(13, -4);
                    this.ctx.lineTo(13, 4);
                    this.ctx.closePath();
                    this.ctx.fill();
                    // Large fins
                    this.ctx.fillStyle = '#CC9900';
                    this.ctx.fillRect(-8, -6, 4, 2);
                    this.ctx.fillRect(-8, 4, 4, 2);
                    // Energy glow effect
                    this.ctx.strokeStyle = '#FFFF00';
                    this.ctx.lineWidth = 2;
                    this.ctx.strokeRect(-8, -4, 16, 8);
                    // Intense golden flame
                    this.ctx.fillStyle = '#FF9900';
                    this.ctx.beginPath();
                    this.ctx.moveTo(-8, 0);
                    this.ctx.lineTo(-14, -4);
                    this.ctx.lineTo(-14, 4);
                    this.ctx.closePath();
                    this.ctx.fill();
                    this.ctx.fillStyle = '#FFCC00';
                    this.ctx.beginPath();
                    this.ctx.moveTo(-8, 0);
                    this.ctx.lineTo(-11, -3);
                    this.ctx.lineTo(-11, 3);
                    this.ctx.closePath();
                    this.ctx.fill();
                    break;
            }

            this.ctx.restore();
        }
        
        // Draw classic arcade Pac-Man
        const pacX = this.pacman.x * this.cellSize;
        const pacY = this.pacman.y * this.cellSize;
        const centerX = pacX + this.cellSize / 2;
        const centerY = pacY + this.cellSize / 2;
        const radius = this.cellSize / 2.2;

        this.ctx.save();

        // Pure solid yellow - no gradients (arcade style)
        this.ctx.fillStyle = '#FFFF00';

        // Smooth mouth animation - classic chomp
        const mouthCycle = Math.abs(Math.sin(this.pacman.mouthAnimation));
        const maxMouthAngle = 0.4; // Maximum mouth opening (in radians, roughly 45 degrees)
        const mouthOpenAmount = mouthCycle * maxMouthAngle;

        let rotation = 0;
        switch (this.pacman.direction) {
            case 'right':
                rotation = 0;
                break;
            case 'down':
                rotation = Math.PI / 2;
                break;
            case 'left':
                rotation = Math.PI;
                break;
            case 'up':
                rotation = -Math.PI / 2;
                break;
        }

        // Draw Pac-Man as a pie with mouth opening/closing
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, rotation + mouthOpenAmount, rotation + (2 * Math.PI) - mouthOpenAmount);
        this.ctx.lineTo(centerX, centerY);
        this.ctx.closePath();
        this.ctx.fill();

        // Draw shield effect if active
        if (this.hasShield) {
            const shieldPulse = Math.abs(Math.sin(Date.now() / 200));
            this.ctx.strokeStyle = `rgba(100, 150, 255, ${0.5 + shieldPulse * 0.5})`;
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius + 5, 0, 2 * Math.PI);
            this.ctx.stroke();
            this.ctx.strokeStyle = `rgba(150, 200, 255, ${0.3 + shieldPulse * 0.3})`;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius + 8, 0, 2 * Math.PI);
            this.ctx.stroke();
        }

        this.ctx.restore();
    }
    
    gameLoop() {
        if (!this.gameOver && !this.isPaused && !this.levelJustCompleted) {
            this.movePacman();
            this.moveGhosts();
            this.updateBullets();
            this.updateShootingPower();
            this.updatePacmanAnimation();
            this.checkCollisions();
            this.updateTimer();
            this.effectsManager.update(this.frameTime / 1000); // Convert to seconds
        }

        this.render();
        this.effectsManager.render();
        this.updatePowerStatusDisplay();

        // Update UI displays
        if (this.currentStageElement) this.currentStageElement.textContent = this.currentLevel;
        if (this.highScoreElement) this.highScoreElement.textContent = this.highScore;

        setTimeout(() => this.gameLoop(), this.frameTime);
    }

    updateTimer() {
        // Calculate elapsed time
        const elapsed = Math.floor((Date.now() - this.gameStartTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        this.timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    updatePacmanAnimation() {
        // Animate mouth opening and closing (adjusted for 60 FPS)
        this.pacman.mouthAnimation += 0.025; // Reduced from 0.3 to maintain same visual speed
        if (this.pacman.mouthAnimation >= Math.PI) {
            this.pacman.mouthAnimation = 0;
            this.pacman.mouthOpen = !this.pacman.mouthOpen;
        }
    }
    
    togglePause() {
        // Don't allow pause during stage transition
        if (this.levelJustCompleted) return;

        this.isPaused = !this.isPaused;

        if (this.isPaused) {
            this.statusElement.textContent = 'PAUSED - Press P to Resume';
            this.statusElement.className = 'game-status paused';
        } else {
            if (!this.gameOver) {
                this.statusElement.textContent = '';
                this.statusElement.className = 'game-status';
            }
        }
    }
    
    updatePowerStatusDisplay() {
        const powerStatusDiv = document.getElementById('powerStatus');
        const powerNameElement = document.getElementById('powerName');
        const powerTimerElement = document.getElementById('powerTimer');
        const powerTypeElement = document.getElementById('powerType');
        const powerTimerFill = document.getElementById('powerTimerFill');

        // Display active power status
        if (this.hasShootingPower && this.currentPowerType) {
            powerStatusDiv.style.display = 'block';

            const powerNames = {
                'red': 'Homing Missiles',
                'purple': 'Multi-Shot',
                'golden': 'Super Bullet'
            };

            const powerTypes = {
                'red': 'Tracks targets',
                'purple': 'Shoots all 4 directions',
                'golden': 'Large piercing shot'
            };

            powerNameElement.textContent = powerNames[this.currentPowerType] || 'Unknown';
            powerTimerElement.textContent = `${Math.ceil(this.shootingPowerTimer / 1000)}s`;
            powerTypeElement.textContent = powerTypes[this.currentPowerType] || '-';

            // Update timer bar
            const percentage = (this.shootingPowerTimer / this.shootingPowerDuration) * 100;
            powerTimerFill.style.width = `${Math.max(0, percentage)}%`;

            // Update header power timer
            this.headerPowerTimer.style.display = 'block';
            this.headerPowerName.textContent = powerNames[this.currentPowerType] || 'Unknown';
            this.headerPowerTime.textContent = `${Math.ceil(this.shootingPowerTimer / 1000)}s`;
        } else if (this.hasShield) {
            powerStatusDiv.style.display = 'block';
            powerNameElement.textContent = 'Shield';
            powerTimerElement.textContent = `${Math.ceil(this.shieldTimer / 1000)}s`;
            powerTypeElement.textContent = 'Invincibility';

            // Update timer bar
            const percentage = (this.shieldTimer / this.shieldDuration) * 100;
            powerTimerFill.style.width = `${Math.max(0, percentage)}%`;

            // Update header power timer
            this.headerPowerTimer.style.display = 'block';
            this.headerPowerName.textContent = 'Shield';
            this.headerPowerTime.textContent = `${Math.ceil(this.shieldTimer / 1000)}s`;
        } else if (this.hasSpeedBoost) {
            powerStatusDiv.style.display = 'block';
            powerNameElement.textContent = 'Speed Boost';
            powerTimerElement.textContent = `${Math.ceil(this.speedBoostTimer / 1000)}s`;
            powerTypeElement.textContent = '1.5x speed';

            // Update timer bar
            const percentage = (this.speedBoostTimer / this.speedBoostDuration) * 100;
            powerTimerFill.style.width = `${Math.max(0, percentage)}%`;

            // Update header power timer
            this.headerPowerTimer.style.display = 'block';
            this.headerPowerName.textContent = 'Speed Boost';
            this.headerPowerTime.textContent = `${Math.ceil(this.speedBoostTimer / 1000)}s`;
        } else {
            powerStatusDiv.style.display = 'none';
            // Hide header power timer when no power is active
            this.headerPowerTimer.style.display = 'none';
        }
    }
    
    toggleSound() {
        const isMuted = this.soundManager.toggleMute();
        const soundButton = document.getElementById('soundButton');
        if (soundButton) {
            soundButton.textContent = isMuted ? '🔇' : '🔊';
            soundButton.title = isMuted ? 'Unmute (M)' : 'Mute (M)';
        }
    }

    advanceToNextStage() {
        this.currentLevel++;

        // Stage completion message
        this.statusElement.textContent = `STAGE ${this.currentLevel - 1} COMPLETE! Loading Stage ${this.currentLevel}...`;
        this.statusElement.className = 'game-status stage-complete';

        // Effects
        const pacmanPixelX = this.pacman.x * this.cellSize + this.cellSize / 2;
        const pacmanPixelY = this.pacman.y * this.cellSize + this.cellSize / 2;
        this.effectsManager.sparkle(pacmanPixelX, pacmanPixelY, '#00ff00', 30);
        this.effectsManager.startFlash('#ffff00', 0.2, 0.4);
        this.soundManager.playLevelUpSound();

        // Pause 1.5s for transition
        setTimeout(() => {
            this.loadStage(this.currentLevel);
        }, 1500);
    }

    loadStage(stageNumber) {
        // Load new maze (deep copy)
        this.maze = MAZE_LAYOUTS[stageNumber - 1].map(row => row);

        // Reset Pacman to (1, 1)
        this.pacman.x = 1;
        this.pacman.y = 1;
        this.pacman.direction = 'right';
        this.pacman.nextDirection = 'right';

        // Reset ghosts to home positions
        this.ghosts.forEach(ghost => {
            ghost.x = ghost.homeX;
            ghost.y = ghost.homeY;
            ghost.targetX = ghost.homeX;
            ghost.targetY = ghost.homeY;
            ghost.isDead = false;
            ghost.respawnTimer = 0;
        });

        // Clear bullets and power-ups
        this.bullets = [];
        this.hasShootingPower = false;
        this.shootingPowerTimer = 0;
        this.currentPowerType = null;
        this.hasShield = false;
        this.shieldTimer = 0;
        this.hasSpeedBoost = false;
        this.speedBoostTimer = 0;

        // Re-place mushrooms
        this.mushrooms = [];
        this.placeMushrooms();

        // Update UI - show stage number
        this.statusElement.textContent = `Stage ${this.currentLevel}`;
        this.statusElement.className = 'game-status stage-indicator';

        // Clear stage indicator after 2s
        setTimeout(() => {
            if (!this.gameOver) {
                this.statusElement.textContent = '';
                this.statusElement.className = 'game-status';
            }
        }, 2000);

        this.levelJustCompleted = false;

        // NOTE: Score accumulates - NOT reset!
    }

    restart() {
        // Reset to STAGE 1
        this.currentLevel = 1;
        this.levelJustCompleted = false;

        // Reset game state
        this.pacman = { x: 1, y: 1, direction: 'right', nextDirection: 'right', mouthAnimation: 0, mouthOpen: true };
        this.ghosts = [
            { x: 9, y: 5, targetX: 9, targetY: 5, direction: 'up', color: '#ff0000', shape: 'circle', speed: 0.033, points: 100, moveProgress: 0, stuckCounter: 0, lastPosition: { x: 9, y: 5 }, isDead: false, respawnTimer: 0, homeX: 9, homeY: 5 },
            { x: 10, y: 5, targetX: 10, targetY: 5, direction: 'down', color: '#ffb8ff', shape: 'square', speed: 0.029, points: 150, moveProgress: 0, stuckCounter: 0, lastPosition: { x: 10, y: 5 }, isDead: false, respawnTimer: 0, homeX: 10, homeY: 5 },
            { x: 11, y: 5, targetX: 11, targetY: 5, direction: 'left', color: '#00ffff', shape: 'triangle', speed: 0.038, points: 120, moveProgress: 0, stuckCounter: 0, lastPosition: { x: 11, y: 5 }, isDead: false, respawnTimer: 0, homeX: 11, homeY: 5 },
            { x: 8, y: 6, targetX: 8, targetY: 6, direction: 'right', color: '#ffa500', shape: 'diamond', speed: 0.032, points: 180, moveProgress: 0, stuckCounter: 0, lastPosition: { x: 8, y: 6 }, isDead: false, respawnTimer: 0, homeX: 8, homeY: 6 },
            { x: 12, y: 6, targetX: 12, targetY: 6, direction: 'up', color: '#00ff00', shape: 'star', speed: 0.042, points: 250, moveProgress: 0, stuckCounter: 0, lastPosition: { x: 12, y: 6 }, isDead: false, respawnTimer: 0, homeX: 12, homeY: 6 }
        ];
        this.score = 0;
        this.gameOver = false;
        this.gameWon = false;
        this.hasShootingPower = false;
        this.shootingPowerTimer = 0;
        this.currentPowerType = null;
        this.isPaused = false;
        this.bullets = [];
        this.mushrooms = [];

        // Reset timer
        this.gameStartTime = Date.now();
        this.timerElement.textContent = '0:00';

        // Load stage 1 maze
        this.maze = MAZE_LAYOUTS[0].map(row => row);

        // Place new mushrooms
        this.placeMushrooms();

        // Reset UI with stage indicator
        this.scoreElement.textContent = this.score;
        this.statusElement.textContent = 'Stage 1';
        this.statusElement.className = 'game-status stage-indicator';

        setTimeout(() => {
            if (!this.gameOver) {
                this.statusElement.textContent = '';
                this.statusElement.className = 'game-status';
            }
        }, 2000);
    }
}

// Start game when page loads
window.addEventListener('load', () => {
    window.game = new PacmanGame();
});