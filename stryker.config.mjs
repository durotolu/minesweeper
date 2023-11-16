// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  // _comment:
  //   "This config was generated using 'stryker init'. Please see the guide for more information: https://stryker-mutator.io/docs/stryker-js/guides/react",
  // testRunner: "jest",
  reporters: ['html', 'clear-text', 'progress', 'dashboard'],
  coverageAnalysis: "perTest",
  "jest": {
    "projectType": "custom",
    "configFile": "jest.config.js",
    "config": {
      "testEnvironment": "jest-environment-jsdom-sixteen"
    },
    "enableFindRelatedTests": true
  },


  packageManager: 'npm',
  thresholds: { high: 90, low: 88, break: 85 },
  mutate: [
    'src/**/*.ts?(x)',
    '!src/**/*@(.test|.spec|Spec|stories|styled).ts?(x)',
    // '!src/**/__mocks__/**/*',
  ],
  "disableTypeChecks": "app/**/*.{js,ts,jsx,tsx,html,vue}"
  // "plugins": [
  //   "@stryker-mutator/jest-runner",
  //   // "@stryker-mutator/typescript-checker"
  // ]
  // Unknown memory leak 🤷‍♀️
  // maxTestRunnerReuse: 20,
};
export default config;
// module.exports = config;
