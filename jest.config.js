module.exports = {
  ...require('./test/jest.common'),
  modulePaths: ['<rootDir>'],
  collectCoverageFrom: [
    '**/src/**/*.js',
    '**/server/**/*.js',
    '!**/server/index.js',
    '!**/server/config/*.js',
    '!**/styles/**',
    '!**/data/**',
    '!**/__tests__/**',
    '!**/__server_tests__/**',
    '!**/node_modules/**',
  ],
  projects: ['./test/jest.client.js', './test/jest.server.js'],
};
