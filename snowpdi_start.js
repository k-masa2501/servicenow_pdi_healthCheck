const puppeteer = require('puppeteer');
(async () => {

    const sleep = milliseconds =>
        new Promise(resolve =>
            setTimeout(resolve, milliseconds)
        );

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(process.env.SNOWURL);
    await sleep(3000);

    let button = await page.evaluate(() => {
        const closeModalIcon = document.querySelector("body > dps-app")
            ?.shadowRoot?.querySelector("dps-navigation-header")
            ?.shadowRoot?.querySelector("dps-login")
            ?.shadowRoot?.querySelector("dps-button")
            ?.shadowRoot?.querySelector("button")
        closeModalIcon?.click();
        return closeModalIcon
    })

    await page.waitForSelector('input#email');
    await page.type("#email", process.env.USERID);
    await page.click('button[id="username_submit_button"]');
    await page.waitForSelector('input#password');
    await page.type("#password", process.env.PASS);
    await page.click('button[id="password_submit_button"]');

    await sleep(10000);

    button = await page.evaluate(() => {
        const closeModalIcon = document.querySelector("body > dps-app")
            ?.shadowRoot?.querySelector("dps-home-auth-quebec")
            ?.shadowRoot?.querySelector("button.dps-button")
        closeModalIcon?.click();
        return closeModalIcon
    });
    console.log(button);
    await page.screenshot({ path: "result.png" })
    await browser.close();
})();