import { Config } from '@jest/types'
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: false,
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/src/tests',
    '<rootDir>/src/config'
  ],
  clearMocks: true,
  coverageProvider: 'v8',
  coverageReporters: ['lcov'],
  detectOpenHandles: true,
  forceExit: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['node_modules'],
  modulePathIgnorePatterns: ['<rootDir>/node_modules'],
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  setupFiles: ['<rootDir>/src/tests/jest-setup.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
}

export default config
