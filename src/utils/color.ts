export type RGBTuple = [r: number, g: number, b: number]

export function rgb2int([r = 0, g = 0, b = 0]: Iterable<number>) {
  return ((r & 0xFF) << 16) | ((g & 0xFF) << 8) | (b & 0xFF)
}

export function int2rgb(int: number): RGBTuple {
  const r = int >> 16 & 0xFF
  const g = int >> 8 & 0xFF
  const b = int & 0xFF

  return [r, g, b]
}

function colorStringifier(mask: number) {
  const length = mask.toString(16).length

  return function int2hex(int: number) {
    return `#${(int & mask).toString(16).padStart(length, '0').toUpperCase()}`
  }
}

export const int2hex = colorStringifier(0xFFFFFF)
export const byte2hex = colorStringifier(0xFF)

export interface ColorStrings {
  hex?: string
  display: string
}

export function color2strings(color: number, partial?: boolean): ColorStrings {
  if (!color) {
    return {
      display: partial ? '---' : '-------',
    }
  }

  if (partial) {
    return {
      hex: int2hex(rgb2int([color, color, color])),
      display: byte2hex(color),
    }
  }

  const hex = int2hex(color)

  return {
    hex,
    display: hex,
  }
}
