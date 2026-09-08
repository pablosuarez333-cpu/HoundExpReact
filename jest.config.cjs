module.exports = {
  preset: "ts-jest",

  testEnvironment:
    "jsdom",

  setupFilesAfterEnv: [
    "<rootDir>/src/test/setupTests.ts",
  ],

  testMatch: [
    "<rootDir>/src/test/**/*.test.ts",
    "<rootDir>/src/test/**/*.test.tsx",
  ],

  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
  ],

  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          target:
            "ES2022",

          module:
            "CommonJS",

          moduleResolution:
            "Node",

          jsx:
            "react-jsx",

          esModuleInterop:
            true,

          allowSyntheticDefaultImports:
            true,

          strict:
            true,

          skipLibCheck:
            true,
        },
      },
    ],
  },

  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",

    "!src/main.tsx",

    "!src/**/*.d.ts",

    "!src/test/**",
  ],
};