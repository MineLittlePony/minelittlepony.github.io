import type { PixelValue } from '~/data/pixels'
import { createListCollection } from '@ark-ui/react'

export function createPixelCollection(items: PixelValue[]) {
  return createListCollection({
    items,
    itemToValue(item) {
      return item.color.toString()
    },
  })
}
