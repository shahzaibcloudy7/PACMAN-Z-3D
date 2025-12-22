const readline = require('readline');

class PacmanGame {
    constructor() {
        this.width = 21;
        this.height = 13;

        // Game timing constants (60 FPS)
        this.frameTime = 1000 / 60; // ~16.67ms per frame
        this.pacmanSpeed = 10 / 60; // 10 tiles per second at 60 FPS
        this.ghostSpeed = 0.8 / 60; // Slower than Pac-Man

        // Movement accumulator for smooth grid-based movement
        this.pacmanMoveAccumulator = 0;
        this.ghostMoveAccumulators = [0, 0, 0];

        this.pacman = { x: 10, y: 10, direction: 'right' };
        this.ghosts = [
            { x: 9, y: 5, direction: 'up', color: '\x1b[31m' },
            { x: 10, y: 5, direction: 'down', color: '\x1b[33m' },
            { x: 11, y: 5, direction: 'left', color: '\x1b[36m' }
        ];
        this.score = 0;
        this.gameOver = false;
        this.maze = [
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
        ];
        
        this.setupInput();
    }
    
    setupInput() {
        readline.emitKeypressEvents(process.stdin);
        if (process.stdin.isTTY) {
            process.stdin.setRawMode(true);
        }
        
        process.stdin.on('keypress', (chunk, key) => {
            if (key && key.name === 'q') {
                process.exit();
            }
            
            if (this.gameOver) return;
            
            switch (key.name) {
                case 'up': case 'w':
                    this.pacman.direction = 'up';
                    break;
                case 'down': case 's':
                    this.pacman.direction = 'down';
                    break;
                case 'left': case 'a':
                    this.pacman.direction = 'left';
                    break;
                case 'right': case 'd':
                    this.pacman.direction = 'right';
                    break;
            }
        });
    }
    
    movePacman() {
        // Accumulate movement based on speed
        this.pacmanMoveAccumulator += this.pacmanSpeed;

        // Only move when we've accumulated enough for a full cell
        if (this.pacmanMoveAccumulator >= 1.0) {
            this.pacmanMoveAccumulator -= 1.0;

            let newX = this.pacman.x;
            let newY = this.pacman.y;

            switch (this.pacman.direction) {
                case 'up':
                    newY--;
                    break;
                case 'down':
                    newY++;
                    break;
                case 'left':
                    newX--;
                    break;
                case 'right':
                    newX++;
                    break;
            }

            if (newX < 0) newX = this.width - 1;
            if (newX >= this.width) newX = 0;
            if (newY < 0) newY = this.height - 1;
            if (newY >= this.height) newY = 0;

            if (this.maze[newY][newX] !== '#') {
                this.pacman.x = newX;
                this.pacman.y = newY;

                if (this.maze[newY][newX] === '.') {
                    this.score += 10;
                    let row = this.maze[newY].split('');
                    row[newX] = ' ';
                    this.maze[newY] = row.join('');
                }
            }
        }
    }
    
    moveGhosts() {
        for (let i = 0; i < this.ghosts.length; i++) {
            const ghost = this.ghosts[i];

            // Accumulate movement based on ghost speed
            this.ghostMoveAccumulators[i] += this.ghostSpeed;

            // Only move when we've accumulated enough for a full cell
            if (this.ghostMoveAccumulators[i] >= 1.0) {
                this.ghostMoveAccumulators[i] -= 1.0;

                const directions = ['up', 'down', 'left', 'right'];
                let moved = false;
                let attempts = 0;

                while (!moved && attempts < 10) {
                    let newX = ghost.x;
                    let newY = ghost.y;

                    if (Math.random() < 0.7) {
                        switch (ghost.direction) {
                            case 'up': newY--; break;
                            case 'down': newY++; break;
                            case 'left': newX--; break;
                            case 'right': newX++; break;
                        }
                    } else {
                        ghost.direction = directions[Math.floor(Math.random() * directions.length)];
                        switch (ghost.direction) {
                            case 'up': newY--; break;
                            case 'down': newY++; break;
                            case 'left': newX--; break;
                            case 'right': newX++; break;
                        }
                    }

                    if (newX >= 0 && newX < this.width && newY >= 0 && newY < this.height &&
                        this.maze[newY][newX] !== '#') {
                        ghost.x = newX;
                        ghost.y = newY;
                        moved = true;
                    } else {
                        ghost.direction = directions[Math.floor(Math.random() * directions.length)];
                    }
                    attempts++;
                }
            }
        }
    }
    
    checkCollisions() {
        for (let ghost of this.ghosts) {
            if (ghost.x === this.pacman.x && ghost.y === this.pacman.y) {
                this.gameOver = true;
                return;
            }
        }
        
        let dotsLeft = this.maze.join('').split('.').length - 1;
        if (dotsLeft === 0) {
            this.gameOver = true;
        }
    }
    
    render() {
        console.clear();
        console.log(`Score: ${this.score}`);
        console.log('Use WASD or arrow keys to move, Q to quit\n');
        
        for (let y = 0; y < this.height; y++) {
            let line = '';
            for (let x = 0; x < this.width; x++) {
                if (this.pacman.x === x && this.pacman.y === y) {
                    line += 'P';
                } else {
                    let ghostHere = this.ghosts.find(g => g.x === x && g.y === y);
                    if (ghostHere) {
                        line += 'G';
                    } else {
                        line += this.maze[y][x];
                    }
                }
            }
            console.log(line);
        }
        
        if (this.gameOver) {
            console.log('\n' + (this.maze.join('').split('.').length - 1 === 0 ? 'YOU WIN!' : 'GAME OVER!'));
            console.log('Press Q to quit');
        }
    }
    
    start() {
        console.log('Pacman Game Starting...');
        console.log('Use WASD or arrow keys to move, Q to quit');

        const gameLoop = setInterval(() => {
            if (this.gameOver) {
                clearInterval(gameLoop);
                return;
            }

            this.movePacman();
            this.moveGhosts();
            this.checkCollisions();
            this.render();
        }, this.frameTime);
    }
}

const game = new PacmanGame();
game.start();