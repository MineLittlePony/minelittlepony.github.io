import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['node_modules/', '**/node_modules/**/', 'dist/', '**/dist/**/'],
  formatters: true,
  astro: true,
  svelte: true,
  rules: {
    'curly': ['error', 'all'],
    'svelte/html-quotes': ['error', {
      prefer: 'double',
    }],
  },
})
