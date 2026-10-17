// Maze layouts for all 14 stages (loops back to Stage 1 with rising ghost speed after Stage 14)
const MAZE_LAYOUTS = [
  // STAGE 1 - Beginner (current maze - open spaces)
  [
    "#####################",
    "#.........#.........#",
    "#.##.###.###.###.##.#",
    "#...................#",
    "#.##.#.#######.#.##.#",
    "#....#...###...#....#",
    "####.###.###.###.####",
    "#....#...###...#....#",
    "#.##.#.#######.#.##.#",
    "#...................#",
    "#.##.###.###.###.##.#",
    "#.........#.........#",
    "#####################"
  ],

  // STAGE 2 - Narrow Corridors
  [
    "#####################",
    "#.........#.........#",
    "#.###.###...###.###.#",
    "#.#...............#.#",
    "#.#.#############.#.#",
    "#.#...............#.#",
    "#.#.###.#####.###.#.#",
    "#.#...............#.#",
    "#.#.#############.#.#",
    "#.#...............#.#",
    "#.###.###...###.###.#",
    "#.........#.........#",
    "#####################"
  ],

  // STAGE 3 - Central Chamber
  [
    "#####################",
    "#.#.#.#.......#.#.#.#",
    "#.#.#.####.####.#.#.#",
    "#.#.#...........#.#.#",
    "#.#.#.####.####.#.#.#",
    "#.....#.......#.....#",
    "#.###.#.......#.###.#",
    "#.....#.......#.....#",
    "#.#.#.####.####.#.#.#",
    "#.#.#...........#.#.#",
    "#.#.#.####.####.#.#.#",
    "#.#.#.#.......#.#.#.#",
    "#####################"
  ],

  // STAGE 4 - Complex Maze
  [
    "#####################",
    "#...#...#...#...#...#",
    "#.#.#.#.#...#.#.#.#.#",
    "#.#...#...#...#...#.#",
    "#.#####.#...#.#####.#",
    "#.......#...#.......#",
    "###.#####...#####.###",
    "#.......#...#.......#",
    "#.#####.#...#.#####.#",
    "#.#...#...#...#...#.#",
    "#.#.#.#.#...#.#.#.#.#",
    "#...#...#...#...#...#",
    "#####################"
  ],

  // STAGE 5 - Spiral Pattern
  [
    "#####################",
    "#...................#",
    "#.#.#############.#.#",
    "#.#.............#.#.#",
    "#.#.#.#########.#.#.#",
    "#.#.#.#.......#.#.#.#",
    "#.#.#...#####...#.#.#",
    "#.#.#.#.......#.#.#.#",
    "#.#.#.#########.#.#.#",
    "#.#.#.............#.#",
    "#.#.#############.#.#",
    "#...................#",
    "#####################"
  ],

  // STAGE 6 - Four Quadrants
  [
    "#####################",
    "#.......#####.......#",
    "#.####..#####..####.#",
    "#.#..#.........#..#.#",
    "#.#..#.#######.#..#.#",
    "#......#.....#......#",
    "####.............####",
    "#......#.....#......#",
    "#.#..#.#######.#..#.#",
    "#.#..#.........#..#.#",
    "#.####..#####..####.#",
    "#.......#####.......#",
    "#####################"
  ],

  // STAGE 7 - Expert Chaos
  [
    "#####################",
    "#.#.#.#.#...#.#.#.#.#",
    "#...................#",
    "#.#####.#...#.#####.#",
    "#.#...#.#...#.#...#.#",
    "#.#.#...#...#...#.#.#",
    "#.#...#########...#.#",
    "#.#.#...#...#...#.#.#",
    "#.#...#.#...#.#...#.#",
    "#.#####.#...#.#####.#",
    "#...................#",
    "#.#.#.#.#...#.#.#.#.#",
    "#####################"
  ],

  // STAGE 8 - Diagonal Zigzag
  [
    "#####################",
    "#...................#",
    "#.########.########.#",
    "#.#...............#.#",
    "#.#.######.######.#.#",
    "#.#...............#.#",
    "#.#.####.#.#.####.#.#",
    "#.......#####.......#",
    "#.#####.#####.#####.#",
    "#......###.###......#",
    "#.########.########.#",
    "#...................#",
    "#####################"
  ],

  // STAGE 9 - Ring Maze
  [
    "#####################",
    "#...................#",
    "#.########.########.#",
    "#.#......#.#......#.#",
    "#.#.####.#.#.####.#.#",
    "#.#.#..#.....#..#.#.#",
    "#.#.#....#.#....#.#.#",
    "#.#.#..#.#.#.#..#.#.#",
    "#.#.####.#.#.####.#.#",
    "#.#......#.#......#.#",
    "#.########.########.#",
    "#...................#",
    "#####################"
  ],

  // STAGE 10 - Grid Cells
  [
    "#####################",
    "#...................#",
    "#.#.#.#.#...#.#.#.#.#",
    "#...................#",
    "#.##.#.###.###.#.##.#",
    "#.#.#.#.#...#.#.#.#.#",
    "#...................#",
    "#.#.#.#.#...#.#.#.#.#",
    "#.##.#.###.###.#.##.#",
    "#...................#",
    "#.#.#.#.#...#.#.#.#.#",
    "#...................#",
    "#####################"
  ],

  // STAGE 11 - Checkerboard Pillars
  [
    "#####################",
    "#...................#",
    "#.#.#.#.#...#.#.#.#.#",
    "#...................#",
    "#.#.#.#.#...#.#.#.#.#",
    "#...................#",
    "#.#.#.#.......#.#.#.#",
    "#...................#",
    "#.#.#.#.#...#.#.#.#.#",
    "#...................#",
    "#.#.#.#.#...#.#.#.#.#",
    "#...................#",
    "#####################"
  ],

  // STAGE 12 - Serpentine
  [
    "#####################",
    "#...................#",
    "#.#######...#######.#",
    "#...................#",
    "#.#######...#######.#",
    "#.#######...#######.#",
    "#......#.....#......#",
    "#.#######...#######.#",
    "#.#######...#######.#",
    "#...................#",
    "#.#######...#######.#",
    "#...................#",
    "#####################"
  ],

  // STAGE 13 - Fortress
  [
    "#####################",
    "#...................#",
    "#.#...#.......#...#.#",
    "#.#.#.#.#...#.#.#.#.#",
    "#...#.#.......#.#...#",
    "#.##.#.##...##.#.##.#",
    "#....#.........#....#",
    "#.##.#.###.###.#.##.#",
    "#...#.#.......#.#...#",
    "#.#.#.#.#...#.#.#.#.#",
    "#.#...#.......#...#.#",
    "#...................#",
    "#####################"
  ],

  // STAGE 14 - Labyrinth Extreme
  [
    "#####################",
    "#...................#",
    "#.#.#.#.#...#.#.#.#.#",
    "#.#......#.#......#.#",
    "#.#.####.#.#.####.#.#",
    "#.#.####.....####.#.#",
    "#....###.....###....#",
    "#.#.####.#.#.####.#.#",
    "#.#.####.#.#.####.#.#",
    "#.#......#.#......#.#",
    "#.#.#.#.#...#.#.#.#.#",
    "#...................#",
    "#####################"
  ]
];

// Difficulty presets: speed multipliers, starting lives and power-pellet fright time (ms)
const DIFFICULTY_SETTINGS = {
    easy:   { label: 'Easy',   pacmanSpeed: 1.0,  ghostSpeed: 1.0,  lives: 5, frightenedTime: 10000 },
    normal: { label: 'Normal', pacmanSpeed: 1.15, ghostSpeed: 1.35, lives: 3, frightenedTime: 7000 },
    hard:   { label: 'Hard',   pacmanSpeed: 1.25, ghostSpeed: 1.75, lives: 2, frightenedTime: 4000 }
};

// Ghost roster. Each ghost hunts with its own targeting rule (see getChaseTarget);
// `scatter` is the corner it retreats to during scatter phases.
const GHOST_DEFS = [
    { shape: 'circle',   color: '#ff0000', x: 9,  y: 5, direction: 'up',    speed: 0.033, points: 100, scatter: { x: 20, y: -2 } },
    { shape: 'square',   color: '#ffb8ff', x: 10, y: 5, direction: 'down',  speed: 0.029, points: 150, scatter: { x: 0,  y: -2 } },
    { shape: 'triangle', color: '#00ffff', x: 11, y: 5, direction: 'left',  speed: 0.038, points: 120, scatter: { x: 20, y: 14 } },
    { shape: 'diamond',  color: '#ffa500', x: 8,  y: 6, direction: 'right', speed: 0.032, points: 180, scatter: { x: 0,  y: 14 } },
    { shape: 'star',     color: '#00ff00', x: 12, y: 6, direction: 'up',    speed: 0.042, points: 250, scatter: { x: 10, y: 6 } }
];

// Scatter/chase rhythm (ms). Ghosts retreat to their corners, then hunt; the last chase lasts forever
const GHOST_MODE_SCHEDULE = [
    { mode: 'scatter', time: 7000 },
    { mode: 'chase', time: 20000 },
    { mode: 'scatter', time: 7000 },
    { mode: 'chase', time: 20000 },
    { mode: 'scatter', time: 5000 },
    { mode: 'chase', time: Infinity }
];

// Bonus fruit, arcade style: later stages give rarer, pricier fruit
const FRUITS = [
    { name: 'Cherry', points: 100, color: '#ff1a3c' },
    { name: 'Strawberry', points: 300, color: '#ff3b5c' },
    { name: 'Orange', points: 500, color: '#ffa500' },
    { name: 'Apple', points: 700, color: '#e81919' },
    { name: 'Melon', points: 1000, color: '#3ccf4e' },
    { name: 'Galaxian', points: 2000, color: '#3a6cff' },
    { name: 'Bell', points: 3000, color: '#ffd700' },
    { name: 'Key', points: 5000, color: '#7fe3ff' }
];

const DIRECTION_VECTORS = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } };
const OPPOSITE_DIRECTION = { up: 'down', down: 'up', left: 'right', right: 'left' };

const EXTRA_LIFE_EVERY = 10000;
const DEATH_ANIMATION_MS = 1500;
const VIEW_MODES = ['flat', 'tilt', '3d'];

class PacmanGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvasStage = document.getElementById('canvasStage');
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

        // Ghost home position for respawning (moved to the nearest open tile per stage)
        this.ghostHome = { x: 10, y: 6 };

        this.ghosts = this.createGhosts();
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
        this.maxLevel = 14;
        this.levelJustCompleted = false;
        this.lapCount = 1;
        this.difficultyMultiplier = 1;

        // High score persistence
        this.highScore = this.loadHighScore();

        // Difficulty, lives and bonus state
        this.difficultyKey = this.loadSetting('pacmanDifficulty', 'normal');
        if (!DIFFICULTY_SETTINGS[this.difficultyKey]) this.difficultyKey = 'normal';
        this.difficulty = DIFFICULTY_SETTINGS[this.difficultyKey];
        this.lives = this.difficulty.lives;
        this.nextExtraLifeScore = EXTRA_LIFE_EVERY;
        this.dying = false;
        this.deathTimer = 0;
        this.readyTimer = 0;
        this.frightenedTimer = 0;
        this.ghostEatChain = 0;
        this.ghostModeIndex = 0;
        this.ghostModeTimer = 0;
        this.fruit = null;
        this.mazeVersion = 0;

        // Rendering: logical size stays 672x416; renderScale grows the backing store for sharp scaling
        this.viewWidth = this.width * this.cellSize;
        this.viewHeight = this.height * this.cellSize;
        this.renderScale = 1;
        this.renderer3d = null;
        this.gamepadState = {};

        this.setupControls();
        this.setupButtons();
        this.setupGamepad();
        this.setupDifficultySelect();
        this.loadViewPreference();
        this.fitToWindow();
        window.addEventListener('resize', () => this.fitToWindow());
        document.addEventListener('fullscreenchange', () => this.fitToWindow());
        // Pause automatically when the window is hidden so nobody dies while away
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && !this.isPaused && !this.gameOver && !this.levelJustCompleted) this.togglePause();
        });

        // Start at Stage 1
        this.loadStage(1);
        this.updateLivesDisplay();
        this.startReady(2200, true);

        this.gameLoop();
    }

    createGhosts() {
        return GHOST_DEFS.map(def => ({
            x: def.x, y: def.y, targetX: def.x, targetY: def.y, direction: def.direction,
            color: def.color, shape: def.shape, baseSpeed: def.speed, points: def.points, scatter: def.scatter,
            moveProgress: 0, stuckCounter: 0, lastPosition: { x: def.x, y: def.y },
            isDead: false, frightened: false, respawnTimer: 0, homeX: def.x, homeY: def.y
        }));
    }

    loadSetting(key, fallback) {
        try {
            const value = localStorage.getItem(key);
            return value === null ? fallback : value;
        } catch (e) {
            return fallback;
        }
    }

    saveSetting(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.warn('localStorage not available');
        }
    }

    // ---- View modes: flat 2D, CSS-tilted 2D, and real 3D (Three.js) ----

    loadViewPreference() {
        let mode = this.loadSetting('pacmanViewMode', null);
        if (mode === null) mode = this.loadSetting('pacmanTiltedView', 'false') === 'true' ? 'tilt' : 'flat';
        this.setViewMode(VIEW_MODES.includes(mode) ? mode : 'flat', false);
    }

    toggleView() {
        const next = VIEW_MODES[(VIEW_MODES.indexOf(this.viewMode) + 1) % VIEW_MODES.length];
        this.setViewMode(next, true);
    }

    setViewMode(mode, announce) {
        if (mode === '3d' && !this.ensureRenderer3d()) mode = 'flat';
        this.viewMode = mode;
        this.canvasStage.classList.toggle('tilted', mode === 'tilt');
        this.canvasStage.classList.toggle('mode-3d', mode === '3d');
        this.saveSetting('pacmanViewMode', mode);

        const labels = { flat: 'Flat 2D', tilt: 'Tilted 2D', '3d': 'Full 3D' };
        const viewButton = document.getElementById('viewButton');
        if (viewButton) viewButton.title = `View: ${labels[mode]} (V to switch)`;
        if (announce) this.flashStatus(`View: ${labels[mode]}`, 'game-status power-up', 1200);
        this.fitToWindow();
    }

    ensureRenderer3d() {
        if (this.renderer3d) return true;
        if (typeof Renderer3D === 'undefined' || !Renderer3D.isSupported()) return false;
        try {
            this.renderer3d = new Renderer3D(document.getElementById('gameCanvas3d'), this);
            return true;
        } catch (e) {
            console.warn('3D view unavailable:', e);
            return false;
        }
    }

    // Scale the board to fill the window (or screen in fullscreen) while keeping its aspect ratio
    fitToWindow() {
        const container = document.querySelector('.game-container');
        if (!container || !this.canvasStage) return;
        const stageRect = this.canvasStage.getBoundingClientRect();
        const otherHeight = container.getBoundingClientRect().height - stageRect.height;
        const stagePadding = 50; // .canvas-stage vertical padding
        const availableWidth = window.innerWidth - 80;
        const availableHeight = window.innerHeight - otherHeight - stagePadding - 50;
        // Height may push the help text below the fold, but never shrinks the board below 1x;
        // only a narrow window can make it smaller than its original size.
        const heightScale = Math.max(1, availableHeight / this.viewHeight);
        const scale = Math.max(0.5, Math.min(availableWidth / this.viewWidth, heightScale, 3));

        const cssWidth = Math.floor(this.viewWidth * scale);
        const cssHeight = Math.floor(this.viewHeight * scale);
        this.renderScale = scale * (window.devicePixelRatio || 1);
        this.canvas.width = Math.round(this.viewWidth * this.renderScale);
        this.canvas.height = Math.round(this.viewHeight * this.renderScale);
        this.canvas.style.width = `${cssWidth}px`;
        this.canvas.style.height = `${cssHeight}px`;
        if (this.renderer3d) this.renderer3d.resize(cssWidth, cssHeight);
    }

    toggleFullscreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
        } else if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(err => console.warn('Fullscreen refused:', err));
        }
    }

    setupButtons() {
        const bind = (id, handler) => {
            const button = document.getElementById(id);
            if (!button) return;
            button.addEventListener('click', () => {
                handler();
                button.blur(); // Keep Space for shooting instead of re-clicking the button
            });
        };
        bind('soundButton', () => this.toggleSound());
        bind('musicButton', () => this.toggleMusic());
        bind('viewButton', () => this.toggleView());
        bind('fullscreenButton', () => this.toggleFullscreen());
        this.updateMusicButton();
    }

    setupDifficultySelect() {
        const select = document.getElementById('difficultySelect');
        if (!select) return;
        select.value = this.difficultyKey;
        select.addEventListener('change', () => {
            this.difficultyKey = select.value;
            this.difficulty = DIFFICULTY_SETTINGS[this.difficultyKey];
            this.saveSetting('pacmanDifficulty', this.difficultyKey);
            select.blur(); // Arrow keys should move Pac-Man, not change the dropdown
            this.restart();
        });
    }

    // ---- Controller support (standard gamepad mapping: Xbox / PlayStation) ----

    setupGamepad() {
        window.addEventListener('gamepadconnected', (e) => {
            this.flashStatus(`Controller connected`, 'game-status power-up', 1500);
            console.log('Gamepad connected:', e.gamepad.id);
        });
    }

    pollGamepad() {
        if (!navigator.getGamepads) return;
        for (const pad of navigator.getGamepads()) {
            if (!pad) continue;
            const prev = this.gamepadState[pad.index] || {};
            const pressed = (i) => !!(pad.buttons[i] && pad.buttons[i].pressed);
            const justPressed = (i) => pressed(i) && !prev[i];

            // D-pad or left stick steers
            const ax = pad.axes[0] || 0;
            const ay = pad.axes[1] || 0;
            let dir = null;
            if (pressed(12)) dir = 'up';
            else if (pressed(13)) dir = 'down';
            else if (pressed(14)) dir = 'left';
            else if (pressed(15)) dir = 'right';
            else if (Math.abs(ax) > 0.5 || Math.abs(ay) > 0.5) {
                dir = Math.abs(ax) > Math.abs(ay) ? (ax > 0 ? 'right' : 'left') : (ay > 0 ? 'down' : 'up');
            }
            if (dir && !this.gameOver && !this.isPaused) this.pacman.nextDirection = dir;

            if (justPressed(0) || justPressed(7)) this.fireWeapon();           // A / RT: shoot
            if (justPressed(9)) this.gameOver ? this.restart() : this.togglePause(); // Start
            if (justPressed(8) && this.gameOver) this.restart();               // Back/Select
            if (justPressed(3)) this.toggleView();                              // Y: switch view
            if (justPressed(2)) this.toggleMusic();                             // X: music

            const state = {};
            pad.buttons.forEach((b, i) => { state[i] = b.pressed; });
            this.gamepadState[pad.index] = state;
            if (pad.buttons.some(b => b.pressed)) this.soundManager.resumeAudioContext();
        }
    }

    fireWeapon() {
        if (!this.hasShootingPower || this.gameOver || this.isPaused || this.dying || this.readyTimer > 0) return;
        this.shoot();
        this.shoot(); // Allow shooting multiple bullets
        this.shoot();
    }

    // Shows a temporary status message, then clears it (unless something more important replaced it)
    flashStatus(text, className, duration) {
        this.statusElement.textContent = text;
        this.statusElement.className = className;
        clearTimeout(this.statusTimeout);
        this.statusTimeout = setTimeout(() => {
            if (!this.gameOver && !this.isPaused && this.statusElement.textContent === text) {
                this.statusElement.textContent = '';
                this.statusElement.className = 'game-status';
            }
        }, duration);
    }

    setupControls() {
        document.addEventListener('keydown', (event) => {
            // Ignore keys typed into the difficulty dropdown
            if (event.target && event.target.tagName === 'SELECT') return;
            this.soundManager.resumeAudioContext();

            // Handle mute toggle
            if (event.key.toLowerCase() === 'm') {
                this.toggleSound();
                event.preventDefault();
                return;
            }

            // Handle music toggle
            if (event.key.toLowerCase() === 'n') {
                this.toggleMusic();
                event.preventDefault();
                return;
            }

            // Handle fullscreen toggle
            if (event.key.toLowerCase() === 'f' || event.key === 'F11') {
                this.toggleFullscreen();
                event.preventDefault();
                return;
            }

            // Handle view mode switch (flat -> tilted -> 3D)
            if (event.key.toLowerCase() === 'v') {
                this.toggleView();
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
                    this.fireWeapon();
                    event.preventDefault();
                    break;
            }
        });
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
        const baseSpeed = this.pacmanSpeed * this.difficulty.pacmanSpeed;
        const currentSpeed = this.hasSpeedBoost ? baseSpeed * 1.5 : baseSpeed;

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

        const cell = this.maze[collectY][collectX];
        if (cell === '.' || cell === 'o') {
            let row = this.maze[collectY].split('');
            row[collectX] = ' ';
            this.maze[collectY] = row.join('');

            const pixelX = collectX * this.cellSize + this.cellSize / 2;
            const pixelY = collectY * this.cellSize + this.cellSize / 2;
            if (cell === 'o') {
                // Power pellet: ghosts turn blue and can be eaten
                this.addScore(50);
                this.soundManager.playPowerPelletSound();
                this.effectsManager.ring(pixelX, pixelY, '#ffffff', 2);
                this.activateFrightened();
            } else {
                this.addScore(10);
                this.soundManager.playDotSound();
                // Add sparkle effect for dot collection
                this.effectsManager.sparkle(pixelX, pixelY, '#ffff00', 5);
            }
            this.onDotEaten();
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
                ghost.frightened = false;
                ghost.respawnTimer = 0;
                ghost.x = ghost.homeX;
                ghost.y = ghost.homeY;
                ghost.targetX = ghost.homeX;
                ghost.targetY = ghost.homeY;
            }
        } else {
            // Eyes fly home fast
            const moveSpeed = Math.min(0.15, distance);
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
            const speed = this.getGhostSpeed(ghost);

            // Determine movement direction
            const isMovingHorizontal = Math.abs(dx) > Math.abs(dy);

            if (isMovingHorizontal) {
                // Moving left or right - keep Y aligned to grid center
                ghost.x += (dx > 0 ? 1 : -1) * Math.min(Math.abs(dx), speed);
                ghost.y = currentGridY; // LANE DISCIPLINE: Lock Y to grid
            } else {
                // Moving up or down - keep X aligned to grid center
                ghost.y += (dy > 0 ? 1 : -1) * Math.min(Math.abs(dy), speed);
                ghost.x = currentGridX; // LANE DISCIPLINE: Lock X to grid
            }
        }
    }

    getGhostSpeed(ghost) {
        let speed = ghost.baseSpeed * this.difficulty.ghostSpeed * this.difficultyMultiplier;
        if (ghost.frightened) speed *= 0.55;
        return Math.min(speed, 0.12);
    }

    // Out-of-bounds counts as wall for ghosts (they don't use the wrap-around edges)
    isWall(x, y) {
        const row = this.maze[y];
        return !row || row[x] === undefined || row[x] === '#';
    }

    get ghostMode() {
        return GHOST_MODE_SCHEDULE[this.ghostModeIndex].mode;
    }

    // Arcade-style decision at each tile: never reverse (unless at a dead end), then take the
    // exit that brings the ghost closest to its target tile. Frightened ghosts wander randomly.
    chooseNewTargetForGhost(ghost) {
        const gx = Math.round(ghost.x);
        const gy = Math.round(ghost.y);

        // Tie-break order matches the arcade: up, left, down, right
        const options = ['up', 'left', 'down', 'right'].filter(dir => {
            const v = DIRECTION_VECTORS[dir];
            return !this.isWall(gx + v.x, gy + v.y);
        });

        // If no valid directions, stay in place
        if (options.length === 0) {
            ghost.targetX = gx;
            ghost.targetY = gy;
            return;
        }

        let choices = options.filter(dir => dir !== OPPOSITE_DIRECTION[ghost.direction]);
        if (choices.length === 0) choices = options;

        const pickBest = (score) => choices.reduce((best, dir) => (score(dir) < score(best) ? dir : best));
        let chosenDirection;

        if (ghost.frightened) {
            chosenDirection = choices[Math.floor(Math.random() * choices.length)];
        } else if (ghost.shape === 'star') {
            // Star ghost never scatters and follows the true shortest path through the maze
            const distances = this.getPacmanDistanceField();
            chosenDirection = pickBest(dir => {
                const v = DIRECTION_VECTORS[dir];
                const d = distances[gy + v.y][gx + v.x];
                return d === -1 ? Infinity : d;
            });
        } else {
            const target = this.ghostMode === 'scatter' ? ghost.scatter : this.getChaseTarget(ghost);
            chosenDirection = pickBest(dir => {
                const v = DIRECTION_VECTORS[dir];
                return (gx + v.x - target.x) ** 2 + (gy + v.y - target.y) ** 2;
            });
        }

        ghost.direction = chosenDirection;
        const v = DIRECTION_VECTORS[chosenDirection];
        ghost.targetX = gx + v.x;
        ghost.targetY = gy + v.y;
    }

    // Each ghost has its own personality while chasing
    getChaseTarget(ghost) {
        const px = Math.round(this.pacman.x);
        const py = Math.round(this.pacman.y);
        const v = DIRECTION_VECTORS[this.pacman.direction];

        switch (ghost.shape) {
            case 'circle':
                // Red: hunts Pac-Man's current tile directly
                return { x: px, y: py };
            case 'square':
                // Pink: ambushes 4 tiles ahead of Pac-Man
                return { x: px + v.x * 4, y: py + v.y * 4 };
            case 'triangle': {
                // Cyan: flanks - mirrors the red ghost around a point 2 tiles ahead of Pac-Man
                const red = this.ghosts.find(g => g.shape === 'circle' && !g.isDead);
                const ax = px + v.x * 2;
                const ay = py + v.y * 2;
                if (!red) return { x: ax, y: ay };
                return { x: ax * 2 - Math.round(red.x), y: ay * 2 - Math.round(red.y) };
            }
            case 'diamond': {
                // Orange: chases from afar but loses its nerve within 8 tiles
                const distSq = (ghost.x - px) ** 2 + (ghost.y - py) ** 2;
                return distSq > 64 ? { x: px, y: py } : ghost.scatter;
            }
            default:
                return { x: px, y: py };
        }
    }

    // Breadth-first distances from Pac-Man to every tile (-1 = unreachable), cached per tile
    getPacmanDistanceField() {
        const px = Math.round(this.pacman.x);
        const py = Math.round(this.pacman.y);
        const key = `${px},${py},${this.mazeVersion}`;
        if (this._distanceKey === key) return this._distanceField;

        const field = Array.from({ length: this.height }, () => new Array(this.width).fill(-1));
        if (!this.isWall(px, py)) {
            field[py][px] = 0;
            const queue = [[px, py]];
            for (let head = 0; head < queue.length; head++) {
                const [x, y] = queue[head];
                for (const v of Object.values(DIRECTION_VECTORS)) {
                    const nx = x + v.x;
                    const ny = y + v.y;
                    if (!this.isWall(nx, ny) && field[ny][nx] === -1) {
                        field[ny][nx] = field[y][x] + 1;
                        queue.push([nx, ny]);
                    }
                }
            }
        }
        this._distanceKey = key;
        this._distanceField = field;
        return field;
    }

    // Turn a ghost around toward the tile it just left (used on mode changes, like the arcade)
    reverseGhost(ghost) {
        const back = OPPOSITE_DIRECTION[ghost.direction];
        const v = DIRECTION_VECTORS[back];
        const fromX = ghost.targetX + v.x;
        const fromY = ghost.targetY + v.y;
        if (!this.isWall(fromX, fromY)) {
            ghost.direction = back;
            ghost.targetX = fromX;
            ghost.targetY = fromY;
        }
    }

    updateGhostMode() {
        if (this.frightenedTimer > 0) {
            // The scatter/chase clock pauses while ghosts are frightened
            this.frightenedTimer -= this.frameTime;
            if (this.frightenedTimer <= 0) this.endFrightened();
            return;
        }
        if (this.ghostModeIndex >= GHOST_MODE_SCHEDULE.length - 1) return;
        this.ghostModeTimer += this.frameTime;
        if (this.ghostModeTimer >= GHOST_MODE_SCHEDULE[this.ghostModeIndex].time) {
            this.ghostModeIndex++;
            this.ghostModeTimer = 0;
            this.ghosts.forEach(ghost => {
                if (!ghost.isDead) this.reverseGhost(ghost);
            });
        }
    }

    activateFrightened() {
        // Fright time shrinks on later laps
        this.frightenedTimer = this.difficulty.frightenedTime / Math.min(this.difficultyMultiplier, 2);
        this.frightenedDuration = this.frightenedTimer;
        this.ghostEatChain = 0;
        this.ghosts.forEach(ghost => {
            if (!ghost.isDead) {
                ghost.frightened = true;
                this.reverseGhost(ghost);
            }
        });
        this.soundManager.setMusicMode('frightened');
    }

    endFrightened() {
        this.frightenedTimer = 0;
        this.ghosts.forEach(ghost => { ghost.frightened = false; });
        this.soundManager.setMusicMode('normal');
    }

    // True while frightened ghosts should blink white as a warning that time is nearly up
    isFrightenedEnding() {
        return this.frightenedTimer > 0 && this.frightenedTimer < 2000 && Math.floor(this.frightenedTimer / 200) % 2 === 0;
    }

    eatGhost(ghost) {
        const points = 200 * Math.pow(2, Math.min(this.ghostEatChain, 3)); // 200, 400, 800, 1600
        this.ghostEatChain++;
        ghost.isDead = true;
        ghost.frightened = false;
        ghost.respawnTimer = 2000;
        this.addScore(points);

        const pixelX = ghost.x * this.cellSize + this.cellSize / 2;
        const pixelY = ghost.y * this.cellSize + this.cellSize / 2;
        this.effectsManager.sparkle(pixelX, pixelY, '#2121ff', 15);
        this.effectsManager.textPopup(pixelX, pixelY - 10, `${points}`, '#00ffff', 18);
        this.soundManager.playEatGhostSound();
    }

    addScore(points) {
        this.score += points;
        this.scoreElement.textContent = this.score;
        if (this.score >= this.nextExtraLifeScore) {
            this.nextExtraLifeScore += EXTRA_LIFE_EVERY;
            this.lives++;
            this.updateLivesDisplay();
            this.soundManager.playExtraLifeSound();
            const pixelX = this.pacman.x * this.cellSize + this.cellSize / 2;
            const pixelY = this.pacman.y * this.cellSize + this.cellSize / 2;
            this.effectsManager.textPopup(pixelX, pixelY - 24, '1UP!', '#ffff00', 20);
        }
    }

    updateLivesDisplay() {
        const livesElement = document.getElementById('lives');
        if (!livesElement) return;
        const shown = Math.min(this.lives, 6);
        livesElement.innerHTML = '<span class="life-icon"></span>'.repeat(shown) + (this.lives > 6 ? ` x${this.lives}` : '');
        livesElement.title = `${this.lives} ${this.lives === 1 ? 'life' : 'lives'} left`;
    }

    // ---- Lives, death and the READY! pause ----

    loseLife() {
        this.lives--;
        this.updateLivesDisplay();
        this.dying = true;
        this.deathTimer = 0;
        this.bullets = [];
        this.endFrightened();
        this.soundManager.stopMusic();
        this.soundManager.playDeathSound();

        // Add death effects
        const pacmanPixelX = this.pacman.x * this.cellSize + this.cellSize / 2;
        const pacmanPixelY = this.pacman.y * this.cellSize + this.cellSize / 2;
        this.effectsManager.startScreenShake(8, 0.5);
        this.effectsManager.startFlash('#ff0000', 0.4, 0.5);
        setTimeout(() => this.effectsManager.explosion(pacmanPixelX, pacmanPixelY, '#ffff00', 40, 4), 1100);
    }

    updateDeath() {
        this.deathTimer += this.frameTime;
        if (this.deathTimer < DEATH_ANIMATION_MS) return;
        this.dying = false;
        if (this.lives > 0) {
            this.resetPositions();
            this.startReady(1800, false);
        } else {
            this.endGame();
        }
    }

    endGame() {
        this.gameOver = true;
        const newRecord = this.saveHighScore();
        this.statusElement.textContent = newRecord ? `GAME OVER - NEW HIGH SCORE ${this.score}! Press R to restart` : 'GAME OVER! Press R to restart';
        this.statusElement.className = 'game-status lose';
        this.soundManager.stopMusic();
        this.soundManager.playGameOverSound();
    }

    // Freeze play briefly with READY! on screen (start of game, new stage, after losing a life)
    startReady(duration, withJingle) {
        this.readyTimer = duration;
        this.soundManager.stopMusic();
        this.soundManager.setMusicMode('normal');
        if (withJingle) this.soundManager.playReadyJingle();
    }

    updateReady() {
        this.readyTimer -= this.frameTime;
        if (this.readyTimer <= 0) {
            this.readyTimer = 0;
            this.soundManager.startMusic();
        }
    }

    // Put Pac-Man and the ghosts back at their starting tiles (maze and dots stay as they are)
    resetPositions() {
        const start = this.findNearestOpen(1, 1);
        this.pacman.x = start.x;
        this.pacman.y = start.y;
        this.pacman.direction = 'right';
        this.pacman.nextDirection = 'right';
        this.ghostHome = this.findNearestOpen(10, 6);

        this.ghosts.forEach((ghost, i) => {
            const def = GHOST_DEFS[i];
            const spawn = this.findNearestOpen(def.x, def.y);
            ghost.homeX = spawn.x;
            ghost.homeY = spawn.y;
            ghost.x = spawn.x;
            ghost.y = spawn.y;
            ghost.targetX = spawn.x;
            ghost.targetY = spawn.y;
            ghost.direction = def.direction;
            ghost.lastPosition = { x: spawn.x, y: spawn.y };
            ghost.stuckCounter = 0;
            ghost.isDead = false;
            ghost.frightened = false;
            ghost.respawnTimer = 0;
        });

        this.bullets = [];
        this.frightenedTimer = 0;
        this.ghostEatChain = 0;
        this.ghostModeIndex = 0;
        this.ghostModeTimer = 0;
    }

    // Closest non-wall tile to (x, y) - stage layouts differ, so fixed spawn points can land in walls
    findNearestOpen(x, y) {
        let best = null;
        let bestDist = Infinity;
        for (let ty = 0; ty < this.height; ty++) {
            for (let tx = 0; tx < this.width; tx++) {
                if (this.isWall(tx, ty)) continue;
                const d = (tx - x) ** 2 + (ty - y) ** 2;
                if (d < bestDist) {
                    bestDist = d;
                    best = { x: tx, y: ty };
                }
            }
        }
        return best || { x, y };
    }

    // ---- Power pellets and bonus fruit ----

    // Turn the dot nearest each corner into a power pellet (skipping Pac-Man's start area)
    placePowerPellets() {
        const anchors = [{ x: 1, y: 3 }, { x: 19, y: 3 }, { x: 1, y: 9 }, { x: 19, y: 9 }];
        for (const anchor of anchors) {
            let best = null;
            let bestDist = Infinity;
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    if (this.maze[y][x] !== '.' || (x <= 2 && y <= 2)) continue;
                    const d = Math.abs(x - anchor.x) + Math.abs(y - anchor.y);
                    if (d < bestDist) {
                        bestDist = d;
                        best = { x, y };
                    }
                }
            }
            if (best) {
                const row = this.maze[best.y].split('');
                row[best.x] = 'o';
                this.maze[best.y] = row.join('');
            }
        }
    }

    countDots() {
        return this.maze.join('').replace(/[^.o]/g, '').length;
    }

    onDotEaten() {
        this.dotsEaten++;
        const fraction = this.dotsEaten / this.totalDots;
        // Two fruits per stage, at 30% and 70% of the dots
        if ((this.fruitsSpawned === 0 && fraction >= 0.3) || (this.fruitsSpawned === 1 && fraction >= 0.7)) {
            this.spawnFruit();
        }
    }

    spawnFruit() {
        this.fruitsSpawned++;
        const overallStage = (this.lapCount - 1) * this.maxLevel + this.currentLevel;
        const index = overallStage === 1 ? 0 : overallStage === 2 ? 1 : Math.min(Math.floor((overallStage + 1) / 2), FRUITS.length - 1);
        const spot = this.findNearestOpen(10, 9);
        this.fruit = { ...FRUITS[index], x: spot.x, y: spot.y, timer: 9500 };
    }

    updateFruit() {
        if (!this.fruit) return;
        this.fruit.timer -= this.frameTime;
        if (this.fruit.timer <= 0) {
            this.fruit = null;
            return;
        }
        if (Math.abs(this.fruit.x - this.pacman.x) < 0.6 && Math.abs(this.fruit.y - this.pacman.y) < 0.6) {
            const pixelX = this.fruit.x * this.cellSize + this.cellSize / 2;
            const pixelY = this.fruit.y * this.cellSize + this.cellSize / 2;
            this.addScore(this.fruit.points);
            this.effectsManager.sparkle(pixelX, pixelY, this.fruit.color, 20);
            this.effectsManager.textPopup(pixelX, pixelY - 16, `${this.fruit.name} +${this.fruit.points}`, '#ffb8ff', 16);
            this.soundManager.playFruitSound();
            this.fruit = null;
        }
    }

    checkCollisions() {
        // Check ghost collisions with tolerance for fractional positions (only living ghosts)
        for (let ghost of this.ghosts) {
            if (ghost.isDead) continue; // Skip dead ghosts

            const dx = Math.abs(ghost.x - this.pacman.x);
            const dy = Math.abs(ghost.y - this.pacman.y);

            // Collision if within 0.7 units (about 70% of a cell)
            if (dx < 0.7 && dy < 0.7) {
                if (ghost.frightened) {
                    this.eatGhost(ghost);
                    continue;
                }
                if (this.hasShield) continue;
                this.loseLife();
                return;
            }
        }

        // Check win condition (only if game is not already over)
        if (!this.gameOver) {
            let dotsLeft = this.countDots();
            if (dotsLeft === 0) {
                this.levelJustCompleted = true;
                this.saveHighScore();
                // Advance to next stage - loops back to Stage 1 with rising
                // ghost speed after Stage 14 instead of ending the game.
                this.advanceToNextStage();
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
                this.addScore(50);

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
                    ghost.frightened = false;
                    ghost.respawnTimer = 5000; // 5 seconds respawn time
                    this.addScore(points);

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
    
    // Draw a single maze wall cell as a beveled 3D block (flat camera, no perspective needed)
    drawWallBlock(x, y) {
        const s = this.cellSize;
        const ctx = this.ctx;

        const grad = ctx.createLinearGradient(x, y, x + s, y + s);
        grad.addColorStop(0, '#4a4aff');
        grad.addColorStop(0.55, '#2626e0');
        grad.addColorStop(1, '#12128f');
        ctx.fillStyle = grad;
        ctx.fillRect(x, y, s, s);

        // Raised-edge highlight (top + left)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
        ctx.fillRect(x, y, s, 2);
        ctx.fillRect(x, y, 2, s);

        // Recessed-edge shadow (bottom + right)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(x, y + s - 3, s, 3);
        ctx.fillRect(x + s - 3, y, 3, s);

        ctx.strokeStyle = 'rgba(90, 90, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, s - 1, s - 1);
    }

    // Lighten/darken a #rrggbb color by a percentage (used for gradient shading)
    shadeColor(hex, percent) {
        const num = parseInt(hex.slice(1), 16);
        const amt = Math.round(2.55 * percent);
        let r = (num >> 16) + amt;
        let g = ((num >> 8) & 0x00ff) + amt;
        let b = (num & 0x0000ff) + amt;
        r = Math.max(0, Math.min(255, r));
        g = Math.max(0, Math.min(255, g));
        b = Math.max(0, Math.min(255, b));
        return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
    }

    // Soft ambient shadow ellipse drawn beneath a sprite to ground it visually
    drawDropShadow(centerX, bottomY, radiusX, radiusY) {
        const ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.beginPath();
        ctx.ellipse(centerX, bottomY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }

    // Simple arcade-style fruit sprites, drawn around the tile centre
    drawFruit(fruit) {
        // Blink during the last 2 seconds before it disappears
        if (fruit.timer < 2000 && Math.floor(fruit.timer / 150) % 2 === 0) return;

        const ctx = this.ctx;
        const cx = fruit.x * this.cellSize + this.cellSize / 2;
        const cy = fruit.y * this.cellSize + this.cellSize / 2 + Math.sin(performance.now() / 250) * 1.5;

        ctx.save();
        this.drawDropShadow(cx, cy + 11, 9, 3);
        const ball = (x, y, r, color) => {
            const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r);
            g.addColorStop(0, this.shadeColor(color, 45));
            g.addColorStop(0.6, color);
            g.addColorStop(1, this.shadeColor(color, -30));
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.fill();
        };
        const stem = (x1, y1, x2, y2, color = '#5a3a1a') => {
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.quadraticCurveTo((x1 + x2) / 2, y2 - 3, x2, y2);
            ctx.stroke();
        };

        switch (fruit.name) {
            case 'Cherry':
                stem(cx - 4, cy + 2, cx + 4, cy - 10, '#3a8a2a');
                stem(cx + 5, cy + 4, cx + 4, cy - 10, '#3a8a2a');
                ball(cx - 4, cy + 4, 5, fruit.color);
                ball(cx + 5, cy + 6, 5, fruit.color);
                break;
            case 'Strawberry':
                ctx.fillStyle = fruit.color;
                ctx.beginPath();
                ctx.moveTo(cx - 8, cy - 4);
                ctx.quadraticCurveTo(cx, cy - 10, cx + 8, cy - 4);
                ctx.quadraticCurveTo(cx + 6, cy + 6, cx, cy + 10);
                ctx.quadraticCurveTo(cx - 6, cy + 6, cx - 8, cy - 4);
                ctx.fill();
                ctx.fillStyle = '#fff6a0';
                [[-3, -2], [3, -2], [0, 2], [-3, 5], [3, 5]].forEach(([dx, dy]) => ctx.fillRect(cx + dx, cy + dy, 1.5, 1.5));
                ctx.fillStyle = '#3ccf4e';
                ctx.fillRect(cx - 5, cy - 9, 10, 3);
                break;
            case 'Galaxian':
                ctx.fillStyle = fruit.color;
                ctx.beginPath();
                ctx.moveTo(cx, cy - 10);
                ctx.lineTo(cx + 10, cy + 6);
                ctx.lineTo(cx, cy + 2);
                ctx.lineTo(cx - 10, cy + 6);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = '#ffd700';
                ctx.fillRect(cx - 2, cy - 6, 4, 10);
                ctx.fillStyle = '#ff3030';
                ctx.fillRect(cx - 1, cy - 9, 2, 3);
                break;
            case 'Bell':
                ctx.fillStyle = fruit.color;
                ctx.beginPath();
                ctx.moveTo(cx - 9, cy + 6);
                ctx.quadraticCurveTo(cx - 8, cy - 10, cx, cy - 10);
                ctx.quadraticCurveTo(cx + 8, cy - 10, cx + 9, cy + 6);
                ctx.closePath();
                ctx.fill();
                ball(cx, cy + 7, 2.5, '#7fe3ff');
                break;
            case 'Key':
                ctx.strokeStyle = fruit.color;
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(cx, cy - 5, 5, 0, 2 * Math.PI);
                ctx.moveTo(cx, cy);
                ctx.lineTo(cx, cy + 10);
                ctx.moveTo(cx, cy + 5);
                ctx.lineTo(cx + 4, cy + 5);
                ctx.moveTo(cx, cy + 9);
                ctx.lineTo(cx + 4, cy + 9);
                ctx.stroke();
                break;
            default: {
                // Orange, Apple, Melon: a round fruit with a stem and leaf
                ball(cx, cy + 1, 9, fruit.color);
                if (fruit.name === 'Melon') {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
                    ctx.lineWidth = 1;
                    for (const dx of [-4, 0, 4]) {
                        ctx.beginPath();
                        ctx.moveTo(cx + dx, cy - 7);
                        ctx.quadraticCurveTo(cx + dx * 1.6, cy + 1, cx + dx, cy + 9);
                        ctx.stroke();
                    }
                }
                stem(cx, cy - 7, cx + 1, cy - 12);
                ctx.fillStyle = '#3ccf4e';
                ctx.beginPath();
                ctx.ellipse(cx + 5, cy - 10, 4, 2, -0.5, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
        ctx.restore();
    }

    render() {
        // Clear canvas with a subtle radial floor gradient for depth
        if (!this._floorGradient) {
            this._floorGradient = this.ctx.createRadialGradient(
                this.viewWidth / 2, this.viewHeight / 2, 0,
                this.viewWidth / 2, this.viewHeight / 2, this.viewWidth / 1.3
            );
            this._floorGradient.addColorStop(0, '#0a0a12');
            this._floorGradient.addColorStop(1, '#000000');
        }
        this.ctx.fillStyle = this._floorGradient;
        this.ctx.fillRect(0, 0, this.viewWidth, this.viewHeight);

        // Draw maze
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const cell = this.maze[y][x];
                const drawX = x * this.cellSize;
                const drawY = y * this.cellSize;

                if (cell === '#') {
                    this.drawWallBlock(drawX, drawY);
                } else if (cell === '.') {
                    // Dot - glossy 3D pellet
                    const dotX = drawX + this.cellSize / 2;
                    const dotY = drawY + this.cellSize / 2;
                    const dotGradient = this.ctx.createRadialGradient(
                        dotX - 0.8, dotY - 0.8, 0.2,
                        dotX, dotY, 2.5
                    );
                    dotGradient.addColorStop(0, '#FFFFFF');
                    dotGradient.addColorStop(0.5, '#FFDCC4');
                    dotGradient.addColorStop(1, '#D98A75');
                    this.ctx.fillStyle = dotGradient;
                    this.ctx.beginPath();
                    this.ctx.arc(dotX, dotY, 2.5, 0, 2 * Math.PI);
                    this.ctx.fill();
                } else if (cell === 'o') {
                    // Power pellet - big pulsing glossy orb
                    const pelletX = drawX + this.cellSize / 2;
                    const pelletY = drawY + this.cellSize / 2;
                    const pulse = 6 + Math.sin(performance.now() / 150) * 1.5;
                    const pelletGradient = this.ctx.createRadialGradient(
                        pelletX - 2, pelletY - 2, 0.5,
                        pelletX, pelletY, pulse
                    );
                    pelletGradient.addColorStop(0, '#FFFFFF');
                    pelletGradient.addColorStop(0.5, '#FFDCC4');
                    pelletGradient.addColorStop(1, '#D98A75');
                    this.ctx.fillStyle = pelletGradient;
                    this.ctx.beginPath();
                    this.ctx.arc(pelletX, pelletY, pulse, 0, 2 * Math.PI);
                    this.ctx.fill();
                }
            }
        }
        
        // Draw ghosts with classic Pacman ghost shape
        // Ghosts vanish while Pac-Man's death animation plays
        const hideGhosts = this.dying && this.deathTimer > 300;
        for (let ghost of this.ghosts) {
            if (hideGhosts) break;
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
                // Draw classic arcade ghost (blue, or blinking white near the end, while frightened)
                const bodyColor = ghost.frightened ? (this.isFrightenedEnding() ? '#dddddd' : '#2121ff') : ghost.color;
                const ghostRadius = this.cellSize / 2.2;
                const ghostHeight = ghostRadius * 1.3;
                const topY = centerY - ghostHeight / 2 + ghostRadius;
                const bottomY = centerY + ghostHeight / 2;

                this.drawDropShadow(centerX, bottomY + 2, ghostRadius * 0.8, ghostRadius * 0.28);

                const ghostGradient = this.ctx.createRadialGradient(
                    centerX - ghostRadius * 0.35, topY - ghostRadius * 0.25, ghostRadius * 0.1,
                    centerX, centerY, ghostRadius * 1.4
                );
                ghostGradient.addColorStop(0, this.shadeColor(bodyColor, 45));
                ghostGradient.addColorStop(0.6, bodyColor);
                ghostGradient.addColorStop(1, this.shadeColor(bodyColor, -25));
                this.ctx.fillStyle = ghostGradient;
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

                if (ghost.frightened) {
                    // Scared face: small eyes and a wobbly mouth
                    const faceColor = this.isFrightenedEnding() ? '#ff0000' : '#ffb8a0';
                    this.ctx.fillStyle = faceColor;
                    this.ctx.fillRect(centerX - ghostRadius / 2 - 2, topY - 2, 4, 4);
                    this.ctx.fillRect(centerX + ghostRadius / 2 - 2, topY - 2, 4, 4);
                    this.ctx.strokeStyle = faceColor;
                    this.ctx.lineWidth = 1.5;
                    this.ctx.beginPath();
                    const mouthY = topY + ghostRadius * 0.55;
                    for (let i = 0; i <= 6; i++) {
                        const mx = centerX - ghostRadius * 0.6 + (i * ghostRadius * 1.2) / 6;
                        const my = mouthY + (i % 2 === 0 ? 0 : -3);
                        if (i === 0) this.ctx.moveTo(mx, my);
                        else this.ctx.lineTo(mx, my);
                    }
                    this.ctx.stroke();
                    continue;
                }

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
                const capX = drawX + this.cellSize / 2;
                const capY = drawY + this.cellSize / 2 - 3;
                const capRadius = this.cellSize / 4;

                this.drawDropShadow(capX, drawY + this.cellSize / 2 + 9, capRadius * 0.7, capRadius * 0.25);

                // Draw mushroom cap with unique color, shaded like a rounded 3D dome
                const capGradient = this.ctx.createRadialGradient(
                    capX - capRadius * 0.4, capY - capRadius * 0.4, capRadius * 0.1,
                    capX, capY, capRadius
                );
                capGradient.addColorStop(0, this.shadeColor(mushroom.color, 50));
                capGradient.addColorStop(0.65, mushroom.color);
                capGradient.addColorStop(1, this.shadeColor(mushroom.color, -30));
                this.ctx.fillStyle = capGradient;
                this.ctx.beginPath();
                this.ctx.arc(capX, capY, capRadius, 0, 2 * Math.PI);
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
        
        if (this.fruit) this.drawFruit(this.fruit);

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

        // Death animation: Pac-Man turns upward and his mouth opens until he folds away
        const deathProgress = this.dying ? Math.min(1, Math.max(0, (this.deathTimer - 300) / 1000)) : 0;
        if (deathProgress >= 1) {
            this.ctx.restore();
            return;
        }

        this.drawDropShadow(centerX, centerY + radius * 0.85, radius * 0.9 * (1 - deathProgress), radius * 0.3);

        // Radial gradient for a shaded, spherical look
        const pacGradient = this.ctx.createRadialGradient(
            centerX - radius * 0.3, centerY - radius * 0.3, radius * 0.1,
            centerX, centerY, radius
        );
        pacGradient.addColorStop(0, '#FFFFB0');
        pacGradient.addColorStop(0.55, '#FFFF00');
        pacGradient.addColorStop(1, '#D6B800');
        this.ctx.fillStyle = pacGradient;

        // Smooth mouth animation - classic chomp
        const mouthCycle = Math.abs(Math.sin(this.pacman.mouthAnimation));
        const maxMouthAngle = 0.4; // Maximum mouth opening (in radians, roughly 45 degrees)
        let mouthOpenAmount = mouthCycle * maxMouthAngle;
        if (this.dying) mouthOpenAmount = maxMouthAngle * 0.5 + deathProgress * (Math.PI - maxMouthAngle * 0.5);

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
        if (this.dying) rotation = -Math.PI / 2;

        // Draw Pac-Man as a pie with mouth opening/closing
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, rotation + mouthOpenAmount, rotation + (2 * Math.PI) - mouthOpenAmount);
        this.ctx.lineTo(centerX, centerY);
        this.ctx.closePath();
        this.ctx.fill();

        // Draw shield effect if active
        if (this.hasShield && !this.dying) {
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
        // Fixed-timestep updates: rendering runs at the display's refresh rate, while game logic
        // runs as many 1/60s steps as real time has passed. Keeps speeds correct on any machine.
        const now = performance.now();
        if (this.lastLoopTime === undefined) this.lastLoopTime = now;
        this.loopAccumulator = (this.loopAccumulator || 0) + Math.min(now - this.lastLoopTime, 250);
        this.lastLoopTime = now;

        this.pollGamepad();
        while (this.loopAccumulator >= this.frameTime) {
            this.loopAccumulator -= this.frameTime;
            this.update();
        }

        // Draw in logical 672x416 coordinates; the transform scales up to the real backing size
        this.ctx.setTransform(this.renderScale, 0, 0, this.renderScale, 0, 0);
        if (this.viewMode === '3d' && this.renderer3d) {
            // WebGL draws the scene underneath; this canvas becomes a transparent overlay for effects
            this.renderer3d.render(this);
            this.ctx.clearRect(0, 0, this.viewWidth, this.viewHeight);
            this.effectsManager.projector = (x, y) => this.renderer3d.projectToOverlay(x, y);
        } else {
            this.render();
            this.effectsManager.projector = null;
        }
        this.effectsManager.render();
        this.drawOverlayText();
        this.updatePowerStatusDisplay();

        // Update UI displays
        if (this.currentStageElement) this.currentStageElement.textContent = this.lapCount > 1 ? `${this.currentLevel} (Lap ${this.lapCount})` : this.currentLevel;
        if (this.highScoreElement) this.highScoreElement.textContent = this.highScore;

        requestAnimationFrame(() => this.gameLoop());
    }

    // One fixed 1/60s step of game logic
    update() {
        if (this.isPaused) return;
        this.effectsManager.update(this.frameTime / 1000); // Convert to seconds
        if (this.gameOver || this.levelJustCompleted) return;

        this.updateTimer();
        if (this.dying) {
            this.updateDeath();
            return;
        }
        if (this.readyTimer > 0) {
            this.updateReady();
            return;
        }

        this.updateGhostMode();
        this.movePacman();
        this.moveGhosts();
        this.updateBullets();
        this.updateShootingPower();
        this.updateFruit();
        this.updatePacmanAnimation();
        this.checkCollisions();
    }

    // Big centred messages drawn on top of the board (both 2D and 3D views)
    drawOverlayText() {
        let text = null;
        let color = '#ffff00';
        if (this.gameOver) {
            text = 'GAME OVER';
            color = '#ff3030';
        } else if (this.isPaused) {
            text = 'PAUSED';
        } else if (this.readyTimer > 0 && !this.levelJustCompleted) {
            text = 'READY!';
        }
        if (!text) return;

        const ctx = this.ctx;
        const cx = this.viewWidth / 2;
        const cy = this.viewHeight / 2;
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
        ctx.fillRect(cx - 130, cy - 26, 260, 52);
        ctx.font = "bold 34px 'Courier New', monospace";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
        ctx.fillStyle = color;
        ctx.fillText(text, cx, cy + 2);
        ctx.restore();
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
        if (this.levelJustCompleted || this.gameOver) return;

        this.isPaused = !this.isPaused;

        if (this.isPaused) {
            this.statusElement.textContent = 'PAUSED - Press P to Resume';
            this.statusElement.className = 'game-status paused';
            this.soundManager.stopMusic();
        } else {
            this.statusElement.textContent = '';
            this.statusElement.className = 'game-status';
            if (!this.dying && this.readyTimer <= 0) this.soundManager.startMusic();
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
            powerStatusDiv.style.visibility = 'visible';

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
            powerStatusDiv.style.visibility = 'visible';
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
            powerStatusDiv.style.visibility = 'visible';
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
            powerStatusDiv.style.visibility = 'hidden';
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

    toggleMusic() {
        const enabled = this.soundManager.toggleMusic();
        this.updateMusicButton();
        this.flashStatus(enabled ? 'Music On' : 'Music Off', 'game-status power-up', 1000);
    }

    updateMusicButton() {
        const musicButton = document.getElementById('musicButton');
        if (!musicButton) return;
        const enabled = this.soundManager.musicEnabled;
        musicButton.classList.toggle('off', !enabled);
        musicButton.title = enabled ? 'Music off (N)' : 'Music on (N)';
    }

    advanceToNextStage() {
        const completedStage = this.currentLevel;
        this.currentLevel++;
        this.soundManager.stopMusic();

        if (this.currentLevel > this.maxLevel) {
            // Completed a full lap through all stages - loop back to Stage 1
            // and ramp up ghost speed so repeat laps stay challenging.
            this.currentLevel = 1;
            this.lapCount++;
            this.difficultyMultiplier = Math.min(this.difficultyMultiplier * 1.12, 2.5);
            this.statusElement.textContent = `ALL STAGES COMPLETE! Lap ${this.lapCount} - ghosts are faster now. Loading Stage 1...`;
        } else {
            this.statusElement.textContent = `STAGE ${completedStage} COMPLETE! Loading Stage ${this.currentLevel}...`;
        }
        this.statusElement.className = 'game-status stage-complete';

        // Effects
        const pacmanPixelX = this.pacman.x * this.cellSize + this.cellSize / 2;
        const pacmanPixelY = this.pacman.y * this.cellSize + this.cellSize / 2;
        this.effectsManager.sparkle(pacmanPixelX, pacmanPixelY, '#00ff00', 30);
        this.effectsManager.startFlash('#ffff00', 0.2, 0.4);
        this.soundManager.playLevelUpSound();

        // Pause 1.5s for transition
        clearTimeout(this.stageTransition);
        this.stageTransition = setTimeout(() => {
            this.loadStage(this.currentLevel);
            this.startReady(1500, false);
        }, 1500);
    }

    loadStage(stageNumber) {
        // Load new maze (deep copy)
        this.maze = MAZE_LAYOUTS[stageNumber - 1].map(row => row);
        this.mazeVersion++;
        this.placePowerPellets();

        // Reset Pac-Man and ghosts to their starting tiles for this layout
        this.resetPositions();

        // Clear bullets and power-ups
        this.bullets = [];
        this.hasShootingPower = false;
        this.shootingPowerTimer = 0;
        this.currentPowerType = null;
        this.hasShield = false;
        this.shieldTimer = 0;
        this.hasSpeedBoost = false;
        this.speedBoostTimer = 0;
        this.endFrightened();

        // Re-place mushrooms
        this.mushrooms = [];
        this.placeMushrooms();

        // Bonus fruit bookkeeping
        this.fruit = null;
        this.fruitsSpawned = 0;
        this.dotsEaten = 0;
        this.totalDots = this.countDots();

        // Update UI - show stage number
        const label = this.lapCount > 1 ? `Stage ${this.currentLevel} (Lap ${this.lapCount})` : `Stage ${this.currentLevel}`;
        this.flashStatus(label, 'game-status stage-indicator', 2000);

        this.levelJustCompleted = false;

        // NOTE: Score accumulates - NOT reset!
    }

    restart() {
        clearTimeout(this.stageTransition);

        // Reset to STAGE 1
        this.currentLevel = 1;
        this.levelJustCompleted = false;
        this.lapCount = 1;
        this.difficultyMultiplier = 1;

        // Reset game state
        this.pacman = { x: 1, y: 1, direction: 'right', nextDirection: 'right', mouthAnimation: 0, mouthOpen: true };
        this.ghosts = this.createGhosts();
        this.score = 0;
        this.gameOver = false;
        this.gameWon = false;
        this.isPaused = false;
        this.dying = false;
        this.lives = this.difficulty.lives;
        this.nextExtraLifeScore = EXTRA_LIFE_EVERY;
        this.effectsManager.clear();

        // Reset timer
        this.gameStartTime = Date.now();
        this.timerElement.textContent = '0:00';

        // Load stage 1 maze, power-ups and positions
        this.loadStage(1);

        // Reset UI
        this.scoreElement.textContent = this.score;
        this.updateLivesDisplay();
        this.startReady(2200, true);
    }
}

// Start game when page loads
window.addEventListener('load', () => {
    window.game = new PacmanGame();
});