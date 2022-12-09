const pathToExtension = require('path').join(__dirname, 'extension_path');
exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: '',
      restart: true,
      show: false,
      keepBrowserState: false,
      keepCookies: false,
      windowSize: '1600x900',
      chrome: {
        userDataDir: 'tmp/puppeteer-tmp',
        args: [`--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
        '--no-sandbox', '--disable-setuid-sandbox'
        ]
      }
    }
  },
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'klaytn_test',
  plugins: {
    allure: {},
    tryTo: {
      enabled: true
    }
  }
}