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
  ignores: ['src/**/*.gen.*'],
})
  .override('antfu/react/rules', {
    rules: {
    // workaround for https://github.com/antfu/eslint-config/issues/811
      'react/no-implicit-key': ['off'],
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
      'better-tailwindcss/no-unnecessary-whitespace': ['error'],
      'better-tailwindcss/no-conflicting-classes': ['error'],
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/styles/index.css',
        variables: ['.*ClassName'],
      },
    },
  })
