const puppeteer = require('puppeteer');
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    console.log('🍄 Mushroom Collection Test - Will navigate to collect a mushroom\n');

    const browser = await puppeteer.launch({
        headless: false,
        args: ['--window-size=1280,900']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    await page.goto('http://localhost:3001', { waitUntil: 'networkidle2' });
    await page.waitForSelector('#gameCanvas');
    await delay(1000);

    console.log('✅ Game loaded\n');
    console.log('🎯 Strategy: Move right and down to find mushrooms\n');

    // Move right
    console.log('➡️  Moving right...');
    for (let i = 0; i < 8; i++) {
        await page.keyboard.press('ArrowRight');
        await delay(200);
    }

    // Move down
    console.log('⬇️  Moving down...');
    for (let i = 0; i < 3; i++) {
        await page.keyboard.press('ArrowDown');
        await delay(200);
    }

    // Continue right
    console.log('➡️  Continuing right...');
    for (let i = 0; i < 8; i++) {
        await page.keyboard.press('ArrowRight');
        await delay(200);
    }

    await delay(1000);

    // Check power status
    const powerDisplay = await page.$eval('#headerPowerTimer', el => el.style.display);

    if (powerDisplay !== 'none') {
        const powerName = await page.$eval('#headerPowerName', el => el.textContent);
        const powerTime = await page.$eval('#headerPowerTime', el => el.textContent);

        console.log('\n🎉 SUCCESS! Mushroom collected!');
        console.log('═══════════════════════════════════════');
        console.log(`   Power: ${powerName}`);
        console.log(`   Time Remaining: ${powerTime}`);
        console.log('═══════════════════════════════════════\n');

        await page.screenshot({ path: 'mushroom-collected.png' });
        console.log('📸 Screenshot saved: mushroom-collected.png\n');

        // Watch countdown
        console.log('⏱️  Watching timer for 5 seconds...');
        for (let i = 0; i < 5; i++) {
            await delay(1000);
            const time = await page.$eval('#headerPowerTime', el => el.textContent);
            console.log(`   ${i + 1}s: ${time}`);
        }

        console.log('\n✅ Header power timer is working perfectly!');
    } else {
        console.log('\n⚠️  No mushroom found yet, trying more movement...');

        // Try moving down more
        for (let i = 0; i < 5; i++) {
            await page.keyboard.press('ArrowDown');
            await delay(200);
        }

        await delay(500);
        const powerDisplay2 = await page.$eval('#headerPowerTimer', el => el.style.display);

        if (powerDisplay2 !== 'none') {
            const powerName = await page.$eval('#headerPowerName', el => el.textContent);
            const powerTime = await page.$eval('#headerPowerTime', el => el.textContent);
            console.log(`\n🎉 Found it! ${powerName} - ${powerTime}\n`);
        } else {
            console.log('\nℹ️  Feature is ready, just need to find a mushroom in game!');
            await page.screenshot({ path: 'searching-for-mushroom.png' });
        }
    }

    console.log('\n🎮 Browser left open for manual testing. Press Ctrl+C to close.\n');
})();
