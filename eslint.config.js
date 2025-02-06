import globals from 'globals'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import { fixupPluginRules } from '@eslint/compat'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
  {
    ignores: ['node_modules', 'build', '.mf', '.wrangler', '.react-router'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.es2015,
      },
    },
  },
  //react
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react: pluginReact,
      'jsx-a11y': pluginJsxA11y,
      'react-hooks': fixupPluginRules(pluginReactHooks),
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs['jsx-runtime'].rules,
      ...pluginJsxA11y.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
    },
    settings: {
      react: {
        version: 'detect',
      },
      formComponents: ['Form'],
      linkComponents: [
        { name: 'Link', linkAttribute: 'to' },
        { name: 'NavLink', linkAttribute: 'to' },
      ],
    },
  },
  {
    files: ['eslint.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  eslintConfigPrettier,
  // custom rules
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
)
