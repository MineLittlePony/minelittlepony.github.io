import type { Color, ListCollection } from '@ark-ui/react'
import type { Atom } from 'atomous'
import type { PixelInfo } from '~/data/pixels'
import { createListCollection, parseColor } from '@ark-ui/react'
import { useAtomValue } from '@atomous/react'
import { atom, computed, loadable } from 'atomous'
import { Pixels } from '~/data/pixels'
import { createCanvasContext } from '~/utils/canvas'
import { hex } from '~/utils/color'
import { calculateSizeShift } from '~/utils/math'
import { convertSkin } from '~/utils/skin/convertSkin'
import { createCanvasBitmap } from '~/utils/skin/createCanvasBitmap'

export interface ContextPixelItem {
  label: string
  value: string
  color: Color
  raw: number
}

export interface ContextPixel {
  atom: Atom<Color>
  info: PixelInfo
  collection: ListCollection<ContextPixelItem>
}

export const $file = atom<Promise<File> | File | null>(null)

const $context = computed(async (get) => {
  const file = await get($file)

  if (!file) return null

  const ctx = await createCanvasBitmap(file)

  const pixels = Pixels.map<ContextPixel>((info) => {
    return {
      atom: atom(getPixelColor(info, ctx)),
      info,
      collection: createListCollection({
        items: info.options.map((item) => {
          const value = hex(item.color)

          return {
            label: item.label,
            value,
            color: parseColor(value),
            raw: item.color,
          }
        }),
      }),
    }
  })

  ctx.clearRect(0, 0, 4, 2)

  const convertedCanvas = createConvertedCanvasAtom(ctx)
  const initialSkinSizeShift = calculateSizeShift(ctx.canvas.width)
  const $skinSizeShift = atom(initialSkinSizeShift)

  const $resizedCanvas = computed(() => {
    const source = convertedCanvas?.$canvas.get() ?? ctx.canvas
    const skinSizeShift = $skinSizeShift.get()

    const width = 64 << skinSizeShift
    const height = source.width === source.height ? width : width / 2

    const result = createCanvasContext(width, height)
    result.drawImage(source, 0, 0, width, height)

    return result
  })

  const $output = computed(() => {
    const ctx = $resizedCanvas.get()

    for (const { atom, info } of pixels) {
      const color = atom.get().toFormat('rgba')

      const r = color.getChannelValue('red')
      const g = color.getChannelValue('green')
      const b = color.getChannelValue('blue')

      const transparent = r === 0 && g === 0 && b === 0
      const alpha = transparent ? 0x00 : 0xFF
      const imageData = new ImageData(new Uint8ClampedArray([r, g, b, alpha]), 1, 1)

      ctx.putImageData(imageData, info.x, info.y)
    }

    return ctx.canvas
  })

  return {
    fileName: file.name,
    ctx,
    $layout: convertedCanvas?.$layout,
    $skinSizeShift,
    $output,
    pixels,
  }
})

export const $contextState = loadable($context)

export function reloadContext() {
  $context.reset()
}

export function useToolsContext() {
  const { value } = useAtomValue($contextState)
  if (!value) throw new Error('Tools context is not initialized')
  return value
}

function getPixelColor(pixel: PixelInfo, ctx: CanvasRenderingContext2D) {
  const { data } = ctx.getImageData(pixel.x, pixel.y, 1, 1)
  const hexInt = data.slice(0, 3).reduce((result, item) => {
    return (result << 8) + item
  }, 0)

  return parseColor(hex(hexInt))
}

function createConvertedCanvasAtom(ctx: CanvasRenderingContext2D) {
  if (ctx.canvas.width === ctx.canvas.height) return

  const $layout = atom<'original' | 'convert' | 'convert-flip'>('convert-flip')
  const $canvas = computed(() => {
    const layout = $layout.get()

    if (layout === 'original') return ctx.canvas

    return convertSkin(ctx.canvas, layout === 'convert-flip')
  })

  return { $layout, $canvas }
}
