import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import { configs as tsConfigs } from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';
import pluginNext from '@next/eslint-plugin-next';
import globals from 'globals';
import enforceStyledPrefixRule from './eslintRules/enforceStyledPrefixRule.js';
import enforceStyledCallbackRule from './eslintRules/enforceStyledCallbackRule.js';
import noInlineSxPropRule from './eslintRules/noInlineSxPropRule.js';
import noInlineStylePropRule from './eslintRules/noInlineStylePropRule.js';

export default [
  {
    ignores: ['node_modules', '.next/**/*'],
    // optional base config
    ...js.configs.recommended,
  },

  {
    files: ['**/*.js', '**/*.mjs'],
    ignores: ['node_modules', '.next/**/*'],

    ...js.configs.recommended,

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['node_modules', '.next/**/*'],
    languageOptions: {
      // The new "languageOptions.parser" field (instead of "parser")
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      // Instead of top-level "plugins", you specify them in each config object
      '@typescript-eslint': tsPlugin,
      '@next/next': pluginNext,
      react: reactPlugin,
      prettier: prettierPlugin,
      custom: {
        rules: {
          'enforce-styled-prefix': enforceStyledPrefixRule,
          'enforce-styled-callback': enforceStyledCallbackRule,
          'no-inline-sx-prop': noInlineSxPropRule,
          'no-inline-style-prop': noInlineStylePropRule,
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      // Start with recommended rules from @typescript-eslint
      ...tsConfigs.recommended.rules,
      ...pluginNext.configs.recommended.rules,

      // React recommended (can also spread reactPlugin.configs.recommended if you want)
      ...reactPlugin.configs.recommended.rules,

      // Prettier config turns off rules that conflict with Prettier
      ...configPrettier.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'max-lines': ['error', { max: 200, skipBlankLines: true, skipComments: true }],

      'custom/enforce-styled-prefix': 'error',
      'custom/enforce-styled-callback': 'error',
      'custom/no-inline-sx-prop': 'error',
      'custom/no-inline-style-prop': 'error',
    },
  },
];
