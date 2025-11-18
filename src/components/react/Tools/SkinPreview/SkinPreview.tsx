import { useEffect } from 'react'
import { Pixels } from '~/data/pixels'
import { num2rgba } from '~/utils/color'
import { colors2num } from '~/utils/colors2num'
import { convertSkin } from '~/utils/skin/convertSkin'
import { getToolsState, setToolsState, useToolsState } from '../store'
import classes from './SkinPreview.module.css'

export interface SkinPreviewProps {
  ctx: CanvasRenderingContext2D
}

export function SkinPreview({ ctx }: SkinPreviewProps) {
  const skinSizeShift = useToolsState(state => state.skinSizeShift)
  const convert = useToolsState(state => state.convert)
  const mirrorConvert = useToolsState(state => state.mirrorConvert)

  useEffect(() => {
    const output = getToolsState().output

    if (!output) return

    const image = convert ? convertSkin(ctx.canvas, mirrorConvert) : ctx.canvas
    const width = 64 << skinSizeShift
    const height = image.width === image.height ? width : width / 2

    output.canvas.width = width
    output.canvas.height = height
    output.imageSmoothingEnabled = false

    output.drawImage(image, 0, 0, width, height)
    updatePixels(output, getToolsState().pixels)
  }, [ctx.canvas, convert, mirrorConvert, skinSizeShift])

  useEffect(() => {
    return useToolsState.subscribe((state, prev) => {
      const output = getToolsState().output

      if (!output) return

      if (state.pixels !== prev.pixels) {
        updatePixels(output, state.pixels, prev.pixels)
      }
    })
  }, [])

  function handleCanvas(canvas: HTMLCanvasElement | null) {
    setToolsState({ output: canvas?.getContext('2d') ?? null })
  }

  return (
    <canvas
      className={classes.Output}
      ref={handleCanvas}
      width={64}
      height={32}
    />
  )
}

function updatePixels(
  ctx: CanvasRenderingContext2D,
  pixels: Record<string, number | number[]>,
  prevPixels?: Record<string, number | number[]>,
) {
  for (const pixel of Pixels) {
    if (pixels[pixel.name] === prevPixels?.[pixel.name]) {
      continue
    }

    let color = pixels[pixel.name]

    if (color === undefined) {
      color = pixel.options[0].color
    }

    color = colors2num(color)

    const rgba = num2rgba(color)
    const imageData = new ImageData(new Uint8ClampedArray(rgba), 1, 1)

    ctx.putImageData(imageData, pixel.x, pixel.y)
  }
}
