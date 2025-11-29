import antfu from '@antfu/eslint-config'
import tailwindcss from 'eslint-plugin-better-tailwindcss'

export default antfu({
  formatters: true,
  astro: true,
  react: true,
  rules: {
    'antfu/curly': ['off'],
    'antfu/if-newline': ['off'],

    'curly': ['error', 'multi-line', 'consistent'],
    'style/brace-style': ['error', '1tbs'],
    'style/jsx-one-expression-per-line': ['error', { allow: 'non-jsx' }],
  },
  isInEditor: false,
})
  .override('antfu/formatter/astro', {
    languageOptions: {
      // fix overriding astro parser with plain parser
      parser: undefined,
    },
  })
  .override('antfu/formatter/astro', {
    languageOptions: {
      // fix overriding astro parser with plain parser
      parser: undefined,
    },
  })
  .override('antfu/formatter/astro/disables', {
    rules: {
      // fix conflicts with formatter
      'style/multiline-ternary': 'off',
    },
  })
  .append({
    plugins: {
      'better-tailwindcss': tailwindcss,
    },
    rules: {
      'better-tailwindcss/enforce-consistent-class-order': ['error'],
      'better-tailwindcss/enforce-consistent-variable-syntax': ['error'],
      'better-tailwindcss/enforce-consistent-important-position': ['error'],
      'better-tailwindcss/enforce-shorthand-classes': ['error'],
      'better-tailwindcss/no-duplicate-classes': ['error'],
      'better-tailwindcss/no-deprecated-classes': ['error'],
      'better-tailwindcss/no-conflicting-classes': ['error'],
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/layouts/root/global.css',
      },
    },
  })
