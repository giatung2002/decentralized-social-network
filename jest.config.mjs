export default {
    preset: 'ts-jest/presets/js-with-ts-esm',
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { useESM: true }],
    },
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    testEnvironment: 'jest-environment-jsdom',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    reporters: [
        'default',
        [
            'jest-html-reporter',
            {
                pageTitle: 'Test Report',
                outputPath: './test-report.html',
                includeFailureMsg: true,
                includeConsoleLog: true,
            },
        ],
    ],
};
