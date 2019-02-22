module.exports = {
  ...require('./jest.common'),
  displayName: 'client',
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/server/'],
  testMatch: ['**/__tests__/**/*.js'],
  setupFilesAfterEnv: [require.resolve('./setup-tests.js')]
};
