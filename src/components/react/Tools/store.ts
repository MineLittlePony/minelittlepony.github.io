import { saveAs } from 'file-saver'
import { create } from 'zustand'
import { Pixels } from '~/data/pixels'
import { rgb2num } from '~/utils/color'
import { calculateSizeShift } from '~/utils/math'
import { file2canvas } from '~/utils/skin/file2canvas'

export interface ToolsState {
  loading: boolean
  error: string | null
  convert: boolean
  file: File | null
  ctx: CanvasRenderingContext2D | null
  output: CanvasRenderingContext2D | null
  fileName: string
  mirrorConvert: boolean
  skinSizeShift: number
  supportConversion: boolean
  pixels: Record<string, number | number[]>
}

const store = create<ToolsState>(() => ({
  loading: true,
  error: null,
  file: null,
  ctx: null,
  output: null,
  fileName: 'N/A',
  supportConversion: false,
  convert: false,
  mirrorConvert: true,
  skinSizeShift: 0,
  pixels: {},
}))

export const useToolsState = store
export const getToolsState = store.getState.bind(store)
export const setToolsState = store.setState.bind(store)

export function setPixelValue(name: string, value: number | number[]) {
  setToolsState(prev => ({ pixels: { ...prev.pixels, [name]: value } }))
}

export async function loadFile(fileFetch: (() => Promise<File>) | File) {
  setToolsState({ loading: true, error: null })

  try {
    const file = fileFetch instanceof File ? fileFetch : await fileFetch()
    const ctx = await file2canvas(file)
    const pixels = collectPixelsState(ctx)
    const skinSizeShift = calculateSizeShift(ctx.canvas.width)

    ctx.clearRect(0, 0, 4, 2)

    setToolsState({
      file,
      ctx,
      fileName: file.name,
      supportConversion: ctx.canvas.width !== ctx.canvas.height,
      convert: ctx.canvas.width !== ctx.canvas.height,
      skinSizeShift,
      pixels,
    })
  } catch (err) {
    setToolsState({
      error: err instanceof Error ? err.message : String(err),
    })
  }

  setToolsState({ loading: false })
}

export async function reloadFile() {
  const file = getToolsState().file

  if (file) {
    await loadFile(file)
  }
}

export function saveFile() {
  const state = getToolsState()
  state.output?.canvas.toBlob((blob) => {
    if (blob === null) {
      throw new Error('Canvas blob is null')
    }

    saveAs(blob, state.fileName)
  })
}

function collectPixelsState(ctx: CanvasRenderingContext2D) {
  const pixels: Record<string, number | number[]> = {}

  for (const pixel of Pixels) {
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

      pixels[pixel.name] = value
    } else {
      const value = rgb2num(r, g, b)
      const pixelValue = pixel.options.find(option => option.color === value)

      pixels[pixel.name] = (pixelValue ?? pixel.options[0]).color
    }
  }

  return pixels
}
