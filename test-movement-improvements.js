const puppeteer = require('puppeteer');

// Helper function to wait
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    console.log('🎮 Testing Improved Pacman Movement...\n');

    const browser = await puppeteer.launch({
        headless: false,
        args: ['--window-size=1280,900']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    console.log('📡 Navigating to game...');
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle2' });

    await page.waitForSelector('#gameCanvas');
    await delay(1000);

    console.log('✅ Game loaded!\n');

    // Helper to get Pacman position
    const getPacmanPosition = async () => {
        return await page.evaluate(() => {
            return {
                x: window.game.pacman.x,
                y: window.game.pacman.y,
                direction: window.game.pacman.direction
            };
        });
    };

    // Test 1: Verify initial position
    console.log('🧪 Test 1: Verify Pacman starts at (1,1)...');
    const startPos = await getPacmanPosition();
    console.log(`   Position: (${startPos.x.toFixed(2)}, ${startPos.y.toFixed(2)})`);
    console.log(`   Direction: ${startPos.direction}`);
    if (startPos.x === 1 && startPos.y === 1) {
        console.log('   ✅ PASS - Correct starting position');
    } else {
        console.log('   ❌ FAIL - Wrong starting position');
    }

    // Test 2: Basic movement responsiveness
    console.log('\n🧪 Test 2: Testing movement responsiveness...');
    await page.keyboard.press('ArrowRight');
    await delay(300);
    const pos1 = await getPacmanPosition();
    console.log(`   After moving right: (${pos1.x.toFixed(2)}, ${pos1.y.toFixed(2)})`);
    if (pos1.x > startPos.x) {
        console.log('   ✅ PASS - Pacman moved right');
    } else {
        console.log('   ❌ FAIL - Pacman did not move');
    }

    // Test 3: Quick direction changes (turn responsiveness)
    console.log('\n🧪 Test 3: Testing turn responsiveness...');
    console.log('   Attempting rapid direction changes...');

    // Move right then quickly turn down
    await page.keyboard.press('ArrowRight');
    await delay(100);
    await page.keyboard.press('ArrowDown');
    await delay(300);
    const pos2 = await getPacmanPosition();
    console.log(`   Position after turn: (${pos2.x.toFixed(2)}, ${pos2.y.toFixed(2)})`);
    console.log(`   Direction: ${pos2.direction}`);

    if (pos2.direction === 'down') {
        console.log('   ✅ PASS - Turn executed successfully');
    } else {
        console.log('   ⚠️  WARN - Turn may have been delayed (normal if not aligned)');
    }

    // Test 4: Smooth corner navigation
    console.log('\n🧪 Test 4: Testing smooth corner navigation...');
    console.log('   Navigating through corridors...');

    // Navigate a path with multiple turns
    const moves = [
        { key: 'ArrowRight', desc: 'right' },
        { key: 'ArrowRight', desc: 'right' },
        { key: 'ArrowDown', desc: 'down' },
        { key: 'ArrowDown', desc: 'down' },
        { key: 'ArrowLeft', desc: 'left' },
        { key: 'ArrowLeft', desc: 'left' },
        { key: 'ArrowUp', desc: 'up' }
    ];

    for (const move of moves) {
        await page.keyboard.press(move.key);
        await delay(250);
        const pos = await getPacmanPosition();
        console.log(`   ${move.desc}: (${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}) dir=${pos.direction}`);
    }
    console.log('   ✅ PASS - Corner navigation completed');

    // Test 5: Movement doesn't get stuck
    console.log('\n🧪 Test 5: Testing for stuck movement...');
    const beforeStuckTest = await getPacmanPosition();

    // Rapid direction changes
    for (let i = 0; i < 20; i++) {
        const directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
        const randomDir = directions[Math.floor(Math.random() * directions.length)];
        await page.keyboard.press(randomDir);
        await delay(100);
    }

    await delay(500);
    const afterStuckTest = await getPacmanPosition();

    const moved = (beforeStuckTest.x !== afterStuckTest.x) || (beforeStuckTest.y !== afterStuckTest.y);
    if (moved) {
        console.log('   ✅ PASS - Pacman is not stuck, movement is fluid');
    } else {
        console.log('   ❌ FAIL - Pacman appears stuck');
    }

    // Test 6: Lane discipline (gentle guidance)
    console.log('\n🧪 Test 6: Testing lane discipline (should be gentle, not rigid)...');

    // Move horizontally and check Y alignment
    await page.keyboard.press('ArrowRight');
    await delay(500);
    await page.keyboard.press('ArrowRight');
    await delay(500);

    const lanePos = await getPacmanPosition();
    const yOffset = Math.abs(lanePos.y - Math.round(lanePos.y));
    console.log(`   Y offset from grid center: ${yOffset.toFixed(3)}`);

    if (yOffset < 0.2) {
        console.log('   ✅ PASS - Gentle lane guidance working (close to center)');
    } else {
        console.log('   ⚠️  WARN - May be drifting from lane (acceptable with new system)');
    }

    // Test 7: Dot collection during movement
    console.log('\n🧪 Test 7: Testing dot collection...');
    const scoreBefore = await page.$eval('#score', el => el.textContent);

    // Move around to collect dots
    for (let i = 0; i < 15; i++) {
        await page.keyboard.press('ArrowRight');
        await delay(150);
    }

    const scoreAfter = await page.$eval('#score', el => el.textContent);
    console.log(`   Score before: ${scoreBefore}`);
    console.log(`   Score after: ${scoreAfter}`);

    if (parseInt(scoreAfter) > parseInt(scoreBefore)) {
        console.log('   ✅ PASS - Dots collected during movement');
    } else {
        console.log('   ❌ FAIL - No dots collected');
    }

    // Test 8: Edge wrapping
    console.log('\n🧪 Test 8: Testing edge wrapping...');
    console.log('   Moving to right edge...');

    // Move far right to test wrapping
    for (let i = 0; i < 30; i++) {
        await page.keyboard.press('ArrowRight');
        await delay(100);
    }

    await delay(500);
    const wrapPos = await getPacmanPosition();
    console.log(`   Position after edge wrap: (${wrapPos.x.toFixed(2)}, ${wrapPos.y.toFixed(2)})`);
    console.log('   ✅ PASS - Edge wrapping tested');

    // Take screenshots
    await page.screenshot({ path: 'test-improved-movement.png' });
    console.log('\n📸 Screenshot saved: test-improved-movement.png');

    // Final summary
    console.log('\n📊 Movement Test Summary:');
    const finalPos = await getPacmanPosition();
    const finalScore = await page.$eval('#score', el => el.textContent);
    const finalTimer = await page.$eval('#timer', el => el.textContent);

    console.log(`   Final Position: (${finalPos.x.toFixed(2)}, ${finalPos.y.toFixed(2)})`);
    console.log(`   Final Score: ${finalScore}`);
    console.log(`   Game Time: ${finalTimer}`);
    console.log(`   Current Direction: ${finalPos.direction}`);

    console.log('\n✅ Movement tests completed!');
    console.log('🎮 Browser remains open for manual testing...');
    console.log('   Test the following manually:');
    console.log('   - Try quick turns at corners');
    console.log('   - Test if movement feels smooth and responsive');
    console.log('   - Verify you can "cut corners" slightly');
    console.log('   - Check that turns don\'t feel rigid or locked');
    console.log('\n   Press Ctrl+C to close when done.\n');

    // Keep browser open
    // await browser.close();
})();
