module.exports = {
  globals: {
    window: true,
    localStorage: true
  },
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'client/actions/**/*.js',
    '!client/components/**/*.jsx',
    'client/reducers/**/*.js',
    '!client/reducers/index.js'
  ],
  setupFiles: [
    'jest-localstorage-mock'
  ]
};
