import { createCanvasContext } from '../canvas'

function isLegacy(ctx: CanvasRenderingContext2D): boolean {
  const s = ctx.canvas.width / 64
  const { data } = ctx.getImageData(s * 4, 0, s * 4, s * 8)

  return !data.some((value, i) => {
    return value !== 0 && (i + 1) % 4 !== 0
  })
}

function isSquare(ctx: CanvasRenderingContext2D): boolean {
  return ctx.canvas.width === ctx.canvas.height
}

function clear(
  ctx: CanvasRenderingContext2D,
  s: number,
  x: number,
  y: number,
  w: number,
  h: number,
): void {
  ctx.clearRect(s * x, s * y, s * w, s * h)
}

function draw(
  ctx: CanvasRenderingContext2D,
  src: CanvasImageSource,
  s: number,
  sx: number,
  sy: number,
  sw: number,
  sh: number,
  dx: number,
  dy: number,
  dw: number,
  dh: number,
): void {
  ctx.drawImage(
    src,
    s * sx,
    s * sy,
    s * sw,
    s * sh,
    s * dx,
    s * dy,
    s * dw,
    s * dh,
  )
}

function translate(
  ctx: CanvasRenderingContext2D,
  s: number,
  x: number,
  y: number,
): void {
  ctx.translate(s * x, s * y)
}

function convertFromLegacy(ctx: CanvasRenderingContext2D): void {
  const src = createCanvasContext(ctx.canvas.width, ctx.canvas.height)

  src.drawImage(ctx.canvas, 0, 0)

  const s = ctx.canvas.width / 64
  const _clear = clear.bind(null, ctx, s)
  const _draw = draw.bind(null, ctx, src.canvas, s)
  const _translate = translate.bind(null, ctx, s)

  // Clear areas
  _clear(1, 3, 2, 1) // Horn top & bottom
  _clear(0, 4, 4, 4) // Horn rest
  _clear(4, 0, 4, 8) // Cutiemark
  _clear(56, 0, 8, 8) // Stomach
  _clear(0, 16, 12, 4) // Neck and legs top & bottom
  _clear(0, 20, 16, 12) // Legs rest
  _clear(36, 16, 8, 4) // Butt
  _clear(32, 20, 8, 12) // Back

  // Horn
  _draw(57, 0, 2, 1, 1, 3, 2, 1) // Top & bottom
  _draw(56, 1, 4, 4, 0, 4, 4, 4) // Rest

  // Cutiemark
  _draw(0, 20, 4, 8, 4, 0, 4, 8)

  // Neck
  _draw(24, 0, 4, 4, 0, 16, 4, 4)

  // Hind legs
  _draw(44, 16, 8, 4, 4, 16, 8, 4) // Top & bottom
  _draw(40, 20, 16, 12, 0, 20, 16, 12) // Rest

  // Stomach and butt
  ctx.save()
  _translate(56, 8)
  ctx.scale(1, -1)
  _draw(24, 0, 8, 8, 0, 0, 8, 8)
  _draw(24, 0, 8, 4, -20, -12, 8, 4)
  ctx.restore()

  // Back
  ctx.save()
  _translate(40, 32)
  ctx.rotate(Math.PI)
  _draw(24, 0, 8, 4, 0, 0, 8, 4)
  _draw(24, 0, 8, 8, 0, 4, 8, 8)
  ctx.restore()
}

function convertToSquare(ctx: CanvasRenderingContext2D, mirror: boolean): void {
  const src = createCanvasContext(ctx.canvas.width, ctx.canvas.height)

  src.drawImage(ctx.canvas, 0, 0)

  ctx.canvas.height = ctx.canvas.width
  ctx.drawImage(src.canvas, 0, 0)

  const s = ctx.canvas.width / 64
  const _clear = clear.bind(null, ctx, s)
  const _draw = draw.bind(null, ctx, src.canvas, s)

  // Clear areas
  // Left hind leg
  _clear(20, 48, 8, 4) // Top & bottom
  _clear(16, 52, 16, 12) // Other sides

  // Left foreleg
  _clear(36, 48, 8, 4) // Top & bottom
  _clear(32, 52, 16, 12) // Outside

  // Left wing
  _clear(58, 32, 4, 2) // Top & bottom
  _clear(56, 34, 8, 14) // Rest

  if (mirror) {
    ctx.save()
    ctx.scale(-1, 1)

    // Left hind leg
    _draw(4, 16, 4, 4, -20, 48, -4, 4) // Top
    _draw(8, 16, 4, 4, -24, 48, -4, 4) // Bottom
    _draw(0, 20, 4, 12, -24, 52, -4, 12) // Outside
    _draw(4, 20, 4, 12, -20, 52, -4, 12) // Front
    _draw(8, 20, 4, 12, -16, 52, -4, 12) // Inside
    _draw(12, 20, 4, 12, -28, 52, -4, 12) // Back

    // Left foreleg
    _draw(44, 16, 4, 4, -36, 48, -4, 4) // Top
    _draw(48, 16, 4, 4, -40, 48, -4, 4) // Bottom
    _draw(40, 20, 4, 12, -40, 52, -4, 12) // Outside
    _draw(44, 20, 4, 12, -36, 52, -4, 12) // Front
    _draw(48, 20, 4, 12, -32, 52, -4, 12) // Inside
    _draw(52, 20, 4, 12, -44, 52, -4, 12) // Back

    // Left wing
    _draw(58, 16, 2, 2, -58, 32, -2, 2) // Top
    _draw(60, 16, 2, 2, -60, 32, -2, 2) // Bottom
    _draw(56, 18, 2, 14, -60, 34, -2, 14) // Outside
    _draw(58, 18, 2, 14, -58, 34, -2, 14) // Front
    _draw(60, 18, 2, 14, -56, 34, -2, 14) // Inside
    _draw(62, 18, 2, 14, -62, 34, -2, 14) // Back

    ctx.restore()
  } else {
    // Left hind leg
    _draw(4, 16, 8, 4, 20, 48, 8, 4) // Top & bottom
    _draw(0, 20, 16, 12, 16, 52, 16, 12) // Other sides

    // Left foreleg
    _draw(44, 16, 8, 4, 36, 48, 8, 4) // Top & bottom
    _draw(40, 20, 16, 12, 32, 52, 16, 12) // Outside

    // Left wing
    _draw(58, 16, 4, 2, 58, 32, 4, 2) // Top & bottom
    _draw(56, 18, 8, 14, 56, 34, 8, 14) // Rest
  }
}

export function convertSkin(
  img: HTMLCanvasElement | HTMLImageElement,
  mirror: boolean,
): HTMLCanvasElement {
  const ctx = createCanvasContext(img.width, img.height)

  ctx.drawImage(img, 0, 0)

  if (isLegacy(ctx)) convertFromLegacy(ctx)
  if (!isSquare(ctx)) convertToSquare(ctx, mirror)

  return ctx.canvas
}
