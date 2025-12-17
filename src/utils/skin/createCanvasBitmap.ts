import { createContext } from '../canvas'
import { floorPowerOfTwo } from '../math'

export async function createCanvasBitmap(source: ImageBitmapSource) {
  const image = await createImageBitmap(source)

  try {
    const width = floorPowerOfTwo(image.width)
    const height = image.width <= image.height ? width : width / 2

    if (width !== image.width || height !== image.height) {
      console.warn(`Image size has been floored from ${image.width}x${image.height} to ${width}x${height}`)
    }

    const ctx = createContext(width, height)
    ctx.drawImage(image, 0, 0, width, height)

    return ctx
  } finally {
    image.close()
  }
}
