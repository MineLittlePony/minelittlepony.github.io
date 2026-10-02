import type { HastPluginEntry } from 'satteri'
import { satteri } from '@astrojs/markdown-satteri'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import satteriAutolink from 'satteri-autolink-headings'
import satteriCallouts from 'satteri-callouts'
import satteriSlug from 'satteri-slug'
import { satteriToc } from '~/plugins/toc'
import { satteriWrap } from '~/plugins/wrap'

function setLayout(): HastPluginEntry {
  return (ctx) => {
    ctx.data.astro!.frontmatter.layout = '~/layouts/markdown/MarkdownLayout.astro'
  }
}

// https://astro.build/config
export default defineConfig({
  site: 'https://minelittlepony-mod.com/',
  trailingSlash: 'always',
  markdown: {
    processor: satteri({
      mdastPlugins: [
        setLayout,
      ],
      hastPlugins: [
        satteriWrap,
        satteriToc,
        satteriSlug(),
        satteriAutolink({
          properties: {
            ariaHidden: 'true',
            tabIndex: 0,
            class: 'heading-anchor',
          },
          content: {
            type: 'text',
            value: '#',
          },
        }),
        satteriCallouts(),
      ],
    }),
  },
  integrations: [
    mdx(),
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
