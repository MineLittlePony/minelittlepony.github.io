import type { ElementContent } from 'hast'
import GithubSlugger from 'github-slugger'
import { defineHastPlugin } from 'satteri'

interface Heading {
  id: string
  text: string
  depth: number
  children: Heading[]
}

/**
 * A recreation of rehype-toc plugin for satteri.
 *
 * Alternatives are too limited for our needs and are implemented as a mdast
 * plugin.
 */
export function satteriToc() {
  return () => {
    const gs = new GithubSlugger()
    const headings: Heading[] = []
    return [
      defineHastPlugin({
        name: 'private:satteri-toc',

        element: {
          filter: ['h2', 'h3', 'h4', 'h5'],
          visit(node, ctx) {
            const text = ctx.textContent(node)
            const depth = Number.parseInt(node.tagName.charAt(1))
            let parent = headings
            while (parent.length > 0 && parent.at(-1)!.depth < depth) {
              parent = parent.at(-1)!.children
            }
            parent.push({
              id: gs.slug(text),
              text,
              depth,
              children: [],
            })
          },
        },
        after(root, ctx) {
          if (headings.length === 0) {
            return
          }
          ctx.insertChildAt(root, 0, {
            type: 'element',
            tagName: 'nav',
            properties: {
              className: ['toc'],
            },
            children: [createList(headings)],
          })
        },
      }),
    ]
  }
}

function createList(headings: Heading[]): ElementContent {
  return {
    type: 'element',
    tagName: 'ol',
    properties: {},
    children: headings.map(hdg => ({
      type: 'element',
      tagName: 'li',
      properties: {},
      children: [
        {
          type: 'element',
          tagName: 'a',
          properties: {
            href: `#${hdg.id}`,
          },
          children: [
            { type: 'text', value: hdg.text },
          ],
        },
        ...(hdg.children.length === 0 ? [] : [createList(hdg.children)]),
      ],
    })),
  }
}
