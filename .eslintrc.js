module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
    'astro/astro': true,
    es2020: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:astro/recommended',
    'standard'
  ],
  overrides: [
    {
      files: ['*.astro'],
      plugins: [],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      }
    },
    {
      files: ['**/*.astro/*.js', '*.astro/*.js']
    }
  ],
  rules: {
    'no-undef': 'off',
    'no-redeclare': 'off',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',

    // typescript false positives
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', {
      functions: false,
      classes: false
    }]
  }
}
