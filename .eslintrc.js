module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        jest: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        "plugin:prettier/recommended",
        "plugin:jest/recommended",
        "prettier",
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
            },
        ecmaVersion: 'latest',
        sourceType: "script"
    },
    plugins: ['react-refresh', '@typescript-eslint', 'react-hooks', 'jest'],
    rules: {
        'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
        ],
        'prettier/prettier': [
        'error',
        {
            endOfLine: 'auto',
        },
        ],
        'react-hooks/rules-of-hooks': 'error',
        'comma-dangle': ['error', 'only-multiline'],
        '@typescript-eslint/ban-ts-comment': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': 'off',
        'react-refresh/only-export-components': 'off',
    },
}
