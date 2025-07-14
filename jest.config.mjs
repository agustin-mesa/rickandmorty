import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
	dir: './'
});

const customJestConfig = {
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1'
	},
	testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
	coverageDirectory: 'coverage',
	collectCoverageFrom: [
		'src/**/*.{ts,tsx}',
		'!src/**/*.d.ts',
		'!src/**/*.config.{ts,js}',
		'!src/app/layout.tsx',
		'!src/app/globals.css'
	],
	coverageReporters: ['text', 'lcov', 'html'],
	testMatch: [
		'<rootDir>/src/**/__tests__/**/*.{ts,tsx}',
		'<rootDir>/src/**/*.{test,spec}.{ts,tsx}'
	],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	testTimeout: 10000
};

export default createJestConfig(customJestConfig);
