const { Puppeteer, Page } = require("puppeteer");
const url = 'https://web.dev.klaytn.tachi.soramitsu.co.jp/'
const url2 = 'https://klaytn-dex-frontend-xjn80ktu3-0x009922.vercel.app'
const password = 'Qq12345^'

Feature('Klaytn').retry(2);

Before(({ I }) => { 
    I.clearCookie();
  });

Scenario('not auth test', ({ I }) => {
    I.amOnPage(url)
    I.switchToNextTab();
    I.closeCurrentTab()
    I.click("Earn")
    I.see('Connect kaikas first');

});

Scenario('Add liquidity test', async ({ I }) => {
    I.auth(url, password)
    I.click("Liquidity")
    I.seeInCurrentUrl('/liquidity');
    I.click('//span[text()=" Add Liquidity "]')
    I.wait(2)
    I.seeInCurrentUrl('/add');

    I.click('(//button[@data-testid="token-select"])[1]')
    I.wait(2)
    I.fillField('//input[@data-testid="modal-search"]', 'kla')
    I.click('//div[@data-testid="modal-list-item"]')
    I.wait(2)

    I.refreshPage();
    I.wait(2)
    I.click('//button/span[text()=" Select Token "]')
    I.waitForText('Select a token', 5)
    I.fillField('//input[@data-testid="modal-search"]', 'ven')
    I.click('//div[@data-testid="modal-list-item"]')

    I.wait(2)
    I.fillField('(//div/input)[1]', '1');
    I.wait(5)

    let first_balance = await I.grabTextFrom('(//button[@data-testid="token-select"]/parent::div/following-sibling::div)[1]');
    let second_balance = await I.grabTextFrom('(//button[@data-testid="token-select"]/parent::div/following-sibling::div)[2]');
    let b1 = first_balance.match(/\d+(?:\.\d+)?/g).map(x => Number(x));
    let b2 = second_balance.match(/\d+(?:\.\d+)?/g).map(x => Number(x));
    console.log(b1, b2);

    I.wait(2)
    I.see('Supply')
    I.forceClick('//button/span[text()=" Supply "]')
    I.wait(3)

    tryTo(() => I.acceptNotification())
    I.wait(2)

    tryTo(() => I.acceptNotification())
    I.wait(2)

    I.see('Confirm Supply')
    I.wait(3)
    I.forceClick('//div[@role="dialog"]//button/span[text()=" Confirm Supply "]')
    I.wait(3)
    I.acceptLastNotification()

    I.see("Success")
    I.wait(1)

});

Scenario('Remove liquidity test', async ({ I }) => {
    I.auth(url, password)
    I.click("Liquidity")
    I.wait(2)
    I.seeInCurrentUrl('/liquidity');
    I.click('//div/span[text()="VEN-WKLAY"]')
    I.click('//button/span[text()=" Remove "]')
    I.wait(2)
    I.see('Remove VEN-KLAY liquidity')
    I.click('//button/span[text()="10%"]')
    I.wait(2)
    I.click('//button/span[text()=" Remove "]')

    I.wait(3)
    tryTo(() => I.acceptNotification())
    I.wait(2)
    tryTo(() => I.acceptNotification())
    I.wait(2)
   
    I.see('Confirm Remove')
    I.click('//button/span[text()=" Confirm Remove "]')
    I.wait(3)
    I.acceptLastNotification()
    // I.see("Transaction Submitted")
    // I.click('Close')
    I.wait(2)
    I.see('Your liquidity')

});

Scenario('Swap [KLAY-NEP] test', ({ I }) => {
    I.auth(url, password)
    I.swap('kla','nep')
});

Scenario('Swap [NEP-KLAY] test', ({ I }) => {
    I.auth(url, password)
    I.swap('nep','kla')
});

Scenario('Swap [EA-ARS] test', ({ I }) => {
    I.auth(url, password)
    I.swap('ear','ars')
});

Scenario('Swap [ARS-EA] test', ({ I }) => {
    I.auth(url, password)
    I.swap('ars','ear')
});


Scenario('Swap [KLAY-NEP][bottom] test', ({ I }) => {
    I.auth(url, password)
    I.swap_bottom('kla','nep')
});

Scenario('Swap [NEP-KLAY][bottom] test', ({ I }) => {
    I.auth(url, password)
    I.swap_bottom('nep','kla')
});

Scenario('Swap [EA-ARS][bottom] test', ({ I }) => {
    I.auth(url, password)
    I.swap_bottom('ear','ars')
});

Scenario('Swap [ARS-EA][bottom] test', ({ I }) => {
    I.auth(url, password)
    I.swap_bottom('ars','ear')
});

