import { pathsToModuleNameMapper } from 'ts-jest/utils';

import { compilerOptions } from './tsconfig.json';

export default {
  bail: true,
  clearMocks: true,
  coverageProvider: 'v8',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov'],
  collectCoverageFrom: ['<rootDir>/src/modules/**/useCases/**/*.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
};
