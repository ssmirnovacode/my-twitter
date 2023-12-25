
module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    "testEnvironment": "jsdom",
    "moduleNameMapper":{
      "\\.(css|less|scss|sass)$": "identity-obj-proxy" 
 }
  };