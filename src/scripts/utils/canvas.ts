export function getContext(canvas: HTMLCanvasElement, width: number, height: number): CanvasRenderingContext2D {
  const ctx = canvas.getContext('2d')

  if (ctx === null) {
    throw new Error('Can\'t create 2D context')
  }

  canvas.width = width
  canvas.height = height
  ctx.imageSmoothingEnabled = false

  return ctx
}

export function createContext(width: number, height: number): CanvasRenderingContext2D {
  const canvas = document.createElement('canvas')

  return getContext(canvas, width, height)
}
