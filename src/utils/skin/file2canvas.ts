import { createContext } from '../canvas';
import { floorPowerOfTwo } from '../math';

export async function file2canvas(file: File) {
  return new Promise<CanvasRenderingContext2D>((resolve, reject) => {
    const image = new Image();

    image.onload = async () => {
      try {
        URL.revokeObjectURL(image.src);

        const width = floorPowerOfTwo(image.width);
        const height = image.width <= image.height ? width : width / 2;

        if (width !== image.width || height !== image.height) {
          console.warn(
            `Image size has been floored from ${image.width}x${image.height} to ${width}x${height}`,
          );
        }

        const ctx = createContext(width, height);
        ctx.drawImage(image, 0, 0, width, height);

        resolve(ctx);
      } catch (err) {
        reject(err);
      }
    };

    image.onerror = reject;

    image.src = URL.createObjectURL(file);
  });
}
