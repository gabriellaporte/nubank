/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node', // Define o ambiente para Node.js
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Para alias de paths no TypeScript
  },
  transform: {
    '^.+\\.ts$': 'ts-jest', // Transforma arquivos TypeScript
  },
  testMatch: ['**/__tests__/**/*.spec.ts'], // Define onde buscar os testes
  collectCoverage: true, // Habilita coleta de cobertura
  collectCoverageFrom: ['src/**/*.{ts,js}', '!src/**/*.d.ts'], // Define arquivos para cobertura
};
