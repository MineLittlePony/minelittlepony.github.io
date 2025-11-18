const LOG_2 = Math.log(2)

export function calculateSizeShift(size: number): number {
  size >>= 6

  if (size === 0) return 0

  return Math.floor(Math.log(size + 0.5) / LOG_2)
}

export function logOfTwo(n: number): number {
  return Math.floor(Math.log(n) / Math.LN2)
}

/** @source https://github.com/mrdoob/three.js/blob/820ad6bac0858d477fe3972ab02aee5a89d31b3c/src/math/MathUtils.js#L151 */
export function floorPowerOfTwo(n: number): number {
  return 2 ** logOfTwo(n)
}
