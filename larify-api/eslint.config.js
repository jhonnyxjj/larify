import pluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import pluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.ts'],
    ignores: ['build/**'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': pluginTs,
      prettier: pluginPrettier,
    },
    rules: {
      ...pluginTs.configs.recommended.rules,
      ...pluginPrettier.configs.recommended.rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
        },
      ],
    },
  },
];
