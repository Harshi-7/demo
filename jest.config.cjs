module.exports = {
  testEnvironment: 'jsdom',

  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],

  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest'
  },

  testMatch: ['**/src/tests/**/*.spec.(ts|js)'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  testPathIgnorePatterns: ['/node_modules/', '/dist/']
}
