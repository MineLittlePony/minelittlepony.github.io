import Typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto',
        serif: 'Roboto Slab',
        mono: 'Roboto Mono',
      },
      colors: {
        primary: '#3485df',
      },
    },
  },
  plugins: [Typography],
};
