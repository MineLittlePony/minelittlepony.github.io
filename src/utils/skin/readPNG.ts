import { removeICC } from '../skin/removeICC';

export function readPNG(blob: Blob) {
  return new Promise<Blob>((resolve, reject) => {
    const F = new FileReader();

    F.onload = () => {
      try {
        if (!(F.result instanceof ArrayBuffer)) {
          throw new TypeError('FileReader result is not ArrayBuffer');
        }

        const clean = removeICC(F.result);

        if (clean === null) {
          throw new Error('File is not PNG');
        }

        const newBlob = new Blob([clean], {
          type: 'image/png',
        });

        resolve(newBlob);
      } catch (err) {
        reject(err);
      }
    };

    F.onerror = () => {
      reject(F.error);
    };

    F.readAsArrayBuffer(blob);
  });
}
