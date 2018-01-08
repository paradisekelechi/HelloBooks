module.exports = {
  globals: {
    window: true,
    localStorage: true
  },
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'client/actions/**/*.js',
  ],
  setupFiles: ['jest-localstorage-mock']
};
