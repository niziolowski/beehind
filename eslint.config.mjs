import tseslint from '@electron-toolkit/eslint-config-ts'
import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh'

export default tseslint.config(
  { ignores: ['**/node_modules', '**/dist', '**/out'] },
  // DEFAULT
  // tseslint.configs.recommended,
  // eslintPluginReact.configs.flat.recommended,
  // eslintPluginReact.configs.flat['jsx-runtime'],
  {
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    env: {
      browser: true,
      es2022: true,
      node: true
    },
    parser: '@typescript-eslint/parser',
    files: ['**/*.{ts,tsx}'],
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      }
    },
    plugins: {
      'react-hooks': eslintPluginReactHooks,
      'react-refresh': eslintPluginReactRefresh
    },
    rules: {
      // DEFAULT
      // ...eslintPluginReactHooks.configs.recommended.rules,
      // ...eslintPluginReactRefresh.configs.vite.rules
      // END DEFAULT

      // Only catch syntax errors and critical bugs - nothing else!
      'no-undef': 'error', // Using undefined variables
      'no-unreachable': 'error', // Code after return statements
      'no-dupe-keys': 'error', // Duplicate object keys
      'no-duplicate-case': 'error', // Duplicate switch cases
      'no-constant-condition': 'error', // Constant conditions like if(true)
      'no-empty': 'error', // Empty blocks
      'no-sparse-arrays': 'error', // [1,,3] arrays
      'valid-typeof': 'error', // Valid typeof comparisons

      // Turn off EVERYTHING else
      'no-unused-vars': 'off',
      'no-console': 'off',
      'no-alert': 'off',
      semi: 'off',
      quotes: 'off',
      indent: 'off',
      'comma-dangle': 'off',
      'eol-last': 'off',
      'no-trailing-spaces': 'off',
      'space-before-function-paren': 'off',
      'object-curly-spacing': 'off',
      'keyword-spacing': 'off',
      'space-infix-ops': 'off',
      'comma-spacing': 'off',
      'key-spacing': 'off',
      'array-bracket-spacing': 'off',
      'space-in-parens': 'off',
      'space-before-blocks': 'off',
      'brace-style': 'off',
      curly: 'off',
      'max-len': 'off',
      'no-multiple-empty-lines': 'off',
      'padded-blocks': 'off'
    }
  },
  eslintConfigPrettier
)
