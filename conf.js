exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  capabilities: {
    'browserName': 'chrome'
  },

  specs: ['./test/test.js'],

  jasmineNodeOpts: {
    showColors: true
  },
  chromeOnly: true,
  directConnect: true,
};