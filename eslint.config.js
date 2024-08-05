const eslintPluginImport = require('eslint-plugin-import')
const eslintPluginNode = require('eslint-plugin-node')
const eslintPluginPromise = require('eslint-plugin-promise')
const typescriptEslintParser = require('@typescript-eslint/parser')
const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin')

module.exports = {
  languageOptions: {
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly'
    },
    parser: typescriptEslintParser,
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module'
    }
  },
  plugins: {
    '@typescript-eslint': typescriptEslintPlugin,
    import: eslintPluginImport,
    node: eslintPluginNode,
    promise: eslintPluginPromise
  },
  rules: {
    'comma-dangle': 1,
    'consistent-return': 'warn',
    'consistent-this': 'warn',
    'import/default': 2,
    'import/export': 2,
    'import/named': 2,
    'import/namespace': 2,
    'import/no-extraneous-dependencies': 'error',
    'import/no-unresolved': 'error',
    'indent': ['warn', 2],
    'node/no-extraneous-import': 'off',
    'node/no-extraneous-require': 'off',
    'node/no-missing-import': 'off',
    'node/no-missing-require': 'off',
    'no-extra-semi': 1,
    'no-use-before-define': 1,
    'quotes': ['warn', 'single'],
    'semi': ['error', 'never'],
    'sort-imports': ['error']
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  ignores: [
    '**/node_modules/**',
    '**/dist/**'
  ]
}
