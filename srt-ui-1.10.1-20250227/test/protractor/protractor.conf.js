// protractor.conf.js

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['**/*spec.js', '*spec.js'],
  multiCapabilities: [
    {
      browserName: 'firefox',
      'moz:firefoxOptions': {
        args: [ '--headless' ]
      },
      shardTestFiles: true,
      maxInstances: 2
    },
    // {
    //   browserName: 'chrome',
    //   chromeOptions: {
    //     args: ["--headless", "--disable-gpu", "--window-size=800,600"]
    //   },
    //   shardTestFiles: true,
    //   maxInstances: 2
    // }
  ],


  onPrepare: function () {
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
  }
}

// // Protractor configuration file, see link for more information
// // https://github.com/angular/protractor/blob/master/lib/config.ts
//
// const { SpecReporter } = require('jasmine-spec-reporter');
//
// exports.config = {
//   allScriptsTimeout: 11000,
//   specs: [
//     './e2e/**/*.e2e-spec.ts'
//   ],
//   capabilities: {
//     'browserName': 'chrome'
//   },
//   directConnect: true,
//   baseUrl: 'http://localhost:4200/',
//   framework: 'jasmine',
//   jasmineNodeOpts: {
//     showColors: true,
//     defaultTimeoutInterval: 30000,
//     print: function() {}
//   },
//   beforeLaunch: function() {
//     require('ts-node').register({
//       project: 'e2e/tsconfig.e2e.json'
//     });
//   },
//   onPrepare() {
//     jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
//   }
// };
