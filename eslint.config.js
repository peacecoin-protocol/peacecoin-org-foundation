import globals from 'globals'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
  {
    ignores: ['node_modules', 'build', '.mf', '.wrangler', '.react-router'],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2025,
      },
    },
  },
  // React
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ...pluginReact.configs.flat.recommended,
    ...pluginReact.configs.flat['jsx-runtime'],
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
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
  // React Hooks
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    rules: pluginReactHooks.configs.recommended.rules,
  },
  // JSX Accessibility
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ...pluginJsxA11y.flatConfigs.recommended,
  },
  // Node.js config files
  {
    files: ['eslint.config.js', 'vite.config.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  // Prettier (must be last)
  eslintConfigPrettier,
  // Custom rules
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'react-hooks/refs': 'warn',
    },
  },
)
