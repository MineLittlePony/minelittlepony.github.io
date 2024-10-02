import antfu from '@antfu/eslint-config';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default antfu({
  stylistic: {
    semi: true,
  },
  formatters: true,
  astro: true,
  react: true,
  rules: {
    'curly': ['error', 'all'],
    'style/brace-style': ['error', '1tbs'],
  },
  isInEditor: false,
}, ...compat.config({
  // https://github.com/francoismassart/eslint-plugin-tailwindcss
  extends: ['plugin:tailwindcss/recommended'],
  rules: {
    'tailwindcss/no-custom-classname': 'off',
  },
}));
