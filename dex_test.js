const { Puppeteer, Page } = require("puppeteer");
const url = 'https://klaytn-frontend.dev.klaytn.tachi.soramitsu.co.jp/'
const url2 = 'https://klaytn-dex-frontend.vercel.app/'
const password = 'Qq12345^'

Feature('Klaytn').retry(2);

Scenario('not auth test', ({ I }) => {
    I.amOnPage(url)
    I.switchToNextTab();
    I.closeCurrentTab()
    I.click("Assets")
    I.see('Connect Wallet');

});

Scenario('Add liquidity [KLAY-VEN] test', async ({ I }) => {
    I.auth(url, password)
    I.addLiquidity('kla', 'ven')

});

Scenario('Remove liquidity [VEN-WKLAY] test', async ({ I }) => {
    I.auth(url, password)
    I.removeLiquidity()

});

Scenario('Swap [KLAY-NEP] test', ({ I }) => {
    I.auth(url, password)
    I.swap('kla','nep')
});

Scenario('Swap [NEP-KLAY] test', ({ I }) => {
    I.auth(url, password)
    I.swap('nep','kla')
});

Scenario('Swap [EA-MER] test', ({ I }) => {
    I.auth(url, password)
    I.swap('ear','mer')
});

Scenario('Swap [MER-EA] test', ({ I }) => {
    I.auth(url, password)
    I.swap('mer','ear')
});


Scenario('Swap [KLAY-NEP][bottom] test', ({ I }) => {
    I.auth(url, password)
    I.swap_bottom('kla','nep')
});

Scenario('Swap [NEP-KLAY][bottom] test', ({ I }) => {
    I.auth(url, password)
    I.swap_bottom('nep','kla')
});

Scenario('Swap [EA-MER][bottom] test', ({ I }) => {
    I.auth(url, password)
    I.swap_bottom('ear','mer')
});

Scenario('Swap [MER-EA][bottom] test', ({ I }) => {
    I.auth(url, password)
    I.swap_bottom('mer','ear')
});

