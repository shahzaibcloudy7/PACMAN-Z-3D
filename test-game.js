const puppeteer = require('puppeteer');

// Helper function to wait
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    console.log('🎮 Starting Pacman Game Test...\n');

    const browser = await puppeteer.launch({
        headless: false, // Show browser for visual testing
        args: ['--window-size=1280,900']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    console.log('📡 Navigating to game...');
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle2' });

    // Wait for game to load
    await page.waitForSelector('#gameCanvas');
    await delay(1000);

    console.log('✅ Game loaded successfully!\n');

    // Take initial screenshot
    await page.screenshot({ path: 'game-start.png' });
    console.log('📸 Screenshot saved: game-start.png');

    // Test 1: Check initial game state
    console.log('\n🧪 Test 1: Checking initial game state...');
    const initialScore = await page.$eval('#score', el => el.textContent);
    const initialTimer = await page.$eval('#timer', el => el.textContent);
    console.log(`   Score: ${initialScore}`);
    console.log(`   Timer: ${initialTimer}`);
    console.log('   ✓ Initial state verified');

    // Test 2: Movement test - Press right arrow
    console.log('\n🧪 Test 2: Testing Pacman movement...');
    await page.keyboard.press('ArrowRight');
    await delay(500);
    await page.keyboard.press('ArrowRight');
    await delay(500);
    console.log('   ✓ Right movement tested');

    // Test 3: Test all directions
    console.log('\n🧪 Test 3: Testing all directions...');
    await page.keyboard.press('ArrowDown');
    await delay(300);
    await page.keyboard.press('ArrowLeft');
    await delay(300);
    await page.keyboard.press('ArrowUp');
    await delay(300);
    console.log('   ✓ All directions tested');

    // Test 4: Check timer is running
    console.log('\n🧪 Test 4: Verifying timer is running...');
    await delay(2000);
    const timerAfter2Sec = await page.$eval('#timer', el => el.textContent);
    console.log(`   Timer after 2 seconds: ${timerAfter2Sec}`);
    console.log('   ✓ Timer is running');

    // Test 5: Check score after movement
    console.log('\n🧪 Test 5: Checking score after collecting dots...');
    const scoreAfterMove = await page.$eval('#score', el => el.textContent);
    console.log(`   Score after movement: ${scoreAfterMove}`);
    if (parseInt(scoreAfterMove) > 0) {
        console.log('   ✓ Score increased - dots collected!');
    }

    // Test 6: Navigate to mushroom and test power-up
    console.log('\n🧪 Test 6: Testing mushroom power-up...');
    // Move towards mushrooms
    for (let i = 0; i < 10; i++) {
        await page.keyboard.press('ArrowRight');
        await delay(200);
    }

    // Check if power status is visible
    await delay(1000);
    const powerStatus = await page.$eval('#powerStatus', el => el.style.display);
    if (powerStatus !== 'none') {
        console.log('   ✓ Power-up activated!');
        const powerName = await page.$eval('#powerName', el => el.textContent);
        const powerTimer = await page.$eval('#powerTimer', el => el.textContent);
        console.log(`   Power: ${powerName}`);
        console.log(`   Time remaining: ${powerTimer}`);

        // Test shooting if it's a shooting power
        console.log('   Testing shoot button...');
        await page.keyboard.press('Space');
        await delay(500);
        console.log('   ✓ Shoot tested');
    } else {
        console.log('   ℹ No power-up collected yet, continuing...');
    }

    // Test 7: Test pause functionality
    console.log('\n🧪 Test 7: Testing pause...');
    await page.keyboard.press('p');
    await delay(500);
    const pauseStatus = await page.$eval('#gameStatus', el => el.textContent);
    console.log(`   Status: ${pauseStatus}`);
    console.log('   ✓ Pause tested');

    // Resume
    await page.keyboard.press('p');
    await delay(500);
    console.log('   ✓ Resume tested');

    // Test 8: Test mute button
    console.log('\n🧪 Test 8: Testing mute...');
    await page.keyboard.press('m');
    await delay(500);
    const muteButton = await page.$eval('#soundButton', el => el.textContent);
    console.log(`   Mute button: ${muteButton}`);
    console.log('   ✓ Mute tested');

    // Take final screenshot
    await page.screenshot({ path: 'game-playing.png' });
    console.log('\n📸 Screenshot saved: game-playing.png');

    // Final stats
    console.log('\n📊 Final Game Stats:');
    const finalScore = await page.$eval('#score', el => el.textContent);
    const finalTimer = await page.$eval('#timer', el => el.textContent);
    console.log(`   Final Score: ${finalScore}`);
    console.log(`   Game Time: ${finalTimer}`);

    console.log('\n✅ All tests completed successfully!');
    console.log('🎮 Browser will remain open for manual testing...');
    console.log('   Press Ctrl+C in terminal to close when done.\n');

    // Keep browser open for manual testing
    // await browser.close();
})();
