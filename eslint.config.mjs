import antfu from '@antfu/eslint-config'
import tailwind from 'eslint-plugin-tailwindcss'

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
  .append(tailwind.configs['flat/recommended'], {
    rules: {
      'tailwindcss/no-custom-classname': 'off',
    },
  })
