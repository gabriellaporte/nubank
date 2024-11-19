/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.spec.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/app/**/*.{ts,js}', '!src/app/**/*.d.ts'],
};
