const path = require('path');

module.exports = {
  rootDir: path.join(__dirname, '..'),
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    'jest-watch-select-projects'
  ]
};
