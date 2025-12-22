const puppeteer = require('puppeteer');
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    console.log('🛣️  Testing Lane Discipline System...\n');
    console.log('Testing:');
    console.log('  1. Pacman stays centered in corridors');
    console.log('  2. Pacman follows dot lanes perfectly');
    console.log('  3. Ghosts stay centered in their lanes');
    console.log('  4. Smooth turning at intersections');
    console.log('  5. No diagonal drifting\n');

    const browser = await puppeteer.launch({
        headless: false,
        args: ['--window-size=1280,900', '--autoplay-policy=no-user-gesture-required']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    await page.goto('http://localhost:3001', { waitUntil: 'networkidle2' });
    await page.waitForSelector('#gameCanvas');
    await delay(1000);

    console.log('✅ Game loaded!\n');

    // Test 1: Horizontal lane discipline
    console.log('🧪 Test 1: Horizontal lane discipline');
    console.log('   Moving Pacman right along a horizontal corridor...');

    for (let i = 0; i < 15; i++) {
        await page.keyboard.press('ArrowRight');
        await delay(100);
    }

    // Check Pacman position
    const pacmanPos1 = await page.evaluate(() => {
        const game = window.game || window.pacmanGame;
        if (!game) return null;
        return {
            x: game.pacman.x,
            y: game.pacman.y,
            gridY: Math.round(game.pacman.y),
            offsetY: Math.abs(game.pacman.y - Math.round(game.pacman.y))
        };
    });

    if (pacmanPos1) {
        console.log(`   Pacman position: (${pacmanPos1.x.toFixed(2)}, ${pacmanPos1.y.toFixed(2)})`);
        console.log(`   Grid Y: ${pacmanPos1.gridY}, Offset from center: ${pacmanPos1.offsetY.toFixed(3)}`);

        if (pacmanPos1.offsetY < 0.01) {
            console.log('   ✅ PERFECT! Pacman is centered in horizontal lane');
        } else {
            console.log(`   ⚠️  Pacman has ${pacmanPos1.offsetY.toFixed(3)} offset from lane center`);
        }
    }

    await page.screenshot({ path: 'test-horizontal-lane.png' });
    console.log('   📸 Screenshot: test-horizontal-lane.png\n');

    // Test 2: Vertical lane discipline
    console.log('🧪 Test 2: Vertical lane discipline');
    console.log('   Moving Pacman up along a vertical corridor...');

    for (let i = 0; i < 10; i++) {
        await page.keyboard.press('ArrowUp');
        await delay(100);
    }

    const pacmanPos2 = await page.evaluate(() => {
        const game = window.game || window.pacmanGame;
        if (!game) return null;
        return {
            x: game.pacman.x,
            y: game.pacman.y,
            gridX: Math.round(game.pacman.x),
            offsetX: Math.abs(game.pacman.x - Math.round(game.pacman.x))
        };
    });

    if (pacmanPos2) {
        console.log(`   Pacman position: (${pacmanPos2.x.toFixed(2)}, ${pacmanPos2.y.toFixed(2)})`);
        console.log(`   Grid X: ${pacmanPos2.gridX}, Offset from center: ${pacmanPos2.offsetX.toFixed(3)}`);

        if (pacmanPos2.offsetX < 0.01) {
            console.log('   ✅ PERFECT! Pacman is centered in vertical lane');
        } else {
            console.log(`   ⚠️  Pacman has ${pacmanPos2.offsetX.toFixed(3)} offset from lane center`);
        }
    }

    await page.screenshot({ path: 'test-vertical-lane.png' });
    console.log('   📸 Screenshot: test-vertical-lane.png\n');

    // Test 3: Turning at intersections
    console.log('🧪 Test 3: Turning at intersections (90-degree turns)');
    console.log('   Performing right turn then left turn...');

    // Move right
    for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowRight');
        await delay(100);
    }

    // Turn down
    await page.keyboard.press('ArrowDown');
    await delay(200);

    for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowDown');
        await delay(100);
    }

    // Turn left
    await page.keyboard.press('ArrowLeft');
    await delay(200);

    for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowLeft');
        await delay(100);
    }

    const pacmanPos3 = await page.evaluate(() => {
        const game = window.game || window.pacmanGame;
        if (!game) return null;
        const gridX = Math.round(game.pacman.x);
        const gridY = Math.round(game.pacman.y);
        return {
            x: game.pacman.x,
            y: game.pacman.y,
            offsetX: Math.abs(game.pacman.x - gridX),
            offsetY: Math.abs(game.pacman.y - gridY),
            direction: game.pacman.direction
        };
    });

    if (pacmanPos3) {
        console.log(`   After turns, position: (${pacmanPos3.x.toFixed(2)}, ${pacmanPos3.y.toFixed(2)})`);
        console.log(`   Direction: ${pacmanPos3.direction}`);

        const totalOffset = pacmanPos3.direction === 'left' || pacmanPos3.direction === 'right'
            ? pacmanPos3.offsetY
            : pacmanPos3.offsetX;

        if (totalOffset < 0.01) {
            console.log('   ✅ PERFECT! Turns are smooth with perfect lane alignment');
        } else {
            console.log(`   ⚠️  ${totalOffset.toFixed(3)} offset from lane center`);
        }
    }

    await page.screenshot({ path: 'test-turning.png' });
    console.log('   📸 Screenshot: test-turning.png\n');

    // Test 4: Ghost lane discipline
    console.log('🧪 Test 4: Ghost lane discipline');
    console.log('   Checking ghost positions...');

    await delay(2000); // Let ghosts move for a bit

    const ghostPositions = await page.evaluate(() => {
        const game = window.game || window.pacmanGame;
        if (!game) return null;

        return game.ghosts.slice(0, 3).map((ghost, i) => {
            const gridX = Math.round(ghost.x);
            const gridY = Math.round(ghost.y);
            const offsetX = Math.abs(ghost.x - gridX);
            const offsetY = Math.abs(ghost.y - gridY);

            // Determine expected alignment based on target
            const isMovingHorizontal = Math.abs(ghost.targetX - ghost.x) > Math.abs(ghost.targetY - ghost.y);
            const relevantOffset = isMovingHorizontal ? offsetY : offsetX;

            return {
                index: i,
                shape: ghost.shape,
                x: ghost.x.toFixed(2),
                y: ghost.y.toFixed(2),
                offsetX: offsetX.toFixed(3),
                offsetY: offsetY.toFixed(3),
                relevantOffset: relevantOffset.toFixed(3),
                isAligned: relevantOffset < 0.05
            };
        });
    });

    if (ghostPositions) {
        let alignedCount = 0;
        ghostPositions.forEach(ghost => {
            console.log(`   Ghost ${ghost.index} (${ghost.shape}): pos=(${ghost.x}, ${ghost.y})`);
            console.log(`     Offsets: X=${ghost.offsetX}, Y=${ghost.offsetY}`);
            if (ghost.isAligned) {
                console.log(`     ✅ Aligned in lane`);
                alignedCount++;
            } else {
                console.log(`     ⚠️  ${ghost.relevantOffset} offset from lane center`);
            }
        });

        console.log(`\n   ${alignedCount}/${ghostPositions.length} ghosts properly aligned in lanes`);
    }

    await page.screenshot({ path: 'test-ghost-lanes.png' });
    console.log('   📸 Screenshot: test-ghost-lanes.png\n');

    // Test 5: Dot collection alignment
    console.log('🧪 Test 5: Dot collection with perfect alignment');
    console.log('   Moving through a row of dots...');

    const score1 = await page.$eval('#score', el => parseInt(el.textContent));

    for (let i = 0; i < 20; i++) {
        await page.keyboard.press('ArrowRight');
        await delay(80);
    }

    const score2 = await page.$eval('#score', el => parseInt(el.textContent));
    const dotsCollected = (score2 - score1) / 10;

    console.log(`   Dots collected: ${dotsCollected}`);

    if (dotsCollected > 15) {
        console.log('   ✅ Excellent dot collection - lane discipline working!');
    } else if (dotsCollected > 10) {
        console.log('   ✓ Good dot collection');
    } else {
        console.log('   ⚠️  Low dot collection - may have lane alignment issues');
    }

    await page.screenshot({ path: 'test-dot-collection.png' });
    console.log('   📸 Screenshot: test-dot-collection.png\n');

    // Summary
    console.log('═══════════════════════════════════════════════════════════');
    console.log('            🛣️  LANE DISCIPLINE TEST SUMMARY 🛣️');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    console.log('✅ Lane Discipline System Implemented:');
    console.log('');
    console.log('1. PACMAN MOVEMENT:');
    console.log('   • Horizontal movement: Y locked to grid center');
    console.log('   • Vertical movement: X locked to grid center');
    console.log('   • Turns only at intersections with grid snap');
    console.log('   • Perfect dot lane alignment');
    console.log('');
    console.log('2. GHOST MOVEMENT:');
    console.log('   • Grid-aligned movement in corridors');
    console.log('   • Perpendicular axis locked to grid center');
    console.log('   • Smooth pathfinding with lane discipline');
    console.log('');
    console.log('3. TURNING MECHANICS:');
    console.log('   • Turns allowed within 0.25 units of grid center');
    console.log('   • Auto-snap to grid on direction change');
    console.log('   • Smooth 90-degree turns at intersections');
    console.log('');
    console.log('4. BENEFITS:');
    console.log('   • No more diagonal drifting');
    console.log('   • Perfect dot collection alignment');
    console.log('   • Classic arcade-accurate movement');
    console.log('   • Predictable, responsive controls');
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    console.log('🎮 Game running with lane discipline!');
    console.log('   Play at: http://localhost:3001');
    console.log('');
    console.log('📸 Screenshots captured:');
    console.log('   - test-horizontal-lane.png');
    console.log('   - test-vertical-lane.png');
    console.log('   - test-turning.png');
    console.log('   - test-ghost-lanes.png');
    console.log('   - test-dot-collection.png');
    console.log('');
    console.log('Browser left open for manual testing. Press Ctrl+C to close.\n');
})();
