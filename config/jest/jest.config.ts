import type { Config } from '@jest/types';

const jestConfig: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'jest-css-modules-transform',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.tsx', '!src/types/*.ts'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  setupFilesAfterEnv: ['<rootDir>/config/jest/jest.setup.ts'],
  clearMocks: true,
  transformIgnorePatterns: ['node_modules/(?!(react-bootstrap)/)'],
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  moduleDirectories: ['node_modules'],
  testMatch: ['<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)'],
  rootDir: '../../',
};

export default jestConfig;
