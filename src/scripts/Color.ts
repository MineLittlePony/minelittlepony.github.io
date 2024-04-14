export type RGBTuple<T = number> = [r: T, g: T, b: T]

export class Color {
  public readonly r: ColorChannel
  public readonly g: ColorChannel
  public readonly b: ColorChannel

  constructor(r: number, g: number, b: number) {
    this.r = new ColorChannel(r)
    this.g = new ColorChannel(g)
    this.b = new ColorChannel(b)
  }

  public static fromArray(arr: Iterable<number>): Color {
    const [r = 0, g = 0, b = 0] = arr

    return new Color(r, g, b)
  }

  public static fromStringArray(arr: Iterable<string>): Color {
    const [r = '0', g = '0', b = '0'] = arr

    return new Color(Number.parseInt(r, 16), Number.parseInt(g, 16), Number.parseInt(b, 16))
  }

  public static fromString(str: string): Color {
    const num = Number.parseInt(str, 16)

    return new Color(num >> 16, num >> 8, num)
  }

  public isBlack(): boolean {
    return +this.r === 0 && +this.g === 0 && +this.b === 0
  }

  public valueOf(): number {
    return (+this.r << 16) + (+this.g << 8) + (+this.b)
  }

  public toString(): string {
    return this.valueOf().toString(16).padStart(6, '0')
  }
}

export class ColorChannel {
  private readonly value: number

  constructor(value: number) {
    this.value = value & 0xFF
  }

  public valueOf(): number {
    return this.value
  }

  public toString(): string {
    return this.value.toString(16).padStart(2, '0')
  }
}
