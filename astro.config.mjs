import { defineConfig } from 'astro/config'
import svelte from '@astrojs/svelte'
import mdx from '@astrojs/mdx'

import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import remarkToc from 'remark-toc'

import rehypeAutolink from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'

/** @type {import('rehype-autolink-headings').Options} */
const autolinkOptions = {
  properties: {
    ariaHidden: true,
    tabIndex: 0,
    class: 'heading-anchor'
  },
  content: {
    type: 'text',
    value: '#'
  }
}

// https://astro.build/config
export default defineConfig({
  site: 'https://minelittlepony-mod.com/',
  build: {
    assets: 'assets'
  },
  integrations: [
    mdx({
      remarkPlugins: [remarkGfm, remarkSmartypants, remarkToc],
      rehypePlugins: [rehypeSlug, [rehypeAutolink, autolinkOptions]]
    }),
    svelte()
  ],
  markdown: {
    remarkPlugins: [remarkGfm, remarkSmartypants, remarkToc],
    rehypePlugins: [rehypeSlug, [rehypeAutolink, autolinkOptions]]
  }
})
