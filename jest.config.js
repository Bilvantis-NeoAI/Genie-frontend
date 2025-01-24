module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testMatch: [
      "**/test/*.steps.js"
    ],
    collectCoverage: true,
    collectCoverageFrom: [
      "./src/components/*.js",
    //   "!**/node_modules/**"
    ],
    coverageDirectory: "coverage",
    coverageReporters: [
      "html",
      "lcov",
      "text-summary"
    ],
    transform: {
      "^.+\\.jsx?$": "babel-jest" // Use babel-jest for all js and jsx files
    },
    transformIgnorePatterns: [
      "node_modules/(?!(interceptors)/)" // Ensure axios gets transformed
    ],
    moduleFileExtensions: ["js", "jsx", "json", "node"],
    moduleNameMapper: {
      // Mock redux-persist storage for tests
      '^redux-persist/es/storage/session$': 'redux-persist/lib/storage/session',
    },
  };
  