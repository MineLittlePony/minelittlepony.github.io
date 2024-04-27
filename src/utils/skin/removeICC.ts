/** PNG signature */
const SIGNATURE = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A];

/**
 * Remove annoying image profile that affects original pixels when image is rendered by browser
 * @author keupoz <https://github.com/keupoz>
 */
export function removeICC(buf: ArrayBuffer): Uint8Array | null {
  const reader = new BufferReader(buf);

  // Check if the file is actually PNG
  // PNG files must start with the signature
  for (const byte of SIGNATURE) {
    if (byte !== reader.read8()) {
      return null;
    }
  }

  let iccStart = -1;
  let iccLength = 0;

  while (reader.index < reader.bytes.length) {
    const lastIndex = reader.index;
    const length = reader.readLength();
    const type = reader.readType();

    // The iCCP chunk is responsible for the annoying image profile
    // Remember its position and exit the reader
    if (type === 'iCCP') {
      iccStart = lastIndex;
      iccLength = length + 12; // Length data + type + chunk data (`length`) + CRC

      break;
    }

    // Turns out some files may have extra bytes breaking the reader (MoonDancer.png)
    // So exit when IEND chunk is encountered
    if (type === 'IEND') {
      break;
    }

    // Skip data and CRC
    reader.skip(length + 4);
  }

  if (iccStart === -1) {
    return reader.bytes;
  }

  // Remove the iCCP chunk
  const bytes = Array.from(reader.bytes);
  bytes.splice(iccStart, iccLength);

  return new Uint8Array(bytes);
}

class BufferReader {
  public readonly bytes: Uint8Array;
  public index: number;

  constructor(buf: ArrayBuffer) {
    this.bytes = new Uint8Array(buf);
    this.index = 0;
  }

  public raw(length: number): Uint8Array {
    const result = this.bytes.slice(this.index, (this.index += length));

    return result;
  }

  public read8(): number {
    const byte = this.bytes[this.index++];

    if (byte === undefined) {
      throw new RangeError(`Undefined byte at index ${this.index - 1}`);
    }

    return byte;
  }

  public readLength(): number {
    return (
      ((this.read8() << 24)
      | (this.read8() << 16)
      | (this.read8() << 8)
      | this.read8())
      >>> 0
    );
  }

  public readType(): string {
    return String.fromCharCode(...Array.from(this.raw(4)));
  }

  public skip(length: number): void {
    this.index += length;
  }
}
