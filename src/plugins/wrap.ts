import type { HastContent } from 'satteri'
import { defineHastPlugin } from 'satteri'

/**
 * A recreation of rehype-wrap plugin for satteri
 */
export function satteriWrap() {
  return defineHastPlugin({
    name: 'private:satteri-wrap',
    after(root, ctx) {
      const wrap: HastContent = {
        type: 'element',
        tagName: 'article',
        properties: {
          className: ['markdown-content'],
        },
        children: [],
      }
      for (const node of root.children) {
        // @ts-expect-error types doctype and mdxjsEsm don't agree with the type
        wrap.children.push({ ...node })
        ctx.removeNode(node)
      }
      ctx.appendChild(root, wrap)
    },
  })
}
