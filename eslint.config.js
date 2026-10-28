import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import prettierPlugin from 'eslint-plugin-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'node_modules', 'coverage', 'test-results', 'playwright-report', 'bundle-analysis', '*.config.ts', '*.config.js', 'vite.config.js', 'vitest.config.ts', 'playwright.config.ts']),
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: '19',
      },
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json', './tsconfig.node.json'],
        },
        node: {
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      'unused-imports': unusedImports,
      prettier: prettierPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...reactRefresh.configs.vite.rules,
      'prettier/prettier': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^[A-Z_]',
          argsIgnorePattern: '^_',
        },
      ],
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            { pattern: '@/**', group: 'internal', position: 'after' },
            { pattern: '@components/**', group: 'internal', position: 'after' },
            { pattern: '@pages/**', group: 'internal', position: 'after' },
            { pattern: '@context/**', group: 'internal', position: 'after' },
            { pattern: '@hooks/**', group: 'internal', position: 'after' },
            { pattern: '@utils/**', group: 'internal', position: 'after' },
            { pattern: '@types/**', group: 'internal', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^[A-Z_]',
        },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}', 'src/test/**'],
    rules: {
      'prettier/prettier': 'off',
    },
  },
  {
    files: ['e2e/**'],
    rules: {
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
]);