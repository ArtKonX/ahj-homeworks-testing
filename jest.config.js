module.exports = {
    testMatch: ['**/__tests__/**/*.test.js', '**/__e2e__/**/*.test.js'],

    coverageDirectory: './coverage',

    collectCoverageFrom: [
        'src/js/**/*.js',

        '!**/__tests__/**',

        '!**/__e2e__/**',

        '!**/node_modules/**',
    ],
};


/** @type {import('jest').Config} */