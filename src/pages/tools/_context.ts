import type { Color } from '@ark-ui/react'
import type { Atom } from 'atomous'
import type { PixelInfo } from '~/data/pixels'
import { useAtomValue } from '@atomous/react'
import { atom, computed, loadable } from 'atomous'
import { MAX_COORDS, Pixels } from '~/data/pixels'
import { createCanvasContext } from '~/utils/canvas'
import { int2rgb, rgb2int } from '~/utils/color'
import { calculateSizeShift } from '~/utils/math'
import { convertSkin } from '~/utils/skin/convertSkin'
import { createCanvasBitmap } from '~/utils/skin/createCanvasBitmap'

export interface ContextPixel {
  atom: Atom<number | Color>
  info: PixelInfo
}

export const $file = atom<Promise<File> | File | null>(null)

const $context = computed(async (get) => {
  const file = await get($file)

  if (!file) return null

  const ctx = await createCanvasBitmap(file)

  const pixels = Pixels.map<ContextPixel>(info => ({
    atom: atom(getPixelColor(info, ctx)),
    info,
  }))

  ctx.clearRect(0, 0, MAX_COORDS.x + 1, MAX_COORDS.y + 1)

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

    for (const { info, atom: $value } of pixels) {
      const color = normalizeColor($value.get())
      const rgb = int2rgb(color)
      const alpha = color ? 0xFF : 0x00
      const imageData = new ImageData(new Uint8ClampedArray([...rgb, alpha]), 1, 1)

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
  return rgb2int(data)
}

export function normalizeColor(color: number | Color) {
  return typeof color === 'number' ? color : color.toHexInt()
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
