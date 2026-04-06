import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules/', 'coverage/'],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2021,
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'error',
      'no-undef': 'error',
      semi: ['error', 'always'],
    },
  },
  {
    files: ['server.js', 'seed.js', 'config/db.js'],
    rules: {
      'no-console': 'off',
    },
  },
];
