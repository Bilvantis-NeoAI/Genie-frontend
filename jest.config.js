module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: [
    "**/test/*.steps.js"
  ],
  setupFiles: ["<rootDir>/src/setupTests.js"],
  collectCoverage: true,
  collectCoverageFrom: [
    "./src/components/*.js",
    "./src/graphs/*.js",
  ],

  coverageDirectory: "coverage",
  coverageReporters: [
    "html",
    "lcov",
    "text-summary"
  ],
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  transformIgnorePatterns: [
    "node_modules/(?!(interceptors)/)"
  ],
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/fileMock.js',
    '^redux-persist/es/storage/session$': 'redux-persist/lib/storage/session',
    '\\.css$': 'identity-obj-proxy',
    "\\.(svg|png|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$": "<rootDir>/__mocks__/fileMock.js"

  },
};
