module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  "transformIgnorePatterns": [
    "node_modules/(?!(redis|@redis)/)"
  ],
  // transformIgnorePatterns: [
  //   "node_modules"
  // ]
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)?$",
};
