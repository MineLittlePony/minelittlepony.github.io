import type { PixelInfo } from '~/data/pixels'
import { useAtomValue } from '@atomous/react'
import { atom, computed, loadable } from 'atomous'
import { Pixels } from '~/data/pixels'
import { createCanvasContext } from '~/utils/canvas'
import { num2rgba, rgb2num } from '~/utils/color'
import { colors2num } from '~/utils/colors2num'
import { calculateSizeShift } from '~/utils/math'
import { convertSkin } from '~/utils/skin/convertSkin'
import { createCanvasBitmap } from '~/utils/skin/createCanvasBitmap'

export const $file = atom<Promise<File> | File | null>(null)

const $context = computed(async (get) => {
  const file = await get($file)

  if (!file) return null

  const ctx = await createCanvasBitmap(file)

  const pixels = Pixels.map((pixel) => {
    const $pixel = atom(getPixelData(pixel, ctx))
    return [pixel, $pixel] as const
  })

  ctx.clearRect(0, 0, 4, 2)

  const supportsConversion = ctx.canvas.width !== ctx.canvas.height
  const $layout = atom<'original' | 'convert' | 'convert-flip'>('convert-flip')

  const initialSkinSizeShift = calculateSizeShift(ctx.canvas.width)
  const $skinSizeShift = atom(initialSkinSizeShift)

  const $convertedCanvas = computed(() => {
    if (!supportsConversion) return ctx.canvas

    const layout = $layout.get()

    if (layout === 'original') return ctx.canvas

    return convertSkin(ctx.canvas, layout === 'convert-flip')
  })

  const $resizedCanvas = computed(() => {
    const source = $convertedCanvas.get()
    const skinSizeShift = $skinSizeShift.get()

    const width = 64 << skinSizeShift
    const height = source.width === source.height ? width : width / 2

    const result = createCanvasContext(width, height)
    result.drawImage(source, 0, 0, width, height)

    return result
  })

  const $output = computed(() => {
    const ctx = $resizedCanvas.get()

    for (const [pixel, atom] of pixels) {
      const rgba = num2rgba(colors2num(atom.get()))
      const imageData = new ImageData(new Uint8ClampedArray(rgba), 1, 1)

      ctx.putImageData(imageData, pixel.x, pixel.y)
    }

    return ctx.canvas
  })

  return {
    fileName: file.name,
    ctx,
    supportsConversion,
    $layout,
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

function getPixelData(pixel: PixelInfo, ctx: CanvasRenderingContext2D) {
  const data = ctx.getImageData(pixel.x, pixel.y, 1, 1).data

  const r = data[0] ?? 0
  const g = data[1] ?? 0
  const b = data[2] ?? 0

  if (pixel.type === 'CONDENSED') {
    const value: number[] = []

    for (const channel of [r, g, b]) {
      const pixelValue = pixel.options.find(option => option.color === channel)

      if (pixelValue) {
        value.push(pixelValue.color)
      }
    }

    return value
  } else {
    const value = rgb2num(r, g, b)
    const pixelValue = pixel.options.find(option => option.color === value)

    return (pixelValue ?? pixel.options[0]).color
  }
}
