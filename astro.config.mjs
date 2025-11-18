import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import rehypeAutolink from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeToc from 'rehype-toc'
import rehypeWrap from 'rehype-wrap'
import remarkSmartypants from 'remark-smartypants'

function setLayout() {
  /** @type {import('unified').Transformer} */
  return (_, file) => {
    file.data.astro.frontmatter.layout = '~/layouts/markdown/MarkdownLayout.astro'
  }
}

const wrapOptions = {
  wrapper: 'article.article-content',
}

/** @type {import('rehype-toc').Options} */
const tocOptions = {
  headings: ['h2', 'h3', 'h4', 'h5', 'h6'],
}

/** @type {import('rehype-autolink-headings').Options} */
const autolinkOptions = {
  properties: {
    ariaHidden: true,
    tabIndex: 0,
    class: 'heading-anchor',
  },
  content: {
    type: 'text',
    value: '#',
  },
}

// https://astro.build/config
export default defineConfig({
  site: 'https://minelittlepony-mod.com/',
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [setLayout, remarkSmartypants],
    rehypePlugins: [
      rehypeSlug,
      [rehypeWrap, wrapOptions],
      [rehypeToc, tocOptions],
      [rehypeAutolink, autolinkOptions],
    ],
  },
  integrations: [tailwind(), mdx(), react(), sitemap()],
})
