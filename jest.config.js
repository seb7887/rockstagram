module.exports = {
  ...require('./test/jest.common'),
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/styles/**',
    '!**/data/**',
    '!**/__tests__/**',
    '!**/__server_tests__/**',
    '!**/node_modules/**'
  ],
  projects: [
    './test/jest.client.js',
    './test/jest.server.js'
  ]
};
