module.exports = {
  env: {
    es6: true,
    jest: true,
    jquery: true,
    browser: true
  },
  ignorePatterns: [
    '**/*.min.js',
    '**/*.test.js',
    'node_modules/',
    'package.json',
    '.vscode',
    'coverage/',
    'dist/',
    'scripts',
    '.nuxt/',
    'assets/',
    'static/',
    'public/',
    'generate-plantuml-mindmap.js',
    '.eslintrc.js',
    'postcss.config.js',
    'tailwind.config.js'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  rules: {
    'no-var': 'error',
    'no-case-declarations': 'off',
    'block-spacing': 'error',
    'no-lone-blocks': 'error',
    'space-before-blocks': 'error',
    'no-lonely-if': 'error',
    'array-bracket-newline': 'error',
    'array-bracket-spacing': 'error',
    'arrow-spacing': 'error',
    'brace-style': 'error',
    'curly': ['error', 'multi-line'],
    'eqeqeq': 'error',
    'global-require': 'error',
    'no-fallthrough': 'error',
    'no-global-assign': 'error',
    'no-self-assign': 'error',
    'no-redeclare': 'error',
    'no-alert': 'error',
    'no-return-await': 'error',
    'no-else-return': 'error',
    'no-empty-pattern': 'error',
    'no-eq-null': 'error',
    'no-extra-bind': 'error',
    'no-extra-boolean-cast': 'error',
    'no-extra-label': 'error',
    'no-extra-parens': 'error',
    'no-octal': 'error',
    'key-spacing': 'error',
    'no-useless-call': 'error',
    'no-useless-escape': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-void': 'error',
    'no-with': 'error',
    'wrap-iife': 'error',
    'no-debugger': 'error',
    'no-delete-var': 'error',
    'no-undef': 'error',
    'no-shadow-restricted-names': 'error',
    'no-undef-init': 'error',
    'no-undefined': 'error',
    'no-unused-vars': 'error',
    'no-unused-expressions': 'error',
    'no-buffer-constructor': 'error',
    'no-new-require': 'error',
    'comma-spacing': 'error',
    'func-call-spacing': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multiple-empty-lines': 'error',
    'no-nested-ternary': 'error',
    'no-trailing-spaces': 'error',
    'no-unneeded-ternary': 'error',
    'no-whitespace-before-property': 'error',
    'nonblock-statement-body-position': 'error',
    'object-curly-newline': [
      'error', {
        'ObjectExpression': {
          'multiline': true,
          'minProperties': 2
        },
        'ObjectPattern': {
          'multiline': true,
          'minProperties': 3
        },
        'ImportDeclaration': 'never',
        'ExportDeclaration': 'never'
      }
    ],
    'object-property-newline': 'error',
    'prefer-const': 'error',
    'space-before-function-paren': [
      'error',
      'never'
    ],
    'space-infix-ops': 'error',
    'space-unary-ops': [
      2, {
        'words': true,
        'nonwords': false,
        'overrides': {
          '-': false,
          '+': false
        }
      }
    ],
    'no-class-assign': 'error',
    'no-confusing-arrow': 'error',
    'no-const-assign': 'error',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-imports': 'error',
    'no-duplicate-case': 'error',
    'no-new-symbol': 'error',
    'no-useless-constructor': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'template-curly-spacing': 'error',
    'object-curly-spacing': ['error', 'always'],
    'rest-spread-spacing': 'error',
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ]
  }
}
