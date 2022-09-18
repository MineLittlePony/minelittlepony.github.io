import { Color } from './Color'
import { createContext, getContext } from './utils/canvas'
import { floorPowerOfTwo } from './utils/math'
import { convert, isLegacy, isSquare, resize } from './utils/skin'

export class SkinManager {
  private _output: CanvasRenderingContext2D | null = null
  private readonly original = createContext(64, 32)
  private readonly pixels = createContext(4, 2)

  private convertedCanvas: HTMLCanvasElement | null = null

  private converted = false
  private sizeShift = -1

  private get output (): CanvasRenderingContext2D {
    if (this._output === null) {
      throw new Error('Output is not initialized')
    }

    return this._output
  }

  public setOutput (output: HTMLCanvasElement): void {
    this._output = getContext(output, 64, 32)
  }

  public getSize (): [width:number, height:number] {
    return [
      this.output.canvas.width,
      this.output.canvas.height
    ]
  }

  public getPixel (x: number, y: number): Color {
    return Color.fromArray(this.pixels.getImageData(x, y, 1, 1).data)
  }

  public setPixel (x: number, y: number, color: Color): void {
    const alpha = color.isBlack() ? 0 : 255
    const pixel = [+color.r, +color.g, +color.b, alpha]
    const data = new ImageData(new Uint8ClampedArray(pixel), 1, 1)

    this.pixels.putImageData(data, x, y)
    this.output.putImageData(data, x, y)
  }

  public convert (value = true): void {
    this.converted = value
    this.render()
  }

  public isSquare (): boolean {
    return isSquare(this.original)
  }

  public isConvertable (): boolean {
    return !this.isSquare()
  }

  public isLegacy (): boolean {
    return isLegacy(this.original)
  }

  public resize (sizeShift: number): void {
    this.sizeShift = sizeShift
    this.render()
  }

  public clear (): void {
    this.converted = false
    this.sizeShift = -1
    this.convertedCanvas = null
    this.original.canvas.width = this.output.canvas.width = 64
    this.original.canvas.height = this.output.canvas.height = 32
    this.pixels.clearRect(0, 0, 4, 2)
  }

  public setImage (image: HTMLImageElement): void {
    const width = floorPowerOfTwo(image.width)
    const height = image.width <= image.height ? width : width / 2

    if (width !== image.width || height !== image.height) {
      console.warn(`Image size has been floored from ${image.width}x${image.height} to ${width}x${height}`)
    }

    this.converted = false
    this.sizeShift = -1

    this.original.canvas.width = width
    this.original.canvas.height = height
    this.original.imageSmoothingEnabled = false

    this.original.drawImage(image, 0, 0, width, height)

    const pixelsData = this.original.getImageData(0, 0, 4, 2)
    this.pixels.putImageData(pixelsData, 0, 0)

    this.convertedCanvas = this.isConvertable() ? convert(this.original.canvas, true) : null

    this.render()
  }

  public render (): void {
    let src = this.converted && this.convertedCanvas !== null ? this.convertedCanvas : this.original.canvas
    src = this.sizeShift > -1 ? resize(src, this.sizeShift) : src

    this.output.canvas.width = src.width
    this.output.canvas.height = src.height
    this.output.imageSmoothingEnabled = false

    this.output.drawImage(src, 0, 0)

    const pixelsData = this.pixels.getImageData(0, 0, 4, 2)
    this.output.putImageData(pixelsData, 0, 0)
  }

  public async toBlob (): Promise<Blob | null> {
    return await new Promise((resolve) => {
      this.output.canvas.toBlob((blob) => {
        resolve(blob)
      })
    })
  }
}
