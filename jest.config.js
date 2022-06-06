const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "@styles(.*)$": "<rootDir>/styles$1",
    "@components(.*)$": "<rootDir>/components$1",
    "@common(.*)$": "<rootDir>/common$1",
    "@pages(.*)$": "<rootDir>/pages$1",
    "@service(.*)$": "<rootDir>/service$1",
  },
  testEnvironment: "jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
